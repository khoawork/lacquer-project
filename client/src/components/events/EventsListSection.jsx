import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  History,
  ArrowRight,
  UserCheck,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import eventServices from '../../services/eventServices';

const EventsListSection = ({ activeFilter = 'all', pageProps = null }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedEventIds = pageProps?.selected_event_ids
    ? pageProps.selected_event_ids.map(Number)
    : [];

  // Đọc trực tiếp dữ liệu sự kiện từ DB qua API, không hardcode trong code
  useEffect(() => {
    let isMounted = true;

    const fetchEventsFromDB = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await eventServices.getEvents();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          // Nếu Admin đã tick chọn danh sách sự kiện cụ thể từ trang quản trị
          if (selectedEventIds.length > 0) {
            const picked = list.filter((evt) => selectedEventIds.includes(Number(evt.id)));
            setEvents(picked.length > 0 ? picked : list);
          } else {
            setEvents(list);
          }
        }
      } catch (err) {
        console.error('Lỗi khi đọc dữ liệu sự kiện từ cơ sở dữ liệu:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEventsFromDB();
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(selectedEventIds)]);

  // Lọc theo bộ lọc danh mục hoặc trạng thái
  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'past') return evt.status === 'completed';
    if (activeFilter === 'conference')
      return evt.category?.toLowerCase().includes('tọa đàm') || evt.category?.toLowerCase().includes('hội thảo');
    if (activeFilter === 'exhibition')
      return evt.category?.toLowerCase().includes('triển lãm');
    if (activeFilter === 'workshop')
      return evt.category?.toLowerCase().includes('workshop') || evt.category?.toLowerCase().includes('studio');
    if (activeFilter === 'records')
      return evt.category?.toLowerCase().includes('kỷ lục') || evt.category?.toLowerCase().includes('vinh danh');
    if (activeFilter === 'education')
      return evt.category?.toLowerCase().includes('giáo dục') || evt.category?.toLowerCase().includes('đào tạo');
    return evt.status === activeFilter;
  });

  // Trợ giúp định dạng ngày giờ tiếng Việt
  const formatEventDate = (dateString) => {
    if (!dateString) return 'Thời gian công bố sau';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 relative z-10">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-[#FFDF73] gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-[#FFDF73]" />
          <p className="font-serif text-sm tracking-wider">Đang đọc dữ liệu sự kiện từ cơ sở dữ liệu...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && events.length === 0 && (
        <div className="p-6 rounded-2xl border border-red-500/40 bg-red-950/30 text-red-200 text-center font-serif">
          <p className="font-bold text-base mb-1">Không thể tải dữ liệu từ máy chủ.</p>
          <p className="text-xs text-red-300/80">Chi tiết: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-serif bg-[#180406]/70 space-y-2">
          <Calendar className="w-8 h-8 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-lg font-bold text-[#FFDF73]">Chưa có sự kiện nào trong danh mục này</h4>
          <p className="text-xs text-[#FAF7F2]/60">
            Dữ liệu sẽ hiển thị ngay khi Ban Điều Hành cập nhật qua hệ thống CMS Quản Trị.
          </p>
        </div>
      )}

      {/* Render Dynamic Events List từ DB */}
      {!loading && filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {filteredEvents.map((evt, idx) => {
            const isFeatured = evt.is_featured || idx === 0;
            const isPast = evt.status === 'completed';

            return (
              <article
                key={evt.id}
                className={`${
                  isFeatured ? 'lg:col-span-7' : 'lg:col-span-5'
                } flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl card-lacquer relative overflow-hidden group transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Ambient Corner Glow */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(138, 28, 38, 0.35) 60%, transparent 100%)',
                  }}
                />

                <div className="relative z-10 space-y-5">
                  {/* Status & Date Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md btn-gold font-serif text-[12px] md:text-[13px] uppercase tracking-wider font-bold shadow-md">
                      {isPast ? <History className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>
                        {evt.status === 'upcoming'
                          ? 'Sắp diễn ra'
                          : evt.status === 'ongoing'
                          ? 'Đang diễn ra'
                          : 'Đã diễn ra'}
                      </span>
                    </div>

                    {evt.category && (
                      <span
                        className="px-3 py-1 rounded text-xs font-serif uppercase tracking-widest text-[#FFDF73] border border-[#D4AF37]/35"
                        style={{ background: 'rgba(22, 5, 8, 0.85)' }}
                      >
                        {evt.category}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail nếu có */}
                  {evt.thumbnail_url && (
                    <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#100203]">
                      <img
                        src={evt.thumbnail_url}
                        alt={evt.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Date & Location */}
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#EADBCE]/85 font-serif border-l-2 border-[#D4AF37] pl-3.5">
                    <div className="flex items-center gap-2 text-[#FFDF73] font-semibold">
                      <Clock className="w-4 h-4 text-[#FFDF73] shrink-0" />
                      <span>{formatEventDate(evt.event_date)}</span>
                    </div>
                    {evt.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FFDF73]/80 shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[24px] sm:text-[30px] text-gold-gradient font-bold leading-tight group-hover:brightness-110 transition-all">
                    {evt.name}
                  </h3>

                  {/* Description */}
                  {evt.description && (
                    <p className="font-body text-[14px] sm:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
                      {evt.description}
                    </p>
                  )}

                  {/* Content Breakdown List (Tách dòng tự động nếu có) */}
                  {evt.content && (
                    <div className="pt-2">
                      <ul className="space-y-2.5 font-body text-[13px] sm:text-[15px] text-[#FAF7F2]/85">
                        {evt.content
                          .split('\n')
                          .filter((line) => Boolean(line.trim()))
                          .map((line, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#FFDF73] mt-0.5 shrink-0" />
                              <span>{line}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-6 border-t border-[#D4AF37]/25 relative z-10"
                >
                  {isPast ? (
                    <>
                      <span className="font-serif text-[12px] text-[#EADBCE] uppercase tracking-wider font-semibold">
                        Hồ sơ lưu trữ đầy đủ
                      </span>
                      <a
                        href="/contact"
                        className="btn-gold-outline inline-flex items-center gap-2 px-4 py-2 rounded text-[13px] uppercase tracking-wider font-bold"
                      >
                        <span>Tra cứu tư liệu</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="#chuong-trinh-chi-tiet"
                        className="btn-gold inline-flex items-center gap-2 px-5 py-2 rounded text-[13px] uppercase tracking-wider font-bold shadow-md"
                      >
                        <span>Chi tiết sự kiện</span>
                        <ArrowRight className="w-4 h-4 font-bold" />
                      </a>
                      <a
                        href="/contact"
                        className="btn-gold-outline inline-flex items-center gap-2 px-4 py-2 rounded text-[13px] uppercase tracking-wider font-bold"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Đăng ký tham dự</span>
                      </a>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default EventsListSection;
