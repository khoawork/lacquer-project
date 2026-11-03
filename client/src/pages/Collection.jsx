import React from 'react';
import CollectionHeroSection from '../components/collection/CollectionHeroSection';
import CuratedCollectionsSection from '../components/collection/CuratedCollectionsSection';
import CollectionCommunitySection from '../components/collection/CollectionCommunitySection';
import CollectionCtaSection from '../components/collection/CollectionCtaSection';

const Collection = () => {
  return (
    <div className="flex flex-col w-full text-stone-100 select-none relative overflow-x-hidden">
      {/* Ambient Lacquer Glows in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[#421217]/25 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#2e090e]/30 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#340b10]/28 rounded-full blur-[180px]" />
        <div className="absolute top-[70%] left-[25%] w-[600px] h-[600px] bg-[#D4AF37]/12 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO SECTION: MỖI TÁC PHẨM LÀ MỘT LỚP THỜI GIAN */}
      <CollectionHeroSection />

      {/* 2. THE CURATED COLLECTIONS: CỬU CỬU, BÁCH THỤ ĐỒNG TÂM VIÊN, DU LÃM */}
      <CuratedCollectionsSection />

      {/* 3. COMMUNITY & RECORD BREAKING PROJECTS */}
      <CollectionCommunitySection />

      {/* 4. IMMERSIVE CALL-TO-ACTION */}
      <CollectionCtaSection />
    </div>
  );
};

export default Collection;

