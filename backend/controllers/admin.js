const Product = require('../models/product');

exports.getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {
                userId: req.userId
            }
        });
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    try {
        const result = await Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: req.userId
        });
        res.status(201).json({
            message: 'Product created successfully!'
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
        console.log(result);
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