import React from 'react';
import ArchiveHeroSection from '../components/archive/ArchiveHeroSection';
import ArchiveCategoriesSection from '../components/archive/ArchiveCategoriesSection';
import ArchiveVolumesSection from '../components/archive/ArchiveVolumesSection';
import ArchiveSchemaSection from '../components/archive/ArchiveSchemaSection';
import ArchiveCallSection from '../components/archive/ArchiveCallSection';

const Archive = () => {
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
      <ArchiveHeroSection />

      {/* 2. ARCHIVE CATEGORIES: 5 PHÂN HỆ TRI THỨC CỐT LÕI */}
      <ArchiveCategoriesSection />

      {/* 3. MONOGRAPH VOLUMES: BỐN TẬP CHUYÊN KHẢO THẾ KỶ */}
      <ArchiveVolumesSection />

      {/* 4. DATA SCHEMA: KHUNG CHUẨN DỮ LIỆU LƯU TRỮ QUỐC GIA */}
      <ArchiveSchemaSection />

      {/* 5. OPEN CALL: KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA */}
      <ArchiveCallSection />
    </div>
  );
};

export default Archive;

