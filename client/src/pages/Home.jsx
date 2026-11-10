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
import { DEFAULT_PAGE_PROPS } from './admin/PageManager';

const Home = () => {
  const [pageProps, setPageProps] = useState(DEFAULT_PAGE_PROPS['/'] || null);

  // Đọc dữ liệu trang chủ trực tiếp từ bảng Page trong DB (slug chỉ nằm trong page)
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        const res = await pageServices.getPageBySlug('/');
        if (res.data && res.data.success && isMounted) {
          // Xử lý linh hoạt khi dữ liệu trả về là đối tượng đơn hoặc mảng
          const pageData = Array.isArray(res.data.data)
            ? res.data.data.find((p) => p.slug === '/' || p.slug === 'home' || p.id === 1) || res.data.data[0]
            : res.data.data;

          console.log('Dữ liệu trang chủ từ DB:', pageData); // Debugging line to check the data received
          const merged = {
            ...(DEFAULT_PAGE_PROPS['/'] || {}),
            ...(pageData?.props || {}),
          };
          setPageProps(merged);
        }
      } catch (err) {
        console.warn('Lỗi khi tải dữ liệu trang chủ từ cơ sở dữ liệu:', err.message);
      }
    };

    fetchPageData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col w-full select-none relative overflow-x-hidden bg-[#100202] text-[#FAF7F2]">
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[#3a0808]/25 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#270505]/30 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#2a0606]/28 rounded-full blur-[180px]" />
        <div className="absolute top-[70%] left-[25%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO SECTION (100VH + Golden Sparkles + Watermark Logo) */}
      <HeroSection pageProps={pageProps} />

      {/* 2. GIỚI THIỆU - Một thế kỷ, một hành trình đang tiếp diễn */}
      <HeritageStorySection pageProps={pageProps} />

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
