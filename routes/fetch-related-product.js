const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    const params = req.params;

    try {
        await productModel.find({ category: params.category})
        .then(result => res.status(200).send(result))
        .catch(err => res.status(401))
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
