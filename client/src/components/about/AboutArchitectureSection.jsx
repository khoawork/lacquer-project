import React from 'react';

const AboutArchitectureSection = ({ pageProps }) => {
  const archTag = pageProps?.arch_tag;
  const archTitle = pageProps?.arch_title;
  const archSubtitle = pageProps?.arch_subtitle;

  const tiers = Array.isArray(pageProps?.arch_tiers)
    ? pageProps.arch_tiers
    : [];

  if (!archTitle && tiers.length === 0) return null;

  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'radial-gradient(circle, rgba(42, 12, 16, 0.9) 0%, rgba(20, 5, 7, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        {(archTag || archTitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            {archTag && (
              <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
                {archTag}
              </span>
            )}
            {archTitle && (
              <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
                {archTitle}
              </h2>
            )}
            {archSubtitle && (
              <p className="font-serif text-[20px] italic text-[#FFDF73]">
                {archSubtitle}
              </p>
            )}
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
          </div>
        )}

        {/* Concentric / Stepped Tiered Layout */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden card-lacquer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">
                      {tier.icon || (idx === 0 ? 'lens' : idx === 1 ? 'hub' : 'cyclone')}
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-[12px] text-[#FFDF73] uppercase tracking-widest block mb-1 font-bold">
                      {tier.tier_badge || `Tầng 0${idx + 1}`}
                    </span>
                    <h3 className="font-serif text-[22px] md:text-[24px] text-gold-gradient font-bold">
                      {tier.title}
                    </h3>
                    <p className="font-body text-[16px] text-[#FAF7F2] mt-2 max-w-2xl leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutArchitectureSection;
