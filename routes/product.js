const express = require('express');
const router = express.Router();

const {
    searchProducts,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsBySubcategory // Add this import
} = require('../controllers/productController');

// Define routes
router.get('/search', searchProducts);
router.post('/addproduct', createProduct);
router.get('/', getProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
