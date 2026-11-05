import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';
import { getImageUrl } from '../../configs/Apis';

const HeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge || '';
  const subtitleText = pageProps?.subtitle || '';
  const headlineText = pageProps?.headline || '';
  const quoteText = pageProps?.quote || '';
  const cta1Text = pageProps?.hero_cta1_text || '';
  const cta1Link = pageProps?.hero_cta1_link || '/journey';
  const cta2Text = pageProps?.hero_cta2_text || '';
  const cta2Link = pageProps?.hero_cta2_link || '/contact';
  const bottomQuoteText = pageProps?.bottom_quote || '';
  const heroImage = pageProps?.hero_image || '';

  return (
    <section
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between items-center text-center px-5 md:px-12 pt-20 pb-14 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgb(54, 13, 19) 0%, rgb(37, 8, 12) 55%, rgb(22, 4, 6) 100%)',
      }}
    >
      {/* Floating Sparkles & Center Ambient Glow */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D4AF37]/10 rounded-full blur-[140px] ambient-glow-disc" />
      </div>

      {/* Center Lacquer Bloom Graphic with Gold Glow Halo */}
      {heroImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <div className="relative w-[550px] h-[550px] md:w-[680px] md:h-[680px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_120px_rgba(212,175,55,0.45)] border border-[#D4AF37]/35 p-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3a0808]/70 via-transparent to-[#D4AF37]/20 rounded-full" />
            <img
              alt="Kỷ nguyên Sơn Mài Biểu Trưng"
              className="w-full h-full object-cover rounded-full filter drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
              src={getImageUrl(heroImage)}
            />
          </div>
        </div>
      )}

      {/* Top Badge Milestone */}
      <div className="relative z-10 flex flex-col items-center mt-3">
        <div className="inline-flex items-center gap-2.5 px-6 py-1.5 rounded-full bg-[#2d0707]/90 border border-[#D4AF37]/45 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_12px_#FFDF73]" />
          <span className="font-serif text-[14px] md:text-[16px] tracking-[0.28em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Center Hero Narrative */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto py-6">
        <p className="font-serif text-[20px] md:text-[24px] italic text-[#FFE599] tracking-[0.18em] uppercase mb-3 font-semibold text-center whitespace-nowrap">
          {subtitleText}
        </p>
        <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-bold text-gold-gradient uppercase tracking-wide max-w-5xl leading-[1.12] drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] text-center">
          {headlineText}
        </h1>
        <div className="w-36 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent my-6 opacity-85 shadow-[0_0_10px_#FFDF73]" />
        <p className="font-body text-[18px] md:text-[21px] text-[#FAF7F2] max-w-3xl leading-[1.85] font-normal text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {quoteText}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 w-full max-w-xl">
          <Link
            to={cta1Link}
            className="btn-gold w-full sm:w-auto px-9 py-4 rounded text-[16px] uppercase tracking-[0.18em] text-center font-bold whitespace-nowrap inline-block"
          >
            {cta1Text}
          </Link>
          <Link
            to={cta2Link}
            className="btn-gold-outline w-full sm:w-auto px-9 py-4 rounded text-[16px] uppercase tracking-[0.18em] text-center font-bold whitespace-nowrap inline-block"
          >
            {cta2Text}
          </Link>
        </div>
      </div>

      {/* Bottom Emblem Quote */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 py-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
        <p className="font-serif text-[18px] md:text-[22px] italic text-[#FFDF73] tracking-wide font-medium text-center px-4 whitespace-nowrap drop-shadow-[0_0_12px_rgba(255,223,115,0.4)]">
          {bottomQuoteText}
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
      </div>
    </section>
  );
};

export default HeroSection;