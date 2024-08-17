const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createDefaultUsers, getAllUsers, logoutUser, getUser, addToCart, getCartItems, removeFromCart, updateCart } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/user/:id', getUser)
router.post('/logout', logoutUser);
router.post('/addproduct', addToCart);
router.get('/cart/:userId', getCartItems); // קבלת פרטי המוצרים בעגלת הקניות
router.delete('/user/:userId/product/:productId', removeFromCart); // הוספת נתיב חדש למחיקת מוצר
router.put('/cart/:userId', updateCart)

router.post('/verify', (req, res, next) => {
  // לדוגמה, ניתן להוסיף כאן מנגנון אימות
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer your-secret-key') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}, createDefaultUsers);


router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// נתיב המוגן לאדמין בלבד
router.get('/admin-route', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin access granted', user: req.user });
});


module.exports = router;
module.exports = router;