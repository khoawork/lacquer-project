const { NewsArticle } = require('../models/baseModel');

class NewsService {
  _normalizeData(data) {
    return {
      title: data.title,
      category: data.category || 'Dòng chảy 100 năm',
      author: data.author || 'Ban Biên Tập',
      published_date: data.published_date ? new Date(data.published_date) : new Date(),
      thumbnail_url: data.thumbnail_url || data.image || data.cover_image || '',
      lead_quote: data.lead_quote || '',
      summary: data.summary || '',
      content: data.content || '',
      read_time: data.read_time || '5 phút đọc',
      tags: data.tags || '',
      status: data.status || 'published',
      is_featured: data.is_featured !== undefined ? Boolean(data.is_featured) : false,
      sort_order: data.sort_order || 0,
    };
  }

  async getAllArticles(filters = {}) {
    const where = {};
    if (filters.category && filters.category !== 'Tất cả') {
      where.category = filters.category;
    }
    if (filters.status) {
      where.status = filters.status;
    }

    const articles = await NewsArticle.findAll({
      where,
      order: [
        ['published_date', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    return articles.map((art) => {
      const json = art.toJSON();
      return {
        ...json,
        image: json.thumbnail_url, // Alias để tương thích frontend
        cover_image: json.thumbnail_url,
      };
    });
  }

  async getArticleById(id) {
    const article = await NewsArticle.findByPk(id);
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    const json = article.toJSON();
    return {
      ...json,
      image: json.thumbnail_url,
      cover_image: json.thumbnail_url,
    };
  }

  async createArticle(rawData) {
    if (!rawData.title) {
      throw new Error('Tiêu đề bài viết là bắt buộc');
    }

    const data = this._normalizeData(rawData);
    const created = await NewsArticle.create(data);
    const json = created.toJSON();
    return {
      ...json,
      image: json.thumbnail_url,
      cover_image: json.thumbnail_url,
    };
  }

  async updateArticle(id, rawData) {
    const article = await NewsArticle.findByPk(id);
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    const data = this._normalizeData(rawData);
    await article.update(data);
    const json = article.toJSON();
    return {
      ...json,
      image: json.thumbnail_url,
      cover_image: json.thumbnail_url,
    };
  }

  async deleteArticle(id) {
    const article = await NewsArticle.findByPk(id);
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    await article.destroy();
    return true;
  }
}

module.exports = new NewsService();
