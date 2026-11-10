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
}

module.exports = new EventController();

