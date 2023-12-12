const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    try {
        await productModel.find().limit(10).lean()
        .then(result => res.status(200).json({data: result}))
        .catch(err => res.status(401))
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
