import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { ArrowRight, Mail } from 'lucide-react';
import { getImageUrl } from '../../configs/Apis';

const CollectionCtaSection = ({ pageProps }) => {
  const ctaImage = pageProps?.cta_image || pageProps?.hero_image;
  const ctaTag = pageProps?.cta_tag;
  const ctaHeadline = pageProps?.cta_headline;
  const ctaDesc = pageProps?.cta_desc;
  const ctaBtnText = pageProps?.cta_button_text || 'Đăng ký tham gia kiến tạo';
  const ctaBtnLink = pageProps?.cta_button_link || '/contact';

  if (!ctaHeadline && !ctaDesc && !ctaImage) return null;

  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 text-center border-t border-[#D4AF37]/25 overflow-hidden select-none"
      id="dong-kien-tao"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #2f0b10 0%, #1a0507 65%, #120304 100%)',
      }}
    >
      {/* Radiant Halo */}
      <div
        className="ambient-glow-disc absolute w-[600px] h-[600px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 215, 110, 0.28) 0%, rgba(140, 30, 45, 0.45) 55%, transparent 75%)',
        }}
      />

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative max-w-3xl mx-auto space-y-6 z-10">
        {ctaImage && (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto p-1 bg-gradient-to-br from-[#FFDF73]/50 via-[#260508] to-[#D4AF37]/60 shadow-[0_0_35px_rgba(255,223,115,0.6)] flex items-center justify-center">
            <img
              alt="Centennial Emblem"
              className="w-full h-full object-cover rounded-full brightness-110"
              src={getImageUrl(ctaImage)}
            />
          </div>
        )}

        {ctaTag && (
          <span className="font-serif text-[#FFDF73] tracking-[0.25em] uppercase block text-[13px] md:text-[14px] font-bold">
            {ctaTag}
          </span>
        )}

        {ctaHeadline && (
          <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] text-gold-gradient uppercase font-bold leading-tight">
            {ctaHeadline}
          </h2>
        )}

        {ctaDesc && (
          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90 leading-relaxed max-w-2xl mx-auto">
            {ctaDesc}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={ctaBtnLink}
            className="btn-gold px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <span>{ctaBtnText}</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </a>
          <a
            className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer inline-flex items-center gap-2"
            href="mailto:info@sonmaihoihoavietnam.com"
          >
            <Mail className="w-4 h-4" />
            <span>Liên hệ ban điều phối</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollectionCtaSection;

