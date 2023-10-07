const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema')

router.post('/', async (req, res) => {
    const { product } = req.body;
    const user = req.ip;
    
    const userId = await userModel.findOne({ deviceId: user });
    if (userId === null && !product.title) return res.status(401).json({ status: 'operation failed' });

    //adding item
    try {
        const products = userId.product;
        if (products === undefined){
            //add new product
            const products = {};
            try {
                products[product.title] = [product];
                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: products
                    }
                }).then(result => res.status(200).send({ status: 'success' })).catch(err => res.status(400).send({ status: 'failed' }));
            } catch (error) {
                return res.status(500).send({ status: 'server error' });
            }
        }
        else {
            const productTitle = Object.keys(userId.product).filter(title => title === product.title);
            
            if (productTitle.length){
                //product exist
                const existProduct = userId.product[productTitle[0]];
                existProduct.push(product);
                const newProduct = {...userId.product};
                newProduct[productTitle[0]] = existProduct;
                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: newProduct
                    }
                }).then(result => res.status(200).json({ status: 'success' }))
                .catch(err => res.status(400))
            }
            else {
                //product not exist
                const existProduct = {...userId.product};
                existProduct[product.title] = [product];
                await userModel.updateOne({ deviceId:user }, {
                    $set: {
                        product: existProduct
                    }
                }).then(result => res.status(200).json({ status: 'success' }))
                .catch(err => res.status(400).json({ status: 'failed' }))
            }
        }
    } catch (error) {
        return res.status(500).json({ status: "failed" })
    }
})

module.exports = router;
