const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Categories (đặt trước /:id)
router.get('/categories', collectionController.getCategories);
router.post('/categories', collectionController.createCategory);
router.put('/categories/:id', collectionController.updateCategory);
router.delete('/categories/:id', collectionController.deleteCategory);

// Artworks (đặt trước /:id)
router.get('/artworks/:id', collectionController.getArtworkById);
router.post('/artworks', collectionController.createArtwork);
router.put('/artworks/:id', collectionController.updateArtwork);
router.delete('/artworks/:id', collectionController.deleteArtwork);

// Collections
router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;
