import React from 'react';
import { resolveLeadershipIcon } from './leadershipIconRegistry';
import { ShieldCheck, Palette } from 'lucide-react';

const DEFAULT_CORE_UNITS = [
  {
    id: 1,
    role: 'CƠ QUAN ĐIỀU PHỐI NỀN TẢNG',
    name: 'VIỆN KỶ LỤC VIỆT NAM (VIETKINGS)',
    desc: 'Điều phối chiến lược nền tảng; kết nối mạng lưới chuyên gia; tổ chức nghiên cứu, tư liệu hóa, đề cử và xác lập các chuyên đề kỷ lục phù hợp; góp phần lan tỏa giá trị sơn mài Việt Nam trong nước và quốc tế.',
    tags: 'Xác thực kỷ lục, Bảo trợ dữ liệu di sản, Mạng lưới quốc tế',
    icon: 'ShieldCheck',
  },
  {
    id: 2,
    role: 'ĐƠN VỊ CHỦ TRÌ NỘI DUNG',
    name: 'TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO',
    desc: 'Xây dựng cấu trúc nội dung, phát triển chương trình liên ngành, kết nối công nghiệp văn hóa và triển khai các mô hình hợp tác sáng tạo.',
    tags: 'Phát triển nội dung, Liên kết công nghiệp văn hóa, Đổi mới sáng tạo',
    icon: 'Palette',
  },
];

const LeadershipCoreUnitsSection = ({ pageProps }) => {
  const coreUnits =
    Array.isArray(pageProps?.core_units) && pageProps.core_units.length > 0
      ? pageProps.core_units
      : DEFAULT_CORE_UNITS;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 select-none">
      <div className={`grid grid-cols-1 ${coreUnits.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-8`}>
        {coreUnits.map((unit, idx) => {
          const rawTags = unit.tags || '';
          const tagList = Array.isArray(rawTags)
            ? rawTags
            : String(rawTags)
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);
          const UnitIcon = resolveLeadershipIcon(unit.icon, idx === 0 ? ShieldCheck : Palette);

          return (
            <div
              key={unit.id || idx}
              className="card-lacquer relative rounded-2xl p-8 lg:p-10 flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3d090f]/80 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] shrink-0 shadow-[0_0_10px_rgba(255,223,115,0.2)]">
                    <UnitIcon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-[13px] text-[#FFDF73] tracking-[0.2em] font-bold uppercase">
                    {unit.role || 'ĐƠN VỊ ĐỒNG HÀNH'}
                  </span>
                </div>
                <h2 className="font-serif text-[28px] lg:text-[34px] text-gold-gradient font-bold mb-4 tracking-tight leading-snug">
                  {unit.name}
                </h2>
                <p className="font-body text-[16px] text-[#FAF7F2]/90 leading-[1.85] mb-6 text-balance">
                  {unit.desc}
                </p>
              </div>

              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#D4AF37]/20">
                  {tagList.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1 text-[12px] rounded uppercase tracking-wider text-[#FFDF73] font-sans font-medium"
                      style={{
                        background: 'rgba(45, 12, 18, 0.75)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeadershipCoreUnitsSection;
export { LeadershipCoreUnitsSection };

