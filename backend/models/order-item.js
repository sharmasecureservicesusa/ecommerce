const Sequelize = require('sequelize');

const db = require('../database/db');

const OrderItem = db.define('orderItem',
    {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        titleSnapshot: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priceSnapshot: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        imageUrlSnapshot: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descriptionSnapshot: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = OrderItem;