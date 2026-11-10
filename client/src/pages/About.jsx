import React, { useState, useEffect } from 'react';
import AboutHeroSection from '../components/about/AboutHeroSection';
import AboutStorySection from '../components/about/AboutStorySection';
import AboutMissionVisionSection from '../components/about/AboutMissionVisionSection';
import AboutPrinciplesSection from '../components/about/AboutPrinciplesSection';
import AboutArchitectureSection from '../components/about/AboutArchitectureSection';
import AboutCommunitiesSection from '../components/about/AboutCommunitiesSection';
import AboutCtaSection from '../components/about/AboutCtaSection';
import pageServices from '../services/pageServices';

const About = () => {
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/about');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/about' || p.slug === 'about') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang giới thiệu từ DB:', err);
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FFDF73] flex flex-col items-center justify-center font-sans">
        <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu trang giới thiệu...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu trang giới thiệu hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-[#FAF7F2] select-none relative overflow-x-hidden bg-[#100202]">
      {/* 1. HERO GIỚI THIỆU */}
      <AboutHeroSection pageProps={pageProps} />

      {/* 2. CÂU CHUYỆN - Vì sao hành trình được hình thành */}
      <AboutStorySection pageProps={pageProps} />

      {/* 3. SỨ MỆNH & TẦM NHÌN 2030 */}
      <AboutMissionVisionSection pageProps={pageProps} />

      {/* 4. BA NGUYÊN TẮC CỐT LÕI */}
      <AboutPrinciplesSection pageProps={pageProps} />

      {/* 5. KIẾN TRÚC NỀN TẢNG */}
      <AboutArchitectureSection pageProps={pageProps} />

      {/* 6. CỘNG ĐỒNG ĐỒNG HÀNH */}
      <AboutCommunitiesSection pageProps={pageProps} />

      {/* 7. KÊU GỌI ĐỒNG KIẾN TẠO */}
      <AboutCtaSection pageProps={pageProps} />
    </div>
  );
};

export default About;
