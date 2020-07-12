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