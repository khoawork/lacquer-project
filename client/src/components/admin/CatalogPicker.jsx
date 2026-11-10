import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Palette,
  Newspaper,
  Check,
  Search,
  RefreshCw,
  Layers,
  Sparkles,
  Eye,
  CheckSquare,
  Square,
} from 'lucide-react';
import eventServices from '../../services/eventServices';
import collectionServices from '../../services/collectionServices';
import newsServices from '../../services/newsServices';
import { getImageUrl } from '../../configs/Apis';

/**
 * CatalogPicker: Component cho phép Admin tick chọn các mục từ Danh mục dữ liệu
 * (Sự kiện, Bộ sưu tập, Tin tức) để ghim/hiển thị trên từng trang website.
 */
const CatalogPicker = ({
  type = 'events', // 'events' | 'collections' | 'news'
  selectedIds = [], // Array of numbers or strings: [1, 2, ...]
  onChange, // (newSelectedIds: number[]) => void
  title,
  description,
  maxSelect = null,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Load items from corresponding service
  useEffect(() => {
    let isMounted = true;
    const loadItems = async () => {
      setLoading(true);
      try {
        let res;
        if (type === 'events') {
          res = await eventServices.getEvents();
        } else if (type === 'collections') {
          res = await collectionServices.getCollections();
        } else if (type === 'news') {
          res = await newsServices.getNews();
        }

        if (res && res.data && res.data.success && isMounted) {
          setItems(res.data.data || []);
        }
      } catch (err) {
        console.warn(`Lỗi tải danh mục dữ liệu (${type}):`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadItems();
    return () => {
      isMounted = false;
    };
  }, [type]);

  const normalizedSelectedIds = Array.isArray(selectedIds)
    ? selectedIds.map((id) => Number(id))
    : [];

  const handleToggle = (id) => {
    const numId = Number(id);
    let updated;
    if (normalizedSelectedIds.includes(numId)) {
      updated = normalizedSelectedIds.filter((item) => item !== numId);
    } else {
      if (maxSelect && normalizedSelectedIds.length >= maxSelect) {
        alert(`Bạn chỉ được chọn tối đa ${maxSelect} mục.`);
        return;
      }
      updated = [...normalizedSelectedIds, numId];
    }
    onChange?.(updated);
  };

  const handleSelectAll = () => {
    const allIds = filteredItems.map((item) => Number(item.id));
    onChange?.(allIds);
  };

  const handleDeselectAll = () => {
    onChange?.([]);
  };

  // Filter items by search
  const filteredItems = items.filter((item) => {
    const text = `${item.id} ${item.name || ''} ${item.title || ''} ${item.category || ''} ${
      item.subtitle || ''
    }`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const getLabelByType = () => {
    if (type === 'events') return { singular: 'sự kiện', icon: Calendar, color: 'text-amber-400' };
    if (type === 'collections') return { singular: 'bộ sưu tập', icon: Palette, color: 'text-rose-400' };
    return { singular: 'bài viết tin tức', icon: Newspaper, color: 'text-sky-400' };
  };

  const meta = getLabelByType();
  const Icon = meta.icon;

  return (
    <div className="space-y-3.5 p-4 sm:p-5 rounded-xl bg-[#140305] border border-[#D4AF37]/35 shadow-inner">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${meta.color}`} />
            <h4 className="font-sans text-sm sm:text-base font-bold text-[#FFDF73]">
              {title || `Chọn ${meta.singular} để hiển thị`}
            </h4>
          </div>
          <p className="text-xs text-[#EADBCE]/70 mt-0.5">
            {description ||
              `Tick chọn những ${meta.singular} bạn muốn hiển thị trên trang này (dữ liệu được lấy trực tiếp từ Danh mục dữ liệu).`}
          </p>
        </div>

        {/* Selected Counter & Bulk Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="px-2.5 py-1 rounded bg-[#2a060a] border border-[#D4AF37]/30 text-xs font-semibold text-[#FFDF73]">
            Đã chọn: <strong className="text-white">{normalizedSelectedIds.length}</strong>
            {items.length > 0 && ` / ${items.length}`}
          </span>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-[11px] text-[#EADBCE] hover:text-[#FFDF73] underline px-1.5 py-0.5 cursor-pointer"
          >
            Chọn tất cả
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="text-[11px] text-[#EADBCE] hover:text-red-400 underline px-1.5 py-0.5 cursor-pointer"
          >
            Bỏ chọn
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Tìm kiếm trong danh sách ${meta.singular}...`}
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0d0203] border border-[#D4AF37]/25 text-xs text-white focus:outline-none focus:border-[#FFDF73]"
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8 gap-2 text-xs text-[#FFDF73]">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Đang nạp danh sách {meta.singular}...</span>
        </div>
      )}

      {/* Empty list */}
      {!loading && filteredItems.length === 0 && (
        <div className="p-6 text-center text-xs text-[#EADBCE]/60 bg-[#0d0203]/60 rounded-lg border border-[#D4AF37]/15">
          {items.length === 0
            ? `Chưa có bản ghi nào trong bảng ${meta.singular}. Vui lòng tạo mới tại mục "HỆ THỐNG > Danh mục dữ liệu".`
            : 'Không tìm thấy kết quả phù hợp với từ khóa tìm kiếm.'}
        </div>
      )}

      {/* Items Grid */}
      {!loading && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
          {filteredItems.map((item) => {
            const isSelected = normalizedSelectedIds.includes(Number(item.id));
            const rawImg = item.thumbnail_url || item.cover_image || item.image;
            const titleText = item.name || item.title || `Bản ghi #${item.id}`;
            const subText = item.category || item.subtitle || item.year || item.date_display || '';

            return (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`relative flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'bg-[#3b080f] border-[#FFDF73] shadow-[0_0_10px_rgba(212,175,55,0.3)] ring-1 ring-[#FFDF73]'
                    : 'bg-[#180306]/70 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#200408]'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#d49b1a] text-black font-bold'
                      : 'border border-[#D4AF37]/50 bg-[#0e0203]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Thumbnail */}
                <div className="w-12 h-10 rounded bg-[#0d0203] border border-[#D4AF37]/30 overflow-hidden shrink-0 flex items-center justify-center">
                  {rawImg ? (
                    <img
                      src={getImageUrl(rawImg)}
                      alt={titleText}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Icon className="w-4 h-4 text-[#D4AF37]/40" />
                  )}
                </div>

                {/* Title & Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#FFDF73] font-bold">#{item.id}</span>
                    <p className="font-sans text-xs font-semibold text-white truncate">{titleText}</p>
                  </div>
                  {subText && (
                    <p className="text-[10px] text-[#EADBCE]/70 truncate mt-0.5">{subText}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CatalogPicker;

