import React from 'react';

const DEFAULT_EVENT_CATEGORIES = [
  'Tất cả',
  'Tọa đàm – Hội thảo',
  'Triển lãm',
  'Workshop – Open Studio',
  'Kỷ lục – Vinh danh',
  'Giáo dục – Cộng đồng',
  'Đã diễn ra',
];

const EventsFilterSection = ({
  activeFilter,
  setActiveFilter,
  categories = DEFAULT_EVENT_CATEGORIES,
  counterBadge = 'ĐANG CẬP NHẬT 2 SỰ KIỆN QUAN TRỌNG',
}) => {
  // Đảm bảo "Tất cả" luôn ở đầu và "Đã diễn ra" ở cuối nếu chưa có
  const displayCategories = [...categories];
  if (!displayCategories.includes('Tất cả')) displayCategories.unshift('Tất cả');
  if (!displayCategories.includes('Đã diễn ra')) displayCategories.push('Đã diễn ra');

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-14 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Khung Chứa Các Nút Lọc Danh Mục - Hoàn toàn không hiện thanh cuộn xấu */}
        <div
          id="filter-scroll-wrapper"
          className="w-full lg:w-auto overflow-x-auto no-scrollbar py-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`
            #filter-scroll-wrapper::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
          `}</style>
          <div
            className="inline-flex items-center gap-1.5 md:gap-2 p-1.5 rounded-full border border-[#D4AF37]/35 shadow-[0_6px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl shrink-0"
            id="filter-container"
            style={{ background: 'rgba(36, 10, 14, 0.85)' }}
          >
            {displayCategories.map((catName) => {
              const isActive = activeFilter === catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setActiveFilter(catName)}
                  className={`filter-btn px-4 md:px-5 py-2 rounded-full font-serif text-[14px] md:text-[15px] tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'btn-gold font-bold shadow-lg'
                      : 'text-[#FAF7F2] hover:text-[#FFDF73] hover:bg-[#461219]/60 border border-transparent hover:border-[#D4AF37]/30'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Action Counter - Luôn hiển thị đầy đủ, không bị cắt góc */}
        {counterBadge && (
          <div
            className="flex items-center gap-2.5 text-[#FFDF73] font-serif text-[12px] md:text-[13px] tracking-wider whitespace-nowrap px-4 py-2.5 rounded-full border border-[#D4AF37]/30 shrink-0 shadow-lg"
            style={{
              background: 'rgba(34, 9, 13, 0.85)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73] animate-ping" />
            <span className="font-semibold uppercase">{counterBadge}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsFilterSection;
export { DEFAULT_EVENT_CATEGORIES };
