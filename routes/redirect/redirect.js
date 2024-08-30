const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../../schema/schema');

router.get('/', async (req, res) => {
    const {item} = req.params;
    if (!item) return res.status(404);

    await productModel.findOne({ title: item })
    .then(result => {
        if (!result) return res.status(400).json({ message: 'not found' });

        const category = result.category;
        // return res.redirect(`https://boxdelabonita.com/bag/${category}/${item}`);
        return res.send(`${category}/${item}`);
    }).catch(err => res.status(400).json({ message: 'not found' }))
})

module.exports = router;
