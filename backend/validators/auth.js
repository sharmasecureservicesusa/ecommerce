const { body } = require('express-validator');

const User = require('../models/user');

exports.signupValidator = [
    body('first_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name should not be empty.'),
    body('last_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name should not be empty.'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (user) {
                    return Promise.reject('email address already exists!');
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
];