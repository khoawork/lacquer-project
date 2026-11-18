const newsService = require('../services/newsService');

class NewsController {
  async getAll(req, res) {
    try {
      const articles = await newsService.getAllArticles(req.query);
      res.json({ success: true, data: articles });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const article = await newsService.getArticleById(req.params.id);
      res.json({ success: true, data: article });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const article = await newsService.createArticle(req.body);
      res.status(201).json({ success: true, message: 'Tạo bài viết thành công', data: article });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const article = await newsService.updateArticle(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật bài viết thành công', data: article });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await newsService.deleteArticle(req.params.id);
      res.json({ success: true, message: 'Đã xóa bài viết' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Categories
  async getCategories(req, res) {
    try {
      const categories = await newsService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await newsService.createCategory(req.body);
      res.status(201).json({ success: true, message: 'Thêm thể loại tin tức thành công', data: category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await newsService.updateCategory(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật thể loại tin tức thành công', data: category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      await newsService.deleteCategory(req.params.id);
      res.json({ success: true, message: 'Đã xóa thể loại tin tức' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new NewsController();
