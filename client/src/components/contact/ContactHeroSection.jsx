import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const ContactHeroSection = ({ pageProps }) => {
  const badgeText = pageProps?.badge || '✦ BÁCH NIÊN KẾT NỐI • ĐỒNG HÀNH & LAN TỎA ✦';
  const headline = pageProps?.headline || 'MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP';
  const description =
    pageProps?.description ||
    'Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm, một ý tưởng nghiên cứu hoặc một đề xuất hợp tác, hãy kết nối với chúng tôi. Không có đóng góp nào là nhỏ khi cùng hướng đến việc viết tiếp một di sản chung của nền nghệ thuật Việt Nam.';

  if (!headline && !description && !badgeText) return null;

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
        {/* Monumental Headline */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[54px] lg:leading-[72px] text-gold-gradient font-bold uppercase tracking-[0.06em] max-w-4xl text-center mb-6 py-2 px-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {headline}
        </h1>

        {/* Curatorial Subtitle */}
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-3xl leading-[1.85] text-center font-normal opacity-95 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {description}
        </p>

        {/* Atmospheric Separator Glyph */}
        <div className="flex items-center justify-center w-full max-w-md gap-4 my-2 opacity-80">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="w-2.5 h-2.5 rotate-45 border border-[#FFDF73] bg-[#AA820A] shadow-[0_0_8px_rgba(255,223,115,0.6)]" />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;

