import axios from 'axios';

export const endpoints = {
  // Pages API (slug chỉ nằm trong page)
  pages: '/pages',
  pageBySlug: (slug) => {
    const target = slug === undefined || slug === null ? '/' : slug;
    return `/pages?slug=${encodeURIComponent(target)}`;
  },
  pageById: (id) => `/pages/${id}`,

  // Events API
  events: '/events',
  eventDetail: (id) => `/events/${id}`,

  // Collections & Artworks API
  collections: '/collections',
  collectionDetail: (id) => `/collections/${id}`,
  artworkDetail: (id) => `/collections/artworks/${id}`,

  // News Articles API
  news: '/news',
  newsDetail: (id) => `/news/${id}`,

  // Site Settings & Menus & Forms API
  siteSettings: '/site/settings',
  mainMenu: '/site/menus/main',
  forms: '/site/forms',

  // Upload API
  upload: '/upload',
};

const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return '/api';
};

export const BASE_URL = getBaseUrl();

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const serverOrigin = BASE_URL.replace(/\/api\/?$/, '');
  return `${serverOrigin}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const Apis = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
};

export const authApis = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
};

export default Apis;
