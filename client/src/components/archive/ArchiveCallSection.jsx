import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';
import { Upload, FileEdit, Download, ShieldCheck } from 'lucide-react';

const ArchiveCallSection = ({ pageProps = null }) => {
  const tag = pageProps?.call_tag || 'KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA';
  const headline = pageProps?.call_headline || 'Gửi tư liệu cho Kỷ yếu 100 năm';
  const desc =
    pageProps?.call_desc ||
    'Hành trình tiếp nhận bài nghiên cứu, hồi ức nghề, hồ sơ tác phẩm, ảnh tư liệu, video, tài liệu làng nghề và đề xuất chuyên đề. Mọi tư liệu được rà soát nguồn gốc, quyền sử dụng và giá trị học thuật trước khi chính thức lưu trữ và công bố.';

  const btn1Text = pageProps?.call_btn1_text || 'Gửi tư liệu';
  const btn1Link = pageProps?.call_btn1_link || '/contact';

  const btn2Text = pageProps?.call_btn2_text || 'Đề xuất bài viết';
  const btn2Link = pageProps?.call_btn2_link || '/contact';

  const btn3Text = pageProps?.call_btn3_text || 'Tải thể lệ (PDF)';
  const btn3Link = pageProps?.call_btn3_link || '/contact';

  const guarantee =
    pageProps?.call_guarantee ||
    'Bản quyền tác giả và quyền sở hữu trí tuệ được bảo hộ theo pháp luật hiện hành';

  const renderButton = (text, link, icon, className, style) => {
    const isExternal =
      link?.startsWith('http://') || link?.startsWith('https://') || link?.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={style}
        >
          {icon}
          <span>{text}</span>
        </a>
      );
    }
    return (
      <Link to={link || '/contact'} className={className} style={style}>
        {icon}
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <section
      className="relative w-full py-20 md:py-28 text-stone-100 overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #1a0507 0%, #24080b 50%, #120304 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,195,73,0.12),transparent_70%)]" />

      {/* Đốm sao vàng kim bay lơ lửng đồng bộ chuẩn với trang Hành trình */}
      <FloatingSparkles size={4.5} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Velvet Bordeaux Archival Call Box */}
        <div
          className="relative p-8 sm:p-10 md:p-14 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] text-center flex flex-col items-center card-lacquer"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(55, 14, 19, 0.92) 0%, rgba(26, 5, 7, 0.98) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            boxShadow:
              '0 24px 60px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(212, 175, 55, 0.12)',
          }}
        >
          {/* Overline Tag */}
          {tag && (
            <span className="font-sans text-[#FFDF73] tracking-[0.24em] uppercase font-bold text-[12px] md:text-[13px] mb-3">
              {tag}
            </span>
          )}

          {/* Royal Gold Heading */}
          {headline && (
            <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[46px] text-gold-gradient max-w-3xl mb-6 font-bold uppercase leading-tight">
              {headline}
            </h2>
          )}

          {/* Explanatory Context */}
          {desc && (
            <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 max-w-3xl leading-[1.85] mb-10">
              {desc}
            </p>
          )}

          {/* 3 Unified Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-2xl">
            {/* Button 1: Primary Gold */}
            {renderButton(
              btn1Text,
              btn1Link,
              <Upload className="w-4 h-4 font-bold" />,
              'w-full sm:w-auto btn-gold px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-xl'
            )}

            {/* Button 2: Ghost Gilded Border */}
            {renderButton(
              btn2Text,
              btn2Link,
              <FileEdit className="w-4 h-4" />,
              'w-full sm:w-auto btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer'
            )}

            {/* Button 3: Dark Bordeaux Download */}
            {renderButton(
              btn3Text,
              btn3Link,
              <Download className="w-4 h-4 text-[#FFDF73]" />,
              'w-full sm:w-auto px-5 py-2.5 rounded font-sans text-[13px] md:text-[14px] uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#D4AF37]/35 text-[#FAF7F2] hover:bg-[#4d1319]',
              { background: 'rgba(55, 14, 19, 0.75)' }
            )}
          </div>

          {/* Archival Subtext Guarantee */}
          {guarantee && (
            <p className="font-sans text-[12px] md:text-[13px] text-[#EADBCE]/80 mt-8 tracking-wider uppercase flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FFDF73]" />
              {guarantee}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export { ArchiveCallSection };
export default ArchiveCallSection;
