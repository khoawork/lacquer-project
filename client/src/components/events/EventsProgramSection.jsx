import React, { useState, useEffect } from 'react';
import { Clock, Building2, MapPin, Sparkles, ArrowRight, Download } from 'lucide-react';
import eventServices from '../../services/eventServices';

const EventsProgramSection = () => {
  const [featuredEvent, setFeaturedEvent] = useState(null);

  // Đọc dữ liệu sự kiện nổi bật trực tiếp từ cơ sở dữ liệu
  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const res = await eventServices.getEvents();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          const feat = list.find((e) => e.is_featured) || list[0];
          if (feat) setFeaturedEvent(feat);
        }
      } catch (err) {
        console.warn('Lỗi khi tải sự kiện nổi bật:', err.message);
      }
    };

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const BANNER_BG =
    featuredEvent?.thumbnail_url ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAk9UadPB6Ai1dAdE5R0qsQCARUuFoxFXYN5lYL6e7giPVY2rL4L2QIb44QNIzDGrUEI-Sh_TwXJsJW_9CP3KNnJMrfz0Nj5GOrzkbjGLU-KeG3vzzgpln6w3jlB_Rw02IeaF-Bc_o22kuepOM8h4sGLJHLOVeM1cSrduIChr772u0YXzIIyTdTXlp62DlBD6PdZaLfFWx2ELqdJ2HmEtuvZWmT3heQFFwc2n8LHxDI';

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Quý IV / 2026';
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
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 scroll-mt-28 relative z-10"
      id="chuong-trinh-chi-tiet"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 mb-3 bg-[#24080b]/90 text-[#FFDF73] text-[12px] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
          <span>Mô hình chuẩn hóa</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-gold-gradient font-bold tracking-tight">
          Chương Trình Chi Tiết &amp; Khung Vận Hành
        </h3>
        <p className="font-body text-[16px] text-[#FAF7F2]/90 max-w-2xl mt-2">
          Cấu trúc phiên làm việc chính thức được thiết kế nhằm bảo đảm tính học thuật nghiêm cẩn và khả năng kết nối thực tiễn cao nhất.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="w-full rounded-2xl card-lacquer shadow-2xl overflow-hidden p-5 sm:p-7 md:p-10 space-y-10 border border-[#D4AF37]/40 relative">
        {/* Background subtle amber glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full blur-[130px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(160, 36, 48, 0.28) 0%, transparent 75%)',
          }}
        />

        {/* MODULE 1: ARTISTIC BANNER & HEADER AREA */}
        <div
          className="relative w-full rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-12 border border-[#D4AF37]/45"
          style={{
            background:
              'linear-gradient(135deg, rgba(56, 14, 20, 0.95) 0%, rgba(26, 6, 9, 0.98) 100%)',
          }}
        >
          {/* Subtle Lacquer Texture Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity"
            style={{ backgroundImage: `url('${BANNER_BG}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#180406] via-[#180406]/85 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[12px] uppercase tracking-widest mb-4 font-bold"
              style={{ background: 'rgba(38, 10, 14, 0.85)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse" />
              <span>{featuredEvent?.status === 'upcoming' ? 'Mở cổng đăng ký trực tuyến' : 'Thông tin phiên làm việc'}</span>
            </div>

            <h4 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-gold-gradient mb-4 font-bold">
              {featuredEvent?.name || 'Đại Hội Thảo & Giám Tuyển: Kỷ Nguyên Đương Đại Của Sơn Mài Việt Nam'}
            </h4>

            <p className="font-body text-[15px] sm:text-[17px] text-[#FAF7F2] max-w-2xl leading-relaxed">
              {featuredEvent?.description ||
                'Phiên chuyên môn cao cấp quy tụ các nghệ sĩ bậc thầy, chuyên gia phục chế vật liệu son tự nhiên Phú Thọ và các nhà đầu tư văn hóa tiên phong.'}
            </p>
          </div>
        </div>

        {/* MODULE 2: INFO PANEL (STATS & GPS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="p-5 rounded-xl border border-[#D4AF37]/30 flex items-start gap-4 shadow-lg"
            style={{
              background:
                'linear-gradient(180deg, rgba(38, 10, 14, 0.8) 0%, rgba(22, 5, 8, 0.88) 100%)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full border border-[#D4AF37]/50 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              style={{ background: 'rgba(56, 14, 20, 0.9)' }}
            >
              <Clock className="w-5 h-5 text-[#FFDF73]" />
            </div>
            <div>
              <span className="font-serif text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Thời gian tổ chức
              </span>
              <span className="font-serif text-[18px] sm:text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                {featuredEvent?.event_date
                  ? new Date(featuredEvent.event_date).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '08:30 – 17:30'}
              </span>
              <span className="font-body text-[13px] sm:text-[14px] text-[#EADBCE]">
                {formatEventDate(featuredEvent?.event_date)}
              </span>
            </div>
          </div>

          <div
            className="p-5 rounded-xl border border-[#D4AF37]/30 flex items-start gap-4 shadow-lg"
            style={{
              background:
                'linear-gradient(180deg, rgba(38, 10, 14, 0.8) 0%, rgba(22, 5, 8, 0.88) 100%)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full border border-[#D4AF37]/50 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              style={{ background: 'rgba(56, 14, 20, 0.9)' }}
            >
              <Building2 className="w-5 h-5 text-[#FFDF73]" />
            </div>
            <div>
              <span className="font-serif text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Địa điểm thực hiện
              </span>
              <span className="font-serif text-[18px] sm:text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                {featuredEvent?.location ? featuredEvent.location.split(',')[0] : 'Hội trường Di Sản SIHUB'}
              </span>
              <span className="font-body text-[13px] sm:text-[14px] text-[#EADBCE]">
                {featuredEvent?.location || '273 Điện Biên Phủ, Quận 3, TP.HCM'}
              </span>
            </div>
          </div>

          <div
            className="p-5 rounded-xl border border-[#D4AF37]/30 flex items-start gap-4 shadow-lg"
            style={{
              background:
                'linear-gradient(180deg, rgba(38, 10, 14, 0.8) 0%, rgba(22, 5, 8, 0.88) 100%)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full border border-[#D4AF37]/50 text-[#FFDF73] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              style={{ background: 'rgba(56, 14, 20, 0.9)' }}
            >
              <MapPin className="w-5 h-5 text-[#FFDF73]" />
            </div>
            <div>
              <span className="font-serif text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Bản đồ định vị GPS
              </span>
              <span className="font-serif text-[18px] sm:text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                Tọa độ kết nối mở
              </span>
              <span className="font-body text-[13px] sm:text-[14px] text-[#EADBCE]">
                SIHUB Hub — Tầng 2 Gallery
              </span>
            </div>
          </div>
        </div>

        {/* MODULE 4: REGISTRATION CALLOUT */}
        <div
          className="p-6 md:p-8 rounded-xl border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, rgba(45, 11, 15, 0.9) 0%, rgba(20, 5, 7, 0.95) 100%)' }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h6 className="font-serif text-[20px] md:text-[22px] text-gold-gradient font-bold">
              Đăng ký tham dự: {featuredEvent?.name || 'Sự kiện tiêu biểu'}
            </h6>
            <p className="font-body text-[14px] md:text-[15px] text-[#FAF7F2]/85">
              Số lượng khách mời giới hạn 150 đại biểu nhằm đảm bảo chất lượng đối thoại học thuật.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer"
            >
              <span>Đăng ký tham dự</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </a>
            <button
              type="button"
              className="btn-gold-outline inline-flex items-center gap-2 px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider cursor-pointer"
              onClick={() => alert('Brochure tóm tắt chương trình đang được chuẩn bị tải về.')}
            >
              <Download className="w-4 h-4" />
              <span>Tải Brochure PDF</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsProgramSection;
