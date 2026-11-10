import React from 'react';
import { getImageUrl } from '../../configs/Apis';

const AboutStorySection = ({ pageProps }) => {
  const storyTag = pageProps?.story_tag;
  const storyHeadline = pageProps?.story_headline;
  const storyP1 = pageProps?.story_p1;
  const storyP2 = pageProps?.story_p2;
  const storyQuote = pageProps?.story_quote;
  const storyImage = pageProps?.story_image;
  const storyImageTag = pageProps?.story_image_tag;
  const storyImageTitle = pageProps?.story_image_title;
  const storyImageDesc = pageProps?.story_image_desc;

  if (!storyHeadline && !storyP1 && !storyImage) return null;

  return (
    <section
      className="relative w-full py-12 lg:py-20"
      style={{
        background:
          'linear-gradient(rgba(26, 7, 10, 0.97) 0%, rgba(36, 10, 14, 0.92) 50%, rgba(22, 6, 8, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Full-width Header: Đặt phía trên grid để tiêu đề hiển thị liền mạch trên 1 dòng */}
        {(storyTag || storyHeadline) && (
          <div className="mb-2 lg:mb-6 space-y-2.5">
            {storyTag && (
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_#FFDF73]" />
                <span className="font-sans text-[13px] text-[#FFDF73] uppercase tracking-[0.22em] font-semibold">
                  {storyTag}
                </span>
              </div>
            )}
            {storyHeadline && (
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-[42px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight whitespace-normal sm:whitespace-nowrap py-1">
                {storyHeadline}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Manifesto & Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <p className="font-body text-[18px] md:text-[19px] text-[#FAF7F2] leading-relaxed text-justify">
              {storyP1}
            </p>
            <p className="font-body text-[18px] md:text-[19px] text-[#FAF7F2] leading-relaxed text-justify">
              {storyP2}
            </p>

            {/* Velvet Glass Callout Quote */}
            {storyQuote && (
              <div
                className="mt-4 p-6 rounded-xl border border-[#D4AF37]/35 shadow-[0_8px_30px_rgba(0,0,0,0.6)] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(28, 7, 10, 0.95) 0%, rgba(12, 2, 4, 0.98) 100%)',
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                  style={{ background: 'rgba(212, 175, 55, 0.18)' }}
                />
                <div className="flex items-start gap-3.5 relative z-10">
                  <span
                    className="material-symbols-outlined text-[#FFDF73] text-3xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_#FFDF73]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    format_quote
                  </span>
                  <p className="font-sans text-[19px] md:text-[21px] italic text-[#FFF3CC] leading-snug font-semibold text-justify">
                    {storyQuote}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visual Composition of Lacquer Layers */}
          <div className="lg:col-span-6 relative">
            <div
              className="absolute -inset-4 rounded-2xl blur-xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(55, 10, 10, 0.35) 60%, transparent 80%)',
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/45 p-1 bg-gradient-to-br from-[#3d0b0b] via-[#24080b] to-[#120305] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative group">
                {storyImage && (
                  <img
                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
                    alt={storyImageTitle || "Bóc tách từng tầng sơn then mài lộ sắc"}
                    src={getImageUrl(storyImage)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#150305] via-[#150305]/30 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  {storyImageTag && (
                    <span className="font-sans text-xs md:text-sm text-[#FFDF73] uppercase tracking-[0.2em] font-bold block">
                      {storyImageTag}
                    </span>
                  )}
                  {storyImageTitle && (
                    <h3 className="font-sans text-xl sm:text-2xl text-[#FAF7F2] font-bold leading-tight">
                      {storyImageTitle}
                    </h3>
                  )}
                  {storyImageDesc && (
                    <p className="font-body text-xs sm:text-sm text-[#EADBCE] leading-relaxed">
                      {storyImageDesc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStorySection;

