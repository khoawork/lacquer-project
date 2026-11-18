import { Apis, endpoints } from '../configs/Apis';

export const newsServices = {
  getNews: async (params = {}) => {
    return await Apis().get(endpoints.news, { params });
  },

  getNewsById: async (id) => {
    return await Apis().get(endpoints.newsDetail(id));
  },

  createNews: async (newsData) => {
    return await Apis().post(endpoints.news, newsData);
  },

  updateNews: async (id, newsData) => {
    return await Apis().put(endpoints.newsDetail(id), newsData);
  },

  deleteNews: async (id) => {
    return await Apis().delete(endpoints.newsDetail(id));
  },

  // Categories
  getCategories: async () => {
    return await Apis().get(endpoints.newsCategories);
  },

  createCategory: async (data) => {
    return await Apis().post(endpoints.newsCategories, data);
  },

  updateCategory: async (id, data) => {
    return await Apis().put(endpoints.newsCategoryDetail(id), data);
  },

  deleteCategory: async (id) => {
    return await Apis().delete(endpoints.newsCategoryDetail(id));
  },
};

export default newsServices;
