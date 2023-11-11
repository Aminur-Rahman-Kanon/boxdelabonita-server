const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');
const pool = require('../db/db_init');

router.get('/', async (req, res) => {
    const params = req.params;

    try {
        await pool.query(`SELECT * FROM product WHERE title = '${params.product}'`, (err, result) => {
            if (err) return res.status(400).json({ status: 'failed' });
            return res.status(200).json({ status: 'success', data: result.rows });
        })
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
})

module.exports = router;
