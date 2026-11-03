import React, { useState } from 'react';

export default function NewsNewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto z-10">
      <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#24080b] to-[#150305] p-8 sm:p-12 text-center shadow-2xl">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 pointer-events-none" />

        {/* Subtle radial ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FFDF73] mb-6 shadow-inner">
            <span className="material-symbols-outlined text-2xl">mark_email_unread</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#FFDF73] tracking-wide mb-3">
            Đăng Ký Nhận Bản Tin Di Sản Định Kỳ
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 font-sans leading-relaxed mb-8">
            Nhận các bài viết nghiên cứu chuyên sâu, lịch trưng bày và ấn phẩm Kỷ Yếu Bách Niên qua thư điện tử mỗi tháng.
          </p>

          {/* Form */}
          {isSubscribed ? (
            <div className="py-4 px-6 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-base tracking-wide flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>Cảm ơn bạn đã đăng ký nhận bản tin di sản Bách Niên Khởi Sắc!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                className="flex-1 px-4 py-3 rounded-lg bg-[#100202]/80 border border-[#D4AF37]/30 text-[#FAF7F2] placeholder-[#FAF7F2]/40 text-sm focus:outline-none focus:border-[#FFDF73] focus:ring-1 focus:ring-[#FFDF73] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-serif font-semibold text-sm tracking-wider uppercase bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA820A] text-[#100202] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Đăng Ký
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-[#FAF7F2]/50 font-sans tracking-wide">
            Cam kết bảo mật dữ liệu theo quy chuẩn Viện Kỷ Lục Việt Nam (VietKings).
          </p>
        </div>
      </div>
    </section>
  );
}

