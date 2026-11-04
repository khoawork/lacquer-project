import React, { useState, useEffect } from "react";
import NewsHeroSection from "../components/news/NewsHeroSection";
import NewsFilterSection from "../components/news/NewsFilterSection";
import NewsGridSection from "../components/news/NewsGridSection";
import NewsTemplateMockupSection from "../components/news/NewsTemplateMockupSection";
import NewsNewsletterSection from "../components/news/NewsNewsletterSection";
import pageServices from "../services/pageServices";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [pageProps, setPageProps] = useState(null);

  // Đọc cấu hình trang tin tức trực tiếp từ DB
  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        const res = await pageServices.getPageBySlug('/news');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/news' || p.slug === 'news') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang tin tức từ DB:', err);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

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
        <NewsHeroSection pageProps={pageProps} />

        {/* Filter Navigation */}
        <NewsFilterSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Articles Grid */}
        <NewsGridSection activeCategory={activeCategory} pageProps={pageProps} />

        {/* Heritage Article Template Mockup */}
        <NewsTemplateMockupSection />

        {/* Newsletter Subscription */}
        <NewsNewsletterSection />
      </main>
    </div>
  );
}
   