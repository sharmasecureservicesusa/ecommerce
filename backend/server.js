const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database/db');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
// user <--> product (many-to-one)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
// cart <--> user (one-to-one)
User.hasOne(Cart);
Cart.belongsTo(User);
// cart <--> product (many-to-many)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

(async () => {
    try {
        let result = await sequelize.sync(/*{ force: true }*/);
        app.listen(PORT, () => {
            console.log('😎 server listening to port ' + PORT);
        })
    } catch (err) {
        console.log(err);
    }
})();
