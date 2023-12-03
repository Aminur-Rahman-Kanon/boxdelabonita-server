const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    const params = req.params;

    switch(params.type) {
        case 'all-bags':
            await productModel.find().lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'new-arrivals':
            await productModel.find({ subCategory: 'new arrivals' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'popular-products':
            await productModel.find({ subCategory: 'popular products' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'hot-deals':
            await productModel.find({ subCategory: 'hot deals' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'trending':
            await productModel.find({ subCategory: 'trending products' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'bucket bag':
            await productModel.find({ category: 'bucket bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'backpack':
            await productModel.find({ category: 'backpack' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'clutch bag':
            await productModel.find({ category: 'clutch bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'crossbody bag':
            await productModel.find({ category: 'crossbody bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'designer bag':
            await productModel.find({ category: 'designer bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'saddle bag':
            await productModel.find({ category: 'saddle bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'shoulder bag':
            await productModel.find({ category: 'shoulder bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'straw bag':
            await productModel.find({ category: 'straw bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        case 'belt & sling bag':
            await productModel.find({ category: 'belt bag & sling bag' }).lean().then(result => res.status(200).json({ status: 'success', data: result })).catch(err => res.status(400).json({ status: 'failed' }))
            break;

        default:
            return res.status(400).json({ status: 'invalid request' });
    }
})

module.exports = router;
