import { Apis, endpoints } from '../configs/Apis';

export const pageServices = {
  getPages: async () => {
    return await Apis().get(endpoints.pages);
  },

  // Slug chỉ nằm trong page
  getPageBySlug: async (slug) => {
    return await Apis().get(endpoints.pageBySlug(slug));
  },

  getPageById: async (id) => {
    return await Apis().get(endpoints.pageById(id));
  },

  createPage: async (data) => {
    return await Apis().post(endpoints.pages, data);
  },

  updatePage: async (idOrSlug, data) => {
    // Nếu là ID số nguyên hợp lệ
    if (typeof idOrSlug === 'number' || (!isNaN(idOrSlug) && !String(idOrSlug).includes('/'))) {
      return await Apis().put(endpoints.pageById(idOrSlug), data);
    }
    // Nếu là chuỗi slug như '/events' hoặc 'events'
    return await Apis().post(endpoints.pageBySlug(idOrSlug), data);
  },

  savePageBySlug: async (slug, data) => {
    return await Apis().post(endpoints.pageBySlug(slug), data);
  },

  deletePage: async (id) => {
    return await Apis().delete(endpoints.pageById(id));
  },
};

export default pageServices;

