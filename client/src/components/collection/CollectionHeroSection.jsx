import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

const CollectionHeroSection = ({ pageProps = null }) => {
  const badgeText = pageProps?.badge;
  const headlineText = pageProps?.headline;
  const descText = pageProps?.description;

  if (!headlineText && !descText && !badgeText) return null;

  return (
    <section
      className="relative w-full overflow-hidden px-4 md:px-8 lg:px-12 pt-[46px] pb-16 md:pb-24 lg:pb-28 select-none flex flex-col items-center justify-center text-center"
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

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        {/* Main Monumental Heading */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {headlineText}
        </h1>

        {/* Curatorial Thesis Narrative */}
        <p className="font-body text-[17px] md:text-[19px] leading-[1.9] max-w-3xl mb-12 text-[#FAF7F2]/95 font-normal">
          {descText}
        </p>

        {/* Heritage Metrics Plinth */}
        <div
          className="w-full max-w-4xl p-6 md:p-8 rounded-xl relative overflow-hidden card-lacquer"
          style={{
            background: 'rgba(26, 5, 7, 0.88)',
            border: '1px solid rgba(212, 175, 55, 0.38)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/25">
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <span className="font-sans text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                {pageProps?.stat1_num || '99'}
              </span>
              <span className="font-sans text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                {pageProps?.stat1_label || 'Tác Phẩm Độc Bản Cửu Cửu'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <span className="font-sans text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                {pageProps?.stat2_num || '100'}
              </span>
              <span className="font-sans text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                {pageProps?.stat2_label || 'Mô-đun Đồng Kiến Tạo'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <span className="font-sans text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                {pageProps?.stat3_num || '01'}
              </span>
              <span className="font-sans text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                {pageProps?.stat3_label || 'Tuyệt Phẩm Du Lãm Vespa'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <div className="flex items-center gap-1.5 text-[#FFDF73] mb-1">
                <Award className="w-6 h-6 text-[#FFDF73]" />
                <span className="font-sans text-[22px] md:text-[24px] font-bold tracking-wide">
                  {pageProps?.stat4_num || 'VIETKINGS'}
                </span>
              </div>
              <span className="font-sans text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                {pageProps?.stat4_label || 'Hồ Sơ Đang Giám Định Di Sản'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHeroSection;

