const Sequelize = require('sequelize');

const db = require('../database/db');

const CartItem = db.define('cartItem',
    {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = CartItem;