const express = require('express');
const router = express.Router();
const { productModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    try {
        await productModel.find().lean().then(result => {
            if (result.length){
                return res.status(200).json({ status: 'success', data: result })
            }
            else {
                return res.status(400).json({ status: 'failed' })
            }
        })
    } catch (error) {
        return res.status(500)
    }
})

module.exports = router;
