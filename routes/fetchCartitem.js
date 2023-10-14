const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    const deviceId = req.ip;

    try {
        const cartItem = await userModel.findOne({ deviceId:deviceId }).then(result => {
            if (result === null){
                return {};
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
