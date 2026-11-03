import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { Sparkles, Calendar, Users, Building, History } from 'lucide-react';

const EventsHeroSection = () => {
  const LOGO_FALLBACK =
    'https://res.cloudinary.com/ds11ggie4/image/upload/v1793672616/starbucks-removebg-preview_unczzr.png';
  const HERO_SEAL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCW2NGrEf3lfKTe7pxCmevWbwQ0drNpFQaZVy43uDF67MZdCLPfAhtv21Shw5iLaEqLx59sBzfChDSs94NDlOUrMUJPRM5Q3aT1E2n8H8JVJIhmGjrgjZQHMSGa38tuEocMJ0AkoKwSedVcJ6czgDFojWj2VrWGXAZuivXOY_msTjKc4RdDzNvMphFBEMPutqx7rc-7VV4i815sYYfRfu7Itz-O_koLFueJ_Xx4CHitwlZXEs6carZDwg';

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden flex flex-col items-center justify-center text-center select-none">
      {/* Bordeaux lacquer atmospheric glow */}
      <div
        className="ambient-glow-disc absolute w-[720px] h-[380px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(140, 30, 42, 0.45) 0%, rgba(75, 16, 22, 0.3) 55%, transparent 80%)',
        }}
      />
      <div
        className="ambient-glow-disc absolute w-[550px] h-[350px] rounded-full blur-[110px] -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 110, 0.25) 0%, transparent 70%)',
        }}
      />

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Watermarked Centenary Emblem */}
        <div className="mb-6 relative group">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-b from-[#FFDF73] via-[#D4AF37] to-transparent shadow-[0_0_28px_rgba(212,175,55,0.45)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#160405] flex items-center justify-center border border-[#D4AF37]/50">
              <img
                alt="Logo Kỷ nguyên Sơn Mài Hội họa Việt Nam 1930-2030"
                className="w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                src={HERO_SEAL}
                onError={(e) => {
                  e.currentTarget.src = LOGO_FALLBACK;
                }}
              />
            </div>
          </div>
          <div className="absolute -inset-2 rounded-full bg-[#D4AF37]/25 blur-md -z-10 animate-pulse" />
        </div>

        {/* Eyebrow Pill */}
        <div
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#D4AF37]/45 text-[#FFDF73] mb-6 shadow-[0_2px_14px_rgba(0,0,0,0.55)] backdrop-blur-md"
          style={{ background: 'rgba(36, 8, 11, 0.9)' }}
        >
          <Sparkles className="w-4 h-4 text-[#FFDF73]" />
          <span className="font-serif text-[12px] md:text-[13px] tracking-[0.22em] uppercase font-bold text-[#FFF3CC]">
            SỰ KIỆN & HOẠT ĐỘNG DI SẢN • 1930–2030
          </span>
          <Sparkles className="w-4 h-4 text-[#FFDF73]" />
        </div>

        {/* Monumental Typography Heading */}
        <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[62px] md:leading-[72px] text-gold-gradient tracking-tight max-w-5xl mb-6 font-bold uppercase drop-shadow-[0_2px_16px_rgba(212,175,55,0.4)]">
          NƠI DI SẢN ĐƯỢC THỰC HÀNH
        </h1>

        {/* Curatorial Statement */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-3xl leading-relaxed opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Mỗi sự kiện là một điểm gặp giữa tri thức và hành động: người nghiên cứu gặp người làm nghề, nghệ sĩ gặp doanh nghiệp, chất liệu truyền thống gặp công nghệ mới và công chúng trở thành một phần của quá trình sáng tạo.
        </p>

        {/* Visual Archival Metric Bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl p-5 md:p-6 rounded-xl border border-[#D4AF37]/35 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md"
          style={{
            background: 'linear-gradient(180deg, rgba(46, 13, 18, 0.85) 0%, rgba(24, 7, 10, 0.92) 100%)',
          }}
        >
          <div className="flex flex-col items-center text-center p-3 border-r border-[#D4AF37]/20">
            <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
              07
            </span>
            <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
              Kỳ Hành Trình Di Sản
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3 md:border-r border-[#D4AF37]/20">
            <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
              100+
            </span>
            <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
              Nghệ Sĩ & Học Giả
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-r border-[#D4AF37]/20">
            <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
              30+
            </span>
            <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
              Viện Đào Tạo & Doanh Nghiệp
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <span className="font-serif text-[32px] md:text-[38px] font-bold text-gold-gradient leading-none">
              1930–2030
            </span>
            <span className="font-serif text-[12px] md:text-[13px] uppercase tracking-wider text-[#FFDF73] mt-2 font-semibold">
              Kỷ Nguyên Bách Niên
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsHeroSection;

