import React from 'react';
import FloatingSparkles from '../common/FloatingSparkles';

const PillarsSection = () => {
  return (
    <section
      className="relative w-full py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="bon-huong-mo"
      style={{
        background: 'linear-gradient(rgb(40, 9, 13) 0%, rgb(30, 6, 8) 100%)',
      }}
    >
      {/* Sparkles in Pillars Section */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
              Bốn hướng mở của hành trình
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2]">
              Một mô hình đa chiều kết nối truyền thống nghìn năm cùng nhịp đập kinh tế sáng tạo toàn cầu hóa.
            </p>
          </div>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">groups_3</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  Cộng đồng sáng tạo
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  Mở rộng Open Studio, bảo trợ chương trình lưu trú nghệ sĩ trẻ, workshop thể nghiệm đa chất liệu và truyền cảm hứng hội họa sơn mài đến công chúng đa thế hệ.
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              <span className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap">
                Khám phá hoạt động{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">palette</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  Công nghiệp văn hóa
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  Đưa giá trị tạo hình sơn mài vào giáo dục mỹ thuật di sản, thiết kế nội thất, thời trang đương đại, sản phẩm cao cấp và không gian trải nghiệm.
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              <span className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap">
                Khám phá sản phẩm{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">account_balance</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  Kinh tế di sản
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  Làng nghề, du lịch trải nghiệm, lưu trữ số, giám định, định danh và thị trường minh bạch.
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              <span className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap">
                Khám phá dự án{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">science</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  Đổi mới vật liệu
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  Vật liệu lai, bề mặt kiến trúc, công nghệ bảo tồn và giải pháp bền vững.
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              <span className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap">
                Khám phá thể nghiệm{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            className="btn-gold-outline px-10 py-3.5 rounded text-[16px] uppercase tracking-[0.2em] whitespace-nowrap inline-block"
            href="#mo-hinh"
          >
            XEM CHI TIẾT HỆ SINH THÁI
          </a>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;

