import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const LeadershipHeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge;
  const headline = pageProps?.headline;
  const description = pageProps?.description;

  if (!headline && !description && !badgeText) return null;

  return (
    <section className="relative w-full pt-16 md:pt-20 pb-16 text-center select-none overflow-hidden">
      {/* Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_0_15px_rgba(233,195,73,0.2),0_4px_20px_rgba(0,0,0,0.5)] mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(60, 15, 20, 0.75) 0%, rgba(30, 8, 11, 0.85) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#FFDF73]" />
          <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-[0.24em] uppercase font-bold whitespace-nowrap">
            {badgeText}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#FFDF73]" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[38px] sm:text-[50px] md:text-[62px] lg:text-[68px] uppercase tracking-tight text-gold-gradient max-w-5xl mx-auto leading-[1.14] mb-5 font-bold">
          {headline}
        </h1>

        {/* Narrative Description */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-4xl mx-auto leading-[1.85] text-balance mb-10 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default LeadershipHeroSection;
export { LeadershipHeroSection };

