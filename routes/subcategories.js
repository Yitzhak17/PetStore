
const express = require('express');
const router = express.Router();
const Subcategory = require('../models/subcategory');

router.get('/:category', async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ category: req.params.category });
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
