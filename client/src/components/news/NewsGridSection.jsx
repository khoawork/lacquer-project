import React, { useState, useEffect } from 'react';
import { RefreshCw, Newspaper, Calendar, ArrowRight, User } from 'lucide-react';
import newsServices from '../../services/newsServices';

const NewsGridSection = ({ activeCategory = 'Tất cả', pageProps = null }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedNewsIds = pageProps?.selected_news_ids
    ? pageProps.selected_news_ids.map(Number)
    : [];

  // Đọc dữ liệu bài viết trực tiếp từ cơ sở dữ liệu qua API (không hardcode trong code)
  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await newsServices.getNews();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          if (selectedNewsIds.length > 0) {
            const picked = list.filter((art) => selectedNewsIds.includes(Number(art.id)));
            setArticles(picked.length > 0 ? picked : list);
          } else {
            setArticles(list);
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
  }, [JSON.stringify(selectedNewsIds)]);

  const filteredArticles =
    activeCategory === 'Tất cả'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

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
        <div className="flex flex-col items-center justify-center py-16 text-[#FFDF73] gap-2.5 font-serif">
          <RefreshCw className="w-6 h-6 animate-spin text-[#FFDF73]" />
          <span className="text-sm tracking-wider">Đang đọc bài viết từ cơ sở dữ liệu...</span>
        </div>
      )}

      {/* Error state */}
      {!loading && error && articles.length === 0 && (
        <div className="p-6 rounded-2xl border border-red-500/40 bg-red-950/30 text-red-200 text-center font-serif">
          <p className="font-bold text-base mb-1">Không thể kết nối cơ sở dữ liệu tin tức.</p>
          <p className="text-xs text-red-300/80">Chi tiết: {error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredArticles.length === 0 && (
        <div className="p-12 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-serif bg-[#180406]/70 space-y-2">
          <Newspaper className="w-8 h-8 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-lg font-bold text-[#FFDF73]">Chưa có bài viết nào trong chuyên mục này</h4>
          <p className="text-xs text-[#FAF7F2]/60">
            Dữ liệu sẽ hiển thị ngay khi Ban Biên Tập xuất bản bài viết qua trang Quản Trị.
          </p>
        </div>
      )}

      {/* Dynamic Articles Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 group"
              style={{
                background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.72) 0%, rgba(22, 6, 9, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.32)',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 223, 115, 0.15)',
              }}
            >
              {/* Thumbnail Container */}
              {article.thumbnail_url && (
                <div className="relative w-full h-64 overflow-hidden bg-[#100203]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    src={article.thumbnail_url}
                    alt={article.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160609] via-transparent to-transparent" />
                  {/* Category Pill Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span
                      className="px-3 py-1 rounded font-serif text-[12px] tracking-wider font-semibold shadow-md uppercase"
                      style={{
                        background: 'rgba(82, 21, 21, 0.85)',
                        color: '#FFDF73',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-6 gap-3.5 justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] font-sans text-[#E8E2D8]/70">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{formatArticleDate(article.published_date)}</span>
                    <span>•</span>
                    <span className="text-[#d9c1bf]">{article.author || 'Ban Biên Tập'}</span>
                  </div>

                  <h3 className="font-serif text-[22px] leading-snug font-bold transition-colors duration-300 group-hover:text-[#FFDF73] text-[#FAF7F2]">
                    {article.title}
                  </h3>

                  <p className="font-body text-[15px] leading-[1.8] line-clamp-3 font-normal mt-1 text-[#E8E2D8]/85">
                    {article.summary || article.lead_quote || article.content}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[rgba(212,175,55,0.15)] mt-1">
                  <a
                    className="inline-flex items-center gap-1.5 font-serif text-[13px] uppercase tracking-wider transition-colors font-bold text-[#FFDF73] hover:underline cursor-pointer"
                    href="#single-article-template"
                  >
                    <span>ĐỌC BÀI VIẾT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <span className="text-[12px] font-sans text-[#E8E2D8]/60">
                    {article.read_time || '5 phút đọc'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsGridSection;
export { NewsGridSection };
