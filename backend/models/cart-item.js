const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('cartItem',
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
};

module.exports = model;