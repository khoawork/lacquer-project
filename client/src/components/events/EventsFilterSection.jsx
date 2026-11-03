import React from 'react';

const EventsFilterSection = ({ activeFilter, setActiveFilter }) => {
  const filterTabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'conference', label: 'Tọa đàm – Hội thảo' },
    { id: 'exhibition', label: 'Triển lãm' },
    { id: 'workshop', label: 'Workshop – Open Studio' },
    { id: 'records', label: 'Kỷ lục – Vinh danh' },
    { id: 'education', label: 'Giáo dục – Cộng đồng' },
    { id: 'past', label: 'Đã diễn ra' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Filter Tab Buttons with Smooth Scroll on Mobile */}
        <div className="w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          <div
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full border border-[#D4AF37]/35 shadow-[0_6px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl whitespace-nowrap"
            style={{ background: 'rgba(36, 10, 14, 0.85)' }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full font-serif text-[13px] sm:text-[14px] md:text-[15px] tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'btn-gold font-bold shadow-lg'
                      : 'text-[#FAF7F2] hover:text-[#FFDF73] hover:bg-[#461219]/60 border border-transparent hover:border-[#D4AF37]/30 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Action Counter Pill */}
        <div
          className="hidden lg:flex items-center gap-2.5 text-[#FFDF73] font-serif text-[12px] sm:text-[13px] tracking-wider whitespace-nowrap px-4 py-2 rounded-full border border-[#D4AF37]/30"
          style={{ background: 'rgba(34, 9, 13, 0.85)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73] animate-ping" />
          <span className="font-bold uppercase">ĐANG CẬP NHẬT 2 SỰ KIỆN QUAN TRỌNG</span>
        </div>
      </div>
    </section>
  );
};

export default EventsFilterSection;

