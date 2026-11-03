import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const HeroSection = () => {
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
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
        <div className="relative w-[550px] h-[550px] md:w-[680px] md:h-[680px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_120px_rgba(212,175,55,0.45)] border border-[#D4AF37]/35 p-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3a0808]/70 via-transparent to-[#D4AF37]/20 rounded-full" />
          <img
            alt="Kỷ nguyên Sơn Mài Biểu Trưng"
            className="w-full h-full object-cover rounded-full filter drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6q50uNbfjHPDj6-2aHqeSR8DW1g_492VREK_fAsMYMK3DQhFaFVLvrzrgBfkcJiOO2Tais7QvRuBF8ALjaz4nBsOtz2_OYNR9WdWGDVxkBf7NcORDAYbMcd2mrPyEmwkKfmDP20xLS_6bePaBtTvSZ-Ka5jNUCOMMIDzFfKoQnsM1b5MSjmOee7IfSPeNcTZstFNnDOBIGFaWlb4VwSZlLpre2zH2b53XVJdHercK7LRBB90ttJrMYIg2tBWbMCmHl44"
          />
        </div>
      </div>

      {/* Top Badge Milestone */}
      <div className="relative z-10 flex flex-col items-center mt-3">
        <div className="inline-flex items-center gap-2.5 px-6 py-1.5 rounded-full bg-[#2d0707]/90 border border-[#D4AF37]/45 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_12px_#FFDF73]" />
          <span className="font-serif text-[14px] md:text-[16px] tracking-[0.28em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
            1930 • 2030 • BÁCH NIÊN KHỞI SẮC
          </span>
        </div>
      </div>

      {/* Center Hero Narrative */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto py-6">
        <p className="font-serif text-[20px] md:text-[24px] italic text-[#FFE599] tracking-[0.18em] uppercase mb-3 font-semibold text-center whitespace-nowrap">
          Bản Sắc Hội Họa &amp; Di Sản Nghệ Thuật
        </p>
        <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-bold text-gold-gradient uppercase tracking-wide max-w-5xl leading-[1.12] drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] text-center">
          HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM
        </h1>
        <div className="w-36 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent my-6 opacity-85 shadow-[0_0_10px_#FFDF73]" />
        <p className="font-body text-[18px] md:text-[21px] text-[#FAF7F2] max-w-3xl leading-[1.85] font-normal text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Từ những lớp sơn then, son thắm được tích tụ và mài lộ qua thời gian, một ngôn ngữ hội họa mang bản sắc Việt đã thành hình. Hành trình 1930–2030 kết nối quá khứ, hiện tại và tương lai để di sản không chỉ được gìn giữ, mà tiếp tục sống, sáng tạo và sinh dưỡng những giá trị mới.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 w-full max-w-xl">
          <Link
            to="/journey"
            className="btn-gold w-full sm:w-auto px-9 py-4 rounded text-[16px] uppercase tracking-[0.18em] text-center font-bold whitespace-nowrap inline-block"
          >
            KHÁM PHÁ HÀNH TRÌNH
          </Link>
          <Link
            to="/contact"
            className="btn-gold-outline w-full sm:w-auto px-9 py-4 rounded text-[16px] uppercase tracking-[0.18em] text-center font-bold whitespace-nowrap inline-block"
          >
            THAM GIA ĐỒNG KIẾN TẠO
          </Link>
        </div>
      </div>

      {/* Bottom Emblem Quote */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 py-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
        <p className="font-serif text-[18px] md:text-[22px] italic text-[#FFDF73] tracking-wide font-medium text-center px-4 whitespace-nowrap drop-shadow-[0_0_12px_rgba(255,223,115,0.4)]">
          “Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.”
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
      </div>
    </section>
  );
};

export default HeroSection;

