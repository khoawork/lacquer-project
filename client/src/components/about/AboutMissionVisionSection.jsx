import React from 'react';

const AboutMissionVisionSection = () => {
  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'radial-gradient(circle, rgba(44, 12, 17, 0.9) 0%, rgba(22, 6, 8, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
            MỤC TIÊU CHIẾN LƯỢC
          </span>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Sứ mệnh Di sản &amp; Tầm nhìn 2030
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Sứ mệnh (Mission) */}
          <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-[#D4AF37]/30 shadow-2xl relative group card-lacquer">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center px-3.5 py-1 rounded border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[13px] tracking-widest uppercase font-bold"
                  style={{ background: 'rgba(50, 10, 10, 0.7)' }}
                >
                  SỨ MỆNH
                </span>
                <span className="material-symbols-outlined text-[#FFDF73]/80 text-3xl drop-shadow-[0_0_8px_#FFDF73]">
                  auto_stories
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-[28px] text-gold-gradient font-bold leading-snug">
                Kích hoạt giá trị sống của sơn mài hội họa Việt Nam
              </h3>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                    <strong className="text-[#FFDF73] font-serif font-bold">Hệ thống hóa và lan tỏa:</strong>{' '}
                    Tri thức về lịch sử, mỹ học, kỹ thuật và chân dung những bậc thầy sơn mài Việt Nam.
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                    <strong className="text-[#FFDF73] font-serif font-bold">Nền tảng đồng kiến tạo:</strong>{' '}
                    Mở không gian để cộng đồng học giả, họa sĩ cùng nghiên cứu, thử nghiệm và công bố sáng tạo mới.
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                    <strong className="text-[#FFDF73] font-serif font-bold">Hội tụ kinh tế di sản:</strong>{' '}
                    Kết nối mỹ thuật tạo hình với công nghiệp văn hóa, đổi mới vật liệu và nền tảng chuyển đổi số.
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                    <strong className="text-[#FFDF73] font-serif font-bold">Dữ liệu &amp; Kỷ lục:</strong>{' '}
                    Xây dựng hồ sơ định danh tác phẩm, xác lập chuyên đề kỷ lục bách niên có giá trị pháp lý lâu dài.
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                    <strong className="text-[#FFDF73] font-serif font-bold">Định vị toàn cầu:</strong>{' '}
                    Khẳng định sơn mài hội họa như một ngôn ngữ nghệ thuật bác học độc bản của văn hóa Việt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tầm nhìn (Vision 2030) */}
          <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-[#D4AF37]/30 shadow-2xl relative group card-lacquer">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center px-3.5 py-1 rounded border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[13px] tracking-widest uppercase font-bold"
                  style={{ background: 'rgba(50, 10, 10, 0.7)' }}
                >
                  TẦM NHÌN 2030
                </span>
                <span className="material-symbols-outlined text-[#FFDF73]/80 text-3xl drop-shadow-[0_0_8px_#FFDF73]">
                  visibility
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-[28px] text-gold-gradient font-bold leading-snug">
                Một hệ sinh thái có khả năng tự vận hành và lan tỏa
              </h3>
              <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed font-normal">
                Đến năm 2030, Hành trình hướng tới một mạng lưới bền vững gồm kho tư liệu số, chương trình nghiên cứu – sáng tạo, không gian trưng bày và trải nghiệm, chuỗi hợp tác liên ngành, cơ chế định danh tác phẩm và thị trường minh bạch; từ đó tạo nền tảng cho thế hệ kế tiếp tiếp tục phát triển.
              </p>

              {/* Visual Milestone Timeline (2026 -> 2030) */}
              <div className="pt-4 space-y-3">
                <div className="p-3.5 rounded-lg bg-[#180303]/90 border border-[#D4AF37]/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[#FFDF73] font-bold text-base">2026</span>
                    <span className="text-xs text-[#EADBCE]">Khởi sắc di sản • Chuỗi tọa đàm &amp; Open Studio</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]" />
                </div>
                <div className="p-3.5 rounded-lg bg-[#180303]/90 border border-[#D4AF37]/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[#FFDF73] font-bold text-base">2028</span>
                    <span className="text-xs text-[#EADBCE]">Công bố Kỷ yếu bách niên Tập I–IV &amp; Số hóa bảo tồn</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#FFDF73]/60" />
                </div>
                <div className="p-3.5 rounded-lg bg-[#180303]/90 border border-[#D4AF37]/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[#FFDF73] font-bold text-base">2030</span>
                    <span className="text-xs text-[#EADBCE]">Đại lễ Kỷ niệm 100 năm Hội họa Sơn mài Việt Nam</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#FFDF73]/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVisionSection;

