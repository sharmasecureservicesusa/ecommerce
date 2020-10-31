const Sequelize = require('sequelize');

const db = require('../database/db');

const Cart = db.define('cart',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = Cart;