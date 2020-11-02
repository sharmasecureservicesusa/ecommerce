const Product = require('../models/product');

exports.getAdminProducts = async (req, res, next) => {
    try {
        // const products = await Product.findAll({
        //     where: {
        //         userId: req.userId
        //     }
        // });
        const products = await req.user.getProducts();
        // console.log('[getAdminProducts] products:', products);
        res.status(200).json({
            products: products
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postAddProduct = async (req, res, next) => {
    try {
        // const product = await Product.create({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description,
        //     userId: req.userId
        // });
        const product = await req.user.createProduct({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            stock: req.body.stock
        });
        // console.log('[postAddProduct] response', result);
        res.status(201).json({
            message: 'Product created successfully!',
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postDeleteProduct = async (req, res, next) => {
    const productId = req.body.productId;
    try {
        const result = await Product.destroy({
            where: {
                id: productId
            }
        });
        res.status(201).json({
            message: 'Product deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        // const product = await Product.findByPk(productId);
        const product = await req.user.getProducts({ where: { id: productId } });
        res.status(200).json({
            product: product[0]
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postEditProduct = async (req, res, next) => {
    console.log('[postEditProduct] req.body.productId:', req.body.productId);
    // const productId = req.params.productId;
    const productId = req.body.productId;
    try {
        const product = await Product.findByPk(productId);
        product.title = req.body.title;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.description = req.body.description;
        product.stock = req.body.stock;
        const updatedProduct = await product.save();
        res.status(200).json({
            product: updatedProduct
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
