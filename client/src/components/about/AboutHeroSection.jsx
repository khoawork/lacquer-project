import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const AboutHeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge;
  const headline = pageProps?.headline;
  const description = pageProps?.description;

  if (!headline && !description && !badgeText) return null;

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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Main Headline with Gold Gradient */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {headline}
        </h1>

        {/* Description Paragraph */}
        <p className="font-body text-[18px] md:text-[19px] md:leading-[1.9] text-[#FAF7F2] max-w-3xl mx-auto mb-10 text-center font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
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

