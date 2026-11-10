const { Collection, Artwork } = require('../models/baseModel');

class CollectionService {
  _normalizeData(data) {
    return {
      name: (data.name || data.title ).replace(/<[^>]*>?/gm, '').trim(),
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

  async getAllCollections() {
    const collections = await Collection.findAll({
      include: [
        {
          model: Artwork,
          as: 'artworks',
        },
      ],
      order: [
        ['sort_order', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    return collections.map((col) => {
      const json = col.toJSON();
      return {
        ...json,
        title: json.name, // Alias cho frontend
        thumbnail_url: json.cover_image,
        image: json.cover_image,
      };
    });
  }

  async getCollectionById(id) {
    const collection = await Collection.findByPk(id, {
      include: [
        {
          model: Artwork,
          as: 'artworks',
        },
      ],
    });
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    const json = collection.toJSON();
    return {
      ...json,
      title: json.name,
      thumbnail_url: json.cover_image,
      image: json.cover_image,
    };
  }

  async createCollection(rawData) {
    const data = this._normalizeData(rawData);
    if (!data.name) {
      throw new Error('Tên bộ sưu tập là bắt buộc');
    }

    const created = await Collection.create(data);
    const json = created.toJSON();
    return {
      ...json,
      title: json.name,
      thumbnail_url: json.cover_image,
      image: json.cover_image,
    };
  }

  async updateCollection(id, rawData) {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    const data = this._normalizeData(rawData);
    await collection.update(data);
    const json = collection.toJSON();
    return {
      ...json,
      title: json.name,
      thumbnail_url: json.cover_image,
      image: json.cover_image,
    };
  }

  async deleteCollection(id) {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      throw new Error(`Không tìm thấy bộ sưu tập với ID: ${id}`);
    }
    await collection.destroy();
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
