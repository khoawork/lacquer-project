import { Apis, endpoints } from '../configs/Apis';

export const siteServices = {
  // Settings
  getSettings: async () => {
    return await Apis().get(endpoints.siteSettings);
  },

  updateSetting: async (key, value, description) => {
    return await Apis().post(endpoints.siteSettings, { key, value, description });
  },

  // Main Menu
  getMainMenu: async () => {
    return await Apis().get(endpoints.mainMenu);
  },

  saveMainMenu: async (items, name = 'Menu Chính Website') => {
    return await Apis().post(endpoints.mainMenu, { items, name });
  },

  // Forms (Contact, Nomination, Partnership)
  submitForm: async (formData) => {
    return await Apis().post(endpoints.forms, formData);
  },

  getSubmissions: async (params = {}) => {
    return await Apis().get(endpoints.forms, { params });
  },

  updateSubmissionStatus: async (id, status, admin_notes = '') => {
    return await Apis().put(`${endpoints.forms}/${id}/status`, { status, admin_notes });
  },
};

export default siteServices;

