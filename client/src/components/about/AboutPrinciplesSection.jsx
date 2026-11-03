import React from 'react';

const AboutPrinciplesSection = () => {
  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'linear-gradient(rgba(24, 6, 9, 0.98) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(20, 5, 7, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
            BA NGUYÊN TẮC CỐT LÕI
          </span>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Điều không thay đổi trong mọi hoạt động
          </h2>
          <p className="font-body text-[16px] md:text-[17px] text-[#EADBCE] max-w-xl mx-auto">
            Bộ ba nguyên tắc chỉ đạo bất biến định hướng mọi sáng kiến, đối thoại và sáng tạo trong hành trình bách niên.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Principle Card 01 */}
          <div className="p-8 rounded-xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 card-lacquer">
            <div className="font-serif text-5xl font-bold text-[#FFDF73]/25 group-hover:text-[#FFDF73]/45 transition-colors leading-none mb-4 select-none">
              01
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="font-serif text-[22px] text-[#FFDF73] font-bold">
                Bản chất trước hình thức
              </h3>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed font-normal">
                Mọi đổi mới phải tôn trọng lõi tạo ảnh và chiều sâu vật chất của sơn mài.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#FFDF73]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]" />
              <span className="font-serif text-xs uppercase tracking-wider text-[#FFDF73]/80">Tôn trọng cốt lõi</span>
            </div>
          </div>

          {/* Principle Card 02 */}
          <div className="p-8 rounded-xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 card-lacquer">
            <div className="font-serif text-5xl font-bold text-[#FFDF73]/25 group-hover:text-[#FFDF73]/45 transition-colors leading-none mb-4 select-none">
              02
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="font-serif text-[22px] text-[#FFDF73] font-bold">
                Đồng kiến tạo thay vì độc quyền diễn giải
              </h3>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed font-normal">
                Tri thức được hình thành từ nhiều chủ thể và nhiều vùng thực hành.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#FFDF73]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]" />
              <span className="font-serif text-xs uppercase tracking-wider text-[#FFDF73]/80">Đối thoại đa chiều</span>
            </div>
          </div>

          {/* Principle Card 03 */}
          <div className="p-8 rounded-xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 card-lacquer">
            <div className="font-serif text-5xl font-bold text-[#FFDF73]/25 group-hover:text-[#FFDF73]/45 transition-colors leading-none mb-4 select-none">
              03
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="font-serif text-[22px] text-[#FFDF73] font-bold">
                Giá trị dài hạn thay vì hiệu ứng sự kiện
              </h3>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed font-normal">
                Mỗi hoạt động phải để lại dữ liệu, tác phẩm, quan hệ hợp tác hoặc năng lực mới.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#FFDF73]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]" />
              <span className="font-serif text-xs uppercase tracking-wider text-[#FFDF73]/80">Bền vững thế kỷ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciplesSection;

