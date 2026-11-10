import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const JourneyCtaSection = ({ pageProps }) => {
  const ctaTag = pageProps?.cta_tag;
  const ctaHeadline = pageProps?.cta_headline;
  const ctaDesc = pageProps?.cta_desc;
  const ctaBtn1Text = pageProps?.cta_btn1_text || 'Trở thành một phần của hành trình';
  const ctaBtn1Link = pageProps?.cta_btn1_link || '/contact';
  const ctaBtn2Text = pageProps?.cta_btn2_text || 'Đề xuất hợp tác';
  const ctaBtn2Link = pageProps?.cta_btn2_link || '/contact';

  if (!ctaHeadline && !ctaDesc) return null;

  return (
    <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-12 text-center overflow-hidden">
      {/* Ambient background lights */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#D4AF37]/12 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      <div className="max-w-4xl mx-auto space-y-7 relative z-10">
        <div className="space-y-3">
          {ctaHeadline && (
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-bold text-gold-gradient uppercase tracking-tight leading-[1.1] py-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {ctaHeadline}
            </h2>
          )}

          {ctaDesc && (
            <p className="font-body text-[18px] md:text-[19px] text-[#FAF7F2] max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-normal">
              {ctaDesc}
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ctaBtn1Link}
            className="btn-gold inline-flex items-center justify-center px-8 py-3.5 rounded text-[15px] uppercase tracking-wider font-bold shadow-xl whitespace-nowrap cursor-pointer"
          >
            {ctaBtn1Text}
          </Link>
          <Link
            to={ctaBtn2Link}
            className="btn-gold-outline inline-flex items-center justify-center px-8 py-3.5 rounded text-[15px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer"
          >
            {ctaBtn2Text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyCtaSection;
