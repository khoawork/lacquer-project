import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Compass, Sparkles, History } from 'lucide-react';

const JourneyHeroSection = () => {
  const LOGO_FALLBACK =
    'https://res.cloudinary.com/ds11ggie4/image/upload/v1793672616/starbucks-removebg-preview_unczzr.png';
  const HERO_SEAL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA24EfoXZ-0BkTAtHr86R5VGrGCuTXxzBwWBzS6BW8ubJh3WRm5JLnWAsNYz24M--l0Syg2ccpf3_D4HwB1iJ28MuZ20kXwWQEszu9acBuTPnr9YSt4UIjhexbP9D6ngfVnhiLL5KLfhCvri5KxGGaVlSkgmNhA7NvFG2HBzEPoxjMXbrjfAwSFAPToizyXoP_KDUlAFU8mFRWqBKMUGElun99GkbN1VVDtASUHjdW1Zx9NSHjWRYrDUlYL4BYBXi95rV0';

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden flex flex-col items-center justify-center text-center select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 25%, rgba(68, 18, 24, 0.96) 0%, rgba(40, 9, 13, 0.98) 50%, rgba(20, 4, 6, 1) 100%)',
      }}
    >
      {/* Hào quang nền sơn mài huyền ảo */}
      <div
        className="ambient-glow-disc absolute w-[680px] h-[680px] rounded-full blur-[140px] -top-24 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 215, 110, 0.35) 0%, rgba(185, 38, 52, 0.38) 50%, transparent 80%)',
        }}
      />
      <div
        className="ambient-glow-disc absolute w-[550px] h-[550px] rounded-full blur-[120px] bottom-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* Đốm sao vàng kim bay lơ lửng tự do (kích thước lớn hơn theo yêu cầu) */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Con dấu bách niên */}
        <div className="mb-6 relative group">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-br from-[#FFDF73]/50 via-[#3a090e] to-[#D4AF37]/60 shadow-[0_0_40px_rgba(255,223,115,0.6)] group-hover:shadow-[0_0_65px_rgba(255,223,115,0.85)] transition-all duration-500 flex items-center justify-center">
            <img
              alt="Biểu trưng 100 năm Hành trình Sơn Mài"
              className="w-full h-full object-cover rounded-full brightness-110 drop-shadow-[0_0_15px_rgba(255,223,115,0.7)] transition-transform duration-700 group-hover:scale-105"
              src={HERO_SEAL}
              onError={(e) => {
                e.currentTarget.src = LOGO_FALLBACK;
              }}
            />
          </div>
          <div className="absolute -inset-3 rounded-full border border-[#D4AF37]/50 pointer-events-none group-hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Badge tiêu đề */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(255,223,115,0.35)] mb-6"
          style={{ background: 'rgba(50, 10, 14, 0.85)', backdropFilter: 'blur(10px)' }}
        >
          <History className="w-4 h-4 text-[#FFDF73]" />
          <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-[0.24em] uppercase font-bold whitespace-nowrap">
            1930 • 2030 — HÀNH TRÌNH BÁCH NIÊN HỘI HỌA SƠN MÀI
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[54px] lg:leading-[64px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
          MỘT THẾ KỶ CHUYỂN MÌNH DI SẢN
        </h1>

        {/* Đoạn văn mô tả */}
        <p className="font-body text-[17px] md:text-[20px] md:leading-[1.9] text-[#FAF7F2] max-w-3xl mx-auto mb-10 text-center font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          Từ chất nhựa cây sơn ta của đất Phú Thọ và kỹ nghệ phủ bóng ngàn năm của các làng nghề cổ truyền, các thế hệ danh họa Việt Nam đã bền bỉ tìm tòi, khai mở và nâng tầm sơn mài thành một chất liệu hội họa bác học độc bản trên trường mỹ thuật thế giới.
        </p>

        {/* Thanh trang trí vàng kim */}
        <div className="flex items-center justify-center gap-4 text-[#D4AF37]">
          <div className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <Compass className="w-5 h-5 text-[#FFDF73] animate-spin" style={{ animationDuration: '20s' }} />
          <div className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default JourneyHeroSection;

