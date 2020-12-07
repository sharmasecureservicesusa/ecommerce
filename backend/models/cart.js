const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('cart',
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
};

module.exports = model;