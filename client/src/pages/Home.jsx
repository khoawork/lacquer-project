import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HeritageStorySection from '../components/home/HeritageStorySection';
import PillarsSection from '../components/home/PillarsSection';
import OperationalPipelineSection from '../components/home/OperationalPipelineSection';
import FeaturedEventsSection from '../components/home/FeaturedEventsSection';
import FeaturedArtworksSection from '../components/home/FeaturedArtworksSection';
import MonographArchiveSection from '../components/home/MonographArchiveSection';
import CoCreationCtaSection from '../components/home/CoCreationCtaSection';

const Home = () => {
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
      <HeroSection />

      {/* 2. GIỚI THIỆU - Một thế kỷ, một hành trình đang tiếp diễn */}
      <HeritageStorySection />

      {/* 3. BỐN TRỤC MỞ - Bốn hướng mở của hành trình */}
      <PillarsSection />

      {/* 4. MÔ HÌNH VẬN HÀNH - Từ ý tưởng đến giá trị (LAB, STUDIO, SHOWCASE, MARKET) */}
      <OperationalPipelineSection />

      {/* 5. SỰ KIỆN NỔI BẬT - Chuỗi hoạt động đưa di sản vào đời sống */}
      <FeaturedEventsSection />

      {/* 6. BỘ SƯU TẬP - Những tác phẩm viết tiếp mạch di sản */}
      <FeaturedArtworksSection />

      {/* 7. KỶ YẾU ARCHIVE - Kho tri thức mở của Hành trình */}
      <MonographArchiveSection />

      {/* 8. ĐỒNG KIẾN TẠO VĂN HÓA - Cùng viết tiếp hành trình 100 năm */}
      <CoCreationCtaSection />
    </div>
  );
};

export default Home;
