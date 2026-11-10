import React, { useState, useEffect } from 'react';
import LeadershipHeroSection from '../components/leadership/LeadershipHeroSection';
import LeadershipCoreUnitsSection from '../components/leadership/LeadershipCoreUnitsSection';
import LeadershipAdvisorySection from '../components/leadership/LeadershipAdvisorySection';
import LeadershipProjectTeamsSection from '../components/leadership/LeadershipProjectTeamsSection';
import LeadershipNetworkSection from '../components/leadership/LeadershipNetworkSection';
import pageServices from '../services/pageServices';

const Leadership = () => {
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/leadership');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/leadership' || p.slug === 'leadership') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang ban điều hành từ DB:', err);
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
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu ban điều hành...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu ban điều hành hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

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
        <LeadershipHeroSection pageProps={pageProps} />

        {/* 2. CƠ QUAN ĐIỀU PHỐI & CHỦ TRÌ: VIETKINGS & TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO */}
        <LeadershipCoreUnitsSection pageProps={pageProps} />

        {/* 3. HỘI ĐỒNG CHUYÊN MÔN: 4 LĨNH VỰC BẢO CHỨNG HỌC THUẬT */}
        <LeadershipAdvisorySection pageProps={pageProps} />

        {/* 4. BAN DỰ ÁN: 6 BAN CHỨC NĂNG THỰC THI CHIẾN LƯỢC */}
        <LeadershipProjectTeamsSection pageProps={pageProps} />

        {/* 5. MẠNG LƯỚI PHỐI HỢP: LIÊN KẾT ĐỐI TÁC HỆ SINH THÁI */}
        <LeadershipNetworkSection pageProps={pageProps} />
      </div>
    </div>
  );
};

export default Leadership;
export { Leadership };

