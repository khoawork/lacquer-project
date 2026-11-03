import React from 'react';

const NewsFilterSection = ({ activeCategory, onSelectCategory }) => {
  const categories = [
    'Tất cả',
    'Dòng chảy 100 năm',
    'Người giữ lửa',
    'Từ xưởng đến đời sống',
    'Nhật ký Hành trình',
    'Sơn mài 2.0',
    'Góc nhìn quốc tế',
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-10 w-full mb-10 select-none">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 py-1 scrollbar-none" id="categoryFilter">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2 rounded-full font-serif text-[13px] md:text-[14px] uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'font-bold shadow-[0_0_18px_rgba(233,195,73,0.45)]'
                  : 'hover:text-[#FFDF73]'
              }`}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, #FFDF73 0%, #D4AF37 50%, #B8860B 100%)',
                      color: '#1a0507',
                    }
                  : {
                      background: 'rgba(36, 10, 14, 0.65)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      color: '#FAF7F2',
                    }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default NewsFilterSection;
export { NewsFilterSection };

