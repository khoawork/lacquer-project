import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const NewsHeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center relative z-10 pt-16 md:pt-20 pb-10 select-none overflow-hidden">
      {/* Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Heritage Overline Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_0_15px_rgba(233,195,73,0.2),0_4px_20px_rgba(0,0,0,0.5)] mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(60, 15, 20, 0.75) 0%, rgba(30, 8, 11, 0.85) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#e9c349]" />
          <span
            className="font-serif text-[13px] md:text-[14px] tracking-[0.25em] uppercase font-bold whitespace-nowrap"
            style={{ color: '#E6CA65', textShadow: '0 0 10px rgba(230, 202, 101, 0.35)' }}
          >
            BÁCH NIÊN KHỞI SẮC • GÓC NHÌN &amp; TIẾNG NÓI DI SẢN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#e9c349]" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-[38px] sm:text-[50px] md:text-[62px] lg:text-[68px] lg:leading-[1.14] text-gold-gradient max-w-5xl tracking-tight mb-5 font-bold uppercase drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
          NHỮNG CÂU CHUYỆN ĐANG ĐƯỢC VIẾT TIẾP
        </h1>

        {/* Poetic Curatorial Subtitle */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-3xl leading-[1.85] text-center font-normal opacity-95 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Tin tức của Hành trình không chỉ đưa tin sự kiện. Đây là nơi lịch sử được kể lại bằng ngôn ngữ gần gũi, người làm nghề được nhìn thấy và các ý tưởng mới được đưa vào đối thoại công chúng.
        </p>

        {/* Golden Hairline Divider with Center Diamond */}
        <div className="flex items-center justify-center w-full max-w-md gap-4 my-2 opacity-80">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_#e9c349]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FFDF73] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default NewsHeroSection;
export { NewsHeroSection };

