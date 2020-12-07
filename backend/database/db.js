const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
// const { Pool } = require('pg');

module.exports = db = {};

const initialize = async () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    // const password = process.env.POSTGRES_PASSWORD;
    const password = process.env.MYSQL_ROOT_PASSWORD;
    const database = process.env.DB_DATABASE;

    // const pgPool = new Pool({
    //     user: user,
    //     host: host,
    //     database: database,
    //     password: password,
    //     port: port
    // });

    const wait = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    let second = 10;
    let retryTime = 10;
    let connection;
    for (let i = 0; i < retryTime; ++i) {
        try {
            // await pgPool.connect();
            connection = await mysql.createConnection({ host: host, port: port, user: user, password: password });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
            break;
        } catch (err) {
            console.log(`[${i + 1}/${retryTime}] Database not ready yet, wait for ${second} seconds`);
            await wait(second * 1000);
        }
    }
    console.log('connected to Database!');

    const sequelize = new Sequelize(database, user, password, {
        dialect: "mysql",
        host: host
    });

    db.User = require('../models/user')(sequelize);
    db.Product = require('../models/product')(sequelize);
    db.Cart = require('../models/cart')(sequelize);
    db.CartItem = require('../models/cart-item')(sequelize);
    db.Order = require('../models/order')(sequelize);
    db.OrderItem = require('../models/order-item')(sequelize);
    db.Transaction = require('../models/transaction')(sequelize);

    // define table relations
    // user <--> product (one-to-many)
    db.Product.belongsTo(db.User, { constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Product);
    // cart <--> user (one-to-one)
    db.User.hasOne(db.Cart);
    db.Cart.belongsTo(db.User);
    // cart <--> product (many-to-many)
    db.Cart.belongsToMany(db.Product, { through: db.CartItem });
    db.Product.belongsToMany(db.Cart, { through: db.CartItem });
    // order <--> user (one-to-many)
    db.Order.belongsTo(db.User)
    db.User.hasMany(db.Order)
    // order <--> product (many-to-many)
    db.Order.belongsToMany(db.Product, { through: db.OrderItem });
    db.Product.belongsToMany(db.Order, { through: db.OrderItem });
    // transaction
    db.Transaction.belongsTo(db.User);
    db.User.hasMany(db.Transaction);
    db.Transaction.belongsTo(db.Order);
    db.Order.hasMany(db.Transaction);

    db.sequelize = sequelize;

    await sequelize.sync(/*{ force: true }*/);
};

db.initialize = initialize;