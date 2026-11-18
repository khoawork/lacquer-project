const { CollectionCategory, Collection, Artwork } = require('../models/baseModel');

class CollectionService {
  async _resolveCategoryId(data) {
    if (data.category_id !== undefined && data.category_id !== null && data.category_id !== '') {
      const numId = Number(data.category_id);
      if (!isNaN(numId) && numId > 0) return numId;
    }
    const catName = String(
      data.category || data.category_name || data.period || 'Di sản Bách niên'
    ).trim();
    if (catName) {
      const [cat] = await CollectionCategory.findOrCreate({
        where: { name: catName },
        defaults: { name: catName },
      });
      return cat.id;
    }
    return null;
  }

  async _normalizeData(data) {
    const categoryId = await this._resolveCategoryId(data);
    return {
      name: (data.name || data.title || '').replace(/<[^>]*>?/gm, '').trim(),
      category_id: categoryId,
      code: (data.code || `COL-${Date.now().toString().slice(-4)}`).replace(/<[^>]*>?/gm, '').trim(),
      subtitle: (data.subtitle || '').replace(/<[^>]*>?/gm, '').trim(),
      description: (data.description || data.curator_statement || '').replace(/<[^>]*>?/gm, '').trim(),
      watermark_left: (data.watermark_left || '').replace(/<[^>]*>?/gm, '').trim(),
      watermark_right: (data.watermark_right || '').replace(/<[^>]*>?/gm, '').trim(),
      specs: (data.specs || '').replace(/<[^>]*>?/gm, '').trim(),
      cover_image: data.cover_image || data.thumbnail_url || data.image || '',
      sort_order: data.sort_order || 0,
      status: data.status || 'active',
    };
  }

  _formatCollection(col) {
    const json = typeof col.toJSON === 'function' ? col.toJSON() : col;
    const catName = json.categoryDetail?.name || 'Di sản Bách niên';
    return {
      ...json,
      category_id: json.category_id || json.categoryDetail?.id || null,
      category_name: catName,
      category: catName,
      title: json.name, // Alias cho frontend
      thumbnail_url: json.cover_image,
      image: json.cover_image,
    };
  }

  async getAllCollections(filters = {}) {
    const where = {};
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

    const collections = await Collection.findAll({
      where,
      include: [
        {
          model: Artwork,
          as: 'artworks',
        },
        {
          model: CollectionCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['sort_order', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    return collections.map((col) => this._formatCollection(col));
  }

  async getCollectionById(id) {
    const collection = await Collection.findByPk(id, {
      include: [
        {
          model: Artwork,
          as: 'artworks',
        },
        {
          model: CollectionCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    return this._formatCollection(collection);
  }

  async createCollection(rawData) {
    const data = await this._normalizeData(rawData);
    if (!data.name) {
      throw new Error('Tên bộ sưu tập là bắt buộc');
    }

    const created = await Collection.create(data);
    return await this.getCollectionById(created.id);
  }

  async updateCollection(id, rawData) {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    const data = await this._normalizeData(rawData);
    await collection.update(data);
    return await this.getCollectionById(collection.id);
  }

  async deleteCollection(id) {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    await collection.destroy();
    return true;
  }

  // ================= CATEGORY CRUD =================
  async getAllCategories() {
    const categories = await CollectionCategory.findAll({
      order: [['id', 'ASC']],
    });
    return categories.map((c) => c.toJSON());
  }

  async createCategory(rawData) {
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại bộ sưu tập là bắt buộc');
    }
    const existing = await CollectionCategory.findOne({ where: { name } });
    if (existing) {
      throw new Error(`Thể loại "${name}" đã tồn tại`);
    }
    const created = await CollectionCategory.create({ name });
    return created.toJSON();
  }

  async updateCategory(id, rawData) {
    const cat = await CollectionCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại bộ sưu tập với ID: ${id}`);
    }
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại bộ sưu tập là bắt buộc');
    }
    await cat.update({ name });
    return cat.toJSON();
  }

  async deleteCategory(id) {
    const cat = await CollectionCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại bộ sưu tập với ID: ${id}`);
    }
    await Collection.update({ category_id: null }, { where: { category_id: id } });
    await cat.destroy();
    return true;
  }

  // Artwork methods
  async getArtworkById(id) {
    const artwork = await Artwork.findByPk(id, {
      include: [{ model: Collection, as: 'collection' }],
    });
    if (!artwork) {
      throw new Error(`Không tìm thấy tác phẩm với ID: ${id}`);
    }
    return artwork;
  }

  async createArtwork(data) {
    if (!data.title) {
      throw new Error('Tên tác phẩm là bắt buộc');
    }
    return await Artwork.create(data);
  }

  async updateArtwork(id, data) {
    const artwork = await Artwork.findByPk(id);
    if (!artwork) {
      throw new Error(`Không tìm thấy tác phẩm với ID: ${id}`);
    }
    await artwork.update(data);
    return artwork;
  }

  async deleteArtwork(id) {
    const artwork = await Artwork.findByPk(id);
    if (!artwork) {
      throw new Error(`Không tìm thấy tác phẩm với ID: ${id}`);
    }
    await artwork.destroy();
    return true;
  }
}

module.exports = new CollectionService();
