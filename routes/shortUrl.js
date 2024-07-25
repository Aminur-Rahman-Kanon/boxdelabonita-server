const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    const itemId = req.params.itemId
    //if no product id found we redirect to 404 page
    if (!itemId) return res.redirect('https://boxdelabonita.com/default_route')
    
    //otherwise we map to proper url
})

module.exports = router;
