const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');
const pool = require('../db/db_init');

router.get('/', async (req, res) => {
    const params = req.params;

    try {
        await productModel.find({ title: params.product }).lean()
        .then(result => res.status(200).json({ status: 'success', data: result }))
        .catch(err => res.status(400).json({ status: 'failed' }));
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
})

module.exports = router;
