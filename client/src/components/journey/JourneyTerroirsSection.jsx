import React from 'react';
import { MapPin, Sprout, Hammer, Sparkles, Compass } from 'lucide-react';

const ICONS_MAP = {
  Sprout,
  Hammer,
  MapPin,
};

const JourneyTerroirsSection = ({ pageProps }) => {
  const rawTerroirs = Array.isArray(pageProps?.terroirs) ? pageProps.terroirs : [];
  const terroirs = rawTerroirs.map((item, idx) => ({
    ...item,
    icon: (typeof item.icon === 'string' ? ICONS_MAP[item.icon] : item.icon) || (idx === 0 ? Sprout : idx === 1 ? Hammer : MapPin),
  }));

  return (
    <section
      className="relative w-full py-20 lg:py-28"
      id="coi-nguon-lang-nghe"
      style={{
        background: 'linear-gradient(rgba(22, 5, 7, 0.98) 0%, rgba(36, 9, 13, 0.92) 50%, rgba(18, 4, 6, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Tiêu đề mục */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#350a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Compass className="w-4 h-4 text-[#E6CA65]" />
            <span className="font-sans text-[13px] tracking-[0.25em] text-[#E6CA65] uppercase font-bold">
              ĐỊA BÀN DI SẢN
            </span>
          </div>
          <h2 className="font-sans text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight py-4">
            Cội Nguồn Đất &amp; Tinh Hoa Làng Nghề
          </h2>
          <p className="font-body text-[17px] md:text-[18px] text-[#FAF7F2] leading-relaxed">
            Hội họa sơn mài không thể tách rời vùng đất nuôi dưỡng cây sơn và đôi bàn tay tài hoa của những nghệ nhân giữ lửa nơi làng cổ.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#E6CA65] to-transparent mx-auto mt-2" />
        </div>

        {/* 3 Vùng đất di sản */}
        {terroirs.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {terroirs.map((item, idx) => {
              const Icon = item.icon || MapPin;
              return (
                <div
                  key={idx}
                  className="card-lacquer p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#E6CA65] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded border border-[#D4AF37]/40 bg-[#30080c] text-[#E6CA65] font-sans text-[11px] uppercase tracking-wider font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <span className="font-sans text-[13px] text-[#E6CA65] uppercase tracking-widest block mb-1 font-bold">
                        {item.region}
                      </span>
                      <h3 className="font-sans text-[22px] md:text-[24px] text-gold-gradient font-bold leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2] leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center gap-2 text-[#E6CA65] font-sans text-[13px] tracking-wide">
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    <span>{item.stats}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
      </div>
    </section>
  );
};

export default JourneyTerroirsSection;

