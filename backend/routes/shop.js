const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);

module.exports = router;