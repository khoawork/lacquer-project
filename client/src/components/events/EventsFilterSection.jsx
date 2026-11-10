import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

export const DEFAULT_EVENT_CATEGORIES = [];

const EventsFilterSection = ({
  activeFilter = 'Tất cả',
  setActiveFilter,
  categories = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đảm bảo "Tất cả" luôn ở đầu và "Đã diễn ra" ở cuối nếu có danh mục
  const displayCategories = Array.isArray(categories) && categories.length > 0
    ? [...categories]
    : ['Tất cả'];
  if (!displayCategories.includes('Tất cả')) displayCategories.unshift('Tất cả');
  if (displayCategories.length > 1 && !displayCategories.includes('Đã diễn ra')) {
    displayCategories.push('Đã diễn ra');
  }

  // Đóng dropdown khi nhấp ra ngoài hoặc bấm Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-10 relative z-30">
      <div className="flex items-center justify-end">
        {/* Dropdown Filter đặt bên phải */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1c0508]/90 hover:bg-[#2c080d] border border-[#D4AF37]/40 hover:border-[#E6CA65] text-[#FAF7F2] text-xs md:text-sm font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Filter className="w-4 h-4 text-[#E6CA65]" />
            <span className="text-[#EADBCE]/75 normal-case font-sans font-medium text-xs md:text-sm">
              Chủ đề:
            </span>
            <span className="text-[#E6CA65] font-bold max-w-[160px] sm:max-w-none truncate">
              {activeFilter || 'Tất cả'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#E6CA65] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl bg-[#180406]/98 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]/80 border-b border-[#D4AF37]/20 mb-1 flex items-center justify-between">
                <span>Chọn chủ đề sự kiện</span>
                <span className="text-[10px] text-[#EADBCE]/50">
                  {displayCategories.length} chủ đề
                </span>
              </div>
              <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar">
                {displayCategories.map((catName) => {
                  const isSelected =
                    activeFilter?.toLowerCase() === catName.toLowerCase() ||
                    (catName === 'Tất cả' && (!activeFilter || activeFilter === 'Tất cả'));

                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => {
                        setActiveFilter?.(catName);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans uppercase tracking-wider text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#1a0507] font-bold shadow-md'
                          : 'text-[#FAF7F2]/85 hover:bg-[#2b080d] hover:text-[#E6CA65]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3] shrink-0 text-[#1a0507]" />
                        ) : (
                          <span className="w-4 shrink-0" />
                        )}
                        <span className="truncate">{catName}</span>
                      </div>
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

export default EventsFilterSection;
export { EventsFilterSection };
