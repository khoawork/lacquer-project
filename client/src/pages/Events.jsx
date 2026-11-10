import React, { useState, useEffect } from 'react';
import EventsHeroSection from '../components/events/EventsHeroSection';
import EventsFilterSection from '../components/events/EventsFilterSection';
import EventsListSection from '../components/events/EventsListSection';
import EventsCtaSection from '../components/events/EventsCtaSection';
import pageServices from '../services/pageServices';
import siteServices from '../services/siteServices';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [pageProps, setPageProps] = useState(null);
  const [categories, setCategories] = useState(['Tất cả']);
  const [loading, setLoading] = useState(true);

  // Đọc cấu hình trang sự kiện trực tiếp từ bảng Page trong DB
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/events');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/events' || p.slug === 'events') || raw[0]
            : raw;
          if (pageData?.props) {
            setPageProps(pageData.props);
          }
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang sự kiện từ DB:', err);
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await siteServices.getSettings();
        if (res.data && res.data.success && isMounted) {
          const settings = res.data.data || [];
          const catSetting = settings.find((s) => s.key === 'event_categories');
          if (catSetting && catSetting.value) {
            const parsed = Array.isArray(catSetting.value)
              ? catSetting.value
              : typeof catSetting.value === 'string'
              ? JSON.parse(catSetting.value)
              : null;
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCategories(parsed);
            }
          }
        }
      } catch (err) {
        console.warn('Lỗi tải thể loại sự kiện từ settings:', err);
      }
    };

    fetchPageData();
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FFDF73] flex flex-col items-center justify-center font-sans">
        <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu sự kiện...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu sự kiện hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-stone-100 select-none relative overflow-x-hidden">
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[#421217]/25 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#2e090e]/30 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#340b10]/28 rounded-full blur-[180px]" />
        <div className="absolute top-[70%] left-[25%] w-[600px] h-[600px] bg-[#D4AF37]/12 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO SECTION: NƠI DI SẢN ĐƯỢC THỰC HÀNH */}
      <EventsHeroSection pageProps={pageProps} />

      {/* 2. EVENT FILTER SECTION: BỘ LỌC CÁC CHỦ ĐỀ SỰ KIỆN */}
      <EventsFilterSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        categories={categories}
      />

      {/* 3. EVENT LISTINGS: DANH SÁCH SỰ KIỆN NỔI BẬT & ĐÃ DIỄN RA */}
      <EventsListSection activeFilter={activeFilter} pageProps={pageProps} />

      {/* 4. CTA SECTION: ĐỒNG HÀNH KIẾN TẠO SỰ KIỆN TIẾP THEO */}
      <EventsCtaSection pageProps={pageProps} />
    </div>
  );
};

export default Events;
