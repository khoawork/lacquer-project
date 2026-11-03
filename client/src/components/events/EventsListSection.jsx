import React from 'react';
import { Sparkles, Calendar, MapPin, History, ArrowRight, UserCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

const EventsListSection = ({ activeFilter = 'all' }) => {
  const showUpcoming =
    activeFilter === 'all' ||
    activeFilter === 'conference' ||
    activeFilter === 'exhibition' ||
    activeFilter === 'workshop' ||
    activeFilter === 'records';

  const showPast =
    activeFilter === 'all' ||
    activeFilter === 'past' ||
    activeFilter === 'conference' ||
    activeFilter === 'education';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Event Card 1: Hành trình lần 7 (Upcoming / Highlight) */}
        {showUpcoming && (
          <article
            className={`${
              showPast ? 'lg:col-span-7' : 'lg:col-span-12'
            } flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl card-lacquer relative overflow-hidden group`}
          >
            {/* Ambient Corner Glow */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(138, 28, 38, 0.35) 60%, transparent 100%)',
              }}
            />

            <div className="relative z-10">
              {/* Header Status Badge & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md btn-gold font-serif text-[12px] md:text-[13px] uppercase tracking-wider font-bold shadow-md">
                  <Sparkles className="w-4 h-4" />
                  Sắp diễn ra
                </div>
                <div
                  className="flex items-center gap-2 text-[#FFDF73] font-serif text-[12px] md:text-[14px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-[#D4AF37]/30"
                  style={{ background: 'rgba(22, 5, 8, 0.85)' }}
                >
                  <Calendar className="w-4 h-4 text-[#FFDF73]" />
                  Quý IV / 2026 • TP. Hồ Chí Minh & Hà Nội
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] text-gold-gradient mb-3 leading-tight font-bold group-hover:brightness-110 transition-all">
                Hành trình lần 7
              </h2>

              {/* Subtitle / Theme */}
              <p className="font-body text-[15px] md:text-[17px] italic text-[#FAF7F2] mb-6 border-l-2 pl-4 border-[#D4AF37] leading-relaxed">
                Chuyên đề: Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số.
              </p>

              {/* Core Breakdown List */}
              <ul className="space-y-4 mb-8 font-body text-[15px] md:text-[16px] text-[#FAF7F2] leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFDF73] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFDF73] font-semibold font-serif text-[16px]">
                      Nội dung chính:
                    </strong>{' '}
                    Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFDF73] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFDF73] font-semibold font-serif text-[16px]">
                      Đối tượng:
                    </strong>{' '}
                    Nghệ sĩ, nghệ nhân, nhà nghiên cứu, trường đại học, doanh nghiệp sáng tạo, đơn vị công nghệ và công chúng yêu mỹ thuật.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFDF73] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFDF73] font-semibold font-serif text-[16px]">
                      Kết quả kỳ vọng:
                    </strong>{' '}
                    Tư liệu hóa tri thức, hình thành đề xuất hợp tác thực chất và bổ sung hệ dữ liệu cho Kỷ yếu 100 năm.
                  </span>
                </li>
              </ul>
            </div>

            {/* Action CTAs */}
            <div
              className="flex flex-wrap items-center gap-3.5 pt-5 mt-4 p-4 rounded-xl border border-[#D4AF37]/25 relative z-10"
              style={{ background: 'rgba(26, 6, 9, 0.7)' }}
            >
              <a
                className="btn-gold inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                href="#chuong-trinh-chi-tiet"
              >
                <span>Xem chương trình</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </a>
              <button
                type="button"
                className="btn-gold-outline inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded text-[13px] md:text-[14px] tracking-wider uppercase font-bold transition-all cursor-pointer"
                onClick={() => alert('Cổng ghi danh Hành trình lần 7 đã sẵn sàng tiếp nhận thông tin!')}
              >
                <UserCheck className="w-4 h-4" />
                <span>Đăng ký tham dự</span>
              </button>
            </div>
          </article>
        )}

        {/* Event Card 2: Sự kiện nền tảng SIHUB (Past Event) */}
        {showPast && (
          <article
            className={`${
              showUpcoming ? 'lg:col-span-5' : 'lg:col-span-12'
            } flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl card-lacquer relative overflow-hidden group`}
          >
            <div className="relative z-10">
              {/* Header Status Badge & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md font-serif text-[12px] md:text-[13px] uppercase tracking-wider font-semibold text-[#EADBCE] border border-[#D4AF37]/30"
                  style={{ background: 'rgba(42, 11, 15, 0.85)' }}
                >
                  <History className="w-4 h-4 text-[#FFDF73]" />
                  Đã diễn ra
                </div>
                <div
                  className="flex items-center gap-2 text-[#FFDF73] font-serif text-[12px] md:text-[14px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-[#D4AF37]/25"
                  style={{ background: 'rgba(22, 5, 8, 0.85)' }}
                >
                  <MapPin className="w-4 h-4 text-[#FFDF73]" />
                  27–29/05/2026 • SIHUB
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-[24px] sm:text-[28px] md:text-[32px] text-gold-gradient mb-3 leading-tight font-bold group-hover:brightness-110 transition-all">
                Chuỗi hoạt động 27–29/05/2026 tại Saigon Innovation Hub
              </h2>

              {/* Subtitle */}
              <p className="font-body text-[14px] md:text-[16px] italic text-[#FAF7F2] mb-5 border-l-2 pl-4 border-[#D4AF37]/60 leading-relaxed">
                Nền móng kết nối liên ngành: Lab – Studio – Showcase – Market
              </p>

              {/* Descriptive Paragraph */}
              <p className="font-body text-[14px] md:text-[15px] text-[#FAF7F2]/90 leading-relaxed mb-6">
                Ba ngày hoạt động kết nối triển lãm, tọa đàm, trình diễn sáng tác và đối thoại chuyên môn, đặt nền móng cho mô hình Lab – Studio – Showcase – Market. Nội dung lưu trữ bao gồm chương trình, diễn giả, hình ảnh, video, tham luận tải về và kết quả sau sự kiện.
              </p>

              {/* Archival Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span
                  className="px-3 py-1.5 rounded-md text-[#FFDF73] font-serif text-[12px] md:text-[13px] border border-[#D4AF37]/30 font-semibold"
                  style={{ background: 'rgba(30, 8, 11, 0.85)' }}
                >
                  12 Bản tham luận số
                </span>
                <span
                  className="px-3 py-1.5 rounded-md text-[#FFDF73] font-serif text-[12px] md:text-[13px] border border-[#D4AF37]/30 font-semibold"
                  style={{ background: 'rgba(30, 8, 11, 0.85)' }}
                >
                  45 Nghệ phẩm trình diễn
                </span>
                <span
                  className="px-3 py-1.5 rounded-md text-[#FFDF73] font-serif text-[12px] md:text-[13px] border border-[#D4AF37]/30 font-semibold"
                  style={{ background: 'rgba(30, 8, 11, 0.85)' }}
                >
                  Video 4K Lưu Trữ
                </span>
              </div>
            </div>

            {/* Single Action CTA */}
            <div
              className="pt-5 mt-4 p-4 rounded-xl border border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3 relative z-10"
              style={{ background: 'rgba(26, 6, 9, 0.7)' }}
            >
              <span className="font-serif text-[13px] text-[#EADBCE] uppercase tracking-wider font-semibold">
                Hồ sơ tư liệu hoàn tất
              </span>
              <button
                type="button"
                className="btn-gold-outline inline-flex items-center gap-2 px-5 py-2 rounded-md text-[13px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                onClick={() => alert('Đang mở thư viện tài liệu lưu trữ SIHUB...')}
              >
                <span>Xem hồ sơ sự kiện</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default EventsListSection;

