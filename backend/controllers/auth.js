const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/user');
const Cart = require('../models/cart');


exports.signup = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassWord = await bcrypt.hash(password, 12);
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassWord,
            created: new Date()
        }
        const createdUser = await User.create(userData);
        const createdCart = await Cart.create({ userId: createdUser.id });
        // const createdCart = await createdUser.createCart();

        // sign user in after signup, or redirect to login page in frontend
        res.status(201).json({
            message: 'Signup succeeded!'
        });
        // const msg = {
        //     to: email,
        //     from: process.env.SENDGRID_EMAIL,
        //     subject: '[ecommerce] Signup succeeded!',
        //     html: '<h1>You successfully signed up!</h1>'
        // };
        // sgMail.send(msg);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    try {
        // check if email exist
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;

        // compare password
        const isEqual = bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        // assign token
        const token = jwt.sign(
            loadedUser.dataValues,
            process.env.AUTH_SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            userId: loadedUser.id,
            token: token
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};