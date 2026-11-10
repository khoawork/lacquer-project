import React, { useState, useEffect } from 'react';
import ArchiveHeroSection from '../components/archive/ArchiveHeroSection';
import ArchiveCategoriesSection from '../components/archive/ArchiveCategoriesSection';
import ArchiveVolumesSection from '../components/archive/ArchiveVolumesSection';
import ArchiveSchemaSection from '../components/archive/ArchiveSchemaSection';
import ArchiveCallSection from '../components/archive/ArchiveCallSection';
import pageServices from '../services/pageServices';

const Archive = () => {
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
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
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FFDF73] flex flex-col items-center justify-center font-sans">
        <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu kỷ yếu...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu kỷ yếu hiện chưa sẵn sàng trong hệ thống.</p>
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

