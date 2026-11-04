const { Page } = require('../models/baseModel');
const { Op } = require('sequelize');

class PageService {
  /**
   * Helper chuẩn hóa điều kiện tìm kiếm theo slug
   */
  _buildSlugCondition(rawSlug) {
    const cleanSlug = String(rawSlug !== undefined && rawSlug !== null ? rawSlug : '').trim();
    const isHome = cleanSlug === '' || cleanSlug === '/' || cleanSlug.toLowerCase() === 'home' || cleanSlug.toLowerCase() === 'trang-chu';

    if (isHome) {
      return {
        [Op.or]: [
          { slug: '/' },
          { slug: '' },
          { slug: 'home' },
          { slug: '/home' },
          { id: 1 }
        ]
      };
    }

    const withSlash = cleanSlug.startsWith('/') ? cleanSlug : `/${cleanSlug}`;
    const withoutSlash = cleanSlug.startsWith('/') ? cleanSlug.substring(1) : cleanSlug;
    return {
      [Op.or]: [
        { slug: withSlash },
        { slug: withoutSlash }
      ]
    };
  }

  /**
   * Lấy danh sách tất cả các trang
   */
  async getAllPages() {
    return await Page.findAll({
      order: [['id', 'ASC']],
    });
  }

  /**
   * Lấy thông tin trang theo ID sử dụng findByPk
   */
  async getPageById(id) {
    const page = await Page.findByPk(id);
    if (!page) {
      throw new Error(`Không tìm thấy trang với ID: ${id}`);
    }
    return page;
  }

  /**
   * Lấy thông tin trang theo slug
   * Nếu chưa có thì tự động tạo trang mẫu với slug và name tương ứng
   */
  async getPageBySlug(slug) {
    if (slug === undefined || slug === null) {
      throw new Error('Đường dẫn (slug) của trang là bắt buộc');
    }

    const whereCondition = this._buildSlugCondition(slug);
    let page = await Page.findOne({ where: whereCondition });

    if (!page) {
      const defaultNames = {
        home: 'Trang chủ',
        '/': 'Trang chủ',
        about: 'Giới thiệu',
        '/about': 'Giới thiệu',
        journey: 'Hành trình',
        '/journey': 'Hành trình',
        events: 'Sự kiện',
        '/events': 'Sự kiện',
        collection: 'Bộ sưu tập',
        '/collection': 'Bộ sưu tập',
        'ky-yeu': 'Kỷ yếu',
        archive: 'Kỷ yếu',
        '/archive': 'Kỷ yếu',
        leadership: 'Ban điều hành',
        '/leadership': 'Ban điều hành',
        news: 'Tin tức',
        '/news': 'Tin tức',
        contact: 'Liên hệ',
        '/contact': 'Liên hệ',
      };

      const normalizedSlug = (slug === '' || slug === 'home') ? '/' : (slug.startsWith('/') ? slug : `/${slug}`);

      page = await Page.create({
        name: defaultNames[slug] || defaultNames[normalizedSlug] || `Trang ${slug}`,
        slug: normalizedSlug,
        props: {},
      });
    }

    return page;
  }

  /**
   * Tạo trang mới với id, name, slug, props
   */
  async createPage(data) {
    const { name, slug, props = {} } = data;
    if (!name || !slug) {
      throw new Error('Tên trang (name) và slug là bắt buộc');
    }

    const existing = await Page.findOne({ where: { slug } });
    if (existing) {
      throw new Error(`Trang với slug "${slug}" đã tồn tại`);
    }

    return await Page.create({
      name,
      slug,
      props,
    });
  }

  /**
   * Cập nhật thông tin trang theo ID dùng findByPk
   */
  async updatePage(id, data) {
    const page = await Page.findByPk(id);
    if (!page) {
      throw new Error(`Không tìm thấy trang với ID: ${id}`);
    }

    const { name, slug, props } = data;

    // Kiểm tra trùng slug nếu thay đổi slug
    if (slug && slug !== page.slug) {
      const existing = await Page.findOne({ where: { slug } });
      if (existing) {
        throw new Error(`Trang với slug "${slug}" đã tồn tại`);
      }
    }

    await page.update({
      name: name ?? page.name,
      slug: slug ?? page.slug,
      props: props !== undefined ? props : page.props,
    });

    return page;
  }

  /**
   * Lưu hoặc cập nhật nhanh props của trang qua slug
   */
  async savePageBySlug(slug, data) {
    const whereCondition = this._buildSlugCondition(slug);
    let page = await Page.findOne({ where: whereCondition });
    const { name, props } = data;

    if (page) {
      await page.update({
        name: name ?? page.name,
        props: props !== undefined ? props : page.props,
      });
    } else {
      const normalizedSlug = (slug === '' || slug === 'home') ? '/' : (slug.startsWith('/') ? slug : `/${slug}`);
      page = await Page.create({
        name: name || slug,
        slug: normalizedSlug,
        props: props || {},
      });
    }

    return page;
  }

  /**
   * Xóa trang theo ID
   */
  async deletePage(id) {
    const page = await Page.findByPk(id);
    if (!page) {
      throw new Error(`Không tìm thấy trang với ID: ${id}`);
    }
    await page.destroy();
    return true;
  }
}

module.exports = new PageService();
