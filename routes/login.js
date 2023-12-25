const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const {userInput} = req.body;
    if (!userInput) return res.status(400).json({ status: 'invalid request' });

    try {
        await placeOrderModel.find({ phone: userInput })
        .then(result => {
            if (result.length){
                return res.status(200).json({ status: 'success', data: result })
            }
            else {
                return res.status(202).json({ status: 'not found' })
            }
        })
        .catch(err => res.status(400).json({ status: 'failed' }))
    } catch (error) {
        return res.status(500).json({ status: 'server error' });
    }
})

module.exports = router;
