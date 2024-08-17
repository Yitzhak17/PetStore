const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/user/:userId', getCart); // נתיב חדש לקבלת עגלת קניות לפי מזהה המשתמש
router.post('/addproduct', addToCart);
router.delete('/deleteproduct/:id', removeFromCart);

module.exports = router;
