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
      className="relative w-full pt-[46px] pb-20 lg:pb-28 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background:
          'radial-gradient(circle at 50% 25%, rgb(54, 13, 18) 0%, rgb(36, 8, 11) 48%, rgb(20, 5, 7) 100%)',
      }}
    >
      {/* Living Particles & Ambient Lights */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="ambient-glow-disc absolute top-[10%] left-[-10%] w-[550px] h-[550px] bg-[#681010]/35 rounded-full blur-[160px]" />
        <div className="ambient-glow-disc absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-[#4a0808]/40 rounded-full blur-[160px]" />
      </div>

      {/* Hero Narrative Main Area */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto py-2">
        {headline && (
          <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {headline}
          </h1>
        )}


        {description && (
          <p className="font-body text-[18px] md:text-[19px] md:leading-[1.9] text-[#FAF7F2] max-w-3xl leading-[1.85] font-normal text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
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
          <p className="font-sans text-[17px] md:text-[20px] italic text-[#E6CA65] tracking-wide font-medium text-center px-4 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {bottomQuote}
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
        </div>
      )}
    </section>
  );
};

export default JourneyHeroSection;
