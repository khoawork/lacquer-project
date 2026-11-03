import React from 'react';

const HeritageStorySection = () => {
  return (
    <section
      className="relative w-full py-24 bg-[#140202] border-t border-[#D4AF37]/20 overflow-hidden"
      id="kham-pha"
      style={{
        background: 'linear-gradient(rgb(29, 6, 8) 0%, rgb(40, 9, 13) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight tracking-normal">
              Một thế kỷ — Một hành trình đang tiếp diễn
            </h2>
            <p className="font-body text-[18px] md:text-[19px] text-[#FAF7F2] leading-[1.85] font-normal">
              Sơn mài hội họa Việt Nam là kết quả diệu kỳ của sự gặp gỡ giữa nguồn nhựa sơn ta Phú Thọ huyền thoại, đôi bàn tay tài hoa của nghệ nhân cổ truyền và tư duy tạo hình hàn lâm hiện đại khởi nguồn từ Trường Mỹ thuật Đông Dương thập niên 1930.
            </p>
            <p className="font-body text-[17px] md:text-[18px] text-[#EADBCE] leading-[1.85]">
              Qua lớp lớp thời gian tôi luyện trong khói lửa kháng chiến, độc lập và đổi mới, sơn mài đã thoát thai khỏi một chất liệu trang trí mỹ nghệ đơn thuần để trở thành đỉnh cao ngôn ngữ tạo hình hội họa dân tộc. Năm 2030 không phải điểm kết thúc, mà là dấu mốc hoàn tất một thế kỷ để bước sang một chu kỳ kiến tạo tầm vóc mới.
            </p>

            {/* Grand Statement Banner (Callout) */}
            <div className="relative p-7 rounded-lg bg-gradient-to-r from-[#2a0606] via-[#330808] to-[#240505] border border-[#D4AF37]/35 shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden mt-6">
              <div className="absolute -right-3 -bottom-6 text-[#D4AF37]/10 font-serif text-[140px] pointer-events-none select-none leading-none">
                ”
              </div>
              <div className="relative z-10 space-y-3">
                <blockquote className="font-serif text-[24px] md:text-[28px] font-bold text-[#FFDF73] leading-snug">
                  “Không chỉ để xã hội xem. Để xã hội cùng làm.”
                </blockquote>
                <p className="font-body text-[17px] text-[#FAF7F2] leading-[1.8] font-normal">
                  Hành trình được kiến tạo như một hệ sinh thái mở, nơi người nghệ sĩ, nghệ nhân làng nghề, giới học giả, trường viện nghiên cứu, doanh nghiệp và công chúng yêu nghệ thuật cùng tương tác, kiến tạo và làm giàu sinh khí cho di sản.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Atmospheric Heritage Visual Plinth */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#1e0404] shadow-[0_15px_40px_rgba(0,0,0,0.8)] aspect-[4/5] group">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#D4AF37]/20 rounded-full blur-[60px] pointer-events-none" />
              <img
                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-700 group-hover:scale-105"
                alt="Nghệ nhân mài tranh sơn mài dưới nước"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUOowWq2-6yYBMnhlPakXy635SgnT6bWlRWvwNB1UVulyrbseIHbaOXgguNg7nh3lcMgUa-pvq8bBhYTzxFH2oC3t94vfeIIvVkf8_EjNo7MCYAVq030xWTgSQ0Byy3-DQVM0RutjVNBNGjT6b59Efk8bteqtEVz2k8PMTJjiN0oXe7gHfL_bNMpRxr6hE4walNjk5MugHU4qn8YFH8DPea3lNksCS_LSBmMEa5Mmi6lTXckCeijVQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140202] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1.5">
                <span className="font-serif text-[14px] tracking-[0.22em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
                  Kỹ thuật truyền thống
                </span>
                <h3 className="font-serif text-[24px] text-[#FAF7F2] font-bold">
                  Mài Dưới Dòng Nước Lộ Sắc
                </h3>
                <p className="font-body text-[16px] text-[#EADBCE] leading-relaxed">
                  Sự kiên nhẫn bóc tách từng tầng sơn then, son cánh gián để vàng son ngọc diệp hiển lộ quang minh.
                </p>
              </div>
            </div>

            {/* Decorative Stamp Accent */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-[#3d0909]/95 border border-[#FFDF73]/70 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] text-[#FFDF73] p-3 text-center">
              <span className="font-serif text-[11px] uppercase tracking-[0.2em] font-bold leading-tight whitespace-nowrap">
                DI SẢN
                <br />
                1930–2030
                <br />
                VIỆT NAM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageStorySection;

