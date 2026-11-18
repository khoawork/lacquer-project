const { EventCategory, Event } = require('../models/baseModel');

class EventService {
  _cleanPlainTextContent(raw) {
    if (!raw) return '';
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.breakdown_list)) {
          return parsed.breakdown_list
            .map((i) => (i.bold ? `${i.bold} ${i.text || ''}`.trim() : (i.text || '')))
            .filter(Boolean)
            .join('\n');
        }
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => {
              if (typeof item === 'string') return item.trim();
              const bold = item.bold ? item.bold.trim() + ' ' : '';
              const txt = item.text || item.desc || '';
              return (bold + txt).trim();
            })
            .filter(Boolean)
            .join('\n');
        }
      } catch {}
      return raw.replace(/<[^>]*>?/gm, '').trim();
    }
    return '';
  }

  async _resolveCategoryId(data) {
    if (data.category_id !== undefined && data.category_id !== null && data.category_id !== '') {
      const numId = Number(data.category_id);
      if (!isNaN(numId) && numId > 0) return numId;
    }
    const catName = String(
      data.category || data.event_type || data.category_name || 'Tọa đàm chuyên sâu'
    ).trim();
    if (catName) {
      const [cat] = await EventCategory.findOrCreate({
        where: { name: catName },
        defaults: { name: catName },
      });
      return cat.id;
    }
    return null;
  }

  async _normalizeData(data) {
    const rawStatus = String(data.status || 'upcoming').toLowerCase();
    let status = 'upcoming';
    if (rawStatus.includes('ongoing') || rawStatus.includes('đang')) status = 'ongoing';
    else if (rawStatus.includes('completed') || rawStatus.includes('kết thúc') || rawStatus.includes('đã diễn ra'))
      status = 'completed';
    else if (rawStatus.includes('cancel')) status = 'cancelled';

    let eventDate = data.event_date;
    if (!eventDate && data.date_display) {
      const parsed = Date.parse(data.date_display);
      if (!isNaN(parsed)) eventDate = new Date(parsed);
    }
    if (!eventDate) eventDate = new Date();

    const categoryId = await this._resolveCategoryId(data);

    return {
      name: data.name || data.title || 'Sự kiện chưa đặt tên',
      category_id: categoryId,
      event_date: eventDate,
      location: (data.location || '').replace(/<[^>]*>?/gm, '').trim(),
      thumbnail_url: data.thumbnail_url || data.cover_image || data.image || '',
      description: (data.description || data.subtitle || '').replace(/<[^>]*>?/gm, '').trim(),
      content: this._cleanPlainTextContent(data.content),
      status: status,
      is_featured: data.is_featured !== undefined ? Boolean(data.is_featured) : false,
      sort_order: data.sort_order || 0,
    };
  }

  _formatEvent(evt) {
    const json = typeof evt.toJSON === 'function' ? evt.toJSON() : evt;
    const catName = json.categoryDetail?.name || 'Tọa đàm chuyên sâu';
    return {
      ...json,
      category_id: json.category_id || json.categoryDetail?.id || null,
      category_name: catName,
      category: catName,
      title: json.name,
      cover_image: json.thumbnail_url,
      image: json.thumbnail_url,
      content: this._cleanPlainTextContent(json.content),
    };
  }

  async getAllEvents(filters = {}) {
    const where = {};
    if (filters.status) {
      where.status = filters.status;
    }
    if (
      filters.category_id !== undefined &&
      filters.category_id !== null &&
      filters.category_id !== '' &&
      filters.category_id !== 'all' &&
      filters.category_id !== 'Tất cả'
    ) {
      const numId = Number(filters.category_id);
      if (!isNaN(numId) && numId > 0) {
        where.category_id = numId;
      }
    }

    const events = await Event.findAll({
      where,
      include: [
        {
          model: EventCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['sort_order', 'ASC'],
        ['event_date', 'DESC'],
      ],
    });

    return events.map((evt) => this._formatEvent(evt));
  }

  async getEventById(id) {
    const event = await Event.findByPk(id, {
      include: [
        {
          model: EventCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }
    return this._formatEvent(event);
  }

  async createEvent(rawData) {
    const data = await this._normalizeData(rawData);
    if (!data.name) {
      throw new Error('Tên sự kiện là bắt buộc');
    }

    const created = await Event.create(data);
    return await this.getEventById(created.id);
  }

  async updateEvent(id, rawData) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }

    const data = await this._normalizeData(rawData);
    await event.update(data);
    return await this.getEventById(event.id);
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Không tìm thấy sự kiện với ID: ${id}`);
    }
    await event.destroy();
    return true;
  }

  // ================= CATEGORY CRUD =================
  async getAllCategories() {
    const categories = await EventCategory.findAll({
      order: [['id', 'ASC']],
    });
    return categories.map((c) => c.toJSON());
  }

  async createCategory(rawData) {
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại sự kiện là bắt buộc');
    }
    const existing = await EventCategory.findOne({ where: { name } });
    if (existing) {
      throw new Error(`Thể loại "${name}" đã tồn tại`);
    }
    const created = await EventCategory.create({ name });
    return created.toJSON();
  }

  async updateCategory(id, rawData) {
    const cat = await EventCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại sự kiện với ID: ${id}`);
    }
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại sự kiện là bắt buộc');
    }
    await cat.update({ name });
    return cat.toJSON();
  }

  async deleteCategory(id) {
    const cat = await EventCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại sự kiện với ID: ${id}`);
    }
    await Event.update({ category_id: null }, { where: { category_id: id } });
    await cat.destroy();
    return true;
  }
}

module.exports = new EventService();
