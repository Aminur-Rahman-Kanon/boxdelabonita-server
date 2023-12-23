const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { item, price } = req.body;
    const user = req.ip;

    if(!user && !item && !price) return res.status(400).json({ status: 'failed' })

    try {
        const userItem = await userModel.findOne({ deviceId: user }).then(result => {
            if (result === null){
                return {};
            }
            else {
                return result;
            }
        });
        
        if (Object.keys(userItem.product).length && Object.keys(userItem.details).length){            
            const product = {...userItem.product};
            const details = {...userItem.details};
            if (product[item].length > 1 && details[item].color.length > 1){
                //delete one item
                product[item].pop();
                details[item].color.pop();
                details[item].price = details[item].price - price;

                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: product,
                        details: details
                    }
                }).then(result => res.status(200).json({ status: 'success' }))
                .catch(err => res.status(400).json({ status: 'failed' }))
            }
            else {
                //delete entire collection
                delete product[item];
                delete details[item];
                await userModel.updateOne({ deviceId: user }, {
                    $set: {
                        product: product,
                        details: details
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
