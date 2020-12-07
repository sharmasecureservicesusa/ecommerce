const { body } = require('express-validator');

const db = require('../database/db');

exports.signupValidator = [
    body('firstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name should not be empty.'),
    body('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name should not be empty.'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return db.User.findOne({
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