import React from 'react';
import { History, Users, Palette, Lightbulb, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  {
    id: 'history',
    icon: History,
    title: 'Lịch sử và mỹ học',
    desc: 'Các bài nghiên cứu về tiến trình hình thành, ngôn ngữ tạo hình, hệ màu, không gian, ánh sáng và vị trí của sơn mài trong mỹ thuật Việt Nam hiện đại.',
    btnLabel: 'Tra cứu chuyên đề',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'masters',
    icon: Users,
    title: 'Con người và truyền thừa',
    desc: 'Chân dung họa sĩ, nghệ nhân, nhà giáo, nhà nghiên cứu, nhà sưu tập và những người góp phần duy trì mạch nghề qua các thế hệ di sản.',
    btnLabel: 'Danh họa & Nghệ nhân',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'materials',
    icon: Palette,
    title: 'Làng nghề và vật liệu',
    desc: 'Tư liệu về vùng nguyên liệu, vóc, sơn ta, son trát, vàng quỳ, vỏ trứng, kỹ thuật ủ – mài – đánh bóng, cùng thách thức của chuỗi cung ứng bản địa.',
    btnLabel: 'Hồ sơ làng nghề',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'creativity',
    icon: Lightbulb,
    title: 'Sáng tạo và ứng dụng',
    desc: 'Nghiên cứu, thử nghiệm và trường hợp thực tế về sơn mài trong thiết kế nội thất, kiến trúc cảnh quan, thời trang xa xỉ, điện ảnh, truyền thông số, giáo dục mỹ cảm và sản phẩm văn hóa đương thời.',
    btnLabel: 'Khảo sát ứng dụng đương đại',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 'economy',
    icon: ShieldCheck,
    title: 'Kinh tế di sản và nền tảng số',
    desc: 'Các mô hình định danh, giám định, bản quyền sở hữu trí tuệ, lưu trữ phi tập trung, thương mại hóa có trách nhiệm và xây dựng thị trường sơn mài minh bạch.',
    btnLabel: 'Khung pháp lý & Số hóa',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
];

const ICONS_MAP = {
  history: History,
  masters: Users,
  materials: Palette,
  creativity: Lightbulb,
  economy: ShieldCheck,
};

const ArchiveCategoriesSection = ({ pageProps = null }) => {
  const badge = pageProps?.categories_badge || 'Hệ thống lưu trữ phân tầng';
  const title = pageProps?.categories_title || '5 Phân Hệ Tri Thức Cốt Lõi';
  const desc =
    pageProps?.categories_desc ||
    'Khung cấu trúc học thuật bao quát toàn bộ tiến trình lịch sử, kỹ nghệ truyền thống và phương hướng phát triển của nghệ thuật sơn mài Việt Nam.';

  const rawCats = pageProps?.categories;
  const categories =
    Array.isArray(rawCats) && rawCats.length > 0
      ? rawCats.map((cat, idx) => ({
          ...cat,
          icon: ICONS_MAP[cat.id] || DEFAULT_CATEGORIES[idx % DEFAULT_CATEGORIES.length].icon,
          colSpan: cat.colSpan || DEFAULT_CATEGORIES[idx % DEFAULT_CATEGORIES.length].colSpan,
        }))
      : DEFAULT_CATEGORIES;

  return (
    <section
      className="relative w-full py-20 md:py-28 text-stone-100 select-none"
      style={{
        background:
          'linear-gradient(180deg, #1a0507 0%, #260a0e 50%, #1c0508 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 bg-[#3d0c0f] border border-[#D4AF37]/35 text-[#FFDF73] text-[12px] uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] text-gold-gradient uppercase font-bold leading-tight">
                {title}
              </h2>
            )}
            {desc && (
              <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90 mt-2">
                {desc}
              </p>
            )}
          </div>
        </div>

        {/* Asymmetrical Bento Curatorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon || Sparkles;
            return (
              <div
                key={cat.id || cat.title}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-all duration-300 card-lacquer ${cat.colSpan}`}
                style={{
                  background: 'rgba(45, 12, 16, 0.72)',
                  border: '1px solid rgba(212, 175, 55, 0.32)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#200508] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#FFDF73]" />
                    </div>
                    <span className="font-serif text-[12px] uppercase tracking-widest text-[#D4AF37]/80 font-bold">
                      PHÂN HỆ {String(cat.id || '').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif text-[22px] sm:text-[26px] mb-3 font-bold text-gold-gradient">
                    {cat.title}
                  </h3>

                  <p className="font-body text-[15px] sm:text-[16px] leading-[1.8] text-[#FAF7F2]/95">
                    {cat.desc}
                  </p>
                </div>

                <div
                  className="mt-8 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 font-serif text-[13px] md:text-[14px] text-[#FFDF73] hover:text-[#FFF3CC] transition-colors uppercase font-bold tracking-wider cursor-pointer"
                    onClick={() => alert(`Đang mở thư viện chuyên khảo: ${cat.title}`)}
                  >
                    <span>{cat.btnLabel || 'Tra cứu chuyên đề'}</span>
                    <ArrowRight className="w-4 h-4 font-bold group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { ArchiveCategoriesSection };
export default ArchiveCategoriesSection;
