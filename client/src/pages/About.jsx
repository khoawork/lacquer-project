import React from 'react';
import AboutHeroSection from '../components/about/AboutHeroSection';
import AboutStorySection from '../components/about/AboutStorySection';
import AboutMissionVisionSection from '../components/about/AboutMissionVisionSection';
import AboutPrinciplesSection from '../components/about/AboutPrinciplesSection';
import AboutArchitectureSection from '../components/about/AboutArchitectureSection';
import AboutCommunitiesSection from '../components/about/AboutCommunitiesSection';
import AboutCtaSection from '../components/about/AboutCtaSection';

const About = () => {
  return (
    <div className="flex flex-col w-full text-[#FAF7F2] select-none relative overflow-x-hidden bg-[#100202]">
      {/* 1. HERO GIỚI THIỆU - Từ di sản đến hạ tầng sáng tạo (Có FloatingSparkles size 4.5) */}
      <AboutHeroSection />

      {/* 2. CÂU CHUYỆN - Vì sao hành trình được hình thành & 3 lớp tích tụ di sản */}
      <AboutStorySection />

      {/* 3. SỨ MỆNH & TẦM NHÌN 2030 (5 Trụ cột & Lộ trình 2026-2030) */}
      <AboutMissionVisionSection />

      {/* 4. BA NGUYÊN TẮC CỐT LÕI (01, 02, 03) */}
      <AboutPrinciplesSection />

      {/* 5. KIẾN TRÚC NỀN TẢNG (Lõi bất biến - Vòng mở - Lớp vận hành LAB/STUDIO/SHOWCASE/MARKET) */}
      <AboutArchitectureSection />

      {/* 6. CỘNG ĐỒNG ĐỒNG HÀNH (5 nhóm đối tượng tham gia) */}
      <AboutCommunitiesSection />

      {/* 7. KÊU GỌI ĐỒNG KIẾN TẠO (Call To Action & Dấu ấn bách niên) */}
      <AboutCtaSection />
    </div>
  );
};

export default About;
