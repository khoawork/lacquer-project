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
          {ctaTag && (
            <span className="font-serif text-[15px] md:text-[16px] tracking-[0.28em] text-[#FFDF73] uppercase font-bold whitespace-nowrap block">
              {ctaTag}
            </span>
          )}

          {ctaHeadline && (
            <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-bold text-gold-gradient uppercase tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(212,175,55,0.45)]">
              {ctaHeadline}
            </h2>
          )}

          {ctaDesc && (
            <p className="font-body text-[18px] md:text-[20px] text-[#FAF7F2] max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-normal">
              {ctaDesc}
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ctaBtn1Link}
            className="btn-gold px-10 py-4 rounded text-[16px] uppercase tracking-[0.16em] font-bold shadow-xl whitespace-nowrap cursor-pointer inline-block"
          >
            {ctaBtn1Text}
          </Link>
          <Link
            to={ctaBtn2Link}
            className="btn-gold-outline px-8 py-4 rounded text-[16px] uppercase tracking-[0.16em] font-bold whitespace-nowrap cursor-pointer inline-block"
          >
            {ctaBtn2Text}
          </Link>
        </div>

        <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-8 opacity-70" />

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[#FFDF73]/90 font-serif text-[14px] tracking-widest uppercase">
          <Link to="/contact" className="hover:text-[#FFF3CC] transition-colors font-semibold">
            ĐĂNG KÝ THAM GIA
          </Link>
          <span className="text-[#D4AF37]/50">•</span>
          <Link to="/contact" className="hover:text-[#FFF3CC] transition-colors font-semibold">
            ĐỀ XUẤT HỢP TÁC
          </Link>
          <span className="text-[#D4AF37]/50">•</span>
          <Link to="/contact" className="hover:text-[#FFF3CC] transition-colors font-semibold">
            GỬI TƯ LIỆU QUÝ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyCtaSection;
