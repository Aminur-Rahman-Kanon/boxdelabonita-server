const express = require('express');
const router = express.Router();
const { placeOrderModel, userModel, productModel } = require('../schema/schema');
const { sendOrderConfirmation } = require('../utilities/utilities');

router.post('/', async (req, res) => {
    const { name, address, email, phone, city, area, paymentMethod, totalPrice, deliveryCharge, userDetails } = req.body;

    if (!name && !address && !email && !phone && !paymentMethod && !totalPrice && !deliveryCharge && !userDetails) return res.status(400).json({ status: 'bad request' });

    const deviceId = req.ip;
    const date = new Date().toDateString();
    const orderId = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const orderInfo = {
        date, orderId, paymentMethod, totalPrice, deliveryLocation: { city, area }, deliveryCharge, orderStatus: 'pending'
    }
    const customerInfo = {
        name, address, email, phone, city, area
    }

    try {
        await placeOrderModel.create({
            deviceId: deviceId, email: email, orderInfo: orderInfo, customerInfo: customerInfo, products: userDetails
        })
        .then(async response => {
            const user = await userModel.findOne({ deviceId });
            if (!user) return res.status(400).json({ status: 'user not found' })
            const userObj = JSON.parse(JSON.stringify(user));
            if (userObj.details || userDetails.product){
                delete userObj.details;
                delete userObj.product;
                userObj['user'] = customerInfo;
            }
            await userModel.replaceOne({ deviceId }, {
                ...userObj
            }).then(async suc => {
                sendOrderConfirmation(customerInfo, userDetails, paymentMethod, totalPrice, deliveryCharge);
                return res.status(200).json({ status: 'success', data: { date, orderId} });
            }).catch(err => {
                return res.status(400).json({ status: 'failed' })
            })
        })
        .catch(err => res.status(400)).json({ status: 'failed' })
    } catch (error) {
        return res.status(500);
    }
})
module.exports = router;
