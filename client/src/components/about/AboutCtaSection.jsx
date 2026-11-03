import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const AboutCtaSection = () => {
  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle, rgba(48, 13, 18, 0.94) 0%, rgba(28, 7, 10, 0.96) 50%, rgb(18, 4, 6) 100%)',
      }}
    >
      {/* Radiant Halo */}
      <div
        className="ambient-glow-disc absolute w-[550px] h-[550px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(108, 72, 58, 0.4) 60%, transparent 80%)',
        }}
      />

      {/* Floating Sparkles bay chuẩn Trang Hành Trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto p-1 bg-gradient-to-br from-[#FFDF73]/40 via-[#1e0404] to-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center">
          <img
            alt="Centennial Emblem"
            className="w-full h-full object-cover rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSpwqVIjojagpvlvPe0ivTpFXrw9nm4XweI5zUUEKSuj9OtFoea5AkYxnxeoNgfduQ7h6r7Kyfzr7RqXiLnjrg4VduONy_vOraXUiBuQSpBB-u2DGK1WgegvX45r76WVnEj2m9V3D9qO5GelY08XCUXEEJlx-Z-rP7iPit85HWbf1H3heVoG1cj91q8jEnlKWCKDNwmxgIcnuSw1V0NH_1HuUBd5BRIJdQC8O0BHTAcfkQykwkhfShB_XzEqiYcemH3G0"
          />
        </div>
        <h2 className="font-serif text-3xl lg:text-[46px] lg:leading-[54px] text-gold-gradient font-bold tracking-tight">
          Cùng trở thành một phần của Hành trình di sản
        </h2>
        <p className="font-body text-[17px] md:text-[19px] text-[#FAF7F2] max-w-2xl mx-auto leading-relaxed">
          Mỗi bàn tay, mỗi góc nhìn và mỗi nguồn lực đều có thể góp phần thắp sáng tương lai của nghệ thuật sơn mài Việt Nam bước vào thế kỷ mới.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="btn-gold inline-flex items-center justify-center px-8 py-3.5 rounded text-[15px] tracking-wider uppercase shadow-xl font-bold"
          >
            Trở thành một phần của Hành trình
            <span className="material-symbols-outlined ml-2 text-xl font-bold">arrow_forward</span>
          </Link>
        </div>
        <div className="pt-6 flex items-center justify-center gap-6 text-[#FFDF73] font-serif text-[13px] md:text-[14px] uppercase tracking-widest font-semibold">
          <Link to="/contact" className="hover:underline">
            Đăng ký tham gia
          </Link>
          <span className="text-[#D4AF37]/60">•</span>
          <Link to="/contact" className="hover:underline">
            Đóng góp tư liệu
          </Link>
          <span className="text-[#D4AF37]/60">•</span>
          <Link to="/contact" className="hover:underline">
            Hợp tác dự án
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCtaSection;

