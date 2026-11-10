import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import HeritageStorySection from '../components/home/HeritageStorySection';
import PillarsSection from '../components/home/PillarsSection';
import OperationalPipelineSection from '../components/home/OperationalPipelineSection';
import FeaturedEventsSection from '../components/home/FeaturedEventsSection';
import FeaturedArtworksSection from '../components/home/FeaturedArtworksSection';
import MonographArchiveSection from '../components/home/MonographArchiveSection';
import CoCreationCtaSection from '../components/home/CoCreationCtaSection';
import pageServices from '../services/pageServices';

const Home = () => {
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);

  // Đọc dữ liệu trang chủ trực tiếp từ bảng Page trong DB
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/');
        if (res.data && res.data.success && isMounted) {
          const pageData = Array.isArray(res.data.data)
            ? res.data.data.find((p) => p.slug === '/' || p.slug === 'home' || p.id === 1) || res.data.data[0]
            : res.data.data;

          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi khi tải dữ liệu trang chủ từ cơ sở dữ liệu:', err.message);
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
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu trang chủ...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu trang chủ hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full select-none relative overflow-x-clip bg-[#100202] text-[#FAF7F2]">
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[#3a0808]/25 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#270505]/30 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#2a0606]/28 rounded-full blur-[180px]" />
        <div className="absolute top-[70%] left-[25%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO SECTION PINNED: Video ghim cố định ở đỉnh màn hình */}
      <div className="relative w-full h-[120vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
          <HeroSection pageProps={pageProps} />
        </div>
      </div>

      {/* 2. GIỚI THIỆU: Cuộn trồi lên phủ 1/5 video (~20vh) rồi mới kéo toàn bộ trang đi */}
      <div className="relative z-10 -mt-[20vh] shadow-[0_-25px_60px_rgba(0,0,0,0.95)]">
        <HeritageStorySection pageProps={pageProps} />
      </div>

      {/* 3. BỐN TRỤC MỞ - Bốn hướng mở của hành trình */}
      <PillarsSection pageProps={pageProps} />

      {/* 4. MÔ HÌNH VẬN HÀNH - Từ ý tưởng đến giá trị (LAB, STUDIO, SHOWCASE, MARKET) */}
      <OperationalPipelineSection pageProps={pageProps} />

      {/* 5. SỰ KIỆN NỔI BẬT - Chuỗi hoạt động đưa di sản vào đời sống */}
      <FeaturedEventsSection pageProps={pageProps} />

      {/* 6. BỘ SƯU TẬP - Những tác phẩm viết tiếp mạch di sản */}
      <FeaturedArtworksSection pageProps={pageProps} />

      {/* 7. KỶ YẾU ARCHIVE - Kho tri thức mở của Hành trình */}
      <MonographArchiveSection pageProps={pageProps} />

      {/* 8. ĐỒNG KIẾN TẠO VĂN HÓA - Cùng viết tiếp hành trình 100 năm */}
      <CoCreationCtaSection pageProps={pageProps} />
    </div>
  );
};

export default Home;
