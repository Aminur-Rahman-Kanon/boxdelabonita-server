const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const fetchProducts = require('./routes/fetchProducts');
const hotdealsProduct = require('./routes/hotDealsProducts');

app.use('/fetch-products/:type', fetchProducts);
app.use('/hotdeals-products', hotdealsProduct);


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(conn => console.log('database connected')).catch(err => console.log('database connection error'));

app.listen(process.env.PORT || '8080', (err) => {
    if (err) {
        console.log(err);
    }

    console.log('server is listening to port 8080');
})