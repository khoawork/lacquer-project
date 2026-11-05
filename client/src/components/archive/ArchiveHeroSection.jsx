import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Award } from 'lucide-react';

export default function ArchiveHeroSection({ pageProps }) {
  const badge = pageProps?.badge;
  const headline = pageProps?.headline;
  const description = pageProps?.description;

  if (!headline && !description && !badge) return null;
  return (
    <section
      className="relative w-full overflow-hidden pt-16 pb-24 text-stone-100 select-none"
      style={{
        background:
          'radial-gradient(ellipse at 50% 18%, rgba(212, 175, 55, 0.22) 0%, transparent 65%), linear-gradient(180deg, #320d12 0%, #24080b 50%, #1a0507 100%)',
      }}
    >
      {/* Atmospheric gold foil dust & ambient lacquer glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(233,195,73,0.18),transparent_58%)]" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#FFDF73]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#521515]/30 blur-[90px]" />

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      {/* Fine filigree grid / lacquer sheen overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(233,195,73,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(233,195,73,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        {/* Archival Badge */}
        {badge && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(233,195,73,0.25)] mb-6 backdrop-blur-md"
            style={{
              background:
                'linear-gradient(135deg, rgba(60, 16, 22, 0.65) 0%, rgba(30, 8, 12, 0.75) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
            }}
          >
            <span className="text-[#D4AF37] text-[13px] leading-none select-none">✦</span>
            <span
              className="font-serif text-[12px] md:text-[13px] tracking-[0.22em] uppercase font-bold text-[#FFDF73]"
              style={{ textShadow: '0 0 10px rgba(255, 223, 115, 0.3)' }}
            >
              {badge}
            </span>
            <span className="text-[#D4AF37] text-[13px] leading-none select-none">✦</span>
          </div>
        )}

        {/* Main Display Title with Royal Gold Gradient */}
        {headline && (
          <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[58px] lg:text-[64px] max-w-5xl tracking-tight leading-tight text-gold-gradient drop-shadow-[0_4px_20px_rgba(255,223,115,0.45)] mb-6 font-bold uppercase">
            {headline}
          </h1>
        )}

        {/* Curatorial Archival Description */}
        {description && (
          <p
            className="font-body text-[17px] md:text-[19px] max-w-4xl leading-[1.85] text-center font-normal tracking-wide opacity-95 mb-12"
            style={{ color: '#FAF7F2', textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)' }}
          >
            {description}
          </p>
        )}

        {/* Archive Metrics Bar */}
        <div
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
          style={{
            background: 'rgba(35, 9, 12, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow:
              '0 16px 40px rgba(0, 0, 0, 0.85), inset 0 0 20px rgba(212, 175, 55, 0.08)',
          }}
        >
          {/* Metric 1 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center border-r border-[#D4AF37]/20">
            <span className="font-serif text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              05
            </span>
            <span className="font-serif uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              Phân Hệ Tri Thức Cốt Lõi
            </span>
            <span className="font-serif text-[11px] text-[#EADBCE]/80 mt-0.5">
              Tiêu chuẩn viện bảo tàng
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center md:border-r border-[#D4AF37]/20">
            <span className="font-serif text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              100+
            </span>
            <span className="font-serif uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              Chuyên Khảo & Nghiên Cứu
            </span>
            <span className="font-serif text-[11px] text-[#EADBCE]/80 mt-0.5">
              Học giả & Nghệ nhân kỳ cựu
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center border-r border-[#D4AF37]/20">
            <span className="font-serif text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              07
            </span>
            <span className="font-serif uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              Kỳ Hành Trình Lưu Trữ Số
            </span>
            <span className="font-serif text-[11px] text-[#EADBCE]/80 mt-0.5">
              Hồ sơ đa phương tiện 4K
            </span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center">
            <div className="flex items-center gap-1.5 h-[52px]">
              <Award className="w-6 h-6 text-[#FFDF73]" />
              <span className="font-serif text-[24px] md:text-[26px] text-gold-gradient font-bold tracking-widest">
                VIETKINGS
              </span>
            </div>
            <span className="font-serif uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] font-bold">
              Chuẩn Hóa Kiểm Chứng
            </span>
            <span className="font-serif text-[11px] text-[#EADBCE]/80 mt-0.5">
              Xác thực kỷ lục di sản
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ArchiveHeroSection };
