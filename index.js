const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const { cronJob } = require('./utilities/utilities');

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

const initApp = require('./routes/init-app');
const fetchProducts = require('./routes/fetchProducts');
const fetchProduct = require('./routes/fetchProduct');
const fetchRelatedProduct = require('./routes/fetch-related-product');
const addItem = require('./routes/add-item');
const fetchCartItem = require('./routes/fetchCartitem');
const removeSingleItem = require('./routes/removeSingleItem');
const removeAllProducts = require('./routes/removeAllProducts');
const placedOrder = require('./routes/place-order');
const fetchPlacedOrder = require('./routes/fetchPlacedOrders');
const login = require('./routes/login');

app.get('/', (req, res) => {
    res.status(200);
})

app.use('/init-app', initApp);
app.use('/fetch-products/:type', fetchProducts);
app.use('/fetch-product/:product', fetchProduct);
app.use('/fetch-related-products', fetchRelatedProduct);
app.use('/add-item', addItem);
app.use('/fetch-cart-item/:phone', fetchCartItem);
app.use('/remove-single-item', removeSingleItem);
app.use('/remove-all-products', removeAllProducts);
app.use('/place-order', placedOrder);
app.use('/fetch-placed-orders', fetchPlacedOrder);
app.use('/login', login);

app.listen(process.env.PORT || '8080', (err) => {
    if (err) {
        console.log(err);
    }
    cronJob();
    console.log('server is listening to port 8080');
});
