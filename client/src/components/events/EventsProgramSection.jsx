import React from 'react';
import { getImageUrl } from '../../configs/Apis';

const EventsProgramSection = ({ pageProps = null }) => {
  const badge = pageProps?.program_badge;
  const title =
    pageProps?.program_title ||
    pageProps?.highlight_theme;
  const desc = pageProps?.program_desc ;
     const bgImg =pageProps?.program_image;
  const time = pageProps?.program_time;
  const date = pageProps?.program_date ;
  const location = pageProps?.program_location || pageProps?.location ;
  const address = pageProps?.program_address ;
  const gpsTitle = pageProps?.program_gps_title ;
  const gpsSub =
    pageProps?.program_gps_sub;

  return (
    <section
      className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-20 scroll-mt-28 relative z-10"
      id="chuong-trinh-chi-tiet"
    >
      {/* The 7-Module Container */}
      <div className="w-full rounded-2xl card-lacquer shadow-2xl overflow-hidden p-5 md:p-8 space-y-10 border border-[#D4AF37]/40 relative">
        {/* Background subtle amber glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full blur-[130px] pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(160, 36, 48, 0.28) 0%, transparent 75%)',
          }}
        />

        {/* MODULE 1: ARTISTIC BANNER & HEADER AREA */}
        <div
          className="relative w-full rounded-xl overflow-hidden shadow-2xl p-8 md:p-12 border border-[#D4AF37]/45"
          style={{
            background:
              'linear-gradient(135deg, rgba(56, 14, 20, 0.95) 0%, rgba(26, 6, 9, 0.98) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity"
            style={{ backgroundImage: `url('${getImageUrl(bgImg)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#180406] via-[#180406]/85 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            {badge && (
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#FFDF73] font-sans text-[12px] uppercase tracking-widest mb-4 font-bold"
                style={{ background: 'rgba(38, 10, 14, 0.85)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h4 className="font-sans text-[30px] sm:text-[34px] md:text-[46px] leading-[40px] md:leading-[54px] text-gold-gradient mb-4 font-bold">
                {title}
              </h4>
            )}
            {desc && (
              <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2] max-w-2xl leading-relaxed">
                {desc}
              </p>
            )}
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
              <span className="material-symbols-outlined text-[22px]">
                schedule
              </span>
            </div>
            <div>
              <span className="font-sans text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Thời gian tổ chức
              </span>
              <span className="font-sans text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                {time}
              </span>
              <span className="font-body text-[14px] text-[#EADBCE]">{date}</span>
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
              <span className="material-symbols-outlined text-[22px]">
                apartment
              </span>
            </div>
            <div>
              <span className="font-sans text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Địa điểm thực hiện
              </span>
              <span className="font-sans text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                {location}
              </span>
              <span className="font-body text-[14px] text-[#EADBCE]">
                {address}
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
              <span className="material-symbols-outlined text-[22px]">
                pin_drop
              </span>
            </div>
            <div>
              <span className="font-sans text-[12px] uppercase tracking-wider text-[#FFDF73] font-bold block">
                Bản đồ định vị GPS
              </span>
              <span className="font-sans text-[20px] text-[#FAF7F2] font-bold block mt-0.5">
                {gpsTitle}
              </span>
              <span className="font-body text-[14px] text-[#EADBCE]">
                {gpsSub}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsProgramSection;
