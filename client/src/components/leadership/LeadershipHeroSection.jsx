import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const LeadershipHeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge ? pageProps.badge.trim() : '';
  const rawHeadline = pageProps?.headline ? pageProps.headline.trim() : '';
  const description = pageProps?.description ? pageProps.description.trim() : '';

  // Format tiêu đề thành 2 dòng chuẩn nhận diện như ảnh mẫu
  const renderHeadline = () => {
    if (!rawHeadline) return 'Chưa có dữ liệu';
    if (rawHeadline.includes('\n')) {
      return rawHeadline.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ));
    }
    if (rawHeadline.trim() === 'NHỮNG NGƯỜI GIỮ NHỊP CHO HÀNH TRÌNH') {
      return (
        <>
          <span className="block">NHỮNG NGƯỜI GIỮ</span>
          <span className="block">NHỊP CHO HÀNH TRÌNH</span>
        </>
      );
    }
    return rawHeadline;
  };

  return (
    <section
      className="relative w-full pt-[46px] pb-20 lg:pb-24 overflow-hidden flex flex-col items-center justify-center text-center select-none"
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {renderHeadline()}
        </h1>

        {/* Narrative Description */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-4xl mx-auto leading-[1.85] text-balance mb-8 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {description}
        </p>

        {/* Golden Hairline Divider with Center Diamond */}
        <div className="flex items-center justify-center w-full max-w-md mx-auto gap-4 my-2 opacity-80">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_#FFDF73]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FFDF73] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default LeadershipHeroSection;
export { LeadershipHeroSection };
