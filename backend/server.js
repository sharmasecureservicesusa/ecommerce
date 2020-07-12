const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database/db');

const User = require('./models/user');
const Product = require('./models/product');

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

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use(shopRoutes);


// error handler, all thrown errors will reach here
app.use((error, req, res, next) => {
    console.log('[Error handler (last)]', error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// define table relations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

(async () => {
    try {
        let result = await sequelize.sync();
        app.listen(PORT, () => {
            console.log('😎 server listening to port ' + PORT);
        })
    } catch (err) {
        console.log(err);
    }
})();
