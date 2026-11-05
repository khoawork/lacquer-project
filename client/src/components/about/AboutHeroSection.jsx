import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { getImageUrl } from '../../configs/Apis';

const AboutHeroSection = ({ pageProps }) => {
  const heroSeal = pageProps?.hero_image || pageProps?.hero_seal;
  const badgeText = pageProps?.badge;
  const headline = pageProps?.headline;
  const description = pageProps?.description;

  if (!headline && !description && !badgeText && !heroSeal) return null;

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background:
          'radial-gradient(circle at 50% 25%, rgba(52, 14, 19, 0.92) 0%, rgba(32, 8, 12) 0.95 50%, rgba(20, 5, 7, 0.98) 100%)',
      }}
    >
      {/* Atmospheric Lacquer Glows */}
      <div
        className="ambient-glow-disc absolute w-[650px] h-[650px] rounded-full blur-[130px] -top-28 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.26) 0%, rgba(105, 68, 54, 0.35) 60%, transparent 80%)',
        }}
      />
      <div
        className="ambient-glow-disc absolute w-[520px] h-[520px] rounded-full blur-[110px] bottom-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(110, 72, 60, 0.45) 0%, transparent 70%)',
        }}
      />

      {/* Floating Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Centennial Emblem Seal with Gold Glow & Ring */}
        {heroSeal && (
          <div className="mb-6 relative group">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-br from-[#FFDF73]/50 via-[#3a090e] to-[#D4AF37]/60 shadow-[0_0_40px_rgba(255,223,115,0.6)] group-hover:shadow-[0_0_65px_rgba(255,223,115,0.85)] transition-all duration-500 flex items-center justify-center">
              <img
                alt="Logo Kỷ nguyên Sơn Mài Hội hoạ Việt Nam"
                className="w-full h-full object-cover rounded-full brightness-110 drop-shadow-[0_0_15px_rgba(255,223,115,0.7)] transition-transform duration-700 group-hover:scale-105"
                src={getImageUrl(heroSeal)}
              />
            </div>
            <div className="absolute -inset-3 rounded-full border border-[#D4AF37]/50 pointer-events-none group-hover:scale-105 transition-transform duration-500" />
          </div>
        )}

        {/* Centennial Badge */}
        {badgeText && (
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] mb-6"
            style={{ background: 'rgba(50, 10, 10, 0.7)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#FFDF73]" />
            <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-[0.24em] uppercase font-bold">
              {badgeText}
            </span>
          </div>
        )}

        {/* Main Headline with Gold Gradient */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[54px] lg:leading-[64px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {headline}
        </h1>

        {/* Description Paragraph */}
        <p className="font-body text-[17px] md:text-[20px] md:leading-[1.9] text-[#FAF7F2] max-w-3xl mx-auto mb-10 text-center font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          {description}
        </p>

        {/* Traditional Calligraphy Emblem / Hairline Accent */}
        <div className="flex items-center justify-center gap-4 text-[#D4AF37]">
          <div className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="material-symbols-outlined text-[20px] text-[#FFDF73] drop-shadow-[0_0_8px_#FFDF73]">
            flare
          </span>
          <div className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;

