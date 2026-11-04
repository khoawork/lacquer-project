const collectionService = require('../services/collectionService');

class CollectionController {
  async getAllCollections(req, res) {
    try {
      const collections = await collectionService.getAllCollections();
      res.json({ success: true, data: collections });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCollectionById(req, res) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id);
      res.json({ success: true, data: collection });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createCollection(req, res) {
    try {
      const collection = await collectionService.createCollection(req.body);
      res.status(201).json({ success: true, message: 'Tạo bộ sưu tập thành công', data: collection });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateCollection(req, res) {
    try {
      const collection = await collectionService.updateCollection(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật bộ sưu tập thành công', data: collection });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteCollection(req, res) {
    try {
      await collectionService.deleteCollection(req.params.id);
      res.json({ success: true, message: 'Đã xóa bộ sưu tập' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Artwork
  async getArtworkById(req, res) {
    try {
      const artwork = await collectionService.getArtworkById(req.params.id);
      res.json({ success: true, data: artwork });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createArtwork(req, res) {
    try {
      const artwork = await collectionService.createArtwork(req.body);
      res.status(201).json({ success: true, message: 'Thêm tác phẩm thành công', data: artwork });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateArtwork(req, res) {
    try {
      const artwork = await collectionService.updateArtwork(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật tác phẩm thành công', data: artwork });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteArtwork(req, res) {
    try {
      await collectionService.deleteArtwork(req.params.id);
      res.json({ success: true, message: 'Đã xóa tác phẩm' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new CollectionController();

