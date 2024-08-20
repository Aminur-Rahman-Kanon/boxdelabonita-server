const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(cors({ origin: ['http://localhost:3000', 'https://boxdelabonita-client.onrender.com', 'https://www.boxdelabonita.com'],
               default: 'https://www.boxdelabonita.com'
             }));
app.use(express.json());
app.use(bodyParser.json())
app.set("trust proxy", true);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(conn => console.log('database connected')).catch(err => console.log('database connection error'));

//client apis
const fetchAllProducts = require('./routes/fetchAllProducts');
const fetchCartItem = require('./routes/fetchCartitem');
const placedOrder = require('./routes/place-order');
const login = require('./routes/login');
const shortUrl = require('./routes/shortUrl');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'working good!' });
})

// app.use('/:itemId', shortUrl);
app.use('/fetch-all-products', fetchAllProducts);
app.use('/fetch-cart-item/:phone', fetchCartItem);
app.use('/place-order', placedOrder);
app.use('/login', login);

//admin panel apis
const uploadProducts = require('./routes/h_panel/uploadProduct');
const adminLogin = require('./routes/h_panel/adminLogin');
const tokenValidation = require('./routes/h_panel/tokenValidation');
const fetchProduct = require('./routes/h_panel/fetchProduct');
const changeImg = require('./routes/h_panel/changeImg');
const removeImg = require('./routes/h_panel/removeImg');
const updateProduct = require('./routes/h_panel/updateProduct');
const removeProduct = require('./routes/h_panel/removeProduct');
const addNewImg = require('./routes/h_panel/addNewImg');
const fetchPlacedOrders = require('./routes/h_panel/fetchPlacedOrders');
const changeOrderStatus = require('./routes/h_panel/changeOrderStatus');
const uploadNewImg = require('./routes/h_panel/uploadNewImg');
const deleteOrder = require('./routes/h_panel/deleteOrder');

app.use('/upload-products', uploadProducts);
app.use('/upload-new-img', uploadNewImg);
app.use('/admin-login', adminLogin);
app.use('/verify-token', tokenValidation);
app.use('/fetch-product', fetchProduct);
app.use('/delete-order', deleteOrder);
app.use('/change-img', changeImg);
app.use('/remove-img', removeImg);
app.use('/update-product-details', updateProduct);
app.use('/remove-product', removeProduct);
app.use('/add-new-img', addNewImg);
app.use('/fetch-placed-orders', fetchPlacedOrders);
app.use('/change-order-status', changeOrderStatus);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || '8080';

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server is listening to port ${port}`);
});
