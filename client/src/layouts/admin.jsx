import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Calendar,
  Compass,
  Palette,
  BookOpen,
  Users,
  Newspaper,
  Mail,
  Database,
  History,
  Menu as MenuIcon,
  FileText,
  Sliders,
  ExternalLink,
  ChevronRight,
  Sparkles,
  LogOut,
  User,
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarGroups = [
    {
      groupTitle: 'TỔNG QUAN',
      items: [
        {
          name: 'Bảng điều khiển',
          path: '/admin',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      groupTitle: 'NỘI DUNG WEBSITE',
      items: [
        { name: 'Trang chủ', path: '/admin/pages/home', icon: Home },
        { name: 'Giới thiệu', path: '/admin/pages/about', icon: Info },
        { name: 'Hành trình', path: '/admin/pages/journey', icon: Compass },
        { name: 'Sự kiện', path: '/admin/pages/events', icon: Calendar },
        { name: 'Bộ sưu tập', path: '/admin/pages/collection', icon: Palette },
        { name: 'Kỷ yếu', path: '/admin/pages/archive', icon: BookOpen },
        { name: 'Ban điều hành', path: '/admin/pages/leadership', icon: Users },
        { name: 'Tin tức', path: '/admin/pages/news', icon: Newspaper },
        { name: 'Liên hệ', path: '/admin/pages/contact', icon: Mail },
      ],
    },
    {
      groupTitle: 'HỆ THỐNG',
      items: [
        { name: 'Danh mục dữ liệu', path: '/admin/system/categories', icon: Database },
        { name: 'Tài khoản & Phân quyền', path: '/admin/system/users', icon: Users },
        { name: 'Menu & Điều hướng', path: '/admin/system/menus', icon: MenuIcon },
        { name: 'Quản lý Biểu mẫu (Forms)', path: '/admin/system/forms', icon: FileText },
        { name: 'Logo & Footer', path: '/admin/system/settings', icon: Sliders },
      ],
    },
  ];

  const isActiveLink = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex bg-[#140305] text-[#FAF7F2] font-sans">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Admin - Tone Màu Đỏ Then Mận Chín (Bordeaux) Quý Phái theo ảnh mẫu */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 flex flex-col justify-between overflow-y-auto border-r border-[#D4AF37]/30 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, #48050b 0%, #3a0408 50%, #290306 100%)',
          boxShadow: '4px 0 25px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div className="py-6 px-4">
          {/* Brand Header */}
          <div className="px-2 mb-6 flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#180305] border border-[#D4AF37]/60 flex items-center justify-center text-[#FFDF73] shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                <Sparkles className="w-5 h-5 text-[#FFDF73]" />
              </div>
              <div>
                <h2 className="font-serif text-[17px] font-bold text-[#FFDF73] tracking-wider uppercase leading-tight">
                  SƠN MÀI CMS
                </h2>
                <p className="text-[11px] text-[#EADBCE]/75 tracking-wider uppercase">
                  Quản trị toàn diện 1930–2030
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-6">
            {sidebarGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase text-[#ffcfcf]/90 font-serif">
                  {group.groupTitle}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActiveLink(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded transition-all duration-200 text-[14px] font-medium select-none ${
                          active
                            ? 'bg-[#d49b1a] text-[#1a0406] font-bold shadow-[0_4px_16px_rgba(212,155,26,0.45)]'
                            : 'text-[#FAF7F2]/90 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon
                          className={`w-[18px] h-[18px] shrink-0 ${
                            active ? 'text-[#1a0406]' : 'text-[#FAF7F2]/80'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                        {active && <ChevronRight className="w-4 h-4 ml-auto text-[#1a0406]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Link */}
        <div className="p-4 border-t border-[#D4AF37]/25 bg-[#200204]/80">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider text-[#FFDF73] hover:bg-[#D4AF37]/15 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Xem Website Ngoài
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header
          className="h-16 border-b border-[#D4AF37]/25 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30"
          style={{
            background: 'rgba(26, 5, 8, 0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#3a080c] text-[#FFDF73] border border-[#D4AF37]/30"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm uppercase tracking-wider text-[#FFDF73] font-semibold hidden sm:inline">
                Hệ Thống Quản Lý Nội Dung Bách Niên
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#36080d] border border-[#D4AF37]/30">
              <div className="w-6 h-6 rounded-full bg-[#d49b1a] text-[#1a0406] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs font-serif font-bold text-[#FAF7F2] hidden sm:inline">
                Quản Trị Viên (Admin)
              </span>
            </div>
            <Link
              to="/login"
              className="p-2 rounded-lg text-[#FAF7F2]/60 hover:text-[#FFDF73] hover:bg-[#36080d] transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#180407] to-[#120204]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
