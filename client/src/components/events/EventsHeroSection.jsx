import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const EventsHeroSection = ({ pageProps = null }) => {
  const badgeText = pageProps?.badge || 'SỰ KIỆN & HOẠT ĐỘNG DI SẢN • 1930–2030';
  const headlineText = pageProps?.headline || 'NƠI DI SẢN ĐƯỢC THỰC HÀNH';
  const descText =
    pageProps?.description ||
    'Mỗi sự kiện là một điểm gặp giữa tri thức và hành động: người nghiên cứu gặp người làm nghề, nghệ sĩ gặp doanh nghiệp, chất liệu truyền thống gặp công nghệ mới và công chúng trở thành một phần của quá trình sáng tạo.';

  const stat1Num = pageProps?.stat1_num || '07';
  const stat1Label = pageProps?.stat1_label || 'Kỳ Hành Trình Di Sản';
  const stat2Num = pageProps?.stat2_num || '100+';
  const stat2Label = pageProps?.stat2_label || 'Nghệ Sĩ & Học Giả';
  const stat3Num = pageProps?.stat3_num || '30+';
  const stat3Label = pageProps?.stat3_label || 'Viện Đào Tạo & Doanh Nghiệp';
  const stat4Num = pageProps?.stat4_num || '1930–2030';
  const stat4Label = pageProps?.stat4_label || 'Kỷ Nguyên Bách Niên';

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 flex flex-col items-center text-center overflow-hidden">
      {/* Gold Dust Ambient Particles */}
      <FloatingSparkles size={4.5} />

      {/* Bordeaux lacquer center halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full blur-[110px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(120, 28, 36, 0.42) 0%, rgba(68, 14, 20, 0.28) 55%, transparent 80%)',
        }}
      />

      {/* Eyebrow Pill */}
      {badgeText && (
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#24080b]/90 border border-[#D4AF37]/40 text-[#FFDF73] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span
            className="material-symbols-outlined text-[15px] text-[#FFDF73]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="font-serif text-[12px] md:text-[13px] tracking-[0.22em] uppercase font-semibold text-[#FFF3CC]">
            {badgeText}
          </span>
          <span
            className="material-symbols-outlined text-[15px] text-[#FFDF73]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
      )}

      {/* Monumental Typography Heading */}
      {headlineText && (
        <h1 className="font-serif text-[42px] md:text-[62px] md:leading-[72px] text-gold-gradient tracking-tight max-w-5xl mb-6 font-bold uppercase drop-shadow-[0_2px_16px_rgba(212,175,55,0.35)]">
          {headlineText}
        </h1>
      )}

      {/* Philosophical Curatorial Statement */}
      {descText && (
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-3xl leading-relaxed text-balance opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {descText}
        </p>
      )}

      {/* Visual Archival Metric Bar */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl p-5 md:p-6 rounded-xl border border-[#D4AF37]/35 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md"
        style={{
          background:
            'linear-gradient(180deg, rgba(46, 13, 18, 0.85) 0%, rgba(24, 7, 10, 0.92) 100%)',
        }}
      >
        <div className="flex flex-col items-center text-center p-3 border-r border-[#D4AF37]/20 last:border-r-0">
          <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
            {stat1Num}
          </span>
          <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
            {stat1Label}
          </span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-r border-[#D4AF37]/20 last:border-r-0">
          <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
            {stat2Num}
          </span>
          <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
            {stat2Label}
          </span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-r border-[#D4AF37]/20 last:border-r-0">
          <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
            {stat3Num}
          </span>
          <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
            {stat3Label}
          </span>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
            {stat4Num}
          </span>
          <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
            {stat4Label}
          </span>
        </div>
      </div>
    </section>
  );
};

export default EventsHeroSection;

