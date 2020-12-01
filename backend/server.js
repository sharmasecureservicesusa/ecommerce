const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database/db');
const sequelizeErd = require('sequelize-erd');
const { writeFileSync } = require('fs');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Transaction = require('./models/transaction');

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', shopRoutes);


// error handler, all thrown errors will reach here
app.use((error, req, res, next) => {
    console.log('[Error handler (last)]', error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// define table relations
// user <--> product (one-to-many)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
// cart <--> user (one-to-one)
User.hasOne(Cart);
Cart.belongsTo(User);
// cart <--> product (many-to-many)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// order <--> user (one-to-many)
Order.belongsTo(User)
User.hasMany(Order)
// order <--> product (many-to-many)
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
// transaction
Transaction.belongsTo(User);
User.hasMany(Transaction);
Transaction.belongsTo(Order);
Order.hasMany(Transaction);

(async () => {
    try {
        let result = await sequelize.sync(/*{ force: true }*/);
        const svg = await sequelizeErd({ engine: 'neato', source: result, arrowSize: 1.2, lineWidth: 1 });
        writeFileSync('./erd.svg', svg);
        app.listen(PORT, () => {
            console.log('😎 server listening to port ' + PORT);
        })
    } catch (err) {
        console.log(err);
    }
})();
