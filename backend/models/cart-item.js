const Sequelize = require('sequelize');

const db = require('../database/db');

const CartItem = db.define('cartItem',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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