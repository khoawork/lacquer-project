import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const PillarsSection = ({ pageProps }) => {
  const headline = pageProps?.pillars_headline || '';
  const desc = pageProps?.pillars_desc || '';

  const pillar1Title = pageProps?.pillar1_title || pageProps?.pillars?.[0]?.title || '';
  const pillar1Desc = pageProps?.pillar1_desc || pageProps?.pillars?.[0]?.desc || '';
  const p1CtaText = pageProps?.pillar1_cta_text || '';
  const p1CtaLink = pageProps?.pillar1_cta_link || '/journey';

  const pillar2Title = pageProps?.pillar2_title || pageProps?.pillars?.[1]?.title || '';
  const pillar2Desc = pageProps?.pillar2_desc || pageProps?.pillars?.[1]?.desc || '';
  const p2CtaText = pageProps?.pillar2_cta_text || '';
  const p2CtaLink = pageProps?.pillar2_cta_link || '/collections';

  const pillar3Title = pageProps?.pillar3_title || pageProps?.pillars?.[2]?.title || '';
  const pillar3Desc = pageProps?.pillar3_desc || pageProps?.pillars?.[2]?.desc || '';
  const p3CtaText = pageProps?.pillar3_cta_text || '';
  const p3CtaLink = pageProps?.pillar3_cta_link || '/events';

  const pillar4Title = pageProps?.pillar4_title || pageProps?.pillars?.[3]?.title || '';
  const pillar4Desc = pageProps?.pillar4_desc || pageProps?.pillars?.[3]?.desc || '';
  const p4CtaText = pageProps?.pillar4_cta_text || '';
  const p4CtaLink = pageProps?.pillar4_cta_link || '/archive';

  const bottomCtaText = pageProps?.pillars_bottom_cta_text || '';
  const bottomCtaLink = pageProps?.pillars_bottom_cta_link || '#mo-hinh';

  if (!headline && !desc && !pillar1Title) {
    return (
      <section className="relative w-full py-16 bg-[#180303] border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto">
            Chưa có dữ liệu
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full pt-16! py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="bon-huong-mo"
      style={{
        background: 'linear-gradient(rgb(40, 9, 13) 0%, rgb(30, 6, 8) 100%)',
      }}
    >
      {/* Sparkles in Pillars Section */}
      <FloatingSparkles size={4.5} />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2 max-w-4xl">
            <h2 className="font-sans text-[clamp(20px,2.4vw,36px)] font-bold text-gold-gradient leading-tight whitespace-normal sm:whitespace-nowrap">
              {headline}
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2] py-4">
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
                <h3 className="font-sans text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar1Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75] text-justify">
                  {pillar1Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-sans text-[15px] font-semibold tracking-wider">
              {(p1CtaLink || '').startsWith('#') ? (
                <a
                  href={p1CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p1CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p1CtaLink || '/journey'}
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
                <h3 className="font-sans text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar2Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75] text-justify">
                  {pillar2Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-sans text-[15px] font-semibold tracking-wider">
              {(p2CtaLink || '').startsWith('#') ? (
                <a
                  href={p2CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p2CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p2CtaLink || '/collections'}
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
                <h3 className="font-sans text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar3Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75] text-justify">
                  {pillar3Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-sans text-[15px] font-semibold tracking-wider">
              {(p3CtaLink || '').startsWith('#') ? (
                <a
                  href={p3CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p3CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p3CtaLink || '/events'}
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
                <h3 className="font-sans text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                  {pillar4Title}
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-[1.75] text-justify">
                  {pillar4Desc}
                </p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center text-[#FFDF73] font-sans text-[15px] font-semibold tracking-wider">
              {(p4CtaLink || '').startsWith('#') ? (
                <a
                  href={p4CtaLink}
                  className="group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFE599]"
                >
                  {p4CtaText}{' '}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </a>
              ) : (
                <Link
                  to={p4CtaLink || '/archive'}
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
          {(bottomCtaLink || '').startsWith('#') ? (
            <a
              className="btn-gold-outline px-10 py-3.5 rounded text-[16px] uppercase tracking-[0.2em] whitespace-nowrap inline-block"
              href={bottomCtaLink || '#mo-hinh'}
            >
              {bottomCtaText}
            </a>
          ) : (
            <Link
              className="btn-gold-outline px-10 py-3.5 rounded text-[16px] uppercase tracking-[0.2em] whitespace-nowrap inline-block"
              to={bottomCtaLink || '#mo-hinh'}
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

