import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const CollectionCtaSection = ({ pageProps }) => {
  const ctaTag = pageProps?.cta_tag || 'KẾT NỐI DI SẢN BÁCH NIÊN';
  const ctaHeadline = pageProps?.cta_headline || 'BẠN MUỐN ĐỒNG KIẾN TẠO CÙNG CHÚNG TÔI?';
  const ctaDesc =
    pageProps?.cta_desc ||
    'Mỗi nghệ sĩ, nhà nghiên cứu, hay người yêu mỹ thuật đều có thể đóng góp một nét sơn trong trang sử mới của nghệ thuật sơn mài Việt Nam.';
  const ctaBtnText = pageProps?.cta_button_text || 'ĐĂNG KÝ THAM GIA KIẾN TẠO';
  const ctaBtnLink = pageProps?.cta_button_link || '/contact';
  const ctaSecBtnText = pageProps?.cta_secondary_button_text || 'LIÊN HỆ BAN ĐIỀU PHỐI';
  const ctaSecBtnLink = pageProps?.cta_secondary_button_link || '/contact';

  if (!ctaHeadline && !ctaDesc) return null;

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

      {/* Floating Gold Sparkles */}
      <FloatingSparkles size={4.5} />

      <div className="relative max-w-3xl mx-auto space-y-6 z-10">
        {ctaTag && (
          <span className="font-sans text-[#FFDF73] tracking-[0.25em] uppercase block text-[13px] md:text-[14px] font-bold">
            {ctaTag}
          </span>
        )}

        {ctaHeadline && (
          <h2 className="font-sans text-[30px] sm:text-[38px] md:text-[44px] text-gold-gradient uppercase font-bold leading-tight">
            {ctaHeadline}
          </h2>
        )}

        {ctaDesc && (
          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90 leading-relaxed max-w-2xl mx-auto">
            {ctaDesc}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ctaBtnLink}
            className="btn-gold px-8 py-3.5 rounded-lg text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer inline-flex items-center justify-center shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.55)] transition-all"
          >
            <span>{ctaBtnText}</span>
          </a>
          <a
            className="btn-gold-outline px-8 py-3.5 rounded-lg text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer inline-flex items-center justify-center transition-all"
            href={ctaSecBtnLink}
          >
            <span>{ctaSecBtnText}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollectionCtaSection;
