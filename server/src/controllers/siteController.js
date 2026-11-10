const siteService = require('../services/siteService');

class SiteController {
  // Settings
  async getSettings(req, res) {
    try {
      const settings = await siteService.getAllSettings();
      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateSetting(req, res) {
    try {
      const { key } = req.params;
      const { value, description } = req.body;
      const setting = await siteService.updateSetting(key, value, description);
      res.json({ success: true, message: 'Lưu cài đặt thành công', data: setting });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Menus
  async getMenus(req, res) {
    try {
      const menus = await siteService.getAllMenus();
      res.json({ success: true, data: menus });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMenuByKey(req, res) {
    try {
      const { menuKey } = req.params;
      const menu = await siteService.getMenuByKey(menuKey);
      if (!menu) {
        return res.status(404).json({ success: false, message: 'Menu không tồn tại' });
      }
      res.json({ success: true, data: menu });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async saveMenu(req, res) {
    try {
      const { menuKey } = req.params;
      const { name, items_json } = req.body;
      const menu = await siteService.saveMenu(menuKey, name, items_json);
      res.json({ success: true, message: 'Lưu menu thành công', data: menu });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Form Submissions
  async getSubmissions(req, res) {
    try {
      const list = await siteService.getAllSubmissions(req.query);
      res.json({ success: true, data: list });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getSubmissionById(req, res) {
    try {
      const sub = await siteService.getSubmissionById(req.params.id);
      res.json({ success: true, data: sub });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createSubmission(req, res) {
    try {
      const sub = await siteService.createSubmission(req.body);
      res.status(201).json({
        success: true,
        message: 'Gửi biểu mẫu thành công',
        data: sub,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateSubmissionStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, admin_notes } = req.body;
      const sub = await siteService.updateSubmissionStatus(id, status, admin_notes);
      res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: sub });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteSubmission(req, res) {
    try {
      await siteService.deleteSubmission(req.params.id);
      res.json({ success: true, message: 'Đã xóa biểu mẫu' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new SiteController();

