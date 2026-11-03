import React from 'react';
import LeadershipHeroSection from '../components/leadership/LeadershipHeroSection';
import LeadershipCoreUnitsSection from '../components/leadership/LeadershipCoreUnitsSection';
import LeadershipAdvisorySection from '../components/leadership/LeadershipAdvisorySection';
import LeadershipProjectTeamsSection from '../components/leadership/LeadershipProjectTeamsSection';
import LeadershipNetworkSection from '../components/leadership/LeadershipNetworkSection';

const Leadership = () => {
  return (
    <div
      className="flex flex-col w-full text-stone-100 select-none relative overflow-x-hidden min-h-screen"
      style={{
        background:
          'radial-gradient(circle at 50% 10%, #2a0b10 0%, #170407 40%, #0d0203 75%, #050102 100%)',
      }}
    >
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(82, 21, 21, 0.28) 50%, transparent 75%)',
          }}
        />
        <div className="absolute top-[35%] right-0 w-[550px] h-[550px] bg-[#681010]/25 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col">
        {/* 1. HERO SECTION: NHỮNG NGƯỜI GIỮ NHỊP CHO HÀNH TRÌNH */}
        <LeadershipHeroSection />

        {/* 2. CƠ QUAN ĐIỀU PHỐI & CHỦ TRÌ: VIETKINGS & TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO */}
        <LeadershipCoreUnitsSection />

        {/* 3. HỘI ĐỒNG CHUYÊN MÔN: 4 LĨNH VỰC BẢO CHỨNG HỌC THUẬT */}
        <LeadershipAdvisorySection />

        {/* 4. BAN DỰ ÁN: 6 BAN CHỨC NĂNG THỰC THI CHIẾN LƯỢC */}
        <LeadershipProjectTeamsSection />

        {/* 5. MẠNG LƯỚI PHỐI HỢP: LIÊN KẾT ĐỐI TÁC HỆ SINH THÁI */}
        <LeadershipNetworkSection />
      </div>
    </div>
  );
};

export default Leadership;
export { Leadership };

