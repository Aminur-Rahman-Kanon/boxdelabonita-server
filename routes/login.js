const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const {userInput} = req.body;
    if (!userInput) return res.status(400).json({ status: 'invalid request' });

    try {
        await placeOrderModel.find({ phone: userInput })
        .then(result => res.status(200).json({ data: result }))
        .catch(err => res.status(400).json({ status: 'failed' }))
    } catch (error) {
        return res.status(500).json({ status: 'server error' });
    }
})

module.exports = router;
