import React from 'react';
import {
  Sparkles,
  FileText,
  Layers,
  Calendar,
  Palette,
  Check,
  Search,
  BookOpen,
  Handshake,
} from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';
import { getImageUrl } from '../../../configs/Apis';

const HomePageEditor = ({
  parsedProps,
  handlePropChange,
  allEvents = [],
  allCollections = [],
  eventSearch = '',
  setEventSearch,
  collectionSearch = '',
  setCollectionSearch,
  handleToggleEvent,
  handleToggleCollection,
}) => {
  const selectedEventIds = (parsedProps.featured_event_ids || []).map(Number);
  const selectedColIds = (parsedProps.featured_collection_ids || []).map(Number);

  const filteredEvents = allEvents.filter((evt) => {
    const q = eventSearch.toLowerCase();
    return (
      String(evt.id).includes(q) ||
      (evt.name || evt.title || '').toLowerCase().includes(q) ||
      (evt.category || '').toLowerCase().includes(q)
    );
  });

  const filteredCollections = allCollections.filter((col) => {
    const q = collectionSearch.toLowerCase();
    return (
      String(col.id).includes(q) ||
      (col.name || col.title || '').toLowerCase().includes(q) ||
      (col.code || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* ---------------- SECTION 1: HERO ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang (Hero Banner 100vh)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Vùng xuất hiện đầu tiên khi khách truy cập vào trang chủ.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đường Dẫn Video Nền (hero_video_url)
            </label>
            <input
              type="text"
              placeholder="https://res.cloudinary.com/.../hero.mp4"
              value={parsedProps.hero_video_url || ''}
              onChange={(e) => handlePropChange('hero_video_url', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tagline Trên Cùng (top_tagline)
            </label>
            <input
              type="text"
              placeholder="NƠI HỘI TỤ"
              value={parsedProps.top_tagline || parsedProps.badge || ''}
              onChange={(e) => {
                handlePropChange('top_tagline', e.target.value);
                handlePropChange('badge', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Chữ Thư Pháp Uốn Lượn (cursive_title)
            </label>
            <input
              type="text"
              placeholder="Tinh hoa nghệ thuật"
              value={parsedProps.cursive_title || parsedProps.subtitle || ''}
              onChange={(e) => {
                handlePropChange('cursive_title', e.target.value);
                handlePropChange('subtitle', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-cursive text-lg focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Lớn Trung Tâm (headline) *
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-base font-sans font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thông Điệp / Câu Triết Lý (quote)
            </label>
            <textarea
              rows={3}
              value={parsedProps.quote || ''}
              onChange={(e) => handlePropChange('quote', e.target.value)}
              style={{ fieldSizing: 'content' }}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Câu Trích Dẫn Dưới Đáy Banner (bottom_quote)
            </label>
            <input
              type="text"
              value={parsedProps.bottom_quote || ''}
              onChange={(e) => handlePropChange('bottom_quote', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút Bấm Chính 1 (hero_cta1_text &amp; link)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={parsedProps.hero_cta1_text || ''}
                onChange={(e) => handlePropChange('hero_cta1_text', e.target.value)}
                placeholder="Chữ nút 1..."
                className="flex-1 px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.hero_cta1_link || ''}
                onChange={(e) => handlePropChange('hero_cta1_link', e.target.value)}
                placeholder="/journey"
                className="w-1/3 px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nút Bấm Phụ 2 (hero_cta2_text &amp; link)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={parsedProps.hero_cta2_text || ''}
                onChange={(e) => handlePropChange('hero_cta2_text', e.target.value)}
                placeholder="Chữ nút 2..."
                className="flex-1 px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.hero_cta2_link || ''}
                onChange={(e) => handlePropChange('hero_cta2_link', e.target.value)}
                placeholder="/contact"
                className="w-1/3 px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Biểu Trưng Tròn Nền Trung Tâm (Hero Center Image / Emblem)"
              value={parsedProps.hero_image || ''}
              onChange={(val) => handlePropChange('hero_image', val)}
              placeholder="https://... hoặc tải ảnh lên"
            />
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: HERITAGE STORY ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 2: Câu Chuyện Di Sản (Heritage Story)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Phần giới thiệu dòng chảy 100 năm và triết lý đồng kiến tạo.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Lớn (story_headline)
            </label>
            <input
              type="text"
              value={parsedProps.story_headline || ''}
              onChange={(e) => handlePropChange('story_headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-sans font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                Đoạn Văn Giới Thiệu 1 (story_p1)
              </label>
              <textarea
                rows={5}
                value={parsedProps.story_p1 || ''}
                onChange={(e) => handlePropChange('story_p1', e.target.value)}
                style={{ fieldSizing: 'content' }}
                className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[115px]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                Đoạn Văn Giới Thiệu 2 (story_p2)
              </label>
              <textarea
                rows={6}
                value={parsedProps.story_p2 || ''}
                onChange={(e) => handlePropChange('story_p2', e.target.value)}
                style={{ fieldSizing: 'content' }}
                className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[135px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#D4AF37]/20">
            <div>
              <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                Câu Khẩu Hiệu Nổi Bật (Callout Headline)
              </label>
              <input
                type="text"
                value={parsedProps.story_callout || ''}
                onChange={(e) => handlePropChange('story_callout', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                Nội Dung Diễn Giải Khẩu Hiệu
              </label>
              <textarea
                rows={4}
                value={parsedProps.story_callout_desc || ''}
                onChange={(e) => handlePropChange('story_callout_desc', e.target.value)}
                style={{ fieldSizing: 'content' }}
                className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[90px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/20 space-y-3">
            <span className="text-xs uppercase font-bold text-[#FFDF73] tracking-wider block">
              Khối Hình Ảnh Minh Họa Di Sản &amp; Chú Thích Dưới Ảnh (Visual Plinth)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ImageUploader
                  label="Hình Ảnh Di Sản (story_image)"
                  value={parsedProps.story_image || ''}
                  onChange={(val) => handlePropChange('story_image', val)}
                  placeholder="https://... hoặc tải ảnh lên"
                />
              </div>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                    Nhãn Thẻ Phụ Trực Quan (story_image_tag)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_image_tag || ''}
                    onChange={(e) => handlePropChange('story_image_tag', e.target.value)}
                    placeholder="vd: Kỹ thuật truyền thống"
                    className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                    Tiêu Đề Ảnh (story_image_title)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_image_title || ''}
                    onChange={(e) => handlePropChange('story_image_title', e.target.value)}
                    placeholder="vd: Mài Dưới Dòng Nước Lộ Sắc"
                    className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                    Mô Tả Dưới Ảnh (story_image_desc)
                  </label>
                  <textarea
                    rows={2}
                    value={parsedProps.story_image_desc || ''}
                    onChange={(e) => handlePropChange('story_image_desc', e.target.value)}
                    placeholder="vd: Sự kiên nhẫn bóc tách từng tầng sơn then..."
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[50px]"
                  />
                </div>
              </div>
            </div>

            {/* Quản lý Con Dấu Tròn Di Sản (Decorative Stamp Accent) */}
            <div className="p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/30 mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#FFDF73] tracking-wider block">
                  Con Dấu / Huy Hiệu Tròn Di Sản (Decorative Stamp Accent)
                </span>
                <span className="text-[10px] text-[#EADBCE]/60 italic">
                  Hiển thị ở góc dưới ảnh minh họa
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#EADBCE]/80 mb-1">
                    Dòng 1 (story_stamp_line1)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_stamp_line1 ?? 'DI SẢN'}
                    onChange={(e) => handlePropChange('story_stamp_line1', e.target.value)}
                    placeholder="vd: DI SẢN"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#EADBCE]/80 mb-1">
                    Dòng 2 (story_stamp_line2)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_stamp_line2 ?? '1930–2030'}
                    onChange={(e) => handlePropChange('story_stamp_line2', e.target.value)}
                    placeholder="vd: 1930–2030"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#EADBCE]/80 mb-1">
                    Dòng 3 (story_stamp_line3)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_stamp_line3 ?? 'VIỆT NAM'}
                    onChange={(e) => handlePropChange('story_stamp_line3', e.target.value)}
                    placeholder="vd: VIỆT NAM"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                {/* Mini Preview của Con Dấu Tròn */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#3d0909] border border-[#FFDF73]/70 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.35)] text-[#FFDF73] p-1 text-center">
                    <span className="font-sans text-[8.5px] uppercase tracking-[0.16em] font-bold leading-tight whitespace-nowrap">
                      {parsedProps.story_stamp_line1 ?? 'DI SẢN'}
                      <br />
                      {parsedProps.story_stamp_line2 ?? '1930–2030'}
                      <br />
                      {parsedProps.story_stamp_line3 ?? 'VIỆT NAM'}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#EADBCE]/60 mt-1">Xem trước</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 3: 4 PILLARS ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 3: Bốn Hướng Mở Của Hành Trình (4 Pillars)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Chỉnh sửa tiêu đề, mô tả và toàn bộ nút khám phá của 4 trụ cột.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Section (pillars_headline)
            </label>
            <input
              type="text"
              value={parsedProps.pillars_headline || ''}
              onChange={(e) => handlePropChange('pillars_headline', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô Tả Chung (pillars_desc)
            </label>
            <textarea
              rows={3}
              value={parsedProps.pillars_desc || ''}
              onChange={(e) => handlePropChange('pillars_desc', e.target.value)}
              style={{ fieldSizing: 'content' }}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-2.5">
              <span className="text-[11px] font-mono font-bold text-[#FFDF73]">TRỤ CỘT 0{i}</span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Tên trụ cột</label>
                <input
                  type="text"
                  value={parsedProps[`pillar${i}_title`] || ''}
                  onChange={(e) => handlePropChange(`pillar${i}_title`, e.target.value)}
                  placeholder={`Tên trụ cột ${i}...`}
                  className="w-full px-2.5 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Mô tả chi tiết</label>
                <textarea
                  rows={6}
                  value={parsedProps[`pillar${i}_desc`] || ''}
                  onChange={(e) => handlePropChange(`pillar${i}_desc`, e.target.value)}
                  placeholder={`Mô tả trụ cột ${i}...`}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-2.5 py-2 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[110px]"
                />
              </div>
              <div className="pt-2 border-t border-[#D4AF37]/20 space-y-1.5 bg-[#180306]/70 p-2 rounded-lg">
                <label className="block text-[10px] uppercase font-bold text-[#FFDF73]">Nút Khám Phá (CTA)</label>
                <input
                  type="text"
                  value={parsedProps[`pillar${i}_cta_text`] || ''}
                  onChange={(e) => handlePropChange(`pillar${i}_cta_text`, e.target.value)}
                  placeholder="Khám phá..."
                  className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
                />
                <input
                  type="text"
                  value={parsedProps[`pillar${i}_cta_link`] || ''}
                  onChange={(e) => handlePropChange(`pillar${i}_cta_link`, e.target.value)}
                  placeholder="Link..."
                  className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SECTION 4: OPERATIONAL PIPELINE ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 4: Mô Hình Vận Hành (LAB &bull; STUDIO &bull; SHOWCASE &bull; MARKET)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Chỉnh sửa 4 bước chuyển hóa giá trị văn hóa và kinh tế.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Section (pipeline_headline)
            </label>
            <input
              type="text"
              value={parsedProps.pipeline_headline || ''}
              onChange={(e) => handlePropChange('pipeline_headline', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô Tả Chung (pipeline_desc)
            </label>
            <textarea
              rows={3}
              value={parsedProps.pipeline_desc || ''}
              onChange={(e) => handlePropChange('pipeline_desc', e.target.value)}
              style={{ fieldSizing: 'content' }}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {[
            { step: 1, name: 'LAB', defaultSub: 'Nghiên cứu & Thể nghiệm' },
            { step: 2, name: 'STUDIO', defaultSub: 'Sáng tạo & Chế tác' },
            { step: 3, name: 'SHOWCASE', defaultSub: 'Trưng bày & Lan tỏa' },
            { step: 4, name: 'MARKET', defaultSub: 'Thương mại hóa di sản' },
          ].map((item) => (
            <div key={item.step} className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-1.5">
              <span className="text-[10px] font-mono text-[#FFDF73] font-bold">BƯỚC 0{item.step} &bull; {item.name}</span>
              <input
                type="text"
                value={parsedProps[`step${item.step}_title`] || item.name}
                onChange={(e) => handlePropChange(`step${item.step}_title`, e.target.value)}
                className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold"
              />
              <input
                type="text"
                value={parsedProps[`step${item.step}_sub`] || item.defaultSub}
                onChange={(e) => handlePropChange(`step${item.step}_sub`, e.target.value)}
                placeholder="Phụ đề..."
                className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px]"
              />
              <textarea
                rows={4}
                value={parsedProps[`step${item.step}_desc`] || ''}
                onChange={(e) => handlePropChange(`step${item.step}_desc`, e.target.value)}
                placeholder="Mô tả..."
                style={{ fieldSizing: 'content' }}
                className="w-full px-2 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-[11px] min-h-[75px] focus:outline-none focus:border-[#FFDF73]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SECTION 5: FEATURED EVENTS PICKER ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 5: Chọn Sự Kiện Hiển Thị Ngoài Trang Chủ
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Đang chọn <strong className="text-[#FFDF73]">{selectedEventIds.length}</strong> / {allEvents.length} sự kiện
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePropChange('featured_event_ids', allEvents.map((e) => Number(e.id)))}
              className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs text-[#FFDF73] font-semibold hover:bg-[#3e0c12] transition"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => handlePropChange('featured_event_ids', [])}
              className="px-3 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs text-[#EADBCE]/80 hover:text-white transition"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Section Sự Kiện
            </label>
            <input
              type="text"
              value={parsedProps.events_headline || ''}
              onChange={(e) => handlePropChange('events_headline', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô Tả Section Sự Kiện
            </label>
            <textarea
              rows={2}
              value={parsedProps.events_desc || ''}
              onChange={(e) => handlePropChange('events_desc', e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            placeholder="Tìm kiếm sự kiện theo tên, mã..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/25 text-xs text-white focus:outline-none focus:border-[#FFDF73]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
          {filteredEvents.map((evt) => {
            const isSelected = selectedEventIds.includes(Number(evt.id));
            const rawImg = evt.thumbnail_url || evt.cover_image || evt.image;
            return (
              <div
                key={evt.id}
                onClick={() => handleToggleEvent(evt.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                  isSelected
                    ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-[#FFDF73]'
                    : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1a0407]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#d49b1a] text-black font-bold' : 'border border-[#D4AF37]/50 bg-[#0a0102]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="w-14 h-12 rounded bg-[#0e0203] border border-[#D4AF37]/30 overflow-hidden shrink-0 flex items-center justify-center">
                  {rawImg ? (
                    <img src={getImageUrl(rawImg)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Calendar className="w-4 h-4 text-[#D4AF37]/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#FFDF73] font-bold block">#{evt.id}</span>
                  <h4 className="text-xs font-sans font-bold text-white line-clamp-1">{evt.name || evt.title}</h4>
                  <p className="text-[11px] text-[#EADBCE]/70 line-clamp-1 mt-0.5">{evt.category || 'Sự kiện'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- SECTION 6: FEATURED COLLECTIONS PICKER ---------------- */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 6: Chọn Bộ Sưu Tập Hiển Thị Ngoài Trang Chủ
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Đang chọn <strong className="text-[#FFDF73]">{selectedColIds.length}</strong> / {allCollections.length} bộ sưu tập
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', allCollections.map((c) => Number(c.id)))}
              className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs text-[#FFDF73] font-semibold hover:bg-[#3e0c12] transition"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', [])}
              className="px-3 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs text-[#EADBCE]/80 hover:text-white transition"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu Đề Section Bộ Sưu Tập
            </label>
            <input
              type="text"
              value={parsedProps.collections_headline || ''}
              onChange={(e) => handlePropChange('collections_headline', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô Tả Section Bộ Sưu Tập
            </label>
            <textarea
              rows={2}
              value={parsedProps.collections_desc || ''}
              onChange={(e) => handlePropChange('collections_desc', e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={collectionSearch}
            onChange={(e) => setCollectionSearch(e.target.value)}
            placeholder="Tìm kiếm bộ sưu tập theo tên..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/25 text-xs text-white focus:outline-none focus:border-[#FFDF73]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
          {filteredCollections.map((col) => {
            const isSelected = selectedColIds.includes(Number(col.id));
            const rawImg = col.primary_image || col.image || col.cover_image;
            return (
              <div
                key={col.id}
                onClick={() => handleToggleCollection(col.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                  isSelected
                    ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-[#FFDF73]'
                    : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1a0407]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#d49b1a] text-black font-bold' : 'border border-[#D4AF37]/50 bg-[#0a0102]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="w-14 h-12 rounded bg-[#0e0203] border border-[#D4AF37]/30 overflow-hidden shrink-0 flex items-center justify-center">
                  {rawImg ? (
                    <img src={getImageUrl(rawImg)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Palette className="w-4 h-4 text-[#D4AF37]/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#FFDF73] font-bold block">#{col.id}</span>
                  <h4 className="text-xs font-sans font-bold text-white line-clamp-1">{col.name || col.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- SECTION 7 & 8: ARCHIVE & CO-CREATION ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-2">
            <BookOpen className="w-4 h-4 text-[#FFDF73]" />
            <h3 className="font-sans text-base font-bold text-[#FFDF73]">Phần 7: Kỷ Yếu Bách Niên (Monograph)</h3>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">Tiêu đề (archive_headline)</label>
            <input
              type="text"
              value={parsedProps.archive_headline || ''}
              onChange={(e) => handlePropChange('archive_headline', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">Mô tả (archive_desc)</label>
            <textarea
              rows={3}
              value={parsedProps.archive_desc || ''}
              onChange={(e) => handlePropChange('archive_desc', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-2">
            <Handshake className="w-4 h-4 text-[#FFDF73]" />
            <h3 className="font-sans text-base font-bold text-[#FFDF73]">Phần 8: Kêu Gọi Đồng Kiến Tạo (CTA)</h3>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">Tiêu đề (cta_headline)</label>
            <input
              type="text"
              value={parsedProps.cta_headline || ''}
              onChange={(e) => handlePropChange('cta_headline', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">Mô tả (cta_desc)</label>
            <textarea
              rows={3}
              value={parsedProps.cta_desc || ''}
              onChange={(e) => handlePropChange('cta_desc', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageEditor;

