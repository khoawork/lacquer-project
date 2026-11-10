import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Newspaper, Calendar, ArrowRight, User, Clock, Sparkles } from 'lucide-react';
import newsServices from '../../services/newsServices';
import { getImageUrl } from '../../configs/Apis';

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';

const NewsGridSection = ({
  activeCategory = 'Tất cả',
  pageProps = null,
  onArticlesLoaded = null,
}) => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedNewsIds = (
    pageProps?.featured_article_ids ||
    pageProps?.selected_news_ids ||
    []
  ).map(Number);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await newsServices.getNews();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          setAllArticles(list);
          if (onArticlesLoaded) {
            onArticlesLoaded(list);
          }
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

  // Lọc bài viết theo danh mục được chọn
  const filteredArticles = React.useMemo(() => {
    if (!allArticles || allArticles.length === 0) return [];

    if (!activeCategory || activeCategory === 'Tất cả') {
      // Ưu tiên hiển thị bài viết nổi bật lên đầu nếu có cấu hình
      if (selectedNewsIds.length > 0) {
        return [...allArticles].sort((a, b) => {
          const aFeatured = selectedNewsIds.includes(Number(a.id));
          const bFeatured = selectedNewsIds.includes(Number(b.id));
          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          return 0;
        });
      }
      return allArticles;
    }

    const query = activeCategory.trim().toLowerCase();
    return allArticles.filter(
      (a) => a.category && a.category.trim().toLowerCase() === query
    );
  }, [allArticles, activeCategory, JSON.stringify(selectedNewsIds)]);

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
      {!loading && error && allArticles.length === 0 && (
        <div className="p-8 rounded-2xl border border-red-500/40 bg-red-950/40 text-red-200 text-center font-sans shadow-xl">
          <p className="font-bold text-lg mb-1">Không thể kết nối cơ sở dữ liệu tin tức.</p>
          <p className="text-xs text-red-300/80">Chi tiết lỗi: {error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredArticles.length === 0 && (
        <div className="p-16 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/75 space-y-3 shadow-xl max-w-2xl mx-auto">
          <Newspaper className="w-10 h-10 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-xl font-bold text-[#FFDF73]">
            Chưa có bài viết trong chuyên mục “{activeCategory}”
          </h4>
          <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
            Nội dung đang được Ban Biên Tập hoàn tất và sẽ sớm được cập nhật vào kho lưu trữ bách niên.
          </p>
        </div>
      )}

      {/* Dynamic Articles Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const isFeatured = selectedNewsIds.includes(Number(article.id));
            const cover = getImageUrl(article.thumbnail_url) || DEFAULT_COVER;

            return (
              <article
                key={article.id}
                className="flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group relative"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(42, 12, 16, 0.78) 0%, rgba(22, 6, 9, 0.95) 100%)',
                  border: isFeatured
                    ? '1px solid rgba(255, 223, 115, 0.55)'
                    : '1px solid rgba(212, 175, 55, 0.32)',
                  boxShadow:
                    '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 223, 115, 0.15)',
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

                  {/* Category Pill Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded font-sans text-[12px] tracking-wider font-semibold shadow-md uppercase"
                      style={{
                        background: 'rgba(82, 21, 21, 0.9)',
                        color: '#FFDF73',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                      }}
                    >
                      {article.category || 'Tin tức'}
                    </span>
                    {isFeatured && (
                      <span className="px-2.5 py-1 rounded bg-[#FFDF73] text-[#1a0507] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3" />
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
