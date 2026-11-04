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

  updatePage: async (id, data) => {
    return await Apis().put(endpoints.pageById(id), data);
  },

  savePageBySlug: async (slug, data) => {
    return await Apis().post(endpoints.pageBySlug(slug), data);
  },

  deletePage: async (id) => {
    return await Apis().delete(endpoints.pageById(id));
  },
};

export default pageServices;

