const Sequelize = require('sequelize');

const db = require('../database/db');

const OrderItem = db.define('orderItem',
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

module.exports = OrderItem;