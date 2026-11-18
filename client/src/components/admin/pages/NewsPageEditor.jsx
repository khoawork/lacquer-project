import React from 'react';
import {
  Newspaper,
  Search,
  Check,
  Layers,
  Save,
  Sparkles,
  Star,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import { getImageUrl } from '../../../configs/Apis';

const NewsPageEditor = ({
  parsedProps,
  handlePropChange,
  handlePropsPatch,
  allNews = [],
  newsSearch = '',
  setNewsSearch,
  handleToggleNews,
  handleSavePage,
  saving = false,
}) => {
  // 1. Danh sách ID các bài viết được chọn hiển thị trên trang tin tức
  const selectedNewsIds = React.useMemo(() => {
    if (Array.isArray(parsedProps.selected_news_ids)) {
      return parsedProps.selected_news_ids.map(Number);
    }
    if (Array.isArray(parsedProps.featured_article_ids)) {
      return parsedProps.featured_article_ids.map(Number);
    }
    // Mặc định chọn tất cả bài viết nếu chưa từng lưu cấu hình trước đó
    return allNews.map((n) => Number(n.id));
  }, [parsedProps.selected_news_ids, parsedProps.featured_article_ids, allNews]);

  // 2. Bài viết Nổi bật duy nhất (chỉ 1 bài được chọn để đưa lên đầu tiên)
  const featuredNewsId = React.useMemo(() => {
    if (
      parsedProps.featured_news_id !== undefined &&
      parsedProps.featured_news_id !== null &&
      parsedProps.featured_news_id !== ''
    ) {
      return Number(parsedProps.featured_news_id);
    }
    return null;
  }, [parsedProps.featured_news_id]);

  // Tìm đối tượng bài viết đang là bài nổi bật
  const featuredArticle = React.useMemo(() => {
    if (!featuredNewsId) return null;
    return allNews.find((art) => Number(art.id) === featuredNewsId) || null;
  }, [featuredNewsId, allNews]);

  // Toggle chọn / bỏ chọn hiển thị bài viết trên trang tin tức
  const handleToggleSelect = (id, e) => {
    if (e) e.stopPropagation();
    const numId = Number(id);
    const isCurrentlySelected = selectedNewsIds.includes(numId);
    const updatedSelected = isCurrentlySelected
      ? selectedNewsIds.filter((item) => item !== numId)
      : [...selectedNewsIds, numId];

    // Nếu bỏ chọn bài viết đang là bài nổi bật, tự động hủy bài nổi bật
    const updatedFeatured =
      featuredNewsId === numId && isCurrentlySelected ? null : featuredNewsId;

    if (handlePropsPatch) {
      handlePropsPatch({
        selected_news_ids: updatedSelected,
        featured_article_ids: updatedSelected,
        featured_news_id: updatedFeatured,
      });
    } else {
      handlePropChange('selected_news_ids', updatedSelected);
      handlePropChange('featured_article_ids', updatedSelected);
      handlePropChange('featured_news_id', updatedFeatured);
    }
  };

  // Chọn duy nhất 1 bài làm nổi bật (đưa lên đầu tiên)
  const handleToggleFeatured = (id, e) => {
    if (e) e.stopPropagation();
    const numId = Number(id);

    // Nếu bài này đang là nổi bật -> bấm lần nữa để hủy nổi bật
    if (featuredNewsId === numId) {
      if (handlePropsPatch) {
        handlePropsPatch({ featured_news_id: null });
      } else {
        handlePropChange('featured_news_id', null);
      }
      return;
    }

    // Đặt bài này làm Nổi bật duy nhất
    // Đồng thời tự động thêm bài này vào danh sách hiển thị nếu chưa có
    let nextSelected = [...selectedNewsIds];
    if (!nextSelected.includes(numId)) {
      nextSelected.push(numId);
    }

    if (handlePropsPatch) {
      handlePropsPatch({
        selected_news_ids: nextSelected,
        featured_article_ids: nextSelected,
        featured_news_id: numId,
      });
    } else {
      handlePropChange('selected_news_ids', nextSelected);
      handlePropChange('featured_article_ids', nextSelected);
      handlePropChange('featured_news_id', numId);
    }
  };

  // Chọn tất cả bài viết hiển thị
  const handleSelectAll = () => {
    const allIds = allNews.map((n) => Number(n.id));
    if (handlePropsPatch) {
      handlePropsPatch({
        selected_news_ids: allIds,
        featured_article_ids: allIds,
      });
    } else {
      handlePropChange('selected_news_ids', allIds);
      handlePropChange('featured_article_ids', allIds);
    }
  };

  // Bỏ chọn tất cả bài viết
  const handleDeselectAll = () => {
    if (handlePropsPatch) {
      handlePropsPatch({
        selected_news_ids: [],
        featured_article_ids: [],
        featured_news_id: null,
      });
    } else {
      handlePropChange('selected_news_ids', []);
      handlePropChange('featured_article_ids', []);
      handlePropChange('featured_news_id', null);
    }
  };

  // Hủy bài nổi bật
  const handleClearFeatured = (e) => {
    if (e) e.stopPropagation();
    if (handlePropsPatch) {
      handlePropsPatch({ featured_news_id: null });
    } else {
      handlePropChange('featured_news_id', null);
    }
  };

  const filteredNews = allNews.filter((art) => {
    const q = (newsSearch || '').toLowerCase();
    return (
      String(art.id).includes(q) ||
      (art.title || '').toLowerCase().includes(q) ||
      (art.category || art.category_name || '').toLowerCase().includes(q) ||
      (art.summary || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 select-none">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Tin Tức (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề và đoạn mô tả dẫn nhập trang tin tức.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              placeholder="VD: Tin Tức & Tư Liệu Nghiên Cứu"
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
              placeholder="VD: Tin tức của Hành trình không chỉ đưa tin sự kiện. Đây là nơi lịch sử được kể lại bằng ngôn ngữ gần gũi, người làm nghề được nhìn thấy và các ý tưởng mới được đưa vào đối thoại công chúng."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: BỘ CHỌN BÀI VIẾT HIỂN THỊ & BÀI NỔI BẬT */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        {/* Header Section 2 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 2: Quản Lý Hiển Thị Tin Tức & Bài Viết Nổi Bật
              </h3>
              <p className="text-xs text-[#EADBCE]/80 mt-0.5 leading-relaxed">
                <span className="text-[#FFDF73] font-semibold">1. Chọn bài hiển thị:</span> Chỉ những bài viết được tích chọn mới xuất hiện trên trang tin tức.
                <br />
                <span className="text-[#FFDF73] font-semibold">2. Bài viết nổi bật:</span> Cho phép chọn duy nhất 1 bài viết để đưa lên vị trí đầu tiên.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3.5 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] hover:bg-[#3d0b11] transition cursor-pointer shadow-sm"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={handleDeselectAll}
              className="px-3.5 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs font-semibold text-[#EADBCE]/80 hover:text-white transition cursor-pointer"
            >
              Bỏ chọn tất cả
            </button>
          </div>
        </div>

        {/* Status Dashboard / Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Card 1: Số bài được hiển thị */}
          <div className="p-3.5 rounded-xl bg-[#140204] border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#27060a] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73]">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#EADBCE]/70 block font-sans">
                  Bài viết hiển thị trên trang
                </span>
                <span className="text-sm font-bold text-[#FAF7F2]">
                  <strong className="text-[#FFDF73] text-base">{selectedNewsIds.length}</strong> / {allNews.length} bài viết
                </span>
              </div>
            </div>
            {selectedNewsIds.length === 0 && (
              <span className="text-[11px] text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded font-sans">
                Đang ẩn toàn bộ
              </span>
            )}
          </div>

          {/* Card 2: Bài viết nổi bật duy nhất */}
          <div className="p-3.5 rounded-xl bg-[#140204] border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  featuredArticle
                    ? 'bg-[#521515] border border-[#FFDF73] text-[#FFDF73] shadow-[0_0_10px_rgba(255,223,115,0.4)]'
                    : 'bg-[#27060a] border border-[#D4AF37]/35 text-[#EADBCE]/40'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-[#EADBCE]/70 block font-sans">
                  Bài viết Nổi bật (Đưa lên đầu)
                </span>
                {featuredArticle ? (
                  <span className="text-xs font-bold text-[#FFDF73] truncate block" title={featuredArticle.title}>
                    #{featuredArticle.id} — {featuredArticle.title}
                  </span>
                ) : (
                  <span className="text-xs text-[#EADBCE]/60 italic block">
                    Chưa chọn (hiển thị theo thứ tự mặc định)
                  </span>
                )}
              </div>
            </div>

            {featuredArticle && (
              <button
                type="button"
                onClick={handleClearFeatured}
                title="Hủy ghim bài nổi bật này"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#350a0f] hover:bg-[#4a0d15] border border-[#D4AF37]/40 text-[#FAF7F2] text-[11px] font-sans font-semibold transition shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-red-300" />
                <span>Bỏ nổi bật</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#D4AF37]/60" />
          <input
            type="text"
            value={newsSearch}
            onChange={(e) => setNewsSearch(e.target.value)}
            placeholder="Tìm kiếm bài viết theo tiêu đề, danh mục, tóm tắt..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        {/* News Items Grid */}
        {allNews.length === 0 ? (
          <p className="text-xs text-[#EADBCE]/60 italic py-6 text-center">
            Chưa có bài viết nào trong cơ sở dữ liệu. Vui lòng thêm bài viết mới trong mục Danh mục dữ liệu.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredNews.map((art) => {
              const isSelected = selectedNewsIds.includes(Number(art.id));
              const isFeatured = featuredNewsId === Number(art.id);
              const coverImg =
                art.thumbnail_url || art.featured_image || art.image_url || art.cover_image;

              return (
                <div
                  key={art.id}
                  className={`flex flex-col justify-between p-3.5 rounded-xl border transition-all ${
                    isFeatured
                      ? 'bg-gradient-to-b from-[#421016] to-[#25060a] border-[#FFDF73] shadow-[0_0_16px_rgba(255,223,115,0.35)]'
                      : isSelected
                      ? 'bg-[#22070b] border-[#D4AF37]/60 hover:border-[#FFDF73]/80'
                      : 'bg-[#100203]/75 border-[#D4AF37]/20 opacity-70 hover:opacity-100 hover:border-[#D4AF37]/45'
                  }`}
                >
                  {/* Top: Card Header & Thumbnail */}
                  <div className="flex items-start gap-3">
                    {/* Checkbox: Toggle Visibility */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleSelect(art.id, e)}
                      title={isSelected ? 'Nhấp để ẨN bài này khỏi trang tin tức' : 'Nhấp để HIỂN THỊ bài này trên trang tin tức'}
                      className={`w-6 h-6 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#120204] font-bold shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                          : 'border border-[#D4AF37]/40 bg-[#160305] text-transparent hover:border-[#FFDF73]'
                      }`}
                    >
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </button>

                    {/* Image Thumbnail */}
                    {coverImg ? (
                      <img
                        src={getImageUrl(coverImg)}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0 bg-[#0d0102]"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-[#200407] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/60 shrink-0">
                        <Newspaper className="w-6 h-6" />
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[11px] font-mono text-[#FFDF73] font-bold">
                          #{art.id}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3d0d12] border border-[#D4AF37]/30 text-[#EADBCE] truncate">
                          {art.category || art.category_name || 'Tin tức'}
                        </span>
                      </div>

                      <h4
                        className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isSelected ? 'text-[#FAF7F2]' : 'text-[#FAF7F2]/60'
                        }`}
                        title={art.title}
                      >
                        {art.title}
                      </h4>
                    </div>
                  </div>

                  {/* Bottom: Action bar for Featured Selection */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                    {/* Status indicator: Hiển thị hay Ẩn */}
                    <span
                      onClick={(e) => handleToggleSelect(art.id, e)}
                      className={`text-[11px] font-sans cursor-pointer flex items-center gap-1 ${
                        isSelected ? 'text-emerald-300 font-semibold' : 'text-[#EADBCE]/50'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Hiển thị trên trang</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-[#EADBCE]/40" />
                          <span>Đang ẩn</span>
                        </>
                      )}
                    </span>

                    {/* Button chọn làm bài Nổi bật duy nhất */}
                    {isFeatured ? (
                      <button
                        type="button"
                        onClick={(e) => handleToggleFeatured(art.id, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFDF73] text-[#1a0507] text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,223,115,0.4)] hover:brightness-95 transition cursor-pointer"
                        title="Đang là bài nổi bật duy nhất (đưa lên đầu tiên). Nhấp để hủy."
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        <span>Nổi bật #1 (Đầu)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleToggleFeatured(art.id, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#250609] hover:bg-[#38090e] border border-[#D4AF37]/40 hover:border-[#FFDF73] text-[#FFDF73] text-[11px] font-sans font-semibold transition cursor-pointer"
                        title="Đặt bài viết này làm bài nổi bật duy nhất (đưa lên đầu trang tin tức)"
                      >
                        <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Đặt nổi bật</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Save Action Bar */}
      {handleSavePage && (
        <div className="flex justify-end pt-4 pb-8">
          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA7C11] text-[#120204] text-sm font-bold uppercase tracking-wider shadow-2xl hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Đang lưu hệ thống...' : 'Lưu Tất Cả Thay Đổi Trang Tin Tức'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsPageEditor;
