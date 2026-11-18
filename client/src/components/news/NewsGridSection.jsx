import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Newspaper, Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';
import newsServices from '../../services/newsServices';
import { getImageUrl } from '../../configs/Apis';

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';

const NewsGridSection = ({
  activeCategoryId = 'all',
  activeCategoryName = 'Tất cả',
  pageProps = null,
  onArticlesLoaded = null,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Danh sách ID bài viết được Admin chọn hiển thị trên trang tin tức
  const selectedNewsIds = useMemo(() => {
    if (Array.isArray(pageProps?.selected_news_ids)) {
      return pageProps.selected_news_ids.map(Number);
    }
    // Hỗ trợ cấu hình cũ
    if (Array.isArray(pageProps?.featured_article_ids)) {
      return pageProps.featured_article_ids.map(Number);
    }
    // null: Chưa từng cấu hình qua Admin -> hiển thị toàn bộ mặc định
    return null;
  }, [pageProps?.selected_news_ids, pageProps?.featured_article_ids]);

  // 2. ID của DUY NHẤT 1 bài viết nổi bật được chọn để đưa lên đầu tiên
  const featuredNewsId = useMemo(() => {
    if (
      pageProps?.featured_news_id !== undefined &&
      pageProps?.featured_news_id !== null &&
      pageProps?.featured_news_id !== ''
    ) {
      return Number(pageProps.featured_news_id);
    }
    return null;
  }, [pageProps?.featured_news_id]);

  // Truy vấn dữ liệu tất cả bài viết từ Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await newsServices.getNews();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          setArticles(list);
        }
      } catch (err) {
        console.error('Lỗi khi tải bài viết từ cơ sở dữ liệu:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  // Lọc tập bài viết gốc: CHỈ GIỮ LẠI CÁC BÀI ĐƯỢC ADMIN CHỌN HIỂN THỊ
  const visibleArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    if (selectedNewsIds === null) return articles; // Mặc định hiển thị tất cả nếu chưa lưu cấu hình
    return articles.filter((a) => selectedNewsIds.includes(Number(a.id)));
  }, [articles, selectedNewsIds]);

  // Đồng bộ danh sách bài viết thực tế hiển thị về News.jsx để tính toán số đếm ở bộ lọc
  useEffect(() => {
    if (onArticlesLoaded && articles.length > 0) {
      onArticlesLoaded(visibleArticles);
    }
  }, [visibleArticles, onArticlesLoaded, articles.length]);

  // Lọc theo danh mục đã chọn VÀ sắp xếp đưa duy nhất 1 bài nổi bật lên vị trí đầu tiên
  const filteredArticles = useMemo(() => {
    if (!visibleArticles || visibleArticles.length === 0) return [];

    let result = visibleArticles;
    // Lọc theo category nếu người dùng click chuyên mục
    if (activeCategoryId && activeCategoryId !== 'all') {
      result = visibleArticles.filter(
        (a) => Number(a.category_id) === Number(activeCategoryId)
      );
    }

    // Đưa duy nhất 1 bài viết nổi bật lên đầu tiên (vị trí index 0)
    if (featuredNewsId) {
      result = [...result].sort((a, b) => {
        const aIsFeatured = Number(a.id) === featuredNewsId;
        const bIsFeatured = Number(b.id) === featuredNewsId;
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        return 0; // Giữ nguyên thứ tự các bài viết còn lại
      });
    }

    return result;
  }, [visibleArticles, activeCategoryId, featuredNewsId]);

  const formatArticleDate = (dateString) => {
    if (!dateString) return 'Gần đây';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-10 w-full mb-20 select-none">
      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-[#FFDF73] gap-3 font-sans">
          <RefreshCw className="w-7 h-7 animate-spin text-[#FFDF73]" />
          <span className="text-base tracking-wider">Đang kết nối kho dữ liệu tin tức...</span>
        </div>
      )}

      {/* Error state */}
      {!loading && error && articles.length === 0 && (
        <div className="p-8 rounded-2xl border border-red-500/40 bg-red-950/40 text-red-200 text-center font-sans shadow-xl">
          <p className="font-bold text-lg mb-1">Không thể kết nối cơ sở dữ liệu tin tức.</p>
          <p className="text-xs text-red-300/80">Chi tiết lỗi: {error}</p>
        </div>
      )}

      {/* Empty state: Không có bài viết nào được chọn hoặc không có bài trong chuyên mục */}
      {!loading && filteredArticles.length === 0 && (
        <div className="p-16 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/75 space-y-3 shadow-xl max-w-2xl mx-auto">
          <Newspaper className="w-10 h-10 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-xl font-bold text-[#FFDF73]">
            {visibleArticles.length === 0
              ? 'Chưa có bài viết nào được chọn hiển thị trên trang tin tức'
              : `Chưa có bài viết trong chuyên mục “${activeCategoryName}”`}
          </h4>
          <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
            {visibleArticles.length === 0
              ? 'Vui lòng truy cập trang Quản trị Admin để tích chọn các bài viết được phép xuất hiện tại trang này.'
              : 'Nội dung đang được Ban Biên Tập hoàn tất và sẽ sớm được cập nhật vào kho lưu trữ bách niên.'}
          </p>
        </div>
      )}

      {/* Dynamic Articles Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            // Chỉ duy nhất 1 bài viết nổi bật được đánh dấu
            const isFeatured = featuredNewsId && Number(article.id) === featuredNewsId;
            const cover = getImageUrl(article.thumbnail_url) || DEFAULT_COVER;

            return (
              <article
                key={article.id}
                className={`flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group relative ${
                  isFeatured ? 'ring-1 ring-[#FFDF73]/60' : ''
                }`}
                style={{
                  background: isFeatured
                    ? 'linear-gradient(145deg, rgba(58, 16, 22, 0.9) 0%, rgba(26, 7, 10, 0.98) 100%)'
                    : 'linear-gradient(145deg, rgba(42, 12, 16, 0.78) 0%, rgba(22, 6, 9, 0.95) 100%)',
                  border: isFeatured
                    ? '1.5px solid rgba(255, 223, 115, 0.75)'
                    : '1px solid rgba(212, 175, 55, 0.32)',
                  boxShadow: isFeatured
                    ? '0 16px 40px -8px rgba(255, 223, 115, 0.22), 0 10px 30px -10px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 223, 115, 0.3)'
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 223, 115, 0.15)',
                }}
              >
                {/* Thumbnail Container with Link */}
                <Link
                  to={`/news/${article.id}`}
                  className="relative w-full h-64 overflow-hidden bg-[#100203] block cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    src={cover}
                    alt={article.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160609] via-transparent to-transparent" />

                  {/* Category & Featured Pill Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded font-sans text-[12px] tracking-wider font-semibold shadow-md uppercase"
                      style={{
                        background: 'rgba(82, 21, 21, 0.9)',
                        color: '#FFDF73',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                      }}
                    >
                      {article.category_name || article.category || 'Tin tức'}
                    </span>
                    {isFeatured && (
                      <span className="px-2.5 py-1 rounded bg-gradient-to-r from-[#FFE58F] via-[#FFDF73] to-[#D4AF37] text-[#1a0507] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_2px_10px_rgba(255,223,115,0.45)]">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        Nổi bật
                      </span>
                    )}
                  </div>
                </Link>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6 gap-3.5 justify-between">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[12px] font-sans text-[#E8E2D8]/70">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{formatArticleDate(article.published_date)}</span>
                      <span>•</span>
                      <span className="text-[#d9c1bf] truncate">
                        {article.author || 'Ban Biên Tập'}
                      </span>
                    </div>

                    <Link to={`/news/${article.id}`} className="cursor-pointer">
                      <h3 className="font-sans text-[21px] leading-snug font-bold transition-colors duration-300 group-hover:text-[#FFDF73] text-[#FAF7F2] line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="font-body text-[15px] leading-[1.8] line-clamp-3 font-normal text-[#E8E2D8]/85">
                      {article.summary || article.lead_quote || article.content}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[rgba(212,175,55,0.18)] mt-2">
                    <Link
                      to={`/news/${article.id}`}
                      className="inline-flex items-center gap-1.5 font-sans text-[13px] uppercase tracking-wider transition-colors font-bold text-[#FFDF73] hover:text-white cursor-pointer group-hover:underline"
                    >
                      <span>ĐỌC BÀI VIẾT</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                    <span className="text-[12px] font-sans text-[#E8E2D8]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]/80" />
                      {article.read_time || '5 phút đọc'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default NewsGridSection;
export { NewsGridSection };
