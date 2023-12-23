const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { title } = req.body;
    const deviceId = req.ip;

    if (!title) return res.status(400).json({ status: 'invalid request' });

    try {
        const user = await userModel.findOne({ deviceId });
        if (user.deviceId){
            const products = user.product;
            const details = user.details;
            if (products[title] && details[title]){
                delete products[title];
                delete details[title];
                await userModel.updateOne({ deviceId }, {
                    $set: {
                        product: products,
                        details: details
                    }
                }).then(result => res.status(200).json({ status: 'success' })).catch(err => console.log(err));
            }
            else {
                return res.status(400).json({ status: 'product not found' })
            }
        }
        else {
            return res.status(400).json({ status: 'user not found' });
        }
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
