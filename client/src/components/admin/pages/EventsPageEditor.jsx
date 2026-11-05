import React from 'react';
import {
  Calendar,
  Search,
  Check,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  Save,
  RefreshCw,
  Sliders,
  Star,
} from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';
import { getImageUrl } from '../../../configs/Apis';

const EventsPageEditor = ({
  parsedProps,
  handlePropChange,
  allEvents = [],
  eventSearch = '',
  setEventSearch,
  handleToggleEvent,
  handleSavePage,
  saving = false,
}) => {
  const selectedEventIds = (parsedProps.featured_event_ids || []).map(Number);
  const highlightedEventId = parsedProps.highlighted_event_id
    ? Number(parsedProps.highlighted_event_id)
    : null;

  const filteredEvents = allEvents.filter((evt) => {
    const q = (eventSearch || '').toLowerCase();
    return (
      String(evt.id).includes(q) ||
      (evt.name || evt.title || '').toLowerCase().includes(q) ||
      (evt.category || '').toLowerCase().includes(q) ||
      (evt.location || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO & 4 STATS */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Sự Kiện &amp; 4 Chỉ Số Thống Kê
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Biểu tượng, huy hiệu, tiêu đề lớn và thanh chỉ số thống kê quy mô chuỗi sự kiện.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Hình ảnh con dấu / Huy hiệu đầu trang (hero_image)
          </label>
          <ImageUploader
            value={parsedProps.hero_image || ''}
            onChange={(url) => handlePropChange('hero_image', url)}
            placeholder="Tải lên hoặc dán URL huy hiệu bách niên"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Huy hiệu đầu trang (badge)
            </label>
            <input
              type="text"
              value={parsedProps.badge || ''}
              onChange={(e) => handlePropChange('badge', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: SỰ KIỆN & HOẠT ĐỘNG DI SẢN • 1930–2030"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn trung tâm (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: NƠI DI SẢN ĐƯỢC THỰC HÀNH"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Đoạn văn mô tả (description)
          </label>
          <textarea
            rows={3}
            value={parsedProps.description || ''}
            onChange={(e) => handlePropChange('description', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            placeholder="Nhập đoạn mô tả ý nghĩa chuỗi sự kiện..."
          />
        </div>

        {/* 4 Chỉ số thống kê */}
        <div className="pt-2 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-3">
            Thanh 4 Chỉ Số Thống Kê (Metric Bar)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 1</span>
              <input
                type="text"
                value={parsedProps.stat1_num || ''}
                onChange={(e) => handlePropChange('stat1_num', e.target.value)}
                placeholder="VD: 07"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat1_label || ''}
                onChange={(e) => handlePropChange('stat1_label', e.target.value)}
                placeholder="VD: Kỳ Hành Trình Di Sản"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 2</span>
              <input
                type="text"
                value={parsedProps.stat2_num || ''}
                onChange={(e) => handlePropChange('stat2_num', e.target.value)}
                placeholder="VD: 100+"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat2_label || ''}
                onChange={(e) => handlePropChange('stat2_label', e.target.value)}
                placeholder="VD: Nghệ Sĩ & Học Giả"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 3</span>
              <input
                type="text"
                value={parsedProps.stat3_num || ''}
                onChange={(e) => handlePropChange('stat3_num', e.target.value)}
                placeholder="VD: 30+"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat3_label || ''}
                onChange={(e) => handlePropChange('stat3_label', e.target.value)}
                placeholder="VD: Viện Đào Tạo & Doanh Nghiệp"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 4</span>
              <input
                type="text"
                value={parsedProps.stat4_num || ''}
                onChange={(e) => handlePropChange('stat4_num', e.target.value)}
                placeholder="VD: 1930–2030"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat4_label || ''}
                onChange={(e) => handlePropChange('stat4_label', e.target.value)}
                placeholder="VD: Kỷ Nguyên Bách Niên"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Counter Badge */}
        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Huy hiệu cập nhật nhanh (counter_badge)
          </label>
          <input
            type="text"
            value={parsedProps.counter_badge || ''}
            onChange={(e) => handlePropChange('counter_badge', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            placeholder="VD: ĐANG CẬP NHẬT 2 SỰ KIỆN QUAN TRỌNG"
          />
        </div>
      </div>

      {/* SECTION 2: BỘ CHỌN SỰ KIỆN TỪ DATABASE & ĐẶT SỰ KIỆN NỔI BẬT */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 2: Chọn Các Sự Kiện Từ Cơ Sở Dữ Liệu Để Hiển Thị
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Tick chọn các sự kiện để hiển thị ra ngoài website. Tất cả các sự kiện được chọn sẽ hiển thị trong lưới có kích thước đều nhau 100%. Gắn ngôi sao ⭐ để đánh dấu sự kiện nổi bật.
              </p>
            </div>
          </div>

          {handleSavePage && (
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-xs uppercase tracking-wider transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50 shrink-0"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Đang lưu...' : 'Lưu Danh Sách Sự Kiện'}</span>
            </button>
          )}
        </div>

        {/* Toolbar: Tìm kiếm, Đánh dấu sự kiện nổi bật & Chọn tất cả */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#D4AF37]/60" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Tìm kiếm sự kiện theo tên, danh mục, địa điểm..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#EADBCE]/80 mr-2">
                Đang chọn: <strong className="text-[#FFDF73]">{selectedEventIds.length}</strong> / {allEvents.length}
              </span>
              <button
                type="button"
                onClick={() => handlePropChange('featured_event_ids', allEvents.map((e) => Number(e.id)))}
                className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] hover:bg-[#3d0b11] transition cursor-pointer"
              >
                Chọn tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePropChange('featured_event_ids', []);
                  handlePropChange('highlighted_event_id', null);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs font-semibold text-[#EADBCE]/80 hover:text-white transition cursor-pointer"
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>

          {/* Dòng trạng thái: Sự kiện nổi bật hiện tại */}
          <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#EADBCE]/80 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#FFDF73] fill-[#FFDF73]" />
                <span>Sự Kiện Nổi Bật Được Đánh Dấu:</span>
              </span>
              {highlightedEventId ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d49b1a]/25 border border-[#FFDF73] text-[#FFDF73] font-bold text-xs">
                  <span>#{highlightedEventId} - {allEvents.find((e) => Number(e.id) === highlightedEventId)?.name || allEvents.find((e) => Number(e.id) === highlightedEventId)?.title || 'Sự kiện'}</span>
                </span>
              ) : (
                <span className="text-[#EADBCE]/60 italic">
                  Chưa chọn (bấm nút ⭐ trên thẻ sự kiện bên dưới để đánh dấu nổi bật)
                </span>
              )}
            </div>

            {highlightedEventId && (
              <button
                type="button"
                onClick={() => handlePropChange('highlighted_event_id', null)}
                className="text-[11px] text-[#EADBCE]/70 hover:text-red-400 underline cursor-pointer"
              >
                Hủy đánh dấu nổi bật
              </button>
            )}
          </div>
        </div>

        {allEvents.length === 0 ? (
          <p className="text-xs text-[#EADBCE]/60 italic py-4">Chưa có sự kiện nào trong hệ thống.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredEvents.map((evt) => {
              const numId = Number(evt.id);
              const isSelected = selectedEventIds.includes(numId);
              const isHighlighted = highlightedEventId === numId;
              const coverImg = evt.featured_image || evt.image_url || evt.cover_image || evt.thumbnail_url;

              return (
                <div
                  key={evt.id}
                  onClick={() => handleToggleEvent(evt.id)}
                  className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer select-none transition relative group ${
                    isHighlighted
                      ? 'bg-[#3b0b11] border-[#FFDF73] ring-1 ring-[#FFDF73]/50 shadow-[0_0_16px_rgba(255,223,115,0.3)]'
                      : isSelected
                      ? 'bg-[#32080d] border-[#FFDF73]/70 shadow-[0_0_12px_rgba(255,223,115,0.15)]'
                      : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
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
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#FFDF73]">#{evt.id}</span>
                        {isHighlighted && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FFDF73] text-black uppercase tracking-wider">
                            ⭐ NỔI BẬT
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{evt.name || evt.title}</h4>
                      <p className="text-[11px] text-[#EADBCE]/70 line-clamp-1">
                        {evt.date_display || evt.date || evt.event_date || evt.category || 'Sự kiện'}
                      </p>
                    </div>
                  </div>

                  {/* Nút bấm đánh dấu sự kiện nổi bật */}
                  <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-[10px] text-[#EADBCE]/60">
                      {isSelected ? 'Đã hiển thị' : 'Chưa chọn'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isHighlighted) {
                          handlePropChange('highlighted_event_id', null);
                        } else {
                          handlePropChange('highlighted_event_id', numId);
                          if (!isSelected) {
                            handlePropChange('featured_event_ids', [...selectedEventIds, numId]);
                          }
                        }
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-[#d49b1a] to-[#f3df79] text-black shadow-[0_0_8px_rgba(255,223,115,0.4)]'
                          : 'bg-[#180305] border border-[#D4AF37]/35 text-[#EADBCE]/80 hover:text-[#FFDF73] hover:border-[#FFDF73]'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${isHighlighted ? 'fill-black stroke-black' : 'fill-none'}`} />
                      <span>{isHighlighted ? 'Đã là Nổi bật' : 'Gắn Nổi bật ⭐'}</span>
                    </button>
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

export default EventsPageEditor;
