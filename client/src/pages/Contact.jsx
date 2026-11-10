import React, { useState, useEffect, useRef } from 'react';
import ContactHeroSection from '../components/contact/ContactHeroSection';
import ContactRoutesSection from '../components/contact/ContactRoutesSection';
import ContactFormSection from '../components/contact/ContactFormSection';
import pageServices from '../services/pageServices';

export default function Contact() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [pageProps, setPageProps] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await pageServices.getPageBySlug('/contact');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const pageData = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/contact' || p.slug === 'contact') || raw[0]
            : raw;
          setPageProps(pageData?.props || null);
        }
      } catch (err) {
        console.warn('Lỗi tải dữ liệu trang liên hệ từ DB:', err);
        if (isMounted) setPageProps(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, []);

  const handleSelectRoute = (routeKey) => {
    setSelectedRoute(routeKey);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FFDF73] flex flex-col items-center justify-center font-sans">
        <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
        <p className="text-sm tracking-widest uppercase">Đang tải dữ liệu liên hệ...</p>
      </div>
    );
  }

  if (!pageProps) {
    return (
      <div className="min-h-screen bg-[#100202] text-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#1a0407]/90 max-w-md w-full text-center space-y-3 shadow-2xl">
          <span className="material-symbols-outlined text-[#FFDF73] text-5xl">folder_off</span>
          <h3 className="text-xl font-bold text-[#FFDF73]">Chưa có dữ liệu</h3>
          <p className="text-sm text-[#EADBCE]/70">Dữ liệu liên hệ hiện chưa sẵn sàng trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100202] text-[#FAF7F2] font-sans relative overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(170,130,10,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] -right-40 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <main className="relative z-10 pb-16">
        {/* Hero Section */}
        <ContactHeroSection pageProps={pageProps} />

        {/* 5 Participation Routes */}
        <ContactRoutesSection onSelectRoute={handleSelectRoute} pageProps={pageProps} />

        {/* Contact Form & Direct Project Info */}
        <ContactFormSection
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          formRef={formRef}
          pageProps={pageProps}
        />
      </main>
    </div>
  );
}

