import React, { useState, useEffect, useRef } from 'react';
import ContactHeroSection from '../components/contact/ContactHeroSection';
import ContactRoutesSection from '../components/contact/ContactRoutesSection';
import ContactFormSection from '../components/contact/ContactFormSection';
import pageServices from '../services/pageServices';
import { DEFAULT_PAGE_PROPS } from './admin/PageManager';

export default function Contact() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [pageProps, setPageProps] = useState(DEFAULT_PAGE_PROPS['/contact'] || null);
  const formRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
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

  return (
    <div className="min-h-screen bg-[#100202] text-[#FAF7F2] font-sans relative overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(170,130,10,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] -right-40 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <main className="relative z-10 pt-20 pb-20">
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

