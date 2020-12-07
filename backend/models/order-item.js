const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('orderItem',
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
};

module.exports = model;