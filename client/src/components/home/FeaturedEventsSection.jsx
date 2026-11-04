import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventServices from '../../services/eventServices';
import { getImageUrl } from '../../configs/Apis';

const defaultEvents = [
  {
    id: 'sample-1',
    name: 'Kỷ nguyên Sơn Mài: Từ Đông Dương đến Toàn Cầu',
    category: 'Tọa Đàm Quốc Tế',
    location: 'Hà Nội',
    date_display: '15/04/2026',
    description: 'Quy tụ các nhà phê bình mỹ thuật từ Pháp, Nhật Bản và Việt Nam làm rõ vị thế độc tôn của chất liệu sơn ta trong bản đồ nghệ thuật hiện đại thế giới.',
    thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj8hOf6OtOosVlLwIHxkjtVOh_T9QMxKbMQdcKtVVSH9syhS_CKkjeVeGkS5_eX4nLFBhl8q4VzHM5VAZfndgDRySW_6Y10Pe0312ZPzUVvpqiwt6-Y5LmxM33gbBtEUKCuNqHl4GXLr9_XrtVZLfHBaaPP7c_cSWpJ00C4KEAbpO3dyz7xxZoj-q_l8nWyMJvFWmQ2Ad7BDnQW4gv580yuehtpNQiW42opMfC2tCPjQPTagRmAstnsg',
  },
  {
    id: 'sample-2',
    name: 'Âm Vang Cánh Gián: 100 Năm Kiệt Tác',
    category: 'Đại Triển Lãm Thế Kỷ',
    location: 'Bảo tàng Mỹ thuật',
    date_display: '2026',
    description: 'Trưng bày hơn 120 kiệt tác sơn mài qua các thời kỳ lịch sử, tái hiện trọn vẹn hành trình biến chuyển từ thủ công mỹ nghệ dân gian thành bảo vật quốc gia.',
    thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxD_WO1IVZYP6MR4AV5ZR66m90QGssGa99_G9X-3VMv5QVaD3mVJIonK-uv0w9MTb0TQ2r1k0JGA0VAOIm-u8maBJ50TanV8L9gtADbAwMPYL3crjlrKys-WNRRAIkBttap90bIdehfHIa8b-G_mhFmUPieKdWSfluZkrq14nVVL_gwGMRzMVqld8nUhVmnmgz9ivKXuoWgJ9rHPP6mJWxSADItJR9m7eL9a8XkkirdJYXc-uSBWHPaA',
  },
  {
    id: 'sample-3',
    name: 'Đêm Hội Nghệ Nhân Sơn Hà Thần Diệu',
    category: 'Trình Diễn Di Sản',
    location: 'Văn Miếu',
    date_display: 'Hằng tháng',
    description: 'Không gian thị phạm trực tiếp kỹ nghệ dát vàng quỳ, cẩn vỏ ốc xà cừ và mài ủ độc bản dưới sự dẫn dắt của các nghệ nhân nhân dân làng nghề trăm tuổi.',
    thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq4xcdughL0KYYvlyAzXhVu6JB6Us7Z6mKaR00bqeRSCYxQB4UfeXfR3AzgYmU6C3w8N-6WyNmwAKBJtXZzlttYMcp-MHC9EuEORhfXjl99ihqt8jeKfHEeDLLqEiNCab4JD6uh2lZHIsG5NBusxBg1_9TMp3zAaQPqrn7Mii-6zRHEMRYg-MA_NwnF10kQbxl0fWLA1A8vDrTnROvSpH1Vj_z9RMwVC-8k3eOXVRYiHK6DNftln_nkw',
  },
];

const FeaturedEventsSection = ({ pageProps = null }) => {
  const [events, setEvents] = useState([]);

  const featuredIds = pageProps?.featured_event_ids
    ? pageProps.featured_event_ids.map((id) => Number(id))
    : [];

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        const res = await eventServices.getEvents();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          if (list.length > 0) {
            // Nếu admin có chọn danh sách sự kiện cụ thể từ trang Admin
            if (featuredIds.length > 0) {
              const selectedList = list.filter((evt) => featuredIds.includes(Number(evt.id)));
              setEvents(selectedList.length > 0 ? selectedList : list.slice(0, 3));
            } else {
              setEvents(list.slice(0, 3));
            }
          }
        }
      } catch (err) {
        console.warn('Lỗi đọc sự kiện trang chủ từ DB:', err);
      }
    };
    fetchEvents();
    return () => { isMounted = false; };
  }, [JSON.stringify(featuredIds)]);

  const displayList = events.length > 0 ? events : defaultEvents;

  const sectionHeadline =
    pageProps?.events_headline || 'Chuỗi hoạt động đưa di sản vào đời sống';
  const sectionDesc =
    pageProps?.events_desc ||
    'Hành trình được hiện thực hóa qua các kỳ tọa đàm, triển lãm, trình diễn sáng tác, chương trình kỷ lục, hoạt động giáo dục và kết nối liên ngành Mỗi kỳ là một lát cắt chuyên sâu, đồng thời bổ sung dữ liệu cho hồ sơ 100 năm.';

  return (
    <section
      className="relative w-full py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="su-kien"
      style={{
        background: 'linear-gradient(rgb(38, 8, 12) 0%, rgb(28, 5, 7) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="font-serif text-[15px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
              SỰ KIỆN NỔI BẬT
            </span>
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
              {sectionHeadline}
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2] leading-relaxed">
              {sectionDesc}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="btn-gold px-6 py-2.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
            >
              Xem lịch sự kiện
            </Link>
            <Link
              to="/events"
              className="btn-gold-outline px-6 py-2.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
            >
              Sự kiện đã diễn ra
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {displayList.map((evt) => {
            const rawImg = evt.thumbnail_url || evt.cover_image || evt.image;
            const imgSrc = rawImg ? getImageUrl(rawImg) : defaultEvents[0].thumbnail_url;
            const eventDate = evt.date_display || (evt.event_date ? new Date(evt.event_date).toLocaleDateString('vi-VN') : '2026');

            return (
              <article key={evt.id} className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
                <div className="relative h-60 overflow-hidden bg-[#120203]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={evt.name || evt.title}
                    src={imgSrc}
                  />
                  {evt.category && (
                    <div className="absolute top-3 left-3 bg-[#2b0606]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] uppercase tracking-wider font-bold whitespace-nowrap">
                      {evt.category}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-[#140202]/90 border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1 rounded text-[#FAF7F2] font-serif text-[12px] font-semibold whitespace-nowrap">
                    {evt.location ? `${evt.location} • ` : ''}{eventDate}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-[22px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                      {evt.name || evt.title}
                    </h3>
                    <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed line-clamp-3">
                      {evt.description || evt.subtitle || 'Hoạt động nổi bật trong chuỗi sự kiện Hành trình 100 năm Sơn mài Hội họa.'}
                    </p>
                  </div>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-1.5 font-serif text-[15px] uppercase tracking-wider text-[#FFDF73] hover:text-[#FFF3CC] font-bold pt-2 whitespace-nowrap"
                  >
                    Đăng ký tham dự{' '}
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;

