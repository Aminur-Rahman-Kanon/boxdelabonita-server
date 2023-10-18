const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');
const { sendOrderConfirmation } = require('../utilities/utilities');

router.post('/', async (req, res) => {
    const { name, address, email, phone, city, area, paymentMethod, totalPrice, deliveryCharge, userDetails } = req.body;

    if (!name && !address && !email && !phone && !paymentMethod && !totalPrice && !deliveryCharge && !userDetails) return res.status(400).json({ status: 'bad request' });

    const deviceId = req.ip;

    const date = new Date().toDateString();

    const orderId = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const orderInfo = {
        date, orderId, paymentMethod, totalPrice, deliveryLocation: { city, area }, deliveryCharge
    }

    const customerInfo = {
        name, address, email, phone, city, area
    }

    try {
        await placeOrderModel.create({
            deviceId, email, orderInfo, customerInfo, products: userDetails
        })
        .then(response => {
            return res.status(200).json({ status: 'success', data: { date, orderId} });
            // sendOrderConfirmation(email, name, address, );
        })
        .catch(err => res.status(400)).json({ status: 'failed' })
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
