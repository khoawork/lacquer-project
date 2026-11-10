import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Filter } from 'lucide-react';

const NewsFilterSection = ({
  activeCategory = 'Tất cả',
  onSelectCategory,
  setActiveCategory,
  categories: customCategories,
  articles = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = onSelectCategory || setActiveCategory || (() => {});

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tự động gộp các chuyên mục từ dữ liệu bài viết thực tế trong database
  const categories = useMemo(() => {
    if (customCategories && customCategories.length > 0) return customCategories;
    const dbCats = Array.from(
      new Set(articles.map((a) => a.category?.trim()).filter(Boolean))
    );
    const combined = ['Tất cả'];
    dbCats.forEach((cat) => {
      if (!combined.includes(cat)) combined.push(cat);
    });
    return combined;
  }, [customCategories, articles]);

  // Đếm số lượng bài viết mỗi chuyên mục
  const countByCategory = useMemo(() => {
    const map = { 'Tất cả': articles.length };
    articles.forEach((a) => {
      const cat = a.category?.trim();
      if (cat) {
        map[cat] = (map[cat] || 0) + 1;
      }
    });
    return map;
  }, [articles]);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-20 w-full mb-8 select-none">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#D4AF37]/20 pb-4">
        {/* Left: Active Category / Count Indicator */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_rgba(255,223,115,0.7)]" />
          <span className="font-sans text-base md:text-lg font-bold text-gold-gradient uppercase tracking-wide">
            {activeCategory === 'Tất cả' ? 'Tất cả bài viết' : activeCategory}
          </span>
          {typeof countByCategory[activeCategory] === 'number' && (
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2a070c] border border-[#D4AF37]/30 text-[#FFDF73]">
              {countByCategory[activeCategory]} bài
            </span>
          )}
        </div>

        {/* Right: Dropdown Filter */}
        <div className="relative ml-auto" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1c0508] hover:bg-[#2c080d] border border-[#D4AF37]/40 hover:border-[#FFDF73] text-[#FAF7F2] text-xs md:text-sm font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Filter className="w-4 h-4 text-[#FFDF73]" />
            <span className="text-[#EADBCE]/70 normal-case font-sans font-normal text-xs">
              Chuyên mục:
            </span>
            <span className="text-[#FFDF73] font-bold max-w-[160px] sm:max-w-none truncate">
              {activeCategory}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#FFDF73] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl bg-[#180406]/95 backdrop-blur-xl border border-[#D4AF37]/60 shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]/80 border-b border-[#D4AF37]/20 mb-1 flex items-center justify-between">
                <span>Chọn chuyên mục</span>
                <span className="text-[10px] text-[#EADBCE]/50">
                  {categories.length} danh mục
                </span>
              </div>
              <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar">
                {categories.map((cat) => {
                  const isSelected =
                    activeCategory?.toLowerCase() === cat.toLowerCase() ||
                    (cat === 'Tất cả' && (!activeCategory || activeCategory === 'Tất cả'));
                  const count = countByCategory[cat];

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        handleSelect(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans uppercase tracking-wider text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] font-bold shadow-md'
                          : 'text-[#FAF7F2]/85 hover:bg-[#2b080d] hover:text-[#FFDF73]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3] shrink-0 text-[#1a0507]" />
                        ) : (
                          <span className="w-4 shrink-0" />
                        )}
                        <span className="truncate">{cat}</span>
                      </div>
                      {typeof count === 'number' && (
                        <span
                          className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                            isSelected
                              ? 'bg-[#1a0507]/20 text-[#1a0507]'
                              : 'bg-[#3d090f] text-[#FFDF73] border border-[#D4AF37]/30'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsFilterSection;
export { NewsFilterSection };
