const express = require('express');
const { body } = require('express-validator');
const cors = require('cors');

const authController = require('../controllers/auth');

const authValidator = require('../validators/auth');
const isValid = require('../middleware/is-valid');

const router = express.Router();
// router.use(cors());

router.post('/signup', authValidator.signupValidator, isValid, authController.signup);

router.post('/login', authController.login);

// router.get('/status', )

module.exports = router;