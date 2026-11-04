const pageService = require('../services/pageService');

class PageController {
  async getAllPages(req, res) {
    try {
      if (req.query.slug !== undefined) {
        const page = await pageService.getPageBySlug(req.query.slug);
        return res.json({ success: true, data: page });
      }
      const pages = await pageService.getAllPages();
      res.json({ success: true, data: pages });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPageBySlug(req, res) {
    try {
      const slug = req.params.slug || req.query.slug || '/';
      const page = await pageService.getPageBySlug(slug);
      res.json({ success: true, data: page });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getPageById(req, res) {
    try {
      const { id } = req.params;
      const page = await pageService.getPageById(id);
      res.json({ success: true, data: page });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createPage(req, res) {
    try {
      if (req.query.slug !== undefined) {
        const page = await pageService.savePageBySlug(req.query.slug, req.body);
        return res.json({ success: true, message: 'Lưu cấu hình trang thành công', data: page });
      }
      const page = await pageService.createPage(req.body);
      res.status(201).json({ success: true, message: 'Tạo trang thành công', data: page });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updatePage(req, res) {
    try {
      const { id } = req.params;
      const page = await pageService.updatePage(id, req.body);
      res.json({ success: true, message: 'Cập nhật trang thành công', data: page });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async savePageBySlug(req, res) {
    try {
      const slug = req.params.slug || req.query.slug || req.body.slug || '/';
      const page = await pageService.savePageBySlug(slug, req.body);
      res.json({ success: true, message: 'Lưu cấu hình trang thành công', data: page });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deletePage(req, res) {
    try {
      const { id } = req.params;
      await pageService.deletePage(id);
      res.json({ success: true, message: 'Đã xóa trang' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PageController();
