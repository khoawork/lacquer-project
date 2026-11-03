import React from 'react';
import JourneyHeroSection from '../components/journey/JourneyHeroSection';
import JourneyTimelineSection from '../components/journey/JourneyTimelineSection';
import JourneyMastersSection from '../components/journey/JourneyMastersSection';
import JourneyTerroirsSection from '../components/journey/JourneyTerroirsSection';
import JourneyFutureSection from '../components/journey/JourneyFutureSection';
import JourneyCtaSection from '../components/journey/JourneyCtaSection';

const Journey = () => {
  return (
    <div className="flex flex-col w-full text-stone-100 select-none relative overflow-x-hidden">
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[#421217]/25 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#2e090e]/30 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#340b10]/28 rounded-full blur-[180px]" />
        <div className="absolute top-[70%] left-[25%] w-[600px] h-[600px] bg-[#D4AF37]/12 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO HÀNH TRÌNH BÁCH NIÊN KHỞI SẮC (1930 - 2030) */}
      <JourneyHeroSection />

      {/* 2. BIÊN NIÊN SỬ 5 GIAI ĐOẠN LỊCH SỬ NỐI MẠCH DI SẢN */}
      <JourneyTimelineSection />

      {/* 3. NHỮNG BẬC THẦY TIÊN PHONG TẠC NÊN DI SẢN */}
      <JourneyMastersSection />

      {/* 4. CỘI NGUỒN ĐẤT VÀ NGHỀ (PHÚ THỌ, HẠ THÁI, TƯƠNG BÌNH HIỆP) */}
      <JourneyTerroirsSection />

      {/* 5. TƯƠNG LAI 2030 & HẠ TẦNG SÁNG TẠO BÁCH NIÊN KẾ TIẾP */}
      <JourneyFutureSection />

      {/* 6. KÊU GỌI ĐỒNG HÀNH VÀ ĐÓNG GÓP TƯ LIỆU */}
      <JourneyCtaSection />
    </div>
  );
};

export default Journey;

