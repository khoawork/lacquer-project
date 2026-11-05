import React from 'react';
import { BookOpen, Layers } from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';

const ArchivePageEditor = ({ parsedProps, handlePropChange }) => {
  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Kỷ Yếu (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề, phân loại tài liệu nghiên cứu và ảnh bìa ấn bản kỷ yếu quốc gia.
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
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Phụ đề (subHeadline)
            </label>
            <input
              type="text"
              value={parsedProps.subHeadline || ''}
              onChange={(e) => handlePropChange('subHeadline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả tổng quan (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Ảnh Bìa Kỷ Yếu Khảo Cứu Quốc Gia (cover_image)"
              value={parsedProps.cover_image || ''}
              onChange={(val) => handlePropChange('cover_image', val)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: 4 TẬP ẤN BẢN KỶ YẾU */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 2: 4 Tập Ấn Bản Kỷ Yếu Di Sản
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Chỉnh sửa tên và mô tả trọng tâm từng tập ấn bản kỷ yếu.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { id: 1, label: 'TẬP I: 1930 — 1954' },
            { id: 2, label: 'TẬP II: 1954 — 1986' },
            { id: 3, label: 'TẬP III: 1986 — 2010' },
            { id: 4, label: 'TẬP IV: 2010 — 2030' },
          ].map(({ id, label }) => (
            <div key={id} className="p-4 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-3">
              <span className="text-xs font-mono font-bold text-[#FFDF73] block">{label}</span>
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                  Tiêu đề tập (vol{id}_title)
                </label>
                <input
                  type="text"
                  value={parsedProps[`vol${id}_title`] || ''}
                  onChange={(e) => handlePropChange(`vol${id}_title`, e.target.value)}
                  placeholder={`Tiêu đề tập ${id}...`}
                  className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                  Mô tả trọng tâm (vol{id}_desc)
                </label>
                <textarea
                  rows={2}
                  value={parsedProps[`vol${id}_desc`] || ''}
                  onChange={(e) => handlePropChange(`vol${id}_desc`, e.target.value)}
                  placeholder={`Mô tả chuyên đề tập ${id}...`}
                  className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-[#EADBCE] text-sm focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivePageEditor;

