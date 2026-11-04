import React from 'react';
import { Link } from 'react-router-dom';

const MonographArchiveSection = ({ pageProps }) => {
  const archiveTag = pageProps?.archive_tag || 'KỶ YẾU';
  const archiveHeadline = pageProps?.archive_headline || 'Kho tri thức mở của Hành trình';
  const archiveDesc =
    pageProps?.archive_desc ||
    'Kỷ yếu tập hợp các bài tham luận hàn lâm, chân dung nghệ nhân – họa sĩ, tư liệu làng nghề, nghiên cứu vật liệu, hình ảnh sự kiện và dữ liệu định danh tác phẩm. Đây là nền móng học thuật và ký ức chung để hành trình được tiếp tục bởi nhiều thế hệ.';

  return (
    <section
      className="relative w-full py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="ky-yeu-archive"
      style={{
        background: 'linear-gradient(rgb(39, 9, 13) 0%, rgb(30, 6, 8) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div
          className="rounded-2xl border border-[#D4AF37]/45 p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden relative"
          style={{
            background:
              'radial-gradient(circle at 75% 30%, rgb(66, 17, 23) 0%, rgb(46, 11, 16) 55%, rgb(24, 4, 6) 100%)',
          }}
        >
          {/* Background Subtle Monogram Pattern */}
          <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none text-[320px] font-serif text-[#FFDF73] select-none leading-none">
            100
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left: Monograph Visual Cover */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm aspect-[3/4] bg-gradient-to-b from-[#2a0606] to-[#120202] border-2 border-[#D4AF37]/60 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 flex flex-col justify-between relative group hover:scale-[1.03] transition-transform duration-500">
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                  <span className="font-serif text-[12px] text-[#FFDF73] tracking-[0.25em] uppercase font-bold whitespace-nowrap">
                    ẤN PHẨM KHẢO CỨU
                  </span>
                  <span className="font-serif text-[12px] text-[#FAF7F2] font-semibold whitespace-nowrap">
                    TẬP I–IV
                  </span>
                </div>
                <div className="text-center my-auto space-y-3 py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#3e0808] border border-[#FFDF73]/50 flex items-center justify-center text-[#FFDF73] shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                    <span className="material-symbols-outlined text-2xl font-bold">auto_stories</span>
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[28px] font-bold text-gold-gradient tracking-wide uppercase leading-tight">
                    KỶ YẾU BÁCH NIÊN SƠN MÀI
                  </h3>
                  <p className="font-serif text-[15px] tracking-[0.25em] text-[#FAF7F2] font-semibold uppercase whitespace-nowrap">
                    1930 — 2030
                  </p>
                  <div className="w-16 h-0.5 bg-[#FFDF73]/60 mx-auto my-2 shadow-[0_0_8px_#FFDF73]" />
                  <p className="font-body text-[14px] italic text-[#EADBCE]">
                    Viện Di Sản Mỹ Thuật &amp; Ban Giám Tuyển
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/30 text-[12px] text-[#FAF7F2] font-serif font-semibold">
                  <span className="whitespace-nowrap">Hà Nội • 2026</span>
                  <span className="text-[#FFDF73] uppercase tracking-wider whitespace-nowrap">
                    Bản giới hạn lưu trữ
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Book Chapters Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-serif text-[15px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
                  {archiveTag}
                </span>
                <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
                  {archiveHeadline}
                </h2>
                <p className="font-body text-[18px] text-[#FAF7F2] leading-[1.85]">
                  {archiveDesc}
                </p>
              </div>

              {/* Chapter Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#270505]/90 border border-[#D4AF37]/30 space-y-1.5 shadow-[inset_0_1px_0_rgba(255,223,115,0.15)]">
                  <div className="font-serif text-[#FFDF73] text-[15px] font-bold whitespace-nowrap">
                    Chương I • 1930–1945
                  </div>
                  <h4 className="font-serif text-[19px] text-[#FAF7F2] font-bold">Khởi Sinh Ngôn Ngữ Mới</h4>
                  <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                    Sự chuyển hóa từ đồ thủ công tế tự sang nghệ thuật tạo hình hàn lâm tại Trường Mỹ thuật Đông Dương.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#270505]/90 border border-[#D4AF37]/30 space-y-1.5 shadow-[inset_0_1px_0_rgba(255,223,115,0.15)]">
                  <div className="font-serif text-[#FFDF73] text-[15px] font-bold whitespace-nowrap">
                    Chương II • 1945–1975
                  </div>
                  <h4 className="font-serif text-[19px] text-[#FAF7F2] font-bold">Thăng Hoa &amp; Kháng Chiến</h4>
                  <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                    Khí phách dân tộc và các đề tài hiện thực cách mạng trong bảng màu son trầm, then thẳm.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#270505]/90 border border-[#D4AF37]/30 space-y-1.5 shadow-[inset_0_1px_0_rgba(255,223,115,0.15)]">
                  <div className="font-serif text-[#FFDF73] text-[15px] font-bold whitespace-nowrap">
                    Chương III • 1975–2010
                  </div>
                  <h4 className="font-serif text-[19px] text-[#FAF7F2] font-bold">Thời Kỳ Đổi Mới</h4>
                  <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                    Tự do biểu hình, sự trỗi dậy của cá tính nghệ thuật cá nhân và hội nhập quốc tế.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#270505]/90 border border-[#D4AF37]/30 space-y-1.5 shadow-[inset_0_1px_0_rgba(255,223,115,0.15)]">
                  <div className="font-serif text-[#FFDF73] text-[15px] font-bold whitespace-nowrap">
                    Chương IV • 2010–2030
                  </div>
                  <h4 className="font-serif text-[19px] text-[#FAF7F2] font-bold">Tương Lai Di Sản</h4>
                  <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                    Ứng dụng vật liệu sinh thái, kinh tế di sản và vị thế văn hóa Việt Nam trong kỷ nguyên số.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link
                  to="/archive"
                  className="btn-gold px-8 py-3 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
                >
                  Đọc Kỷ Yếu Trực Tuyến
                </Link>
                <Link
                  to="/archive"
                  className="btn-gold-outline px-8 py-3 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
                >
                  Tải bản tóm tắt (PDF)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonographArchiveSection;

