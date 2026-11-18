const eventService = require('../services/eventService');

class EventController {
  async getAll(req, res) {
    try {
      const events = await eventService.getAllEvents(req.query);
      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.json({ success: true, data: event });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json({ success: true, message: 'Tạo sự kiện thành công', data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật sự kiện thành công', data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.json({ success: true, message: 'Đã xóa sự kiện' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Categories
  async getCategories(req, res) {
    try {
      const categories = await eventService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await eventService.createCategory(req.body);
      res.status(201).json({ success: true, message: 'Thêm thể loại sự kiện thành công', data: category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await eventService.updateCategory(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật thể loại sự kiện thành công', data: category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      await eventService.deleteCategory(req.params.id);
      res.json({ success: true, message: 'Đã xóa thể loại sự kiện' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new EventController();
