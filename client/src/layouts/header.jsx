import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import siteServices from '../services/siteServices';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LOGO_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRIW42qxKqqO8mE8JBoRSPJw3dMADLcoV4pAVEUfHycZibaoqtZV1AUf1mJilGhMmjBGbcD73MJB2WdRtCa9h1FcmnPFm76WT1z3DRpoQr0M598MUhsR8BknD2KLsg8wJRh5uyP0WO63s97mInG9wSUzszrjWNr_ZVj2QJExjYeykmXsAZL6Cngd7iEQeTDcXfu4oxzwVf6uJHxcWPVHAPn8JG814YEu9ZrGFyp2mny4_5TjVV_GdWWAqNCgj-mENrpz0';

  const DEFAULT_NAV_LINKS = [
    { name: 'Trang chủ', path: '/', slug: '/', is_visible: true },
    { name: 'Giới thiệu', path: '/about', slug: '/about', is_visible: true },
    { name: 'Hành trình', path: '/journey', slug: '/journey', is_visible: true },
    { name: 'Sự kiện', path: '/events', slug: '/events', is_visible: true },
    { name: 'Bộ sưu tập', path: '/collection', slug: '/collection', is_visible: true },
    { name: 'Kỷ yếu', path: '/archive', slug: '/archive', is_visible: true },
    { name: 'Ban điều hành', path: '/leadership', slug: '/leadership', is_visible: true },
    { name: 'Tin tức', path: '/news', slug: '/news', is_visible: true },
    { name: 'Liên hệ', path: '/contact', slug: '/contact', is_visible: true },
  ];

  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);

  // Chuẩn hóa path để so sánh chính xác trang hiện tại
  const normalizePath = (path) => {
    if (!path) return '/';
    const trimmed = String(path).trim();
    if (trimmed === '' || trimmed === '/' || trimmed.toLowerCase() === '/home') return '/';
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  };

  // Đồng bộ cấu hình menu từ Admin (thứ tự, ẩn/hiện, tên và slug)
  useEffect(() => {
    const applyMenuList = (parsedList) => {
      const merged = parsedList
        .filter((item) => item.is_visible !== false)
        .map((item) => {
          let itemSlug = (item.slug || item.path || '').trim();
          if (!itemSlug.startsWith('/') && itemSlug !== '') {
            itemSlug = `/${itemSlug}`;
          }
          if (itemSlug === '/home') itemSlug = '/';
          return {
            name: item.name,
            path: itemSlug || '/',
            slug: itemSlug || '/',
          };
        });

      setNavLinks(merged);
    };

    const loadMenuConfig = async () => {
      // 1. Check backend API first
      try {
        const res = await siteServices.getMainMenu();
        if (res.data && res.data.success && res.data.data && res.data.data.items_json) {
          const items =
            typeof res.data.data.items_json === 'string'
              ? JSON.parse(res.data.data.items_json)
              : res.data.data.items_json;
          if (Array.isArray(items) && items.length > 0) {
            applyMenuList(items);
            localStorage.setItem('lacquer_site_main_menu', JSON.stringify(items));
            return;
          }
        }
      } catch {
        // Fallback to local cache
      }

      // 2. Check localStorage cache
      try {
        const cached = localStorage.getItem('lacquer_site_main_menu');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            applyMenuList(parsed);
            return;
          }
        }
      } catch {
        // Giữ mặc định
      }
      setNavLinks(DEFAULT_NAV_LINKS.filter((i) => i.is_visible));
    };

    loadMenuConfig();
    window.addEventListener('lacquer_menu_updated', loadMenuConfig);
    return () => {
      window.removeEventListener('lacquer_menu_updated', loadMenuConfig);
    };
  }, []);

  // Kiểm tra mục nav nào đang active: chỉ làm sáng mục thuộc trang hiện tại
  const isNavActive = (item) => {
    const current = normalizePath(location.pathname);
    const target = normalizePath(item.path || item.slug);

    if (target === '/') {
      return current === '/';
    }

    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <header
      className={`${
        isHomePage ? 'fixed top-0 left-0' : 'sticky top-0'
      } w-full z-50 transition-all duration-300`}
      style={
        isHomePage
          ? {
              background:
                !isScrolled && !mobileOpen
                  ? 'linear-gradient(to bottom, rgba(28, 6, 9, 0.92) 0%, rgba(28, 6, 9, 0.35) 60%, transparent 100%)'
                  : 'rgba(32, 7, 11, 0.96)',
              borderBottom:
                !isScrolled && !mobileOpen
                  ? '1px solid transparent'
                  : '1px solid rgba(212, 175, 55, 0.35)',
              backdropFilter: !isScrolled && !mobileOpen ? 'none' : 'blur(16px)',
              boxShadow:
                !isScrolled && !mobileOpen ? 'none' : '0 4px 28px rgba(0,0,0,0.7)',
            }
          : {
              background: 'rgba(40, 9, 13, 0.97)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 28px rgba(0,0,0,0.7)',
            }
      }
    >
      <div className="h-16 sm:h-18 w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2 xl:gap-4 flex-nowrap overflow-hidden">
        
        {/* 1. Logo & Tên thương hiệu */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D4AF37]/80 flex items-center justify-center bg-black/60 shadow-[0_0_14px_rgba(212,175,55,0.4)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,223,115,0.6)] transition-all shrink-0">
            <img
              alt="Hành trình 100 năm Sơn mài Hội họa Việt Nam Logo"
              className="w-full h-full object-contain rounded-full"
              src={LOGO_URL}
            />
          </div>
          <div className="flex flex-col justify-center shrink-0">
            <span className="font-serif text-[13px] sm:text-[14px] xl:text-[16px] font-bold uppercase tracking-[0.1em] text-[#D4AF37] group-hover:text-[#FFDF73] transition-colors leading-none whitespace-nowrap drop-shadow-[0_2px_6px_rgba(212,175,55,0.3)]">
              HÀNH TRÌNH 100 NĂM SƠN MÀI
            </span>
            <span className="text-[9px] xl:text-[10px] font-serif uppercase tracking-[0.18em] text-[#EADBCE]/80 font-medium mt-0.5 whitespace-nowrap">
              HỘI HỌA & DI SẢN THẾ KỶ (1930–2030)
            </span>
          </div>
        </Link>

        {/* 2. Menu Điều Hướng: Khi đứng ở đâu thì chỗ đó vàng lên */}
        <nav className="hidden lg:flex items-center flex-nowrap flex-row gap-2.5 xl:gap-4 2xl:gap-5 whitespace-nowrap shrink-0">
          {navLinks.map((item) => {
            const active = isNavActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link-item font-serif text-[11.5px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.08em] whitespace-nowrap py-1.5 shrink-0 transition-all duration-300 ${
                  active
                    ? 'active text-[#FFDF73] font-bold drop-shadow-[0_0_12px_rgba(255,223,115,0.85)]'
                    : 'text-[#EADBCE] hover:text-[#FFDF73] font-semibold'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. Nút Kêu gọi Hành động */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            className="btn-gold-outline hidden sm:inline-flex items-center justify-center px-3.5 xl:px-4 py-1.5 rounded text-[11px] xl:text-[12px] uppercase font-bold tracking-wider whitespace-nowrap shrink-0 shadow-sm"
            to="/contact"
            onClick={() => setMobileOpen(false)}
          >
            Tham gia kiến tạo
          </Link>

          {/* Nút bật Menu trên Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-md text-[#D4AF37] hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Drawer Menu Mobile */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1c0608] border-t border-[#3e161b] px-6 py-4 space-y-2.5 font-serif">
          {navLinks.map((item) => {
            const active = isNavActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-1.5 text-xs uppercase tracking-wider border-b border-[#2d0e12]/60 transition-colors ${
                  active
                    ? 'text-[#FFDF73] font-bold drop-shadow-[0_0_10px_rgba(255,223,115,0.8)] pl-2 border-l-2 border-l-[#FFDF73] bg-[#2a080d]/60'
                    : 'text-[#EADBCE] hover:text-[#FFDF73]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-gold block w-full text-center py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Tham gia kiến tạo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
