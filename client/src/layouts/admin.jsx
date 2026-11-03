import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Tổng quan (Dashboard)', path: '/admin' },
    { name: 'Quản lý Sản phẩm', path: '/admin/products' },
    { name: 'Quản lý Đơn hàng', path: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-stone-900 text-stone-200 flex flex-col justify-between p-5 border-r border-stone-800">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold font-serif text-amber-400">Lacquer Admin</h2>
            <p className="text-xs text-stone-400">Trang quản trị hệ thống</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-stone-800">
          <Link
            to="/"
            className="block text-sm text-stone-400 hover:text-amber-300 transition-colors"
          >
            ← Quay lại Cửa hàng
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-stone-800">Bảng điều khiển quản trị</h1>
          <div className="text-sm text-stone-500">Xin chào, Admin</div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Outlet hiển thị các trang con của admin */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
