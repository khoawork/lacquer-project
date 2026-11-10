import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const DEFAULT_BADGE = '✦ BÁCH NIÊN TRỌNG TRÁCH • MINH BẠCH & LIÊN NGÀNH ✦';
const DEFAULT_HEADLINE = 'NHỮNG NGƯỜI GIỮ NHỊP CHO HÀNH TRÌNH';
const DEFAULT_DESC =
  'Một hành trình liên ngành chỉ bền vững khi mỗi chủ thể hiểu rõ vai trò của mình. Ban điều hành kết nối học thuật, sáng tạo, sản xuất, truyền thông, dữ liệu và nguồn lực để mọi hoạt động cùng hướng về một mục tiêu chung.';

const LeadershipHeroSection = ({ pageProps }) => {
  const badgeText = (pageProps?.badge && pageProps.badge.trim()) || DEFAULT_BADGE;
  const rawHeadline =
    pageProps?.headline && !pageProps.headline.includes('BAN ĐIỀU HÀNH & HỘI')
      ? pageProps.headline
      : DEFAULT_HEADLINE;
  const description =
    (pageProps?.description && pageProps.description.trim()) || DEFAULT_DESC;

  // Format tiêu đề thành 2 dòng chuẩn nhận diện như ảnh mẫu
  const renderHeadline = () => {
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
    <section className="relative w-full pt-16 md:pt-20 pb-12 text-center select-none overflow-hidden">
      {/* Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Heritage Overline Badge */}
        {badgeText && (
          <div
            className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_0_15px_rgba(233,195,73,0.2),0_4px_20px_rgba(0,0,0,0.5)] mb-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(60, 15, 20, 0.75) 0%, rgba(30, 8, 11, 0.85) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#FFDF73]" />
            <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-[0.24em] uppercase font-bold whitespace-nowrap">
              {badgeText}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] animate-pulse shadow-[0_0_8px_#FFDF73]" />
          </div>
        )}

        {/* Main Headline */}
        <h1 className="font-serif text-[38px] sm:text-[50px] md:text-[62px] lg:text-[68px] uppercase tracking-tight text-gold-gradient max-w-5xl mx-auto leading-[1.14] mb-5 font-bold drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
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
