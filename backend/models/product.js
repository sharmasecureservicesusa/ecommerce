const Sequelize = require('sequelize');

const model = (sequelize) => {
    return sequelize.define('products',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            imageUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );
};

module.exports = model;