const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    try {
        const userInfo = req.ip;
        await userModel.findOne({ id:userInfo })
        .then(async data => {
            if (data.id){
                return res.status(200).json({user: userInfo});
            }
            else {
                await userModel.create({ id: userInfo })
                .then(result => res.status(200).json({ user: userInfo }))
                .catch(err => res.status(403).json({ status: 'something went wrong' }));
            }
        })
        .catch(err => res.status(401))
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
})

module.exports = router;
