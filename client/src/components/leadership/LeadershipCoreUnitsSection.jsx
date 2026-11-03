import React from 'react';

const LeadershipCoreUnitsSection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Unit 1 */}
        <div className="card-lacquer relative rounded-2xl p-8 lg:p-10 flex flex-col justify-between group overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#FFDF73] text-[22px]">verified_user</span>
              <span className="font-serif text-[13px] text-[#FFDF73] tracking-[0.2em] font-bold uppercase">
                CƠ QUAN ĐIỀU PHỐI NỀN TẢNG
              </span>
            </div>
            <h2 className="font-serif text-[28px] lg:text-[34px] text-gold-gradient font-bold mb-4 tracking-tight leading-snug">
              VIỆN KỶ LỤC VIỆT NAM (VIETKINGS)
            </h2>
            <p className="font-body text-[16px] text-[#FAF7F2]/90 leading-[1.85] mb-6 text-balance">
              Điều phối chiến lược nền tảng; kết nối mạng lưới chuyên gia; tổ chức nghiên cứu, tư liệu hóa, đề cử và xác lập các chuyên đề kỷ lục phù hợp; góp phần lan tỏa giá trị sơn mài Việt Nam trong nước và quốc tế.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#D4AF37]/20">
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Xác thực kỷ lục
            </span>
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Bảo trợ dữ liệu di sản
            </span>
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Mạng lưới quốc tế
            </span>
          </div>
        </div>

        {/* Core Unit 2 */}
        <div className="card-lacquer relative rounded-2xl p-8 lg:p-10 flex flex-col justify-between group overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFDF73]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FFDF73]/20 transition-colors" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#FFDF73] text-[22px]">palette</span>
              <span className="font-serif text-[13px] text-[#FFDF73] tracking-[0.2em] font-bold uppercase">
                ĐƠN VỊ CHỦ TRÌ NỘI DUNG
              </span>
            </div>
            <h2 className="font-serif text-[28px] lg:text-[34px] text-gold-gradient font-bold mb-4 tracking-tight leading-snug">
              TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO
            </h2>
            <p className="font-body text-[16px] text-[#FAF7F2]/90 leading-[1.85] mb-6 text-balance">
              Xây dựng cấu trúc nội dung, phát triển chương trình liên ngành, kết nối công nghiệp văn hóa và triển khai các mô hình hợp tác sáng tạo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#D4AF37]/20">
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Phát triển nội dung
            </span>
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Liên kết công nghiệp văn hóa
            </span>
            <span
              className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
              style={{ background: 'rgba(45, 12, 18, 0.75)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              Đổi mới sáng tạo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCoreUnitsSection;
export { LeadershipCoreUnitsSection };

