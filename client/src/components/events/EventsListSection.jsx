import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import eventServices from '../../services/eventServices';
import { getImageUrl } from '../../configs/Apis';

// Tách địa chỉ thành tên địa điểm, địa chỉ chi tiết và tọa độ GPS
const parseModalLocation = (loc) => {
  if (!loc || loc.includes('SIHUB')) {
    return {
      venue: 'Hội trường Di Sản SIHUB',
      address: '273 Điện Biên Phủ, Quận 3, TP.HCM',
      gpsTitle: '273 Điện Biên Phủ',
      gpsSub: 'Phường Võ Thị Sáu, Quận 3, TP.HCM',
    };
  }
  const parts = loc.split(',').map((p) => p.trim());
  if (parts.length >= 3) {
    return {
      venue: parts[0],
      address: parts.slice(1).join(', '),
      gpsTitle: parts[1] || parts[0],
      gpsSub: parts.slice(2).join(', '),
    };
  }
  if (parts.length === 2) {
    return {
      venue: parts[0],
      address: parts[1],
      gpsTitle: parts[0],
      gpsSub: parts[1],
    };
  }
  return {
    venue: loc,
    address: '273 Điện Biên Phủ, Quận 3, TP.HCM',
    gpsTitle: loc,
    gpsSub: 'Phường Võ Thị Sáu, Quận 3, TP.HCM',
  };
};

// Hàm bóc tách nội dung từng dòng (mỗi dòng tự động là 1 <li>) bỏ toàn bộ HTML
const getEventBreakdownList = (evt) => {
  if (!evt) return [];

  // 1. Nếu có mảng breakdown_list đã cấu trúc
  if (Array.isArray(evt.breakdown_list) && evt.breakdown_list.length > 0) {
    return evt.breakdown_list;
  }

  // 2. Nếu content có dữ liệu
  if (evt.content) {
    try {
      const parsed = typeof evt.content === 'string' ? JSON.parse(evt.content) : evt.content;
      if (Array.isArray(parsed?.breakdown_list) && parsed.breakdown_list.length > 0) {
        return parsed.breakdown_list;
      }
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => {
          if (typeof item === 'string') {
            if (item.includes(':')) {
              const cIdx = item.indexOf(':');
              return { bold: item.slice(0, cIdx + 1).trim(), text: item.slice(cIdx + 1).trim() };
            }
            return { bold: '', text: item };
          }
          return {
            bold: item.bold || '',
            text: item.text || item.desc || '',
          };
        });
      }
    } catch {
      // Content là text thường
    }

    // Làm sạch HTML tags
    const cleanContent = String(evt.content).replace(/<[^>]*>?/gm, '').trim();

    // Mỗi dòng tự động là 1 <li>
    const lines = cleanContent
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    // Loại trừ dòng chỉ lặp lại description
    const descClean = String(evt.description || '').replace(/<[^>]*>?/gm, '').trim();
    const meaningfulLines = lines.filter((l) => l !== descClean);

    if (meaningfulLines.length > 0) {
      return meaningfulLines.map((line) => {
        if (line.includes(':')) {
          const colonIdx = line.indexOf(':');
          return {
            bold: line.slice(0, colonIdx + 1).trim(),
            text: line.slice(colonIdx + 1).trim(),
          };
        }
        return { bold: '', text: line };
      });
    }
  }

  // 3. Chuẩn hóa 3 điểm cốt lõi nếu content chưa có hoặc không đủ
  return [
    {
      bold: 'Nội dung chính:',
      text:
        'Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.',
    },
    {
      bold: 'Đối tượng:',
      text:
        'Nghệ sĩ, nghệ nhân, nhà nghiên cứu, trường đại học, doanh nghiệp sáng tạo, đơn vị công nghệ và công chúng yêu mỹ thuật.',
    },
    {
      bold: 'Kết quả kỳ vọng:',
      text:
        'Tư liệu hóa tri thức, hình thành đề xuất hợp tác thực chất và bổ sung hệ dữ liệu cho Kỷ yếu 100 năm.',
    },
  ];
};

