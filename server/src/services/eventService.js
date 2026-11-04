const { Event } = require('../models/baseModel');

class EventService {
  _normalizeData(data) {
    const rawStatus = String(data.status || 'upcoming').toLowerCase();
    let status = 'upcoming';
    if (rawStatus.includes('ongoing') || rawStatus.includes('đang')) status = 'ongoing';
    else if (rawStatus.includes('completed') || rawStatus.includes('kết thúc')) status = 'completed';
    else if (rawStatus.includes('cancel')) status = 'cancelled';

    let eventDate = data.event_date;
    if (!eventDate && data.date_display) {
      const parsed = Date.parse(data.date_display);
      if (!isNaN(parsed)) eventDate = new Date(parsed);
    }
    if (!eventDate) eventDate = new Date();

    return {
      name: data.name || data.title || 'Sự kiện chưa đặt tên',
      category: data.category || data.event_type || 'Tọa đàm',
      event_date: eventDate,
      location: data.location || '',
      thumbnail_url: data.thumbnail_url || data.cover_image || data.image || '',
      description: data.description || data.subtitle || '',
      content: data.content || '',
      status: status,
      is_featured: data.is_featured !== undefined ? Boolean(data.is_featured) : false,
      sort_order: data.sort_order || 0,
    };
  }

  async getAllEvents(filters = {}) {
    const where = {};
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.category) {
      where.category = filters.category;
    }

    const events = await Event.findAll({
      where,
      order: [
        ['sort_order', 'ASC'],
        ['event_date', 'DESC'],
      ],
    });

    return events.map((evt) => {
      const json = evt.toJSON();
      return {
        ...json,
        title: json.name,
        cover_image: json.thumbnail_url,
        image: json.thumbnail_url,
      };
    });
  }

  async getEventById(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }
    const json = event.toJSON();
    return {
      ...json,
      title: json.name,
      cover_image: json.thumbnail_url,
      image: json.thumbnail_url,
    };
  }

  async createEvent(rawData) {
    const data = this._normalizeData(rawData);
    if (!data.name) {
      throw new Error('Tên sự kiện là bắt buộc');
    }

    const created = await Event.create(data);
    const json = created.toJSON();
    return {
      ...json,
      title: json.name,
      cover_image: json.thumbnail_url,
      image: json.thumbnail_url,
    };
  }

  async updateEvent(id, rawData) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }

    const data = this._normalizeData(rawData);
    await event.update(data);
    const json = event.toJSON();
    return {
      ...json,
      title: json.name,
      cover_image: json.thumbnail_url,
      image: json.thumbnail_url,
    };
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }
    await event.destroy();
    return true;
  }
}

module.exports = new EventService();
