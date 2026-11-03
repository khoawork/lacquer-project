import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';
import { ArrowRight, BookOpen, Handshake } from 'lucide-react';

const JourneyCtaSection = () => {
  const LOGO_FALLBACK =
    'https://res.cloudinary.com/ds11ggie4/image/upload/v1793672616/starbucks-removebg-preview_unczzr.png';
  const FINAL_SEAL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpwqVIjojagpvlvPe0ivTpFXrw9nm4XweI5zUUEKSuj9OtFoea5AkYxnxeoNgfduQ7h6r7Kyfzr7RqXiLnjrg4VduONy_vOraXUiBuQSpBB-u2DGK1WgegvX45r76WVnEj2m9V3D9qO5GelY08XCUXEEJlx-Z-rP7iPit85HWbf1H3heVoG1cj91q8jEnlKWCKDNwmxgIcnuSw1V0NH_1HuUBd5BRIJdQC8O0BHTAcfkQykwkhfShB_XzEqiYcemH3G0';

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden border-t border-[#D4AF37]/25 select-none"
      style={{
        background:
          'radial-gradient(circle, rgba(55, 14, 20, 0.96) 0%, rgba(32, 7, 11, 0.98) 50%, rgb(18, 4, 6) 100%)',
      }}
    >
      {/* Vầng hào quang trung tâm */}
      <div
        className="ambient-glow-disc absolute w-[600px] h-[600px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 215, 110, 0.32) 0%, rgba(140, 30, 45, 0.45) 55%, transparent 75%)',
        }}
      />

      {/* Đốm sao vàng kim bay lơ lửng */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Con dấu bách niên */}
        <div className="w-22 h-22 md:w-24 md:h-24 rounded-full mx-auto p-1 bg-gradient-to-br from-[#FFDF73]/50 via-[#260508] to-[#D4AF37]/60 shadow-[0_0_35px_rgba(255,223,115,0.6)] flex items-center justify-center">
          <img
            alt="Centennial Emblem"
            className="w-full h-full object-cover rounded-full brightness-110"
            src={FINAL_SEAL}
            onError={(e) => {
              e.currentTarget.src = LOGO_FALLBACK;
            }}
          />
        </div>

        <h2 className="font-serif text-3xl lg:text-[46px] lg:leading-[54px] text-gold-gradient font-bold tracking-tight">
          Cùng Khắc Ghi Tên Bạn Vào Trang Sử Bách Niên
        </h2>

        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-2xl mx-auto leading-relaxed">
          Dù bạn là một nghệ sĩ, nhà nghiên cứu, nghệ nhân làng nghề hay người yêu nghệ thuật sơn mài, sự đồng hành của bạn chính là ngọn lửa thắp sáng thế kỷ kế tiếp.
        </p>

        {/* Nút kêu gọi hành động */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            className="btn-gold inline-flex items-center justify-center px-8 py-3.5 rounded text-[15px] tracking-wider uppercase shadow-xl cursor-pointer"
            href="#dong-kien-tao"
          >
            Đăng ký tham gia Hành trình
            <ArrowRight className="ml-2 w-5 h-5 font-bold" />
          </a>

          <a
            className="btn-gold-outline inline-flex items-center justify-center px-7 py-3.5 rounded text-[15px] tracking-wider uppercase cursor-pointer"
            href="#ky-yeu-archive"
          >
            <BookOpen className="mr-2 w-4 h-4" />
            Đóng góp tư liệu kỷ yếu
          </a>
        </div>

        {/* Chân thẻ kêu gọi */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#FFDF73] font-serif text-[13px] md:text-[14px] uppercase tracking-widest font-semibold">
          <span>Xác lập Kỷ lục</span>
          <span className="text-[#D4AF37]/60">•</span>
          <span>Công bố Tác phẩm</span>
          <span className="text-[#D4AF37]/60">•</span>
          <span>Bảo tồn Cội nguồn</span>
        </div>
      </div>
    </section>
  );
};

export default JourneyCtaSection;

