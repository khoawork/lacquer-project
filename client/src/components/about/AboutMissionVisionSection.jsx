import React from 'react';

const AboutMissionVisionSection = ({ pageProps }) => {
  const mvTag = pageProps?.mv_tag;
  const mvTitle = pageProps?.mv_title;

  // Card 1: Sứ mệnh
  const missionBadge = pageProps?.mission_badge;
  const missionTitle = pageProps?.mission_title || pageProps?.mission;
  const missionPoints = Array.isArray(pageProps?.mission_points)
    ? pageProps.mission_points
    : [];

  // Card 2: Tầm nhìn 2030
  const visionBadge = pageProps?.vision_badge;
  const visionTitle = pageProps?.vision_title;
  const visionDesc = pageProps?.vision_desc || pageProps?.vision;
  const milestones = Array.isArray(pageProps?.milestones)
    ? pageProps.milestones
    : [];

  if (!mvTitle && !missionTitle && !visionTitle) return null;

  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        background:
          'radial-gradient(circle, rgba(44, 12, 17, 0.9) 0%, rgba(22, 6, 8, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        {(mvTag || mvTitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            {mvTag && (
              <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
                {mvTag}
              </span>
            )}
            {mvTitle && (
              <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
                {mvTitle}
              </h2>
            )}
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
          </div>
        )}

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Sứ mệnh (Mission) */}
          {(missionTitle || missionPoints.length > 0) && (
            <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-[#D4AF37]/30 shadow-2xl relative group card-lacquer">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  {missionBadge && (
                    <span
                      className="inline-flex items-center px-3.5 py-1 rounded border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[13px] tracking-widest uppercase font-bold"
                      style={{ background: 'rgba(50, 10, 10, 0.7)' }}
                    >
                      {missionBadge}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[#FFDF73]/80 text-3xl drop-shadow-[0_0_8px_#FFDF73]">
                    auto_stories
                  </span>
                </div>
                {missionTitle && (
                  <h3 className="font-serif text-2xl lg:text-[28px] text-gold-gradient font-bold leading-snug">
                    {missionTitle}
                  </h3>
                )}
                <div className="space-y-4 pt-2">
                  {missionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                      <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]">
                        {point.bold && (
                          <strong className="text-[#FFDF73] font-serif font-bold">
                            {point.bold}{' '}
                          </strong>
                        )}
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Tầm nhìn (Vision 2030) */}
          {(visionTitle || visionDesc || milestones.length > 0) && (
            <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-[#D4AF37]/30 shadow-2xl relative group card-lacquer">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  {visionBadge && (
                    <span
                      className="inline-flex items-center px-3.5 py-1 rounded border border-[#D4AF37]/40 text-[#FFDF73] font-serif text-[13px] tracking-widest uppercase font-bold"
                      style={{ background: 'rgba(50, 10, 10, 0.7)' }}
                    >
                      {visionBadge}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[#FFDF73]/80 text-3xl drop-shadow-[0_0_8px_#FFDF73]">
                    visibility
                  </span>
                </div>
                {visionTitle && (
                  <h3 className="font-serif text-2xl lg:text-[28px] text-gold-gradient font-bold leading-snug">
                    {visionTitle}
                  </h3>
                )}
                {visionDesc && (
                  <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed font-normal">
                    {visionDesc}
                  </p>
                )}

                {/* Visual Milestone Timeline */}
                <div className="pt-4 space-y-3">
                  {milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#180303]/90 border border-[#D4AF37]/25 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-[#FFDF73] font-bold text-base">
                          {m.year}
                        </span>
                        <span className="text-xs text-[#EADBCE]">{m.desc}</span>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          idx === 0 || m.isCurrent
                            ? 'bg-[#FFDF73] shadow-[0_0_6px_#FFDF73]'
                            : 'bg-[#FFDF73]/60'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVisionSection;
