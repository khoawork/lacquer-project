const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Collections
router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

// Artworks
router.get('/artworks/:id', collectionController.getArtworkById);
router.post('/artworks', collectionController.createArtwork);
router.put('/artworks/:id', collectionController.updateArtwork);
router.delete('/artworks/:id', collectionController.deleteArtwork);

module.exports = router;

