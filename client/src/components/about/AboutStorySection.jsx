import React from 'react';

const AboutStorySection = () => {
  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'linear-gradient(rgba(26, 7, 10, 0.97) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(22, 6, 8, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Manifesto & Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_#FFDF73]" />
              <span className="font-serif text-[13px] text-[#FFDF73] uppercase tracking-[0.22em] font-semibold">
                KHỞI NGUỒN Ý NIỆM
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-[40px] lg:leading-[48px] text-gold-gradient font-bold tracking-tight">
              Vì sao Hành trình được hình thành?
            </h2>
            <p className="font-body text-[17px] md:text-[18px] text-[#FAF7F2] leading-relaxed font-normal">
              Trong nhiều năm, sơn mài thường được nhìn qua hai lăng kính tách rời: một bên là mỹ thuật hàn lâm, một bên là thủ công – làng nghề. Hành trình 100 năm được khởi tạo để nối lại toàn bộ hệ sinh thái: từ lịch sử hội họa, nghệ nhân, họa sĩ, chất liệu và kỹ thuật đến thiết kế, công nghệ, truyền thông, giáo dục và thị trường.
            </p>
            <p className="font-body text-[16px] md:text-[17px] text-[#EADBCE] leading-relaxed">
              Mục tiêu không phải đóng khung di sản trong quá khứ, mà tạo điều kiện để di sản tiếp tục sản sinh giá trị trong hiện tại, trao truyền một sinh quyển sáng tạo tự chủ, đĩnh đạc bước vào bách niên kế tiếp.
            </p>

            {/* Velvet Glass Callout Quote */}
            <div
              className="mt-4 p-6 rounded-xl border border-[#D4AF37]/35 shadow-[0_8px_30px_rgba(0,0,0,0.6)] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(28, 7, 10, 0.95) 0%, rgba(12, 2, 4, 0.98) 100%)',
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                style={{ background: 'rgba(212, 175, 55, 0.18)' }}
              />
              <div className="flex items-start gap-3.5 relative z-10">
                <span
                  className="material-symbols-outlined text-[#FFDF73] text-3xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_#FFDF73]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <p className="font-serif text-[19px] md:text-[21px] italic text-[#FFF3CC] leading-snug font-semibold">
                  “Nối liền đứt gãy giữa hàn lâm và làng nghề - Biến di sản tĩnh tại thành tài nguyên sống động.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition of Lacquer Layers */}
          <div className="lg:col-span-6 relative">
            <div
              className="absolute -inset-4 rounded-2xl blur-xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(55, 10, 10, 0.35) 60%, transparent 80%)',
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/45 p-1 bg-gradient-to-br from-[#3d0b0b] via-[#24080b] to-[#120305] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative group">
                <img
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
                  alt="Bóc tách từng tầng sơn then mài lộ sắc"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUOowWq2-6yYBMnhlPakXy635SgnT6bWlRWvwNB1UVulyrbseIHbaOXgguNg7nh3lcMgUa-pvq8bBhYTzxFH2oC3t94vfeIIvVkf8_EjNo7MCYAVq030xWTgSQ0Byy3-DQVM0RutjVNBNGjT6b59Efk8bteqtEVz2k8PMTJjiN0oXe7gHfL_bNMpRxr6hE4walNjk5MugHU4qn8YFH8DPea3lNksCS_LSBmMEa5Mmi6lTXckCeijVQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150305] via-[#150305]/30 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <span className="font-serif text-xs md:text-sm text-[#FFDF73] uppercase tracking-[0.2em] font-bold block">
                    TRIẾT LÝ TÍCH TỤ
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-bold leading-tight">
                    Ba Tầng Chiều Sâu Di Sản
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#EADBCE] leading-relaxed">
                    Vật chất sơn ta tự nhiên • Kỹ nghệ bàn tay nghệ nhân • Ngôn ngữ tạo hình hàn lâm hiện đại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStorySection;

