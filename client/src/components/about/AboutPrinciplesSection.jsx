import React from 'react';

const AboutPrinciplesSection = ({ pageProps }) => {
  const principlesTag = pageProps?.principles_tag;
  const principlesTitle = pageProps?.principles_title;
  const principlesDesc = pageProps?.principles_desc;
  const principles = Array.isArray(pageProps?.principles)
    ? pageProps.principles
    : [];

  if (!principlesTitle && principles.length === 0) return null;

  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'linear-gradient(rgba(24, 6, 9, 0.98) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(20, 5, 7, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          {principlesTag && (
            <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
              {principlesTag}
            </span>
          )}
          {principlesTitle && (
            <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
              {principlesTitle}
            </h2>
          )}
          {principlesDesc && (
            <p className="font-body text-[16px] md:text-[17px] text-[#EADBCE] max-w-xl mx-auto">
              {principlesDesc}
            </p>
          )}
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* Dynamic Principles Grid */}
        <div
          className={`grid grid-cols-1 ${
            principles.length <= 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'md:grid-cols-2 lg:grid-cols-3'
          } gap-6 lg:gap-8`}
        >
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 card-lacquer flex flex-col justify-between"
            >
              <div>
                <div className="font-serif text-5xl font-bold text-[#FFDF73]/25 group-hover:text-[#FFDF73]/45 transition-colors leading-none mb-4 select-none">
                  {p.num || String(idx + 1).padStart(2, '0')}
                </div>
                <div className="space-y-3 relative z-10">
                  <h3 className="font-serif text-[22px] text-[#FFDF73] font-bold">
                    {p.title}
                  </h3>
                  <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
              {p.tag && (
                <div className="mt-6 flex items-center gap-2 text-[#FFDF73]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]" />
                  <span className="font-serif text-xs uppercase tracking-wider text-[#FFDF73]/80">
                    {p.tag}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciplesSection;
