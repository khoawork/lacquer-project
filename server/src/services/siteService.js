const { SiteSetting, Menu, FormSubmission } = require('../models/baseModel');

class SiteService {
  // Settings
  async getAllSettings() {
    const list = await SiteSetting.findAll();
    const map = {};
    for (const item of list) {
      map[item.setting_key] = item.setting_value;
    }
    return map;
  }

  async getSetting(key) {
    const item = await SiteSetting.findOne({ where: { setting_key: key } });
    return item ? item.setting_value : null;
  }

  async updateSetting(key, value, description = '') {
    let item = await SiteSetting.findOne({ where: { setting_key: key } });
    if (item) {
      await item.update({ setting_value: value, description: description || item.description });
    } else {
      item = await SiteSetting.create({ setting_key: key, setting_value: value, description });
    }
    return item;
  }

  // Menus
  async getAllMenus() {
    return await Menu.findAll();
  }

  async getMenuByKey(menuKey) {
    const menu = await Menu.findOne({ where: { menu_key: menuKey } });
    return menu;
  }

  async saveMenu(menuKey, name, itemsJson) {
    let menu = await Menu.findOne({ where: { menu_key: menuKey } });
    if (menu) {
      await menu.update({ name, items_json: itemsJson });
    } else {
      menu = await Menu.create({ menu_key: menuKey, name, items_json: itemsJson });
    }
    return menu;
  }

  // Form Submissions
  async getAllSubmissions(filters = {}) {
    const where = {};
    if (filters.form_type) where.form_type = filters.form_type;
    if (filters.status) where.status = filters.status;

    return await FormSubmission.findAll({
      where,
      order: [['id', 'DESC']],
    });
  }

  async getSubmissionById(id) {
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
      throw new Error(`Không tìm thấy biểu mẫu gửi với ID: ${id}`);
    }
    return submission;
  }

  async createSubmission(data) {
    if (!data.full_name || !data.email) {
      throw new Error('Họ tên và email là bắt buộc');
    }
    const reference_code =
      data.reference_code || `#SMVN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return await FormSubmission.create({
      ...data,
      reference_code,
    });
  }

  async updateSubmissionStatus(id, status, admin_notes = null) {
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
      throw new Error(`Không tìm thấy biểu mẫu với ID: ${id}`);
    }
    await submission.update({
      status,
      admin_notes: admin_notes !== null ? admin_notes : submission.admin_notes,
    });
    return submission;
  }

  async deleteSubmission(id) {
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
      throw new Error(`Không tìm thấy biểu mẫu với ID: ${id}`);
    }
    await submission.destroy();
    return true;
  }
}

module.exports = new SiteService();

