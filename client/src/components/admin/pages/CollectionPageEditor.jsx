import React from 'react';
import { Palette, Search, Check, Layers } from 'lucide-react';
import { getImageUrl } from '../../../configs/Apis';

const CollectionPageEditor = ({
  parsedProps,
  handlePropChange,
  allCollections = [],
  collectionSearch = '',
  setCollectionSearch,
  handleToggleCollection,
}) => {
  const selectedColIds = (parsedProps.featured_collection_ids || []).map(Number);

  const filteredCollections = allCollections.filter((col) => {
    const q = (collectionSearch || '').toLowerCase();
    return (
      String(col.id).includes(q) ||
      (col.name || col.title || '').toLowerCase().includes(q) ||
      (col.code || '').toLowerCase().includes(q) ||
      (col.technique || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Bộ Sưu Tập (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề, phụ đề và thông điệp triết lý nghệ thuật của kho tàng kiệt tác.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Huy hiệu (badge)
            </label>
            <input
              type="text"
              value={parsedProps.badge || ''}
              onChange={(e) => handlePropChange('badge', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Phụ đề dẫn nhập (subHeadline)
            </label>
            <textarea
              rows={2}
              value={parsedProps.subHeadline || ''}
              onChange={(e) => handlePropChange('subHeadline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thông điệp nghệ thuật / Trích dẫn (quote)
            </label>
            <input
              type="text"
              value={parsedProps.quote || ''}
              onChange={(e) => handlePropChange('quote', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: BỘ CHỌN BỘ SƯU TẬP */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 2: Chọn Danh Sách Bộ Sưu Tập Hiển Thị
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Tick chọn các bộ sưu tập từ cơ sở dữ liệu để hiển thị trên trang này. Đang chọn:{' '}
                <strong className="text-[#FFDF73] font-bold">{selectedColIds.length}</strong> / {allCollections.length} bộ sưu tập.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', allCollections.map((c) => Number(c.id)))}
              className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] hover:bg-[#3d0b11] transition"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', [])}
              className="px-3 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs font-semibold text-[#EADBCE]/80 hover:text-white transition"
            >
              Bỏ chọn tất cả
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#D4AF37]/60" />
          <input
            type="text"
            value={collectionSearch}
            onChange={(e) => setCollectionSearch(e.target.value)}
            placeholder="Tìm kiếm bộ sưu tập theo tên, mã số, kỹ thuật..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        {allCollections.length === 0 ? (
          <p className="text-xs text-[#EADBCE]/60 italic py-4">Chưa có bộ sưu tập nào trong hệ thống.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredCollections.map((col) => {
              const isSelected = selectedColIds.includes(Number(col.id));
              const coverImg = col.featured_image || col.image_url || col.cover_image;
              return (
                <div
                  key={col.id}
                  onClick={() => handleToggleCollection(col.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition ${
                    isSelected
                      ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(255,223,115,0.25)]'
                      : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition ${
                      isSelected ? 'bg-[#d49b1a] text-black font-bold' : 'border border-[#D4AF37]/50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {coverImg && (
                    <img
                      src={getImageUrl(coverImg)}
                      alt=""
                      className="w-12 h-12 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#FFDF73]">#{col.id}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{col.name || col.title}</h4>
                    <p className="text-[11px] text-[#EADBCE]/70 line-clamp-1">
                      {col.code || col.technique || 'Bộ sưu tập'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPageEditor;

