import React from 'react';
import { Newspaper, Search, Check, Layers } from 'lucide-react';
import { getImageUrl } from '../../../configs/Apis';

const NewsPageEditor = ({
  parsedProps,
  handlePropChange,
  allNews = [],
  newsSearch = '',
  setNewsSearch,
  handleToggleNews,
}) => {
  const selectedNewsIds = (parsedProps.featured_article_ids || []).map(Number);

  const filteredNews = allNews.filter((art) => {
    const q = (newsSearch || '').toLowerCase();
    return (
      String(art.id).includes(q) ||
      (art.title || '').toLowerCase().includes(q) ||
      (art.category || '').toLowerCase().includes(q) ||
      (art.summary || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Tin Tức (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề, phân loại chuyên trang tin tức và tiêu đề bản tin bách niên.
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
              Tiêu đề chính (headline)
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
              Mô tả chung (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề đăng ký nhận bản tin (newsletter_headline)
            </label>
            <input
              type="text"
              value={parsedProps.newsletter_headline || ''}
              onChange={(e) => handlePropChange('newsletter_headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: BỘ CHỌN BÀI VIẾT TIN TỨC */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 2: Chọn Bài Viết Hiển Thị Ưu Tiên
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Tick chọn các bài viết từ cơ sở dữ liệu để ghim hiển thị trên trang tin tức. Đang chọn:{' '}
                <strong className="text-[#FFDF73] font-bold">{selectedNewsIds.length}</strong> / {allNews.length} bài viết.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePropChange('featured_article_ids', allNews.map((n) => Number(n.id)))}
              className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] hover:bg-[#3d0b11] transition"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => handlePropChange('featured_article_ids', [])}
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
            value={newsSearch}
            onChange={(e) => setNewsSearch(e.target.value)}
            placeholder="Tìm kiếm bài viết theo tiêu đề, danh mục, tóm tắt..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        {allNews.length === 0 ? (
          <p className="text-xs text-[#EADBCE]/60 italic py-4">Chưa có bài viết nào trong hệ thống.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredNews.map((art) => {
              const isSelected = selectedNewsIds.includes(Number(art.id));
              const coverImg = art.featured_image || art.image_url || art.cover_image;
              return (
                <div
                  key={art.id}
                  onClick={() => handleToggleNews(art.id)}
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
                    <span className="text-[10px] font-mono text-[#FFDF73]">#{art.id}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{art.title}</h4>
                    <p className="text-[11px] text-[#EADBCE]/70 line-clamp-1">
                      {art.category || 'Tin tức & Nghiên cứu'}
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

export default NewsPageEditor;

