import axios from 'axios';
import Cookies from 'js-cookie';

export const endpoints = {
  // Auth API
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    logout: '/auth/logout',
  },

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
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SERVER_URL) {
    const serverUrl = import.meta.env.VITE_SERVER_URL.replace(/\/+$/, '');
    return `${serverUrl}/api`;
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
  const fallbackOrigin =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SERVER_URL
      ? import.meta.env.VITE_SERVER_URL
      : '';
  const serverOrigin = BASE_URL.startsWith('http')
    ? BASE_URL.replace(/\/api\/?$/, '')
    : fallbackOrigin;
  return `${serverOrigin}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const Apis = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });
};

export const authApis = (token) => {
  const authToken = token || Cookies.get('admin_token') || '';
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    timeout: 15000,
  });
};

export default Apis;
