const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    try {
        const userInfo = req.ip;
        const user = await userModel.findOne({ deviceId: userInfo }).lean().then(data => {
            if (data !== null){
                return data;
            }
            else {
                return {};
            }
        });

        if (Object.keys(user).length){
            return res.status(200).json({ deviceId: user.deviceId })
        }
        else {
            const time = new Date().toDateString();
            await userModel.create({ deviceId: userInfo, time })
            .then(result => res.status(200).json({ deviceId: userInfo }))
            .catch(err => res.status(403).json({ status: 'something went wrong' }));
        }

    } catch (error) {
        console.log(error);
        return res.status(400);
    }
})

module.exports = router;
