import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

import { getImageUrl } from '../../configs/Apis';

const CollectionHeroSection = ({ pageProps = null }) => {
  const logoSeal = pageProps?.hero_image || pageProps?.hero_seal;
  const badgeText = pageProps?.badge;
  const headlineText = pageProps?.headline;
  const descText = pageProps?.description;

  if (!headlineText && !descText && !badgeText && !logoSeal) return null;

  return (
    <section
      className="relative w-full overflow-hidden px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-28 select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 20%, #340e14 0%, #24080b 42%, #190507 72%, #120304 100%)',
      }}
    >
      {/* Ambient Lacquer Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(82,21,21,0.4) 0%, transparent 75%)',
          }}
        />
      </div>

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      {/* Watermark Artistic Heritage Logo Background */}
      {logoSeal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.11] max-w-xl w-full flex items-center justify-center">
          <img
            alt=""
            className="w-[480px] h-[480px] object-contain rounded-full filter contrast-125"
            src={getImageUrl(logoSeal)}
          />
        </div>
      )}

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        {/* Archival Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: 'rgba(44, 11, 11, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 0 16px rgba(212, 175, 55, 0.2)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#FFDF73', boxShadow: '0 0 8px #FFDF73' }}
          />
          <span className="font-serif uppercase text-[12px] md:text-[13px] tracking-[0.25em] font-bold text-[#FFDF73]">
            {badgeText}
          </span>
        </div>

        {/* Main Monumental Heading */}
        <h1 className="font-serif text-[38px] sm:text-[50px] md:text-[58px] lg:text-[66px] leading-tight font-bold uppercase tracking-tight mb-6 text-gold-gradient drop-shadow-[0_4px_22px_rgba(255,223,115,0.45)]">
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
              <span className="font-serif text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                99
              </span>
              <span className="font-serif text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                Tác Phẩm Độc Bản Cửu Cửu
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <span className="font-serif text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                100
              </span>
              <span className="font-serif text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                Mô-đun Đồng Kiến Tạo
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <span className="font-serif text-[34px] md:text-[40px] font-bold text-gold-gradient mb-1 tracking-tight">
                01
              </span>
              <span className="font-serif text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                Tuyệt Phẩm Du Lãm Vespa
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 md:pt-2">
              <div className="flex items-center gap-1.5 text-[#FFDF73] mb-1">
                <Award className="w-6 h-6 text-[#FFDF73]" />
                <span className="font-serif text-[22px] md:text-[24px] font-bold tracking-wide">
                  VIETKINGS
                </span>
              </div>
              <span className="font-serif text-[#EADBCE] uppercase text-[12px] md:text-[13px] tracking-wider font-semibold">
                Hồ Sơ Đang Giám Định Di Sản
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHeroSection;

