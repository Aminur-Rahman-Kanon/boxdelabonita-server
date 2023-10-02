const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { productModel } = require('./schema/schema');

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://boxdelabonita-client.onrender.com'],
               default: 'https://boxdelabonita-client.onrender.com'
             }));
app.use(express.json());

// productModel.updateMany({ category: 'Bucket bag' }, {
//     $set: {
//         category: 'bucket bag'
//     }
// }).then(re => console.log(re)).catch(err => console.log(err));

const fetchProducts = require('./routes/fetchProducts');
const hotdealsProduct = require('./routes/hotDealsProducts');
const fetchProduct = require('./routes/fetchProduct');
const fetchRelatedProduct = require('./routes/fetch-related-product');

app.use('/fetch-products/:type', fetchProducts);
app.use('/hotdeals-products', hotdealsProduct);
app.use('/fetch-product/:product', fetchProduct);
app.use('/fetch-related-products/:category', fetchRelatedProduct);

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
});
