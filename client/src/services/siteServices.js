import { Apis, endpoints } from '../configs/Apis';

export const parseCategorySetting = (settings) => {
  if (!settings) return [];
  let raw = settings.event_categories;
  if (Array.isArray(settings)) {
    const found = settings.find(
      (s) => s.setting_key === 'event_categories' || s.key === 'event_categories'
    );
    raw = found?.setting_value ?? found?.value;
  }
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = null;
    }
  }
  return Array.isArray(raw) ? raw.filter((c) => typeof c === 'string' && c.trim()) : [];
};

export const siteServices = {
  // Settings
  getSettings: async () => {
    return await Apis().get(endpoints.siteSettings);
  },

  updateSetting: async (key, value, description) => {
    return await Apis().put(`${endpoints.siteSettings}/${encodeURIComponent(key)}`, { value, description });
  },

  // Main Menu
  getMainMenu: async () => {
    return await Apis().get(endpoints.mainMenu);
  },

  saveMainMenu: async (items, name = 'Menu Chính Website') => {
    return await Apis().post(endpoints.mainMenu, { name, items_json: items });
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

  deleteSubmission: async (id) => {
    return await Apis().delete(`${endpoints.forms}/${id}`);
  },
};

export default siteServices;