const EventsListSection = ({ activeFilter = 'Tất cả', pageProps = null }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Đóng modal khi bấm phím ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEventModal(null);
    };
    if (selectedEventModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventModal]);

  // Đọc danh sách ID sự kiện được admin tick chọn hiển thị
  const selectedEventIds = (
    pageProps?.featured_event_ids ||
    pageProps?.selected_event_ids ||
    []
  ).map(Number);

  // NẠP TẤT CẢ SỰ KIỆN TRỰC TIẾP TỪ DATABASE
  useEffect(() => {
    let isMounted = true;
    const fetchEventsFromDB = async () => {
      try {
        setLoading(true);
        const res = await eventServices.getEvents();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          let processed = list;

          // Nếu Admin đã tick chọn danh sách sự kiện cụ thể thì chỉ lọc các sự kiện đó
          if (selectedEventIds.length > 0) {
            const picked = list.filter((evt) =>
              selectedEventIds.includes(Number(evt.id))
            );
            if (picked.length > 0) processed = picked;
          }

          setEvents(processed);
        }
      } catch (err) {
        console.warn('Lỗi đọc sự kiện từ DB:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEventsFromDB();
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(selectedEventIds)]);

  // Lọc theo thể loại sự kiện
  const filteredEvents = events.filter((evt) => {
    if (!activeFilter || activeFilter === 'Tất cả' || activeFilter === 'all')
      return true;
    if (activeFilter === 'Đã diễn ra' || activeFilter === 'past')
      return evt.status === 'completed' || evt.status === 'Đã diễn ra';

    const cat = (evt.category || '').toLowerCase();
    const filterKey = activeFilter.toLowerCase();
    return cat.includes(filterKey) || filterKey.includes(cat);
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-24 relative z-10">
      {filteredEvents.length === 0 ? (
        <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-serif bg-[#180406]/70 space-y-2">
          <span className="material-symbols-outlined text-[#FFDF73] text-4xl block mx-auto">
            event_busy
          </span>
          <h4 className="text-lg font-bold text-[#FFDF73]">
            {loading ? 'Đang tải dữ liệu sự kiện từ hệ thống...' : `Chưa có sự kiện nào trong danh mục "${activeFilter}"`}
          </h4>
          <p className="text-xs text-[#FAF7F2]/60">
            Dữ liệu được nạp trực tiếp từ cơ sở dữ liệu.
          </p>
        </div>
      ) : (
        /* TẤT CẢ CÁC KHỐI SỰ KIỆN HIỂN THỊ ĐỀU NHAU (GRID 2 CỘT, 50% CHIỀU RỘNG MỖI KHỐI) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredEvents.map((evt, idx) => {
            const isCompleted =
              evt.status === 'completed' ||
              evt.status === 'Đã diễn ra' ||
              evt.status_label === 'Đã diễn ra';

            const breakdownList = getEventBreakdownList(evt);

            const eventTitle =
              evt.name && evt.name.trim().length > 2
                ? evt.name.trim()
                : evt.title && evt.title.trim().length > 2
                ? evt.title.trim()
                : 'Hành trình lần 7';

            const eventDesc =
              evt.description && evt.description.trim()
                ? evt.description.trim()
                : 'Chuyên đề: Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số.';

            // Thời gian hiển thị từ DB
            const displayDate =
              evt.date_display ||
              (evt.event_date
                ? new Date(evt.event_date).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'QUÝ IV / 2026 • TP. HỒ CHÍ MINH & HÀ NỘI');

            const isHighlighted =
              pageProps?.highlighted_event_id &&
              Number(pageProps.highlighted_event_id) === Number(evt.id);

            return (
              <article
                key={evt.id || idx}
                className={`w-full flex flex-col justify-between p-8 md:p-10 rounded-2xl card-lacquer relative overflow-hidden group transition-all duration-300 ${
                  isHighlighted
                    ? 'border-2 border-[#FFDF73] ring-1 ring-[#FFDF73]/40 shadow-[0_0_30px_rgba(212,175,55,0.28)]'
                    : 'border border-[#D4AF37]/35'
                }`}
              >
                {/* Floating Gold Dust Sparkles */}
                <div className="sparkle-particle sparkle-2 w-2 h-2 top-8 right-12" />
                <div className="sparkle-particle sparkle-4 w-2.5 h-2.5 bottom-16 right-24" />

                {/* Background Subtle Glow */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(138, 28, 38, 0.3) 60%, transparent 100%)',
                  }}
                />

                <div className="relative z-10">
                  {/* Nếu là sự kiện nổi bật: Huy hiệu vàng óng */}
                  {isHighlighted && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gradient-to-r from-[#d49b1a] via-[#f3df79] to-[#d49b1a] text-black font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,223,115,0.45)] mb-4 w-fit">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>Sự Kiện Tiêu Biểu &bull; Nổi Bật</span>
                    </div>
                  )}

                  {/* Header Status Badge & Meta (Đọc từ DB) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md font-serif text-[12px] md:text-[13px] uppercase tracking-wider font-bold shadow-md ${
                        !isCompleted
                          ? 'btn-gold'
                          : 'bg-[#2a0b0f]/85 text-[#EADBCE] border border-[#D4AF37]/30'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {!isCompleted ? 'stars' : 'history'}
                      </span>
                      {evt.status_label || (!isCompleted ? 'Sắp diễn ra' : 'Đã diễn ra')}
                    </div>

                    <div
                      className="flex items-center gap-2 text-[#FFDF73] font-serif text-[13px] md:text-[14px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-[#D4AF37]/30"
                      style={{ background: 'rgba(22, 5, 8, 0.85)' }}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#FFDF73]">
                        {!isCompleted ? 'event' : 'location_on'}
                      </span>
                      <span>{displayDate}</span>
                    </div>
                  </div>

                  {/* Title (Đọc từ DB: name hoặc title) */}
                  <h2 className="font-serif text-[26px] md:text-[32px] text-gold-gradient mb-3 leading-tight font-bold group-hover:filter group-hover:brightness-110 transition-all">
                    {eventTitle}
                  </h2>

                  {/* Subtitle / Description (Đọc từ DB có viền vàng bên trái chuẩn ảnh 2) */}
                  {eventDesc && (
                    <p className="font-body text-[15px] md:text-[16px] italic text-[#FAF7F2] mb-6 border-l-2 pl-4 border-[#D4AF37] leading-relaxed">
                      {eventDesc}
                    </p>
                  )}

                  {/* Core Breakdown List (Mỗi dòng là 1 <li> kèm dấu tròn vàng) */}
                  {breakdownList && breakdownList.length > 0 && (
                    <ul className="space-y-4 mb-8 font-body text-[15px] md:text-[16px] text-[#FAF7F2] leading-relaxed">
                      {breakdownList.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span
                            className="material-symbols-outlined text-[#FFDF73] text-[19px] mt-1 shrink-0"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            radio_button_checked
                          </span>
                          <span className="leading-relaxed">
                            {item.bold ? (
                              <strong className="text-[#FFDF73] font-semibold font-serif text-[16px] mr-1.5">
                                {item.bold}
                              </strong>
                            ) : null}
                            <span className="text-[#FAF7F2]/95">{item.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ACTION BUTTONS:
                    - Sự kiện ĐÃ DIỄN RA: nút "Xem hồ sơ" mở Modal chi tiết
                    - Sự kiện CÒN LẠI: nút "Xem chương trình" mở Modal chi tiết và "Đăng ký tham dự"
                */}
                {isCompleted ? (
                  <div
                    className="pt-6 mt-4 p-4 rounded-xl border border-[#D4AF37]/25 flex items-center justify-between relative z-10"
                    style={{ background: 'rgba(26, 6, 9, 0.7)' }}
                  >
                    <span className="font-serif text-[13px] text-[#EADBCE] uppercase tracking-wider font-semibold">
                      Hồ sơ tư liệu hoàn tất
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedEventModal(evt)}
                      className="btn-gold-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">folder_open</span>
                      <span>Xem hồ sơ</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-6 mt-4 p-4 rounded-xl border border-[#D4AF37]/25 relative z-10"
                    style={{ background: 'rgba(26, 6, 9, 0.7)' }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedEventModal(evt)}
                      className="btn-gold flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-[13px] md:text-[14px] uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      <span>Xem chương trình</span>
                      <span className="material-symbols-outlined text-[17px]">
                        arrow_forward
                      </span>
                    </button>
                    <Link
                      to="/contact"
                      className="btn-gold-outline flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-[13px] md:text-[14px] tracking-wider uppercase font-bold transition-all whitespace-nowrap text-center"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        how_to_reg
                      </span>
                      <span>Đăng ký tham dự</span>
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ================= MODAL CHI TIẾT SỰ KIỆN (CHUẨN 100% GIAO DIỆN KHUNG CHƯƠNG TRÌNH & GPS) ================= */}
      {selectedEventModal &&
        createPortal(
          (() => {
            const isCompletedModal =
              selectedEventModal.status === 'completed' ||
              selectedEventModal.status === 'Đã diễn ra' ||
              selectedEventModal.status_label === 'Đã diễn ra';

            const modalLocation = parseModalLocation(selectedEventModal.location);

            const modalDate =
              selectedEventModal.date_display ||
              (selectedEventModal.event_date
                ? new Date(selectedEventModal.event_date).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Quý IV / 2026');

            const modalTime = selectedEventModal.time || '08:30 – 17:30';

            const modalTitle =
              selectedEventModal.name && selectedEventModal.name.trim().length > 2
                ? selectedEventModal.name.trim()
                : selectedEventModal.title && selectedEventModal.title.trim().length > 2
                ? selectedEventModal.title.trim()
                : 'Đại Hội Thảo & Giám Tuyển: Kỷ Nguyên Đương Đại Của Sơn Mài Việt Nam';

            const modalDesc =
              selectedEventModal.description && selectedEventModal.description.trim()
                ? selectedEventModal.description.trim()
                : 'Phiên chuyên môn cao cấp quy tụ các nghệ sĩ bậc thầy, chuyên gia phục chế vật liệu son tự nhiên Phú Thọ và các nhà đầu tư văn hóa tiên phong.';

            const modalCoverImg =
              selectedEventModal.featured_image ||
              selectedEventModal.thumbnail_url ||
              selectedEventModal.cover_image ||
              selectedEventModal.image ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAk9UadPB6Ai1dAdE5R0qsQCARUuFoxFXYN5lYL6e7giPVY2rL4L2QIb44QNIzDGrUEI-Sh_TwXJsJW_9CP3KNnJMrfz0Nj5GOrzkbjGLU-KeG3vzzgpln6w3jlB_Rw02IeaF-Bc_o22kuepOM8h4sGLJHLOVeM1cSrduIChr772u0YXzIIyTdTXlp62DlBD6PdZaLfFWx2ELqdJ2HmEtuvZWmT3heQFFwc2n8LHxDI';

            const modalBadge = isCompletedModal
              ? 'HỒ SƠ TƯ LIỆU SỰ KIỆN'
              : 'MỞ CỔNG ĐĂNG KÝ TRỰC TUYẾN';

            const modalBreakdownList = getEventBreakdownList(selectedEventModal);

            return (
              <div
                className="fixed inset-0 z-[1000] flex justify-center items-center p-4 sm:p-6 md:p-8 bg-black/92 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
                onClick={() => setSelectedEventModal(null)}
              >
                <div
                  className="relative w-full max-w-6xl bg-[#180406] border-2 border-[#D4AF37]/60 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden p-6 sm:p-8 md:p-10 space-y-6 my-auto"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 10%, #2f0a10 0%, #1c0407 55%, #100203 100%)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Nút Đóng Modal ở góc phải */}
                  <button
                    type="button"
                    onClick={() => setSelectedEventModal(null)}
                    className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-[#140204]/90 border border-[#D4AF37]/50 text-[#FFDF73] hover:text-white hover:bg-[#380e14] hover:scale-105 flex items-center justify-center cursor-pointer transition shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                    title="Đóng (ESC)"
                  >
                    <span className="material-symbols-outlined text-[22px]">close</span>
                  </button>

                  {/* 1. KHUNG ARTISTIC BANNER LỚN (ĐÚNG THIẾT KẾ ẢNH) */}
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-10 border border-[#D4AF37]/45"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(56, 14, 20, 0.95) 0%, rgba(26, 6, 9, 0.98) 100%)',
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                      style={{ backgroundImage: `url('${getImageUrl(modalCoverImg)}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#180406] via-[#180406]/90 to-transparent" />

                    <div className="relative z-10 max-w-3xl space-y-3">
                      {/* Badge */}
                      <div
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[11px] sm:text-[12px] uppercase tracking-widest font-bold"
                        style={{ background: 'rgba(38, 10, 14, 0.9)' }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse" />
                        <span>{modalBadge}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-gold-gradient font-bold">
                        {modalTitle}
                      </h3>

                      {/* Desc */}
                      {modalDesc && (
                        <p className="font-body text-[15px] sm:text-[16px] text-[#FAF7F2]/90 max-w-2xl leading-relaxed">
                          {modalDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. BA THẺ CHI TIẾT VẬN HÀNH: THỜI GIAN, ĐỊA ĐIỂM, GPS (ĐÚNG THIẾT KẾ ẢNH) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                    {/* Thẻ 1: Thời gian */}
                    <div
                      className="p-5 rounded-xl border border-[#D4AF37]/35 flex items-start gap-4 shadow-lg"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(38, 10, 14, 0.85) 0%, rgba(20, 4, 7, 0.95) 100%)',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-full border border-[#D4AF37]/60 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                        style={{ background: 'rgba(56, 14, 20, 0.9)' }}
                      >
                        <span className="material-symbols-outlined text-[22px]">schedule</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-[11px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                          Thời gian tổ chức
                        </span>
                        <span className="font-serif text-[18px] text-[#FAF7F2] font-bold block mt-1 leading-snug">
                          {modalTime}
                        </span>
                        <span className="font-body text-xs text-[#EADBCE]/85 block mt-1 leading-relaxed">
                          {modalDate}
                        </span>
                      </div>
                    </div>

                    {/* Thẻ 2: Địa điểm */}
                    <div
                      className="p-5 rounded-xl border border-[#D4AF37]/35 flex items-start gap-4 shadow-lg"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(38, 10, 14, 0.85) 0%, rgba(20, 4, 7, 0.95) 100%)',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-full border border-[#D4AF37]/60 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                        style={{ background: 'rgba(56, 14, 20, 0.9)' }}
                      >
                        <span className="material-symbols-outlined text-[22px]">apartment</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-[11px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                          Địa điểm thực hiện
                        </span>
                        <span className="font-serif text-[18px] text-[#FAF7F2] font-bold block mt-1 leading-snug">
                          {modalLocation.venue}
                        </span>
                        <span className="font-body text-xs text-[#EADBCE]/85 block mt-1 leading-relaxed">
                          {modalLocation.address}
                        </span>
                      </div>
                    </div>

                    {/* Thẻ 3: Tọa độ GPS */}
                    <div
                      className="p-5 rounded-xl border border-[#D4AF37]/35 flex items-start gap-4 shadow-lg"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(38, 10, 14, 0.85) 0%, rgba(20, 4, 7, 0.95) 100%)',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-full border border-[#D4AF37]/60 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                        style={{ background: 'rgba(56, 14, 20, 0.9)' }}
                      >
                        <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-[11px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                          Bản đồ định vị GPS
                        </span>
                        <span className="font-serif text-[18px] text-[#FAF7F2] font-bold block mt-1 leading-snug">
                          {modalLocation.gpsTitle}
                        </span>
                        <span className="font-body text-xs text-[#EADBCE]/85 block mt-1 leading-relaxed">
                          {modalLocation.gpsSub}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. NỘI DUNG CHI TIẾT & ĐẦU MỤC THAM LUẬN */}
                  {modalBreakdownList && modalBreakdownList.length > 0 && (
                    <div
                      className="p-6 rounded-xl border border-[#D4AF37]/35 shadow-lg space-y-3.5"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(28, 7, 10, 0.9) 0%, rgba(18, 3, 5, 0.95) 100%)',
                      }}
                    >
                      <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#FFDF73]" />
                        <span className="font-serif text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
                          Nội dung chi tiết chương trình
                        </span>
                      </div>
                      <ul className="space-y-3.5 font-body text-sm sm:text-[15px] text-[#FAF7F2] leading-relaxed">
                        {modalBreakdownList.map((item, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3">
                            <span
                              className="material-symbols-outlined text-[#FFDF73] text-[19px] mt-0.5 shrink-0"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              radio_button_checked
                            </span>
                            <span className="leading-relaxed">
                              {item.bold ? (
                                <strong className="text-[#FFDF73] font-serif font-bold text-[15px] mr-1.5">
                                  {item.bold}
                                </strong>
                              ) : null}
                              <span className="text-[#FAF7F2]/95">{item.text}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 4. FOOTER NÚT THAO TÁC */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#D4AF37]/30">
                    <button
                      type="button"
                      onClick={() => setSelectedEventModal(null)}
                      className="btn-gold-outline px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition cursor-pointer"
                    >
                      Đóng
                    </button>

                    {!isCompletedModal && (
                      <Link
                        to="/contact"
                        onClick={() => setSelectedEventModal(null)}
                        className="btn-gold px-7 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition cursor-pointer inline-flex items-center gap-2 shadow-[0_0_18px_rgba(212,175,55,0.35)]"
                      >
                        <span className="material-symbols-outlined text-[17px]">how_to_reg</span>
                        <span>Đăng ký tham dự ngay</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })(),
          document.body
        )}
    </section>
  );
};

export default EventsListSection;
