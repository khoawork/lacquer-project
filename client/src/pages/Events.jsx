import React, { useState, useEffect } from 'react';
import EventsHeroSection from '../components/events/EventsHeroSection';
import EventsFilterSection from '../components/events/EventsFilterSection';
import EventsListSection from '../components/events/EventsListSection';
import EventsCtaSection from '../components/events/EventsCtaSection';
import pageServices from '../services/pageServices';
import eventServices from '../services/eventServices';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [pageProps, setPageProps] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Đọc cấu hình trang sự kiện và danh mục sự kiện (id, name) trực tiếp từ DB
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const [pageRes, catRes] = await Promise.all([
          pageServices.getPageBySlug('/events'),
          eventServices.getCategories().catch(() => null),
        ]);

        if (pageRes?.data?.success && isMounted) {
          const raw = pageRes.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/events' || p.slug === 'events') || raw[0]
            : raw;
          if (pageData?.props) {
            setPageProps(pageData.props);
          }
        }

        if (catRes?.data?.success && Array.isArray(catRes.data.data) && isMounted) {
          setCategories(catRes.data.data);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang sự kiện từ DB:', err);
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
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

  const matchedCat = categories.find((c) => Number(c.id) === Number(activeFilter));
  const activeFilterName =
    activeFilter === 'all'
      ? 'Tất cả'
      : activeFilter === 'past'
      ? 'Đã diễn ra'
      : matchedCat?.name || 'Tất cả';

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

      {/* 2. EVENT FILTER SECTION: BỘ LỌC CÁC CHỦ ĐỀ SỰ KIỆN (giữ id và name, lọc theo id) */}
      <EventsFilterSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        categories={categories}
      />

      {/* 3. EVENT LISTINGS: DANH SÁCH SỰ KIỆN NỔI BẬT & ĐÃ DIỄN RA */}
      <EventsListSection
        activeFilter={activeFilter}
        activeFilterName={activeFilterName}
        pageProps={pageProps}
      />

      {/* 4. CTA SECTION: ĐỒNG HÀNH KIẾN TẠO SỰ KIỆN TIẾP THEO */}
      <EventsCtaSection pageProps={pageProps} />
    </div>
  );
};

export default Events;
