const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    const params = req.params;

    try {
        await productModel.findOne({ title: params.product })
        .then(result => {
            if (result) {
                return res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
})

module.exports = router;
