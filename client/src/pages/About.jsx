import React, { useState, useEffect } from 'react';
import AboutHeroSection from '../components/about/AboutHeroSection';
import AboutStorySection from '../components/about/AboutStorySection';
import AboutMissionVisionSection from '../components/about/AboutMissionVisionSection';
import AboutPrinciplesSection from '../components/about/AboutPrinciplesSection';
import AboutArchitectureSection from '../components/about/AboutArchitectureSection';
import AboutCommunitiesSection from '../components/about/AboutCommunitiesSection';
import AboutCtaSection from '../components/about/AboutCtaSection';
import pageServices from '../services/pageServices';
import { DEFAULT_PAGE_PROPS } from './admin/PageManager';

const About = () => {
  const [pageProps, setPageProps] = useState(DEFAULT_PAGE_PROPS['/about'] || null);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
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
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

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
