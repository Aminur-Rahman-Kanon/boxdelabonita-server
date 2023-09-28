const express = require('express');
const router = express.Router();
const hotdealsModel = require('../schema/schema').hotDealsModel;

router.get('/', async (req, res) => {
    await hotdealsModel.find({}).lean().then(result => res.status(200).send(result)).catch(err => res.status(401));
})

module.exports = router;