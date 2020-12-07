const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('transaction',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            code: { // Payment id provided my payment gateway
                type: Sequelize.STRING,
                allowNull: false
            },
            mode: { // Cash On Delivery, Card...
                type: Sequelize.STRING,
                allowNull: false
            },
            type: { // Credit, Debit
                type: Sequelize.STRING,
                allowNull: false
            },
            status: { // New, Cancelled, Failed, Pending, Declined, Rejected, Success
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true
        }
    );
};

module.exports = model;