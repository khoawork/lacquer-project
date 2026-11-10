import React from 'react';
import { Link } from 'react-router-dom';

const JourneySymposiaSection = ({ pageProps }) => {
  const symposiaTitle = pageProps?.symposia_title || 'Chuỗi Chuyên Đề';
  const symposia = Array.isArray(pageProps?.symposia) ? pageProps.symposia : [];

  const featuredCode = pageProps?.featured_symposium_code || 'CHUYÊN ĐỀ ĐẶC BIỆT • LẦN 7';
  const featuredTitle = pageProps?.featured_symposium_title;
  const featuredDesc = pageProps?.featured_symposium_desc;
  const featuredBtn1 = pageProps?.featured_symposium_btn1 || 'Đăng ký tham dự diễn đàn';
  const featuredBtn2 = pageProps?.featured_symposium_btn2 || 'Tải đề cương chuyên đề';

  if (symposia.length === 0 && !featuredTitle) return null;

  return (
    <section className="relative z-10 w-full pt-12! py-16 md:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="font-sans text-3xl lg:text-[44px] lg:leading-[52px] font-bold text-gold-gradient uppercase tracking-tight mb-4 leading-tight py-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {symposiaTitle}
        </h2>
      </div>

      {/* 3-Column Grid for Symposia */}
      {symposia.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {symposia.map((item, idx) => (
            <div
              key={idx}
              className="card-lacquer p-8 rounded-xl flex flex-col justify-between group transition-all duration-500 hover:border-[#D4AF37]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {item.code && (
                    <span className="px-3.5 py-1 rounded bg-[#2e090e] text-[#E6CA65] text-[12px] md:text-[13px] tracking-wider font-bold border border-[#D4AF37]/25">
                      {item.code}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[#E6CA65]/70 group-hover:text-[#F5DE9C] group-hover:rotate-45 transition-all text-2xl">
                    arrow_outward
                  </span>
                </div>
                {item.title && (
                  <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-[#FAF7F2] group-hover:text-[#F5DE9C] transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                )}
                {item.desc && (
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]/90 leading-relaxed font-normal text-justify">
                    {item.desc}
                  </p>
                )}
              </div>

              {item.sub && (
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 flex items-center gap-2 text-[#E6CA65] text-xs uppercase tracking-widest font-semibold">
                  <span>{item.sub}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FEATURED FULL-WIDTH CARD (Chuyên đề lần 7) */}
      {featuredTitle && (
        <div className="card-lacquer p-8 sm:p-12 rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#3d0b0b]/90 via-[#24080b]/95 to-[#120304] transition-all duration-500 border border-[#D4AF37]/45">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              {featuredCode && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#d49b1a] text-[#100202] text-xs uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(233,195,73,0.3)]">
                  <span>{featuredCode}</span>
                </div>
              )}
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-[32px] text-gold-gradient font-bold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {featuredTitle}
              </h3>
              {featuredDesc && (
                <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]/90 leading-relaxed font-normal text-justify">
                  {featuredDesc}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
              <Link
                to="/contact"
                className="btn-gold px-7 py-3 rounded text-sm uppercase tracking-wider font-bold whitespace-nowrap text-center cursor-pointer inline-block"
              >
                {featuredBtn1}
              </Link>
              <Link
                to="/contact"
                className="btn-gold-outline px-7 py-3 rounded text-sm uppercase tracking-wider font-bold whitespace-nowrap text-center cursor-pointer inline-block"
              >
                {featuredBtn2}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JourneySymposiaSection;

