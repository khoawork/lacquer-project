const { NewsCategory, NewsArticle } = require('../models/baseModel');

class NewsService {
  async _resolveCategoryId(data) {
    if (data.category_id !== undefined && data.category_id !== null && data.category_id !== '') {
      const numId = Number(data.category_id);
      if (!isNaN(numId) && numId > 0) return numId;
    }
    const catName = String(data.category || data.category_name || 'Dòng chảy 100 năm').trim();
    if (catName) {
      const [cat] = await NewsCategory.findOrCreate({
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
      title: data.title,
      category_id: categoryId,
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
    };
  }

  _formatArticle(art) {
    const json = typeof art.toJSON === 'function' ? art.toJSON() : art;
    const catName = json.categoryDetail?.name || 'Dòng chảy 100 năm';
    return {
      ...json,
      category_id: json.category_id || json.categoryDetail?.id || null,
      category_name: catName,
      category: catName, // Alias hiển thị nhãn trên thẻ bài viết
      image: json.thumbnail_url,
      cover_image: json.thumbnail_url,
    };
  }

  async getAllArticles(filters = {}) {
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
    if (filters.status) {
      where.status = filters.status;
    }

    const articles = await NewsArticle.findAll({
      where,
      include: [
        {
          model: NewsCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['published_date', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    return articles.map((art) => this._formatArticle(art));
  }

  async getArticleById(id) {
    const article = await NewsArticle.findByPk(id, {
      include: [
        {
          model: NewsCategory,
          as: 'categoryDetail',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    return this._formatArticle(article);
  }

  async createArticle(rawData) {
    if (!rawData.title) {
      throw new Error('Tiêu đề bài viết là bắt buộc');
    }

    const data = await this._normalizeData(rawData);
    const created = await NewsArticle.create(data);
    return await this.getArticleById(created.id);
  }

  async updateArticle(id, rawData) {
    const article = await NewsArticle.findByPk(id);
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    const data = await this._normalizeData(rawData);
    await article.update(data);
    return await this.getArticleById(article.id);
  }

  async deleteArticle(id) {
    const article = await NewsArticle.findByPk(id);
    if (!article) {
      throw new Error(`Không tìm thấy bài viết với ID: ${id}`);
    }
    await article.destroy();
    return true;
  }

  // ================= CATEGORY CRUD =================
  async getAllCategories() {
    const categories = await NewsCategory.findAll({
      order: [['id', 'ASC']],
    });
    return categories.map((c) => c.toJSON());
  }

  async createCategory(rawData) {
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại tin tức là bắt buộc');
    }
    const existing = await NewsCategory.findOne({ where: { name } });
    if (existing) {
      throw new Error(`Thể loại "${name}" đã tồn tại`);
    }
    const created = await NewsCategory.create({ name });
    return created.toJSON();
  }

  async updateCategory(id, rawData) {
    const cat = await NewsCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại tin tức với ID: ${id}`);
    }
    const name = String(rawData?.name || '').replace(/<[^>]*>?/gm, '').trim();
    if (!name) {
      throw new Error('Tên thể loại tin tức là bắt buộc');
    }
    await cat.update({ name });
    return cat.toJSON();
  }

  async deleteCategory(id) {
    const cat = await NewsCategory.findByPk(id);
    if (!cat) {
      throw new Error(`Không tìm thấy thể loại tin tức với ID: ${id}`);
    }
    await NewsArticle.update({ category_id: null }, { where: { category_id: id } });
    await cat.destroy();
    return true;
  }
}

module.exports = new NewsService();
