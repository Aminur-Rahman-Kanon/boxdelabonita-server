const express = require('express');
const router = express.Router();
const { placeOrderModel, userModel } = require('../schema/schema');
const { sendOrderConfirmation } = require('../utilities/utilities');

router.post('/', async (req, res) => {
    const { name, address, email, phone, city, paymentMethod, totalPrice, deliveryCharge, products } = req.body;

    if (!name && !address && !phone && !paymentMethod && !totalPrice && !deliveryCharge && !products) return res.status(400).json({ status: 'bad request' });

    const date = new Date();
    const dateTime = `${date.toDateString()} ${date.toUTCString()}`;
    const orderId = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const orderInfo = {
        dateTime, orderId, paymentMethod, totalPrice, deliveryLocation: { city }, deliveryCharge, orderStatus: 'pending'
    }
    const customerInfo = {
        name, address, email, phone, city
    }

    try {
        await placeOrderModel.create({
            email, phone, orderInfo: orderInfo, customerInfo: customerInfo, products
        })
        .then(async response => {
            await sendOrderConfirmation(customerInfo, products, paymentMethod, totalPrice, deliveryCharge);
            return res.status(200).json({ status: 'success', data: { date, orderId} });
        })
        .catch(err => res.status(400)).json({ status: 'failed' })
    } catch (error) {
        return res.status(500);
    }
})
module.exports = router;
