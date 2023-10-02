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

        case 'bucket bag':
            await productModel.find({ category: 'bucket bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'backpack':
            await productModel.find({ category: 'backpack' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'clutch bag':
            await productModel.find({ category: 'clutch bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'crossbody bag':
            await productModel.find({ category: 'crossbody bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'designer bag':
            await productModel.find({ category: 'designer bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'saddle bag':
            await productModel.find({ category: 'saddle bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'shoudler bag':
            await productModel.find({ category: 'shoulder bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'straw bag':
            await productModel.find({ category: 'straw bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'belt bag & sling bag':
            await productModel.find({ category: 'straw bag' }).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        default:
            return res.status(400);
    }
})

module.exports = router;
