import React, { useState, useEffect } from 'react';
import EventsHeroSection from '../components/events/EventsHeroSection';
import EventsFilterSection from '../components/events/EventsFilterSection';
import EventsListSection from '../components/events/EventsListSection';
import EventsProgramSection from '../components/events/EventsProgramSection';
import EventsCtaSection from '../components/events/EventsCtaSection';
import pageServices from '../services/pageServices';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [pageProps, setPageProps] = useState(null);

  // Đọc cấu hình trang sự kiện trực tiếp từ bảng Page trong DB
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        const res = await pageServices.getPageBySlug('/events');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/events' || p.slug === 'events') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang sự kiện từ DB:', err);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

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
      <EventsFilterSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* 3. EVENT LISTINGS: DANH SÁCH SỰ KIỆN NỔI BẬT & ĐÃ DIỄN RA */}
      <EventsListSection activeFilter={activeFilter} pageProps={pageProps} />

      {/* 4. EVENT DETAIL & PROGRAM: CHƯƠNG TRÌNH CHI TIẾT & KHUNG VẬN HÀNH */}
      <EventsProgramSection />

      {/* 5. CTA SECTION: ĐỒNG HÀNH KIẾN TẠO SỰ KIỆN TIẾP THEO */}
      <EventsCtaSection />
    </div>
  );
};

export default Events;

