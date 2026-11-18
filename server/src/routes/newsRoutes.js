const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Categories (đặt trước /:id)
router.get('/categories', newsController.getCategories);
router.post('/categories', newsController.createCategory);
router.put('/categories/:id', newsController.updateCategory);
router.delete('/categories/:id', newsController.deleteCategory);

// News Articles
router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/', newsController.create);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);

module.exports = router;
