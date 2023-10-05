const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    const user = req.ip;

    try {
        const cartItem = await userModel.findOne({ deviceId: user }).then(result => result);
        if (!cartItem.product) return res.status(400).json({ status: 'not found' });
        return res.status(200).json({ data: cartItem.product });
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
