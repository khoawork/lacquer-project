import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Award } from 'lucide-react';
import { getImageUrl } from '../../configs/Apis';

export default function ArchiveHeroSection({ pageProps }) {
  const badge = pageProps?.badge || 'HỒ SƠ KHẢO CỨU QUỐC GIA';
  const headline = pageProps?.headline || 'KHO TRI THỨC CỦA MỘT DI SẢN ĐANG SỐNG';
  const description =
    pageProps?.description ||
    'Kỷ yếu không chỉ ghi lại những gì đã xảy ra. Đây là không gian tập hợp, kiểm chứng và kết nối tri thức để mỗi thế hệ có thể tiếp tục nghiên cứu, thực hành và viết thêm chương mới cho sơn mài hội họa Việt Nam.';
  const coverImage = pageProps?.cover_image;

  const stat1Num = pageProps?.stat1_num || '05';
  const stat1Label = pageProps?.stat1_label || 'Phân Hệ Tri Thức Cốt Lõi';
  const stat1Sub = pageProps?.stat1_sub || 'Tiêu chuẩn viện bảo tàng';

  const stat2Num = pageProps?.stat2_num || '100+';
  const stat2Label = pageProps?.stat2_label || 'Chuyên Khảo & Nghiên Cứu';
  const stat2Sub = pageProps?.stat2_sub || 'Học giả & Nghệ nhân kỳ cựu';

  const stat3Num = pageProps?.stat3_num || '07';
  const stat3Label = pageProps?.stat3_label || 'Kỳ Hành Trình Lưu Trữ Số';
  const stat3Sub = pageProps?.stat3_sub || 'Hồ sơ đa phương tiện 4K';

  const stat4Num = pageProps?.stat4_num || 'VIETKINGS';
  const stat4Label = pageProps?.stat4_label || 'Chuẩn Hóa Kiểm Chứng';
  const stat4Sub = pageProps?.stat4_sub || 'Xác thực kỷ lục di sản';

  return (
    <section
      className="relative w-full overflow-hidden pt-[46px] pb-24 text-stone-100 select-none flex flex-col items-center justify-center text-center"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        {/* Main Display Title with Royal Gold Gradient */}
        {headline && (
          <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
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

        {/* Optional Cover Image Preview */}
        {coverImage && (
          <div className="mb-12 max-w-md w-full rounded-2xl p-2 bg-[#200508]/80 border border-[#D4AF37]/35 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
            <img
              src={getImageUrl(coverImage)}
              alt="Bìa Kỷ Yếu"
              className="w-full h-auto rounded-xl object-cover filter contrast-105"
            />
          </div>
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
            <span className="font-sans text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              {stat1Num}
            </span>
            <span className="font-sans uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              {stat1Label}
            </span>
            <span className="font-sans text-[11px] text-[#EADBCE]/80 mt-0.5">
              {stat1Sub}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center md:border-r border-[#D4AF37]/20">
            <span className="font-sans text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              {stat2Num}
            </span>
            <span className="font-sans uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              {stat2Label}
            </span>
            <span className="font-sans text-[11px] text-[#EADBCE]/80 mt-0.5">
              {stat2Sub}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center border-r border-[#D4AF37]/20">
            <span className="font-sans text-[36px] md:text-[44px] leading-tight text-gold-gradient font-bold tracking-tight">
              {stat3Num}
            </span>
            <span className="font-sans uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] mt-1 font-bold">
              {stat3Label}
            </span>
            <span className="font-sans text-[11px] text-[#EADBCE]/80 mt-0.5">
              {stat3Sub}
            </span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center justify-center py-2 px-3 text-center">
            <div className="flex items-center gap-1.5 h-[52px]">
              <Award className="w-6 h-6 text-[#FFDF73]" />
              <span className="font-sans text-[24px] md:text-[26px] text-gold-gradient font-bold tracking-widest">
                {stat4Num}
              </span>
            </div>
            <span className="font-sans uppercase tracking-[0.14em] text-[#FAF7F2] text-[12px] md:text-[13px] font-bold">
              {stat4Label}
            </span>
            <span className="font-sans text-[11px] text-[#EADBCE]/80 mt-0.5">
              {stat4Sub}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ArchiveHeroSection };
