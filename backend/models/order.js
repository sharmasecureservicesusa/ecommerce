const Sequelize = require('sequelize');

const db = require('../database/db');

const Order = db.define('order',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Order;