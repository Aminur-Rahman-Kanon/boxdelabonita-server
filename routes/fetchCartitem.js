const express = require('express');
const router = express.Router({ mergeParams: true });
const { placeOrderModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    try {
        const cartItem = await placeOrderModel.find({ phone: req.params.phone }).lean().then(result => {
            if (result === null){
                return [];
            }
            else {
                return result;
            }
        });
        return res.status(200).json({ data: cartItem });
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
