const express = require('express');
const router = express.Router();
const { userModel } = require('../schema/schema')

router.get('/', async (req, res) => {
    try {
        const userInfo = req.ip;
        const user = await userModel.findOne({ deviceId: userInfo }).then(data => data)

        if (user){
            return res.status(200).json({ deviceId: user.deviceId })
        }
        else {
            await userModel.create({ deviceId: userInfo })
            .then(result => res.status(200).json({ deviceId: userInfo }))
            .catch(err => res.status(403).json({ status: 'something went wrong' }));
        }

    } catch (error) {
        console.log(error);
        return res.status(400);
    }
})

module.exports = router;
