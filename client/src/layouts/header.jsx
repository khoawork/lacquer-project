import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  const LOGO_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRIW42qxKqqO8mE8JBoRSPJw3dMADLcoV4pAVEUfHycZibaoqtZV1AUf1mJilGhMmjBGbcD73MJB2WdRtCa9h1FcmnPFm76WT1z3DRpoQr0M598MUhsR8BknD2KLsg8wJRh5uyP0WO63s97mInG9wSUzszrjWNr_ZVj2QJExjYeykmXsAZL6Cngd7iEQeTDcXfu4oxzwVf6uJHxcWPVHAPn8JG814YEu9ZrGFyp2mny4_5TjVV_GdWWAqNCgj-mENrpz0';

  const navLinks = [
    { name: 'Trang chủ', path: '/', hash: '' },
    { name: 'Giới thiệu', path: '/about', hash: 'kham-pha' },
    { name: 'Hành trình', path: '/journey', hash: 'hanh-trinh' },
    { name: 'Sự kiện', path: '/events', hash: 'su-kien' },
    { name: 'Bộ sưu tập', path: '/collection', hash: 'bo-suu-tap' },
    { name: 'Kỷ yếu', path: '/archive', hash: 'ky-yeu' },
    { name: 'Ban điều hành', path: '/leadership', hash: 'ban-dieu-hanh' },
    { name: 'Tin tức', path: '/news', hash: 'tin-tuc' },
    { name: 'Liên hệ', path: '/contact', hash: 'lien-he' },
  ];

  // Theo dõi URL hash
  useEffect(() => {
    const rawHash = location.hash.replace('#', '');
    setActiveSection(rawHash);
  }, [location.hash, location.pathname]);

  // Scroll Spy: Tự động phát hiện vị trí cuộn chuột trên trang chủ để làm sáng mục nav tương ứng
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Khi ở đầu trang (dưới 250px), mục "Trang chủ" sẽ vàng lên
      if (scrollY < 280) {
        setActiveSection('');
        return;
      }

      const sectionIds = [
        'kham-pha',
        'bon-huong-mo',
        'mo-hinh',
        'su-kien',
        'bo-suu-tap',
        'ky-yeu-archive',
        'trang-thai-trong',
        'ui-kit',
        'dong-kien-tao',
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop - 160;
          if (scrollY >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Kiểm tra mục nav nào đang active
  const isNavActive = (item) => {
    if (location.pathname === item.path) {
      if (item.path === '/' && activeSection) return false;
      return true;
    }
    if ((item.path === '/about' || item.path === '/gioi-thieu') && (location.pathname === '/about' || location.pathname === '/gioi-thieu')) {
      return true;
    }
    if ((item.path === '/hanh-trinh' || item.path === '/journey') && (location.pathname === '/hanh-trinh' || location.pathname === '/journey')) {
      return true;
    }
    if ((item.path === '/su-kien' || item.path === '/events') && (location.pathname === '/su-kien' || location.pathname === '/events')) {
      return true;
    }
    if (
      (item.path === '/bo-suu-tap' || item.path === '/collection' || item.path === '/products') &&
      (location.pathname === '/bo-suu-tap' || location.pathname === '/collection' || location.pathname === '/products')
    ) {
      return true;
    }
    if (
      (item.path === '/ky-yeu' || item.path === '/archive' || item.path === '/monograph') &&
      (location.pathname === '/ky-yeu' || location.pathname === '/archive' || location.pathname === '/monograph')
    ) {
      return true;
    }
    if (
      (item.path === '/leadership' || item.path === '/ban-dieu-hanh') &&
      (location.pathname === '/leadership' || location.pathname === '/ban-dieu-hanh')
    ) {
      return true;
    }
    if (
      (item.path === '/news' || item.path === '/tin-tuc') &&
      (location.pathname === '/news' || location.pathname === '/tin-tuc')
    ) {
      return true;
    }
    if (
      (item.path === '/contact' || item.path === '/lien-he') &&
      (location.pathname === '/contact' || location.pathname === '/lien-he')
    ) {
      return true;
    }
    if (location.pathname === '/' && item.hash === '') {
      return !activeSection || activeSection === '';
    }
    if (location.pathname === '/' && activeSection && activeSection === item.hash) {
      return true;
    }
    return false;
  };

  const handleNavClick = (hash) => {
    setActiveSection(hash);
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 w-full z-50 transition-all duration-300 shadow-[0_4px_28px_rgba(0,0,0,0.7)]"
      style={{
        background: 'rgba(40, 9, 13, 0.97)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="h-16 sm:h-18 w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2 xl:gap-4 flex-nowrap overflow-hidden">
        
        {/* 1. Logo & Tên thương hiệu */}
        <Link
          to="/"
          onClick={() => handleNavClick('')}
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
              <a
                key={item.name}
                href={item.path}
                onClick={() => handleNavClick(item.hash)}
                className={`nav-link-item font-serif text-[11.5px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.08em] whitespace-nowrap py-1 shrink-0 transition-all duration-300 ${
                  active
                    ? 'active text-[#FFDF73] font-bold drop-shadow-[0_0_12px_rgba(255,223,115,0.85)]'
                    : 'text-[#EADBCE] hover:text-[#FFDF73] font-semibold'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* 3. Nút Kêu gọi Hành động */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            className="btn-gold-outline hidden sm:inline-flex items-center justify-center px-3.5 xl:px-4 py-1.5 rounded text-[11px] xl:text-[12px] uppercase font-bold tracking-wider whitespace-nowrap shrink-0 shadow-sm"
            href="#dong-kien-tao"
            onClick={() => handleNavClick('dong-kien-tao')}
          >
            Tham gia kiến tạo
          </a>

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
              <a
                key={item.name}
                href={item.path}
                onClick={() => handleNavClick(item.hash)}
                className={`block py-1.5 text-xs uppercase tracking-wider border-b border-[#2d0e12]/60 transition-colors ${
                  active
                    ? 'text-[#FFDF73] font-bold drop-shadow-[0_0_10px_rgba(255,223,115,0.8)]'
                    : 'text-[#EADBCE] hover:text-[#FFDF73]'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="#dong-kien-tao"
              onClick={() => handleNavClick('dong-kien-tao')}
              className="btn-gold block w-full text-center py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Tham gia kiến tạo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
