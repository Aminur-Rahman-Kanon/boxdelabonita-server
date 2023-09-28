const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    const params = req.params;

    switch(params.type) {
        case 'new-arrivals':
            await newArrivalsModel.find({}).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'trending-products':
            await trendingProductsModel.find({}).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        default:
            return res.status(400);
    }
})

module.exports = router;
