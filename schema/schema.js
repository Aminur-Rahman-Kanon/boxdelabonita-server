const mongoose = require('mongoose');

const user = {
    deviceId: String,
    product: Object
}

const product = {
    stock: { type: Number, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Array, required: true },
    price: { type: Object, required: true },
    // details: { type: String, required: true },
    deliveryTime: String,
    color: { type: Object, required: true },
    img: { type: Object, required: true },
    description: { type: String, required: true },
    customerReviews: Array,
    purchased: Number,
    category: { type: String, requied: true },
    subCategory: { type: String, requied: true }
}

const userModel = mongoose.model('user', user);
const productModel = mongoose.model('products', product);
const hotDealsModel = mongoose.model('hot-deals', product);
const newArrivalsModel = mongoose.model('new-arrivals', product);
const popularProductsModel = mongoose.model('popular-products', product);
const trendingProductsModel = mongoose.model('trending-products', product);

module.exports = {
    userModel, productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel
};
