const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { email } = req.body;
    const deviceId = req.ip;

    try {
        const orders = await placeOrderModel.find({ email });
        if (orders.length) return res.status(200).json({ status: 'success', data: orders });

        const order = await placeOrderModel.find({ deviceId });
        if (!order.length) return res.status(400).json({ status: 'failed' })

        return res.status(200).json({ status: 'success', data: order })
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
