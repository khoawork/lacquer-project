import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const JourneyHeroSection = ({ pageProps }) => {
  const badge = pageProps?.badge;
  const subtitle = pageProps?.subtitle;
  const headline = pageProps?.headline;
  const description = pageProps?.description;
  const heroCtaText = pageProps?.hero_cta_text || 'KHÁM PHÁ HÀNH TRÌNH';
  const heroCtaLink = pageProps?.hero_cta_link || '#dong-thoi-gian';
  const bottomQuote = pageProps?.bottom_quote;

  if (!headline && !description && !badge) return null;

  return (
    <section
      className="relative z-10 w-full pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 25%, rgb(54, 13, 18) 0%, rgb(36, 8, 11) 48%, rgb(20, 5, 7) 100%)',
      }}
    >
      {/* Living Particles & Ambient Lights */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="ambient-glow-disc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/12 rounded-full blur-[140px]" />
        <div className="ambient-glow-disc absolute top-[10%] left-[-10%] w-[550px] h-[550px] bg-[#681010]/35 rounded-full blur-[160px]" />
        <div className="ambient-glow-disc absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-[#4a0808]/40 rounded-full blur-[160px]" />
      </div>

      {/* Eyebrow Badge */}
      {badge && (
        <div className="relative z-10 flex flex-col items-center mb-5">
          <div className="inline-flex items-center gap-2.5 px-6 py-1.5 rounded-full bg-[#2d0707]/90 border border-[#D4AF37]/45 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_12px_#FFDF73]" />
            <span className="font-serif text-[14px] md:text-[16px] tracking-[0.28em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
              {badge}
            </span>
          </div>
        </div>
      )}

      {/* Hero Narrative Main Area */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto py-2">
        {subtitle && (
          <p className="font-serif text-[20px] md:text-[24px] italic text-[#FFE599] tracking-[0.18em] uppercase mb-4 font-semibold text-center whitespace-nowrap drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
            {subtitle}
          </p>
        )}

        {headline && (
          <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[66px] lg:text-[72px] font-bold text-gold-gradient uppercase tracking-tight max-w-5xl leading-[1.12] drop-shadow-[0_4px_30px_rgba(212,175,55,0.4)] text-center mb-6 whitespace-pre-line">
            {headline}
          </h1>
        )}

        <div className="w-36 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mb-6 opacity-85 shadow-[0_0_10px_#FFDF73]" />

        {description && (
          <p className="font-body text-[18px] md:text-[20px] text-[#FAF7F2] max-w-3xl leading-[1.85] font-normal text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {description}
          </p>
        )}

        {heroCtaText && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 w-full max-w-xl">
            <a
              className="btn-gold w-full sm:w-auto px-9 py-4 rounded text-[15px] uppercase tracking-[0.18em] text-center font-bold whitespace-nowrap cursor-pointer inline-block"
              href={heroCtaLink}
            >
              {heroCtaText}
            </a>
          </div>
        )}
      </div>

      {/* Bottom Quote Bar */}
      {bottomQuote && (
        <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 mt-12 py-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
          <p className="font-serif text-[18px] md:text-[22px] italic text-[#FFDF73] tracking-wide font-medium text-center px-4 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(212,175,55,0.3)]">
            {bottomQuote}
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
        </div>
      )}
    </section>
  );
};

export default JourneyHeroSection;
