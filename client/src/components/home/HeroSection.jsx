import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const DEFAULT_VIDEO_URL =
  'https://res.cloudinary.com/ds11ggie4/video/upload/v1794319913/sonmai_uccrps.mp4';
const LEGACY_VIDEO_URL =
  'https://res.cloudinary.com/ds11ggie4/video/upload/v1792383491/forum/hero/8dcdbac5197b45a69bab73039d17c28f.mp4';

const HeroSection = ({ pageProps }) => {
  const videoUrl =
    !pageProps?.hero_video_url || pageProps.hero_video_url === LEGACY_VIDEO_URL
      ? DEFAULT_VIDEO_URL
      : pageProps.hero_video_url;

  const topTagline = pageProps?.top_tagline || pageProps?.badge || 'NƠI HỘI TỤ';
  const cursiveTitle = pageProps?.cursive_title || 'Tinh hoa nghệ thuật';
  const headlineText = pageProps?.headline || 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM';
  const cta1Text = pageProps?.hero_cta1_text || 'KHÁM PHÁ HÀNH TRÌNH';
  const cta1Link = pageProps?.hero_cta1_link || '/journey';
  const cta2Text = pageProps?.hero_cta2_text || 'THAM GIA ĐỒNG KIẾN TẠO';
  const cta2Link = pageProps?.hero_cta2_link || '/contact';
  const bottomQuoteText = pageProps?.bottom_quote || pageProps?.quote || '“Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.”';

  // Render tiêu đề 3 dòng hoành tráng chuẩn nhận diện mỹ thuật ban đầu
  const renderHeadline = () => {
    if (!headlineText) {
      return (
        <>
          <span className="block">HÀNH TRÌNH 100</span>
          <span className="block">NĂM SƠN MÀI HỘI</span>
          <span className="block">HỌA VIỆT NAM</span>
        </>
      );
    }

    if (headlineText.includes('\n')) {
      return headlineText.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ));
    }

    if (headlineText.trim() === 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM') {
      return (
        <>
          <span className="block">HÀNH TRÌNH 100</span>
          <span className="block">NĂM SƠN MÀI HỘI</span>
          <span className="block">HỌA VIỆT NAM</span>
        </>
      );
    }

    return headlineText;
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-[#0c121e]">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        src={videoUrl}
      />

      {/* 2. Atmospheric Neutral Overlay để tôn lên sắc xanh ánh sáng & màu vàng kim chuẩn ảnh mẫu */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(12, 18, 30, 0.22) 0%, rgba(14, 20, 32, 0.52) 60%, rgba(10, 12, 18, 0.78) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b101d]/65 via-transparent to-[#0a0c14]/75 pointer-events-none z-[1]" />

      {/* 3. Floating Sparkles */}
      <FloatingSparkles size={4} />

      {/* 4. Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-between items-center px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
        
        {/* Top Tagline: ── NƠI HỘI TỤ ── */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 pt-2">
          <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="font-sans text-[12px] sm:text-[14px] md:text-[15px] tracking-[0.35em] text-[#E5C158] uppercase font-bold drop-shadow-[0_0_10px_rgba(229,193,88,0.45)]">
            {topTagline}
          </span>
          <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Center Hero Block: Tinh hoa nghệ thuật uốn lượn uốn trên Tiêu đề hoành tráng */}
        <div className="flex flex-col items-center justify-center text-center my-auto py-6 sm:py-8">
          {/* Cursive script: "Tinh hoa nghệ thuật" (nguyên bản ban đầu) */}
          <p className="font-cursive text-[52px] sm:text-[76px] md:text-[96px] lg:text-[112px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFEBB0] to-[#E5C158] drop-shadow-[0_4px_24px_rgba(255,235,176,0.45)] leading-[0.95] tracking-normal select-none -mb-3 sm:-mb-5 md:-mb-7">
            {cursiveTitle}
          </p>

          {/* Monumental Main Headline */}
          <h1 className="font-sans text-[34px] sm:text-[54px] md:text-[70px] lg:text-[86px] font-black tracking-[0.04em] leading-[1.08] text-center max-w-5xl uppercase drop-shadow-[0_4px_32px_rgba(212,175,55,0.45)]">
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#FFE79A] to-[#C99824] bg-clip-text text-transparent filter drop-shadow-[0_2px_14px_rgba(255,223,115,0.5)]">
              {renderHeadline()}
            </span>
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-2xl">
            <Link
              to={cta1Link}
              className="w-full sm:w-auto min-w-[220px] sm:min-w-[250px] px-8 sm:px-11 py-3.5 sm:py-4 rounded-none sm:rounded bg-gradient-to-r from-[#DFB743] via-[#F3DE7E] to-[#C99824] hover:brightness-110 text-[#1b0609] font-bold text-sm sm:text-[15px] uppercase tracking-[0.2em] shadow-[0_4px_24px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center text-center whitespace-nowrap"
            >
              {cta1Text}
            </Link>
            <Link
              to={cta2Link}
              className="w-full sm:w-auto min-w-[220px] sm:min-w-[250px] px-8 sm:px-11 py-3.5 sm:py-4 rounded-none sm:rounded bg-[#120508]/85 hover:bg-[#220a0d] border border-[#D4AF37]/80 hover:border-[#FFDF73] text-[#FFDF73] font-bold text-sm sm:text-[15px] uppercase tracking-[0.2em] shadow-[0_4px_22px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center text-center whitespace-nowrap"
            >
              {cta2Text}
            </Link>
          </div>
        </div>

        {/* Bottom Quote: ── “Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.” ── */}
        {bottomQuoteText && (
          <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-3 sm:gap-6 pt-2 pb-2 opacity-90 hover:opacity-100 transition-opacity">
            <div className="h-px flex-1 max-w-[100px] sm:max-w-[180px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <p className="text-[14px] sm:text-[16px] md:text-[17px] italic text-[#FFEBB0] tracking-wide font-medium text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {bottomQuoteText}
            </p>
            <div className="h-px flex-1 max-w-[100px] sm:max-w-[180px] bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </div>
        )}

      </div>
    </section>
  );
};

export default HeroSection;
