const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Router: Định nghĩa đường dẫn GET /api/products
router.get('/', productController.getProducts);

module.exports = router;

