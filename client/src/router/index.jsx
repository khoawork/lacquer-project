import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import BaseLayout from '../layouts/base';
import AdminLayout from '../layouts/admin';

// Client Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Journey from '../pages/Journey';
import Events from '../pages/Events';
import Collection from '../pages/Collection';
import Archive from '../pages/Archive';
import Leadership from '../pages/Leadership';
import News from '../pages/News';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminOrders from '../pages/admin/Orders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'journey',
        element: <Journey />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'collection',
        element: <Collection />,
      },
      {
        path: 'products',
        element: <Collection />,
      },
      {
        path: 'archive',
        element: <Archive />,
      },
      {
        path: 'ky-yeu',
        element: <Archive />,
      },
      {
        path: 'leadership',
        element: <Leadership />,
      },
      {
        path: 'ban-dieu-hanh',
        element: <Leadership />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'tin-tuc',
        element: <News />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'lien-he',
        element: <Contact />,
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
