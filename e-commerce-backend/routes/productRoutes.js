const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middlewares/auth');
const { admin } = require('../middlewares/auth');
const upload = require('../utils/upload');

// Public routes
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Admin routes
router.post('/', authenticate, admin, upload.single('image'), productController.createProduct);
router.put('/:id', authenticate, admin, upload.single('image'), productController.updateProduct);
router.delete('/:id', authenticate, admin, productController.deleteProduct);

module.exports = router;