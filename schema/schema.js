const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    img: { type: Array, required: true },
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

const userModel = mongoose.model('user', user);
const productModel = mongoose.model('products', product);
const placeOrderModel = mongoose.model('orders', placedOrder);

module.exports = {
    userModel, productModel, placeOrderModel
};
