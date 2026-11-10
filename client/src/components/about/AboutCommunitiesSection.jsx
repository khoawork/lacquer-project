import React from 'react';

const AboutCommunitiesSection = ({ pageProps }) => {
  const commTag = pageProps?.comm_tag;
  const commTitle = pageProps?.comm_title;
  const commDesc = pageProps?.comm_desc;
  const communities = Array.isArray(pageProps?.communities)
    ? pageProps.communities
    : [];

  if (!commTitle && communities.length === 0) return null;

  return (
    <section
      className="relative w-full py-12 lg:py-20"
      style={{
        background:
          'linear-gradient(rgba(22, 5, 7, 0.98) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(18, 4, 6, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-3">
          {commTag && (
            <span className="font-sans text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
              {commTag}
            </span>
          )}
          {commTitle && (
            <h2 className="font-sans text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight py-4">
              {commTitle}
            </h2>
          )}
          {commDesc && (
            <p className="font-body text-[16px] md:text-[17px] text-[#EADBCE]">
              {commDesc}
            </p>
          )}
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* Target Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((comm, idx) => {
            const isLastOdd =
              communities.length % 3 === 2 && idx === communities.length - 1;
            return (
              <div
                key={idx}
                className={`p-6 rounded-xl border border-[#D4AF37]/30 shadow-lg group hover:-translate-y-1.5 transition-all duration-300 card-lacquer ${
                  isLastOdd
                    ? 'md:col-span-2 lg:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6'
                    : ''
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform shrink-0">
                  <span className="material-symbols-outlined text-2xl">
                    {comm.icon || 'groups'}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans text-[20px] text-[#FFDF73] font-bold mb-2">
                    {comm.title}
                  </h3>
                  <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed text-justify">
                    {comm.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutCommunitiesSection;
