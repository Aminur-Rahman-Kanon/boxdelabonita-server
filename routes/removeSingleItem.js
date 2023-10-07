const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { item } = req.body;
    const user = req.ip;

    if(!user || !item) return res.status(400).json({ status: 'failed' })

    try {
        const products = await userModel.findOne({ deviceId: user }).then(result => {
            if (result === null){
                return {};
            }
            else {
                return result.product;
            }
        });
        
        if (Object.keys(products).length){
            const product = products[item];
            console.log(product);
            if (product.length > 1){
                //delete one item
                product.pop();
                products[item] = product;
                
                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: products
                    }
                }).then(result => res.status(200).json({ status: 'success' }))
                .catch(err => res.status(400).json({ status: 'failed' }))
            }
            else {
                //delete entire collection
                delete products[item];
                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: products
                    }
                }).then(result => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }))
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

module.exports = router;
