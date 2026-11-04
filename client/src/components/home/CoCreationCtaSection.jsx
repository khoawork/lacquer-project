import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const CoCreationCtaSection = ({ pageProps }) => {
  const ctaTag = pageProps?.cta_tag || 'ĐỒNG KIẾN TẠO VĂN HÓA';
  const ctaHeadline = pageProps?.cta_headline || 'Cùng viết tiếp hành trình 100 năm';
  const ctaDesc =
    pageProps?.cta_desc ||
    'Dù bạn là nghệ sĩ, nghệ nhân, nhà nghiên cứu, doanh nghiệp, sinh viên hay người yêu nghệ thuật, luôn có một cách để bạn góp mặt trong hành trình này.';

  return (
    <section
      className="relative w-full py-28 border-t border-[#D4AF37]/30 text-center overflow-hidden"
      id="dong-kien-tao"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, rgb(58, 14, 20) 0%, rgb(38, 8, 12) 55%, rgb(23, 4, 6) 100%)',
      }}
    >
      {/* Ambient Gold Glow & Sparkles */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#D4AF37]/12 rounded-full blur-[150px] ambient-glow-disc" />
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-12 space-y-7 relative z-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#3e0808] to-[#1c0303] border-2 border-[#FFDF73]/70 flex items-center justify-center text-[#FFDF73] shadow-[0_0_35px_rgba(212,175,55,0.45)]">
          <span className="material-symbols-outlined text-[40px] font-bold">handshake</span>
        </div>
        <div className="space-y-3">
          <span className="font-serif text-[16px] tracking-[0.28em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
            {ctaTag}
          </span>
          <h2 className="font-serif text-[38px] md:text-[54px] font-bold text-gold-gradient leading-tight">
            {ctaHeadline}
          </h2>
          <p className="font-body text-[19px] md:text-[21px] text-[#FAF7F2] max-w-2xl mx-auto leading-[1.85]">
            {ctaDesc}
          </p>
        </div>

        {/* Action Buttons Trio */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <Link
            to="/contact"
            className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block text-center"
          >
            Đăng ký tham gia
          </Link>
          <Link
            to="/contact"
            className="btn-gold-outline w-full sm:w-auto px-8 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block text-center"
          >
            Đề xuất hợp tác
          </Link>
          <Link
            to="/contact"
            className="btn-gold-outline w-full sm:w-auto px-8 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block text-center"
          >
            Gửi tư liệu quý
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoCreationCtaSection;

