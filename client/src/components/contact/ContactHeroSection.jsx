import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const ContactHeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge;
  const headline = pageProps?.headline;
  const description = pageProps?.description;

  if (!headline && !description && !badgeText) return null;

  return (
    <section className="flex flex-col items-center text-center relative z-10 pt-16 md:pt-20 pb-10 select-none overflow-hidden">
      {/* Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Archival Badge */}
        {badgeText && (
          <div
            className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_0_15px_rgba(233,195,73,0.2),0_4px_20px_rgba(0,0,0,0.5)] mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(60, 15, 20, 0.75) 0%, rgba(30, 8, 11, 0.85) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9C349] animate-pulse shadow-[0_0_8px_#e9c349]" />
            <span
              className="font-serif text-[13px] md:text-[14px] tracking-[0.22em] uppercase font-bold whitespace-nowrap"
              style={{ color: '#FFDF73', textShadow: '0 0 10px rgba(255, 223, 115, 0.4)' }}
            >
              {badgeText}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9C349] animate-pulse shadow-[0_0_8px_#e9c349]" />
          </div>
        )}

        {/* Monumental Headline */}
        <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] lg:text-[66px] lg:leading-[1.15] text-gold-gradient max-w-5xl tracking-tight mb-5 font-bold uppercase drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
          {headline}
        </h1>

        {/* Curatorial Subtitle */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-3xl leading-[1.85] text-center font-normal opacity-95 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {description}
        </p>

        {/* Atmospheric Separator Glyph */}
        <div className="flex items-center justify-center w-full max-w-md gap-4 my-2 opacity-80">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="w-2.5 h-2.5 rotate-45 border border-[#FFDF73] bg-[#AA820A] shadow-[0_0_8px_rgba(255,223,115,0.6)]" />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;

