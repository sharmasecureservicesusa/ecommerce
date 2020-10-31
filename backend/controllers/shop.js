const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

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
        console.log('start getting cart');
        const cart = await req.user.getCart()
        const products = await cart.getProducts();
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