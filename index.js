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

const fetchAllProducts = require('./routes/fetchAllProducts');
// const fetchProducts = require('./routes/fetchProducts');
// const fetchProduct = require('./routes/fetchProduct');
// const fetchRelatedProduct = require('./routes/fetch-related-product');
const fetchCartItem = require('./routes/fetchCartitem');
const placedOrder = require('./routes/place-order');
const fetchPlacedOrder = require('./routes/fetchPlacedOrders');
const login = require('./routes/login');
const shortUrl = require('./routes/shortUrl');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'working good!' });
})

// app.use('/:itemId', shortUrl);
app.use('/fetch-all-products', fetchAllProducts);
// app.use('/fetch-products/:type', fetchProducts);
// app.use('/fetch-product/:product', fetchProduct);
// app.use('/fetch-related-products', fetchRelatedProduct);
app.use('/fetch-cart-item/:phone', fetchCartItem);
app.use('/place-order', placedOrder);
app.use('/fetch-placed-orders', fetchPlacedOrder);
app.use('/login', login);

app.listen(process.env.PORT || '8080', (err) => {
    if (err) {
        console.log(err);
    }
    // cronJob();
    console.log('server is listening to port 8080');
});
