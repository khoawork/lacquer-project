import React, { useState } from 'react';
import NewsHeroSection from '../components/news/NewsHeroSection';
import NewsFilterSection from '../components/news/NewsFilterSection';
import NewsGridSection from '../components/news/NewsGridSection';
import NewsTemplateMockupSection from '../components/news/NewsTemplateMockupSection';
import NewsNewsletterSection from '../components/news/NewsNewsletterSection';

export default function News() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  return (
    <div className="min-h-screen bg-[#100202] text-[#FAF7F2] font-sans relative overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(170,130,10,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[20%] -right-40 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <main className="relative z-10 pt-20 pb-20">
        {/* Hero Section */}
        <NewsHeroSection />

        {/* Filter Navigation */}
        <NewsFilterSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Articles Grid */}
        <NewsGridSection activeCategory={activeCategory} />

        {/* Heritage Article Template Mockup */}
        <NewsTemplateMockupSection />

        {/* Newsletter Subscription */}
        <NewsNewsletterSection />
      </main>
    </div>
  );
}

