const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/products => GET
router.get('/products', isAuth, adminController.getAdminProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

module.exports = router;