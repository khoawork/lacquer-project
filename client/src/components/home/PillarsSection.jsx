import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const PillarsSection = ({ pageProps }) => {
  const headline = pageProps?.pillars_headline || 'Bốn hướng mở của hành trình';
  const desc =
    pageProps?.pillars_desc ||
    'Một mô hình đa chiều kết nối truyền thống nghìn năm cùng nhịp đập kinh tế sáng tạo toàn cầu hóa.';

  const pillar1Title = pageProps?.pillar1_title || 'Cộng đồng sáng tạo';
  const pillar1Desc =
    pageProps?.pillar1_desc ||
    'Mở rộng Open Studio, bảo trợ chương trình lưu trú nghệ sĩ trẻ, workshop thể nghiệm đa chất liệu và truyền cảm hứng hội họa sơn mài đến công chúng đa thế hệ.';
  const p1CtaText = pageProps?.pillar1_cta_text || 'Khám phá hoạt động';
  const p1CtaLink = pageProps?.pillar1_cta_link || '/journey';

  const pillar2Title = pageProps?.pillar2_title || 'Công nghiệp văn hóa';
  const pillar2Desc =
    pageProps?.pillar2_desc ||
    'Đưa giá trị tạo hình sơn mài vào giáo dục mỹ thuật di sản, thiết kế nội thất, thời trang đương đại, sản phẩm cao cấp và không gian trải nghiệm.';
  const p2CtaText = pageProps?.pillar2_cta_text || 'Khám phá sản phẩm';
  const p2CtaLink = pageProps?.pillar2_cta_link || '/collections';

  const pillar3Title = pageProps?.pillar3_title || 'Kinh tế di sản';
  const pillar3Desc =
    pageProps?.pillar3_desc ||
    'Làng nghề, du lịch trải nghiệm, lưu trữ số, giám định, định danh và thị trường minh bạch.';
  const p3CtaText = pageProps?.pillar3_cta_text || 'Khám phá dự án';
  const p3CtaLink = pageProps?.pillar3_cta_link || '/events';

  const pillar4Title = pageProps?.pillar4_title || 'Đổi mới vật liệu';
  const pillar4Desc =
    pageProps?.pillar4_desc ||
    'Vật liệu lai, bề mặt kiến trúc, công nghệ bảo tồn và giải pháp bền vững.';
  const p4CtaText = pageProps?.pillar4_cta_text || 'Khám phá thể nghiệm';
  const p4CtaLink = pageProps?.pillar4_cta_link || '/archive';

  const bottomCtaText = pageProps?.pillars_bottom_cta_text || 'XEM CHI TIẾT HỆ SINH THÁI';
  const bottomCtaLink = pageProps?.pillars_bottom_cta_link || '#mo-hinh';

  return (
    <section
      className="relative w-full py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="bon-huong-mo"
      style={{
        background: 'linear-gradient(rgb(40, 9, 13) 0%, rgb(30, 6, 8) 100%)',
      }}
    >
      {/* Sparkles in Pillars Section */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
              {headline}
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2]">
              {desc}
            </p>
          </div>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">groups_3</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar1Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  {pillar1Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              {p1CtaLink.startsWith('#') ? (
                <a
                  href={p1CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p1CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p1CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p1CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">palette</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar2Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  {pillar2Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              {p2CtaLink.startsWith('#') ? (
                <a
                  href={p2CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p2CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p2CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p2CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">account_balance</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar3Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  {pillar3Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              {p3CtaLink.startsWith('#') ? (
                <a
                  href={p3CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p3CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p3CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p3CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="card-lacquer group relative rounded-lg p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-lg bg-[#3a0808] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-110 group-hover:border-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[30px]">science</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar4Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75]">
                  {pillar4Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-serif text-[15px] font-semibold tracking-wider">
              {p4CtaLink.startsWith('#') ? (
                <a
                  href={p4CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p4CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p4CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p4CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          {bottomCtaLink.startsWith('#') ? (
            <a
              className="btn-gold-outline px-10 py-3.5 rounded text-[16px] uppercase tracking-[0.2em] whitespace-nowrap inline-block"
              href={bottomCtaLink}
            >
              {bottomCtaText}
            </a>
          ) : (
            <Link
              className="btn-gold-outline px-10 py-3.5 rounded text-[16px] uppercase tracking-[0.2em] whitespace-nowrap inline-block"
              to={bottomCtaLink}
            >
              {bottomCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;

