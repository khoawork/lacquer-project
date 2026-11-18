const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Categories (đặt trước /:id)
router.get('/categories', eventController.getCategories);
router.post('/categories', eventController.createCategory);
router.put('/categories/:id', eventController.updateCategory);
router.delete('/categories/:id', eventController.deleteCategory);

// Events
router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.delete);

module.exports = router;
