const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const { Transaction } = require('sequelize');
const db = require('../database/db');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await db.Product.findAll();
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
        const product = await db.Product.findByPk(prodId);
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
            product = await db.Product.findByPk(prodId);
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
                model: db.Product,
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
    let ts;
    try {
        // start transaction
        ts = await db.sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

        // get cart-item (select lock-update to prevent double click)
        const cart = await req.user.getCart({ lock: ts.LOCK.UPDATE }, { transaction: ts });
        // select lock-update to lock other carts/users from being able to read those products
        const products = await cart.getProducts({ lock: ts.LOCK.UPDATE }, { transaction: ts });

        // check if products are in stock
        for (let product of products) {
            if (product.stock === 0 || product.stock - product.cartItem.quantity < 0) {
                await ts.commit();
                return res.status(200).json({
                    success: false,
                    message: 'currently out of stock!'
                });
            }
        }

        // update #stock
        for (let product of products) {
            await db.Product.update(
                { stock: product.stock - product.cartItem.quantity },
                { where: { id: product.id }, transaction: ts }
            )
        }

        // add product to order
        const processedProducts = products.map(product => {
            product.orderItem = {
                quantity: product.cartItem.quantity,
                titleSnapshot: product.title,
                priceSnapshot: product.price,
                imageUrlSnapshot: product.imageUrl,
                descriptionSnapshot: product.description
            };
            return product;
        });
        const orderDetail = {
            total: req.body.amount,
            shipping: 60,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address
        };
        const order = await req.user.createOrder(orderDetail, { transaction: ts });
        await order.addProduct(processedProducts, { transaction: ts });
        await cart.setProducts(null, { transaction: ts });

        // stripe payment
        const payment = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: "USD",
            payment_method: req.body.id,
            confirm: true
        });
        if (!payment) {
            throw new Error('Charge unsuccessful');
        }

        // save payment record and commit transaction
        let transactionDetail = {
            code: req.body.id,
            mode: "Card",
            type: "Credit",
            status: "Success"
        };
        let paymentTransaction = await req.user.createTransaction(transactionDetail, { transaction: ts });
        await order.addTransaction(paymentTransaction, { transaction: ts });
        await ts.commit();

        res.status(200).json({
            success: true,
            message: 'place order successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        // issue a rollback when error occurs
        if (ts) {
            await ts.rollback();
        }
        next(err);
    }

}