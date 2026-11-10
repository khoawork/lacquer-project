import React, { useState, useEffect } from 'react';
import JourneyHeroSection from '../components/journey/JourneyHeroSection';
import JourneyTimelineSection from '../components/journey/JourneyTimelineSection';
import JourneyQuoteSection from '../components/journey/JourneyQuoteSection';
import JourneySymposiaSection from '../components/journey/JourneySymposiaSection';
import JourneyCtaSection from '../components/journey/JourneyCtaSection';
import pageServices from '../services/pageServices';

const Journey = () => {
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/journey');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/journey' || p.slug === 'journey') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang hành trình từ DB:', err);
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FFDF73] flex flex-col items-center justify-center font-sans">
        <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu trang hành trình...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu trang hành trình hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-stone-100 select-none relative overflow-x-hidden">
      {/* Living Particles & Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-[#681010]/35 rounded-full blur-[160px] ambient-glow-disc" />
        <div className="absolute top-[30%] left-1/4 w-[750px] h-[600px] bg-[#4a0808]/40 rounded-full blur-[170px]" />
        <div className="absolute top-[60%] right-1/4 w-[700px] h-[550px] bg-[#580d0d]/35 rounded-full blur-[160px]" />
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      {/* 1. HERO SECTION: MỘT THẾ KỶ TÍCH TỤ - MỘT TƯƠNG LAI ĐANG MỞ */}
      <JourneyHeroSection pageProps={pageProps} />

      {/* 2. INTERACTIVE VERTICAL TIMELINE: DÒNG THỜI GIAN LỊCH SỬ & TƯƠNG LAI */}
      <JourneyTimelineSection pageProps={pageProps} />

      {/* 3. KEY QUOTE BANNER */}
      <JourneyQuoteSection pageProps={pageProps} />

      {/* 4. THEMATIC SERIES: CHUỖI CHUYÊN ĐỀ & CHUYÊN ĐỀ ĐẶC BIỆT LẦN 7 */}
      <JourneySymposiaSection pageProps={pageProps} />

      {/* 5. FINAL CTA BLOCK: CÙNG VIẾT TIẾP HÀNH TRÌNH 100 NĂM */}
      <JourneyCtaSection pageProps={pageProps} />
    </div>
  );
};

export default Journey;
