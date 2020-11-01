const Sequelize = require('sequelize');

const db = require('../database/db');

const OrderItem = db.define('orderItem',
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

module.exports = OrderItem;