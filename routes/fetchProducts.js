const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db/db_init');

router.get('/', async (req, res) => {
    const params = req.params;

    switch(params.type) {
        case 'all-bags':
            await pool.query('SELECT * FROM product;', (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows })
            })
            break;

        case 'new-arrivals':
            await pool.query(`SELECT * FROM product WHERE subcategory = 'new arrivals'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'popular-products':
            await pool.query(`SELECT * FROM product WHERE subcategory = 'popular products'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'hot-deals':
            await pool.query(`SELECT * FROM product WHERE subcategory = 'hot deals'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'trending':
            await pool.query(`SELECT * FROM product WHERE subcategory = 'trending products'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'bucket bag':
            await pool.query(`SELECT * FROM product WHERE category = 'bucket bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'backpack':
            await pool.query(`SELECT * FROM product WHERE category = 'backpack'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'clutch bag':
            await pool.query(`SELECT * FROM product WHERE category = 'clutch bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'crossbody bag':
            await pool.query(`SELECT * FROM product WHERE category = 'crossbody bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'designer bag':
            await pool.query(`SELECT * FROM product WHERE category = 'designer bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'saddle bag':
            await pool.query(`SELECT * FROM product WHERE category = 'saddle bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'shoulder bag':
            await pool.query(`SELECT * FROM product WHERE category = 'shoulder bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'straw bag':
            await pool.query(`SELECT * FROM product WHERE category = 'straw bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        case 'belt & sling bag':
            await pool.query(`SELECT * FROM product WHERE category = 'belt bag & sling bag'`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
            break;

        default:
            return res.status(400).json({ status: 'invalid request' });
    }
})

module.exports = router;
