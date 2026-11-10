import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';

const EventsCtaSection = ({ pageProps }) => {
  const ctaHeadline = pageProps?.cta_headline;
  const ctaDesc = pageProps?.cta_desc;
  const ctaBtnText = pageProps?.cta_button_text || 'Đăng ký Tham Luận & Tác Phẩm';
  const ctaBtnLink = pageProps?.cta_button_link || '/contact';

  if (!ctaHeadline && !ctaDesc) return null;

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden flex flex-col items-center justify-center text-center select-none"
      style={{
        background:
          'radial-gradient(circle, rgba(55, 14, 20, 0.96) 0%, rgba(32, 7, 11, 0.98) 50%, rgb(18, 4, 6) 100%)',
      }}
    >
      {/* Radiant Halo */}
      <div
        className="ambient-glow-disc absolute w-[600px] h-[600px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 215, 110, 0.32) 0%, rgba(140, 30, 45, 0.45) 55%, transparent 75%)',
        }}
      />

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {ctaHeadline && (
          <h2 className="font-sans text-3xl lg:text-[46px] lg:leading-[54px] text-gold-gradient font-bold tracking-tight">
            {ctaHeadline}
          </h2>
        )}

        {ctaDesc && (
          <p className="font-body text-[19px] md:text-[20px] text-[#FAF7F2] max-w-2xl mx-auto leading-relaxed">
            {ctaDesc}
          </p>
        )}

        {/* Nút kêu gọi hành động gọn gàng chuẩn mực */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            className="btn-gold inline-flex items-center justify-center px-6 py-2.5 rounded text-[13px] md:text-[14px] tracking-wider uppercase shadow-xl font-bold cursor-pointer"
            href={ctaBtnLink}
          >
            {ctaBtnText}
            <ArrowRight className="ml-2 w-4 h-4 font-bold" />
          </a>
          <a
            className="btn-gold-outline inline-flex items-center justify-center px-5 py-2.5 rounded text-[13px] md:text-[14px] tracking-wider uppercase shadow-md cursor-pointer font-bold"
            href="#brochure"
            onClick={(e) => {
              e.preventDefault();
              alert('Tài liệu tóm lược thông tin sự kiện đang được xuất bản thành file PDF.');
            }}
          >
            <FileText className="mr-2 w-4 h-4" />
            Tải Brochure Sự Kiện (PDF)
          </a>
        </div>

        {/* Chân thẻ các trụ cột */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[#FFDF73] font-sans text-[13px] md:text-[14px] uppercase tracking-widest font-semibold">
          <span>Tọa đàm chuyên sâu</span>
          <span className="text-[#D4AF37]/60">•</span>
          <span>Trưng bày di sản</span>
          <span className="text-[#D4AF37]/60">•</span>
          <span>Số hóa tư liệu</span>
          <span className="text-[#D4AF37]/60">•</span>
          <span>Kết nối thị trường</span>
        </div>
      </div>
    </section>
  );
};

export default EventsCtaSection;

