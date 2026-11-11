import React from 'react';
import { Compass, Calendar, Plus, Trash2, Quote, Layers, Megaphone } from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';

const JourneyPageEditor = ({ parsedProps, handlePropChange }) => {
  // Timeline nodes array helpers
  const timelineNodes = Array.isArray(parsedProps.timeline_nodes) ? parsedProps.timeline_nodes : [];

  const handleAddTimelineNode = () => {
    const updated = [
      ...timelineNodes,
      {
        tag: 'GIAI ĐOẠN MỚI',
        era: '2030+',
        title: 'Tiêu đề mốc son mới',
        desc: 'Mô tả chi tiết nội dung lịch sử hoặc tương lai...',
        is_live: false,
      },
    ];
    handlePropChange('timeline_nodes', updated);
  };

  const handleUpdateTimelineNode = (idx, field, val) => {
    const updated = timelineNodes.map((item, i) =>
      i === idx ? { ...item, [field]: val } : item
    );
    handlePropChange('timeline_nodes', updated);
  };

  const handleRemoveTimelineNode = (idx) => {
    const updated = timelineNodes.filter((_, i) => i !== idx);
    handlePropChange('timeline_nodes', updated);
  };

  // Symposia array helpers
  const symposia = Array.isArray(parsedProps.symposia) ? parsedProps.symposia : [];

  const handleAddSymposium = () => {
    const updated = [
      ...symposia,
      {
        code: `CHUYÊN ĐỀ 0${symposia.length + 1}`,
        title: 'Tiêu đề chuyên đề mới',
        desc: 'Nội dung tóm tắt chuyên đề đối thoại khoa học...',
        sub: '',
      },
    ];
    handlePropChange('symposia', updated);
  };

  const handleUpdateSymposium = (idx, field, val) => {
    const updated = symposia.map((item, i) =>
      i === idx ? { ...item, [field]: val } : item
    );
    handlePropChange('symposia', updated);
  };

  const handleRemoveSymposium = (idx) => {
    const updated = symposia.filter((_, i) => i !== idx);
    handlePropChange('symposia', updated);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Hành Trình (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Biểu tượng con dấu bách niên, thông điệp mở đầu và trích dẫn triết lý.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Phụ đề (subtitle)
            </label>
            <input
              type="text"
              value={parsedProps.subtitle || ''}
              onChange={(e) => handlePropChange('subtitle', e.target.value)}
              placeholder="BẢN SẮC HỘI HỌA & DI SẢN NGHỆ THUẬT"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn (headline)
            </label>
            <textarea
              rows={2}
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              placeholder="MỘT THẾ KỶ TÍCH TỤ&#10;MỘT TƯƠNG LAI ĐANG MỞ"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả chi tiết (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tên nút bấm Hero (hero_cta_text)
            </label>
            <input
              type="text"
              value={parsedProps.hero_cta_text || ''}
              onChange={(e) => handlePropChange('hero_cta_text', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Liên kết nút bấm (hero_cta_link)
            </label>
            <input
              type="text"
              value={parsedProps.hero_cta_link || ''}
              onChange={(e) => handlePropChange('hero_cta_link', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Câu triết lý chân trang (bottom_quote)
            </label>
            <input
              type="text"
              value={parsedProps.bottom_quote || ''}
              onChange={(e) => handlePropChange('bottom_quote', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Biểu Trưng / Con Dấu Bách Niên Nền Hero (hero_seal)"
              value={parsedProps.hero_seal || parsedProps.hero_image || ''}
              onChange={(val) => {
                handlePropChange('hero_seal', val);
                handlePropChange('hero_image', val);
              }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: DÒNG THỜI GIAN LỊCH SỬ (TIMELINE NODES) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 2: Dòng Thời Gian Lịch Sử & Tương Lai (Timeline Nodes)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cho phép thêm, sửa, xóa các mốc giai đoạn lịch sử dọc theo trục hoàng kim.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddTimelineNode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black text-xs font-bold uppercase transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Mốc Son</span>
          </button>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Tiêu đề khối dòng thời gian (timeline_title)
          </label>
          <input
            type="text"
            value={parsedProps.timeline_title || ''}
            onChange={(e) => handlePropChange('timeline_title', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        <div className="space-y-4 pt-2">
          {timelineNodes.map((node, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FFDF73]">
                  Mốc son #{idx + 1}
                </span>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#EADBCE] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(node.is_live)}
                      onChange={(e) => handleUpdateTimelineNode(idx, 'is_live', e.target.checked)}
                      className="rounded border-[#D4AF37]/50 text-[#FFDF73] focus:ring-0"
                    />
                    <span>Mốc hiện tại (Highlight Live)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleRemoveTimelineNode(idx)}
                    className="p-1 rounded bg-red-950/80 text-red-300 hover:text-white border border-red-500/50"
                    title="Xóa mốc son này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Nhãn giai đoạn (tag)
                  </label>
                  <input
                    type="text"
                    value={node.tag || ''}
                    onChange={(e) => handleUpdateTimelineNode(idx, 'tag', e.target.value)}
                    placeholder="KHỞI SINH"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Niên đại / Năm (era)
                  </label>
                  <input
                    type="text"
                    value={node.era || ''}
                    onChange={(e) => handleUpdateTimelineNode(idx, 'era', e.target.value)}
                    placeholder="1930–1945"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Tiêu đề mốc son (title)
                  </label>
                  <input
                    type="text"
                    value={node.title || ''}
                    onChange={(e) => handleUpdateTimelineNode(idx, 'title', e.target.value)}
                    placeholder="Khởi nguyên ngôn ngữ hiện đại"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Mô tả diễn giải (desc)
                  </label>
                  <textarea
                    rows={2}
                    value={node.desc || ''}
                    onChange={(e) => handleUpdateTimelineNode(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-[#EADBCE] text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: KEY QUOTE BANNER */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 3: Trích Dẫn Trọng Tâm (Key Quote Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Khung thông điệp triết lý lớn xuất hiện giữa trang hành trình.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Nội dung câu trích dẫn (key_quote)
          </label>
          <textarea
            rows={3}
            value={parsedProps.key_quote || ''}
            onChange={(e) => handlePropChange('key_quote', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] font-sans text-base focus:border-[#FFDF73] focus:outline-none"
          />
        </div>
      </div>

      {/* SECTION 4: CHUỖI CHUYÊN ĐỀ & CHUYÊN ĐỀ ĐẶC BIỆT */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 4: Chuỗi Chuyên Đề & Chuyên Đề Đặc Biệt
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Quản lý 6 chuyên đề nghiên cứu và chuyên đề đặc biệt lần 7.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddSymposium}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black text-xs font-bold uppercase transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Chuyên Đề</span>
          </button>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Tiêu đề mục (symposia_title)
          </label>
          <input
            type="text"
            value={parsedProps.symposia_title || ''}
            onChange={(e) => handlePropChange('symposia_title', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        {/* 6 Symposia list */}
        <div className="space-y-4">
          <span className="text-xs font-sans uppercase tracking-widest text-[#FFDF73] font-bold block">
            Danh sách chuyên đề ({symposia.length})
          </span>
          {symposia.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FFDF73]">
                  Chuyên đề #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveSymposium(idx)}
                  className="p-1 rounded bg-red-950/80 text-red-300 hover:text-white border border-red-500/50"
                  title="Xóa chuyên đề này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Mã chuyên đề (code)
                  </label>
                  <input
                    type="text"
                    value={item.code || ''}
                    onChange={(e) => handleUpdateSymposium(idx, 'code', e.target.value)}
                    placeholder="CHUYÊN ĐỀ 01"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Ghi chú thẻ dưới (sub)
                  </label>
                  <input
                    type="text"
                    value={item.sub || ''}
                    onChange={(e) => handleUpdateSymposium(idx, 'sub', e.target.value)}
                    placeholder="Thị trường & Sưu tập"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Tên chuyên đề (title)
                  </label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleUpdateSymposium(idx, 'title', e.target.value)}
                    placeholder="Tỏa sáng bản sắc"
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                    Mô tả tóm lược (desc)
                  </label>
                  <textarea
                    rows={2}
                    value={item.desc || ''}
                    onChange={(e) => handleUpdateSymposium(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1e0407] border border-[#D4AF37]/35 text-[#EADBCE] text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Symposium (Lần 7) */}
        <div className="p-5 rounded-xl bg-[#240608] border border-[#D4AF37]/50 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#FFDF73] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse" />
            <span>Khung Chuyên Đề Đặc Biệt (Lần 7)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                Mã chuyên đề đặc biệt
              </label>
              <input
                type="text"
                value={parsedProps.featured_symposium_code || ''}
                onChange={(e) => handlePropChange('featured_symposium_code', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                Tiêu đề chuyên đề đặc biệt
              </label>
              <textarea
                rows={2}
                value={parsedProps.featured_symposium_title || ''}
                onChange={(e) => handlePropChange('featured_symposium_title', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                Mô tả chuyên đề đặc biệt
              </label>
              <textarea
                rows={3}
                value={parsedProps.featured_symposium_desc || ''}
                onChange={(e) => handlePropChange('featured_symposium_desc', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#EADBCE] text-sm focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                Tên nút bấm 1
              </label>
              <input
                type="text"
                value={parsedProps.featured_symposium_btn1 || ''}
                onChange={(e) => handlePropChange('featured_symposium_btn1', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                Tên nút bấm 2
              </label>
              <input
                type="text"
                value={parsedProps.featured_symposium_btn2 || ''}
                onChange={(e) => handlePropChange('featured_symposium_btn2', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: FINAL CTA */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 5: Khung Kêu Gọi Đồng Hành (CTA Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Biểu tượng con dấu, thông điệp kêu gọi và các liên kết tương tác.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn (cta_headline)
            </label>
            <input
              type="text"
              value={parsedProps.cta_headline || ''}
              onChange={(e) => handlePropChange('cta_headline', e.target.value)}
              placeholder="Cùng Viết Tiếp Hành Trình 100 Năm"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả kêu gọi (cta_desc)
            </label>
            <textarea
              rows={3}
              value={parsedProps.cta_desc || ''}
              onChange={(e) => handlePropChange('cta_desc', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút 1 - Nhãn (cta_btn1_text)
            </label>
            <input
              type="text"
              value={parsedProps.cta_btn1_text || ''}
              onChange={(e) => handlePropChange('cta_btn1_text', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút 1 - Đường dẫn (cta_btn1_link)
            </label>
            <input
              type="text"
              value={parsedProps.cta_btn1_link || ''}
              onChange={(e) => handlePropChange('cta_btn1_link', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút 2 - Nhãn (cta_btn2_text)
            </label>
            <input
              type="text"
              value={parsedProps.cta_btn2_text || ''}
              onChange={(e) => handlePropChange('cta_btn2_text', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút 2 - Đường dẫn (cta_btn2_link)
            </label>
            <input
              type="text"
              value={parsedProps.cta_btn2_link || ''}
              onChange={(e) => handlePropChange('cta_btn2_link', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Huy Hiệu / Con Dấu Kêu Gọi Hành Động (cta_image)"
              value={parsedProps.cta_image || ''}
              onChange={(val) => handlePropChange('cta_image', val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPageEditor;
