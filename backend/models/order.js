const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('order',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            shipping: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mobile: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true
        }
    );
};

module.exports = model;