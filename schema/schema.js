const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const user = new Schema({
    deviceId: String,
    time: String,
    user: Object,
    product: Object,
    details: Object,
    price: Number
})

const product = new Schema({
    stock: { type: Number, required: true },
    title: { type: String, required: true, index: true },
    rating: { type: Number, required: true },
    price: { type: Object, required: true },
    color: { type: Array, required: true },
    img: { type: Object, required: true },
    description: { type: String, required: true },
    landingDescription: { type: String },
    customerReviews: Array,
    category: { type: String, requied: true, index: true },
    subCategory: { type: String, requied: true }
})

const placedOrder = new Schema({
    orderId: {type: String},
    phone: {type: String },
    email: {type: String},
    orderInfo: {type: Object},
    customerInfo: {type: Object},
    products: {type: Object}
})

const shortUrl = new Schema({
    url: { type: String, required: true }
});

const adminModel = mongoose.model('admin', admin);
const userModel = mongoose.model('user', user);
const productModel = mongoose.model('products', product);
const placeOrderModel = mongoose.model('orders', placedOrder);
const shortUrlModel = mongoose.model('shortUrl', shortUrl);

module.exports = {
    adminModel, userModel, productModel, placeOrderModel, shortUrlModel
};
