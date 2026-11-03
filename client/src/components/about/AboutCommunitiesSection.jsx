import React from 'react';

const AboutCommunitiesSection = () => {
  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'linear-gradient(rgba(22, 5, 7, 0.98) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(18, 4, 6, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
            CỘNG ĐỒNG ĐỒNG HÀNH
          </span>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Một hành trình dành cho nhiều cộng đồng
          </h2>
          <p className="font-body text-[16px] md:text-[17px] text-[#EADBCE]">
            Di sản chỉ tồn tại bền vững khi thuộc về tất cả những ai cùng trân quý và kiến tạo.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* 5 Target Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">palette</span>
            </div>
            <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold mb-2">
              Nghệ sĩ, nghệ nhân, làng nghề &amp; nhà sưu tập
            </h3>
            <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
              Những người gìn giữ lửa nghề, khai phá ngôn ngữ tạo hình sơn mài mới và các nhà sưu tập gìn giữ báu vật cho hậu thế.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold mb-2">
              Nhà nghiên cứu, sinh viên, giảng viên &amp; Cơ sở đào tạo
            </h3>
            <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
              Viện nghiên cứu, trường đại học mỹ thuật và giới lý luận phê bình kiến tạo hệ thống giáo trình, dữ liệu khoa học chuẩn mực.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">architecture</span>
            </div>
            <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold mb-2">
              Doanh nghiệp sáng tạo, thương hiệu, kiến trúc sư, nhà thiết kế
            </h3>
            <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
              Đưa tinh hoa sơn mài vào không gian sống, kiến trúc cao cấp, thiết kế sản phẩm ứng dụng và thời trang đương đại.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
            <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold mb-2">
              Cơ quan văn hóa, tổ chức xã hội, quỹ và mạng lưới quốc tế
            </h3>
            <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
              Các đơn vị quản lý di sản, tổ chức phi chính phủ, bảo tàng ngoại giao mở rộng nhịp cầu giao lưu văn hóa liên quốc gia.
            </p>
          </div>

          {/* Card 5 (Spans 2 cols on tablet/desktop) */}
          <div className="md:col-span-2 lg:col-span-2 p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">groups_3</span>
            </div>
            <div>
              <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold mb-2">
                Công chúng yêu nghệ thuật &amp; Thế hệ trẻ
              </h3>
              <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                Mọi trái tim rung cảm trước vẻ đẹp sơn mài, mong muốn chạm vào di sản, thấu hiểu tinh hoa dân tộc và truyền cảm hứng tự hào đến bạn bè thế giới.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCommunitiesSection;

