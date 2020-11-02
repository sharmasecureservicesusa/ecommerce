const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        // console.log('[getProducts]', products);
        res.status(200).json({
            products: products
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findByPk(prodId);
        res.status(200).json({
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCart = async (req, res, next) => {
    try {
        const cart = await req.user.getCart()
        const products = await cart.getProducts({ paranoid: false });
        // const cart = await Cart.find({
        //     where: {
        //         userId: 1
        //     }
        // });
        // const products = await cart[0].getProducts();
        res.status(200).json({
            products: products
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postCartAddProduct = async (req, res, next) => {
    try {
        const prodId = req.body.productId;
        const cart = await req.user.getCart();
        const products = await cart.getProducts({ where: { id: prodId } });
        let product;
        let newQuantity = 1;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
        } else {
            product = await Product.findByPk(prodId);
        }
        let result = await cart.addProduct(product, { through: { quantity: newQuantity } });
        res.status(200).json({
            products: products
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postCartDeleteProduct = async (req, res, next) => {
    try {
        const prodId = req.body.productId;
        const cart = await req.user.getCart();
        const products = await cart.getProducts({ where: { id: prodId }, paranoid: false });
        const product = products[0];
        const result = await product.cartItem.destroy();
        console.log('reulst of delete cart:');
        console.log(result);
        res.status(201).json({
            message: 'Product deleted from cart successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const orders = await req.user.getOrders({
            include: [{
                model: Product,
                paranoid: false
            }]
        });
        res.status(200).json({
            orders: orders
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postOrder = async (req, res, next) => {
    try {
        const cart = await req.user.getCart();
        let products = await cart.getProducts();
        const order = await req.user.createOrder();
        let result = await order.addProduct(products.map(product => {
            product.orderItem = {
                quantity: product.cartItem.quantity,
                titleSnapshot: product.title,
                priceSnapshot: product.price,
                imageUrlSnapshot: product.imageUrl,
                descriptionSnapshot: product.description
            };
            return product;
        }));
        result = await cart.setProducts(null);
        res.status(200).json({
            message: 'place order successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}