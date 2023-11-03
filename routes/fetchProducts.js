const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    const params = req.params;

    switch(params.type) {
        case 'all-bag':
            await productModel.find().limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'new-arrivals':
            await newArrivalsModel.find().limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'popular-products':
            await popularProductsModel.find().limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'hot-deals':
            await hotDealsModel.find().limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'trending-products':
            await trendingProductsModel.find().limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'bucket bag':
            await productModel.find({ category: 'bucket bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'backpack':
            await productModel.find({ category: 'backpack' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'clutch bag':
            await productModel.find({ category: 'clutch bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'crossbody bag':
            await productModel.find({ category: 'crossbody bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'designer bag':
            await productModel.find({ category: 'designer bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'saddle bag':
            await productModel.find({ category: 'saddle bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'shoulder bag':
            await productModel.find({ category: 'shoulder bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'straw bag':
            await productModel.find({ category: 'straw bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        case 'belt & sling bag':
            await productModel.find({ category: 'straw bag' }).limit(6).skip(0).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
            break;

        default:
            return res.status(400);
    }
})

module.exports = router;
