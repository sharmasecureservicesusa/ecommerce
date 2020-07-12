const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce", process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.HOST,
});

module.exports = sequelize;
