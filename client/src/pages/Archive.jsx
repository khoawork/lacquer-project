import React, { useState, useEffect } from 'react';
import ArchiveHeroSection from '../components/archive/ArchiveHeroSection';
import ArchiveCategoriesSection from '../components/archive/ArchiveCategoriesSection';
import ArchiveVolumesSection from '../components/archive/ArchiveVolumesSection';
import ArchiveSchemaSection from '../components/archive/ArchiveSchemaSection';
import ArchiveCallSection from '../components/archive/ArchiveCallSection';
import pageServices from '../services/pageServices';
import { DEFAULT_PAGE_PROPS } from './admin/PageManager';

const Archive = () => {
  const [pageProps, setPageProps] = useState(DEFAULT_PAGE_PROPS['/archive'] || null);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        const res = await pageServices.getPageBySlug('/archive');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/archive' || p.slug === 'archive') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang kỷ yếu từ DB:', err);
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

      {/* 1. HERO SECTION: KHO TRI THỨC CỦA MỘT DI SẢN ĐANG SỐNG */}
      <ArchiveHeroSection pageProps={pageProps} />

      {/* 2. ARCHIVE CATEGORIES: 5 PHÂN HỆ TRI THỨC CỐT LÕI */}
      <ArchiveCategoriesSection pageProps={pageProps} />

      {/* 3. MONOGRAPH VOLUMES: BỐN TẬP CHUYÊN KHẢO THẾ KỶ */}
      <ArchiveVolumesSection pageProps={pageProps} />

      {/* 4. DATA SCHEMA: KHUNG CHUẨN DỮ LIỆU LƯU TRỮ QUỐC GIA */}
      <ArchiveSchemaSection pageProps={pageProps} />

      {/* 5. OPEN CALL: KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA */}
      <ArchiveCallSection pageProps={pageProps} />
    </div>
  );
};

export default Archive;

