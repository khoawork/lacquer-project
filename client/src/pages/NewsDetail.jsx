import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Eye,
  Tag,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Newspaper,
} from 'lucide-react';
import newsServices from '../services/newsServices';
import { getImageUrl } from '../configs/Apis';
import FloatingSparkles from '../components/common/FloatingSparkles';

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current article
        let currentItem = null;
        try {
          const detailRes = await newsServices.getNewsById(id);
          if (detailRes.data && detailRes.data.success) {
            currentItem = detailRes.data.data;
          }
        } catch {
          // Fallback: search in list
        }

        // 2. Fetch all articles for fallback & related stories
        const allRes = await newsServices.getNews().catch(() => null);
        const allList = allRes?.data?.data || [];

        if (!currentItem && allList.length > 0) {
          currentItem = allList.find((item) => String(item.id) === String(id)) || null;
        }

        if (isMounted) {
          if (currentItem) {
            setArticle(currentItem);
            // Related articles: same category or latest, excluding current
            const related = allList
              .filter((item) => String(item.id) !== String(currentItem.id))
              .sort((a, b) => {
                const aSameCat = a.category === currentItem.category ? -1 : 1;
                const bSameCat = b.category === currentItem.category ? -1 : 1;
                return aSameCat - bSameCat;
              })
              .slice(0, 3);
            setRelatedArticles(related);
          } else {
            setError('Không tìm thấy bài viết yêu cầu.');
          }
        }
      } catch (err) {
        console.error('Lỗi tải bài viết chi tiết:', err);
        if (isMounted) setError(err.message || 'Lỗi kết nối máy chủ');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticleDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Gần đây';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Render article content safely (handling HTML or linebreaks)
  const renderContent = (content) => {
    if (!content) return null;
    const isHtml = /<[a-z][\s\S]*>/i.test(content);
    if (isHtml) {
      return (
        <div
          className="prose-lacquer font-body text-[17px] md:text-[19px] text-[#FAF7F2]/90 leading-[2.1] space-y-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
    return (
      <div className="font-body text-[17px] md:text-[19px] text-[#FAF7F2]/90 leading-[2.1] space-y-6">
        {paragraphs.map((p, pIdx) => (
          <p key={pIdx} className="text-pretty indent-6 sm:indent-8 first:indent-0">
            {p}
          </p>
        ))}
      </div>
    );
  };

  const tagsList = React.useMemo(() => {
    if (!article?.tags) return [];
    if (Array.isArray(article.tags)) return article.tags;
    return String(article.tags)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }, [article?.tags]);

  return (
    <div className="min-h-screen bg-[#100202] text-[#FAF7F2] font-sans relative overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(170,130,10,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[20%] -right-40 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <FloatingSparkles size={4} />

      <main className="relative z-10 pt-24 pb-28 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading state */}
        {loading && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#FFDF73] gap-3 font-serif">
            <RefreshCw className="w-8 h-8 animate-spin text-[#FFDF73]" />
            <span className="text-base tracking-wider">Đang mở trang tư liệu bách niên...</span>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && (error || !article) && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#24080b] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-xl">
              <Newspaper className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#FFDF73]">
              Không Tìm Thấy Bài Viết
            </h2>
            <p className="font-body text-[#FAF7F2]/75 text-sm leading-relaxed">
              Bài viết này có thể đã được lưu trữ hoặc tạm ẩn. Vui lòng quay lại danh sách tin tức để khám phá các chuyên khảo khác.
            </p>
            <Link
              to="/news"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Tin Tức</span>
            </Link>
          </div>
        )}

        {/* Article Content */}
        {!loading && article && (
          <article className="space-y-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#D4AF37]/20 pb-4">
              <div className="flex items-center gap-2 text-[#EADBCE]/70">
                <Link to="/" className="hover:text-[#FFDF73] transition">
                  Trang Chủ
                </Link>
                <span>/</span>
                <Link to="/news" className="hover:text-[#FFDF73] transition">
                  Tin Tức &amp; Tư Liệu
                </Link>
                <span>/</span>
                <span className="text-[#FFDF73] font-medium truncate max-w-[200px] sm:max-w-xs">
                  {article.category || 'Chuyên khảo'}
                </span>
              </div>

              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-xs text-[#FFDF73] hover:text-white font-serif font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Trở Về Danh Sách</span>
              </Link>
            </nav>

            {/* Header: Category Badge, Title, Meta */}
            <header className="space-y-5 text-center max-w-4xl mx-auto pt-4">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2">
                <span
                  className="px-4 py-1.5 rounded-full font-serif text-xs md:text-sm tracking-[0.2em] font-bold uppercase shadow-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(82, 21, 21, 0.9) 0%, rgba(36, 10, 14, 0.95) 100%)',
                    color: '#FFDF73',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {article.category || 'DÒNG CHẢY 100 NĂM'}
                </span>
                {article.is_featured && (
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Chuyên Khảo Nổi Bật
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[52px] lg:text-[56px] leading-[1.18] font-bold text-gold-gradient tracking-tight">
                {article.title}
              </h1>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#E8E2D8]/80 font-sans pt-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[#FFDF73] font-medium font-serif text-sm">
                    {article.author || 'Ban Biên Tập Hành Trình'}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>{formatDate(article.published_date)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{article.read_time || '5 phút đọc'}</span>
                </div>
                {article.views_count > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                      <span>{article.views_count} lượt đọc</span>
                    </div>
                  </>
                )}
                <span>•</span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-[#FFDF73] hover:text-white transition cursor-pointer px-2.5 py-1 rounded bg-[#24080b] border border-[#D4AF37]/30"
                  title="Sao chép liên kết bài viết"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 font-semibold">Đã chép link</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Chia sẻ</span>
                    </>
                  )}
                </button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#120204] relative group">
              <img
                src={getImageUrl(article.thumbnail_url) || DEFAULT_COVER}
                alt={article.title}
                className="w-full max-h-[580px] object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100203] via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="p-3 bg-[#180406]/90 border-t border-[#D4AF37]/20 text-center text-xs text-[#EADBCE]/70 italic font-body">
                Tư liệu hình ảnh thuộc Dự án Hành trình 100 Năm Sơn Mài Hội Họa Việt Nam
              </div>
            </div>

            {/* Lead Quote */}
            {article.lead_quote && (
              <div
                className="p-6 sm:p-8 rounded-2xl relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(65, 14, 20, 0.8) 0%, rgba(26, 6, 9, 0.95) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: '0 12px 36px -10px rgba(0,0,0,0.8), inset 0 0 24px rgba(212,175,55,0.1)',
                }}
              >
                <div className="absolute -top-6 -left-4 text-7xl font-serif text-[#D4AF37]/15 select-none pointer-events-none">
                  “
                </div>
                <blockquote className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl italic text-[#FFE599] leading-relaxed text-center font-medium">
                  “{article.lead_quote}”
                </blockquote>
              </div>
            )}

            {/* Summary Lead Paragraph */}
            {article.summary && (
              <div className="p-6 rounded-xl bg-[#180406]/75 border-l-4 border-[#FFDF73] text-[#FAF7F2] font-serif text-lg sm:text-xl italic leading-relaxed">
                {article.summary}
              </div>
            )}

            {/* Main Article Body */}
            <div className="pt-2 border-t border-[#D4AF37]/20">
              {renderContent(article.content || article.summary)}
            </div>

            {/* Tags Section */}
            {tagsList.length > 0 && (
              <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-2">
                <span className="text-xs font-serif uppercase tracking-wider text-[#FFDF73] flex items-center gap-1.5 mr-2 font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  Từ khóa:
                </span>
                {tagsList.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full text-xs font-sans bg-[#24080b] border border-[#D4AF37]/30 text-[#EADBCE] hover:text-[#FFDF73] hover:border-[#FFDF73] transition cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}


            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <section className="pt-12 border-t border-[#D4AF37]/25 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient uppercase">
                      Bài Viết Cùng Dòng Chảy
                    </h3>
                    <p className="text-xs text-[#EADBCE]/70 font-body">
                      Tiếp tục hành trình khám phá những câu chuyện di sản và khảo cứu chuyên sâu.
                    </p>
                  </div>
                  <Link
                    to="/news"
                    className="hidden sm:inline-flex items-center gap-1 text-xs text-[#FFDF73] hover:underline font-serif font-bold uppercase tracking-wider"
                  >
                    <span>Xem Tất Cả</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/news/${rel.id}`}
                      className="card-lacquer rounded-xl overflow-hidden group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <div className="relative h-44 overflow-hidden bg-[#100203]">
                        <img
                          src={getImageUrl(rel.thumbnail_url) || DEFAULT_COVER}
                          alt={rel.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-serif font-bold uppercase bg-[#521515]/90 text-[#FFDF73] border border-[#D4AF37]/35">
                            {rel.category || 'Tin tức'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-2.5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] text-[#E8E2D8]/60 font-sans">
                            <Calendar className="w-3 h-3 text-[#D4AF37]" />
                            <span>{formatDate(rel.published_date)}</span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h4>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-[#FFDF73] font-serif font-bold uppercase pt-2 border-t border-[#D4AF37]/15">
                          <span>Đọc tiếp</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
    </div>
  );
};

export default NewsDetail;
