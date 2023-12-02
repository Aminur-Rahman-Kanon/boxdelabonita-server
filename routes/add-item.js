const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema')

router.post('/', async (req, res) => {
    const { product, color } = req.body;
    const user = req.ip;
    
    const userId = await userModel.findOne({ deviceId: user });
    if (userId === null && !product.title && !color) return res.status(401).json({ status: 'operation failed' });

    //adding item
    try {
        const products = userId.product;
        const price = product.price.originalPrice - product.price.discountedPrice;
        if (products === undefined){
            //add new product
            try {
                const products = {};
                const details = {};
                const productDetails = {
                    title: product.title,
                    color: [color],
                    img: product.img[0],
                    quantity: 1,
                    price
                }
                products[product.title] = [product];
                details[product.title] = productDetails;

                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: products,
                        details: details
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
                try {
                    const existProduct = {...userId.product};
                    if (existProduct[productTitle[0]].length){
                        existProduct[productTitle[0]].push(product);
                    }
                    const updateDetails = {...userId.details};
                    if (updateDetails && updateDetails[productTitle[0]]){
                        updateDetails[productTitle[0]].color.push(color);
                        updateDetails[productTitle[0]].quantity = updateDetails[productTitle[0]].quantity + 1
                        updateDetails[productTitle[0]].price = updateDetails[productTitle[0]].price + price;
                    }
                    await userModel.updateOne({ deviceId: user }, {
                        $set: {
                            product: existProduct,
                            details: updateDetails
                        }
                    }).then(result => res.status(200).json({ status: 'success' }))
                } catch (error) {
                    return res.status(500);
                }
            }
            else {
                //product not exist
                try {
                    const existProduct = {...userId.product};
                    const existDetails = {...userId.details};
                    const newDetails = {
                        title: product.title,
                        color: [color],
                        img: product.img[0],
                        quantity: 1,
                        price
                    };
                    existProduct[product.title] = [product];
                    existDetails[product.title] = newDetails;
                    await userModel.updateOne({ deviceId:user }, {
                        $set: {
                            product: existProduct,
                            details: existDetails
                        }
                    }).then(result => res.status(200).json({ status: 'success' }));
                } catch (error) {
                    return res.status(500);
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ status: "failed" })
    }
})

module.exports = router;
