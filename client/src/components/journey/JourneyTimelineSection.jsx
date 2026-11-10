import React from 'react';

const JourneyTimelineSection = ({ pageProps }) => {
  const timelineTitle = pageProps?.timeline_title || 'Dòng Thời Gian Lịch Sử & Tương Lai';
  const timelineNodes = Array.isArray(pageProps?.timeline_nodes)
    ? pageProps.timeline_nodes
    : [];

  if (timelineNodes.length === 0 && !pageProps?.timeline_title) return null;

  return (
    <section
      className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto scroll-mt-20"
      id="dong-thoi-gian"
    >
      {/* Header of the timeline */}
      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 pointer-events-none select-none -z-10">
          <div className="ambient-glow-disc absolute -bottom-16 right-1/4 w-80 h-80 bg-[#681010]/35 rounded-full blur-[120px]" />
        </div>

        <h2 className="font-sans text-3xl lg:text-[44px] lg:leading-[52px] font-bold text-gold-gradient uppercase tracking-tight py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {timelineTitle}
        </h2>
      </div>

      {/* Center Line & Nodes Container */}
      {timelineNodes.length === 0 ? (
        <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="relative w-full">
          <div className="absolute inset-0 pointer-events-none select-none -z-10">
            <div className="ambient-glow-disc absolute -bottom-16 right-1/4 w-80 h-80 bg-[#681010]/35 rounded-full blur-[120px]" />
          </div>

          {/* Continuous Golden Spine running down center */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FFDF73]/80 via-[#D4AF37]/60 to-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.45)]" />

          {/* TIMELINE LIST */}
          <div className="space-y-16 md:space-y-24">
            {timelineNodes.map((node, index) => {
              const isLeft = index % 2 === 0;
              const isLive = Boolean(node.is_live);

              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start group">
                {/* Timeline Pin */}
                {isLive ? (
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-7 w-7 h-7 rounded-full bg-[#d49b1a] flex items-center justify-center shadow-[0_0_26px_#FFDF73] z-20 animate-pulse">
                    <div className="w-3 h-3 rounded-full bg-[#100202]" />
                  </div>
                ) : (
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-7 w-6 h-6 rounded-full bg-[#1a0507] border border-[#D4AF37]/60 flex items-center justify-center shadow-[0_0_20px_#FFDF73] z-20 group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2.5 h-2.5 rotate-45 bg-[#FFDF73]" />
                  </div>
                )}

                {/* Left Side (Desktop) */}
                {isLeft ? (
                  <>
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-14 md:text-right">
                      <div className="card-lacquer p-7 sm:p-9 rounded-xl relative overflow-hidden transition-all duration-500 hover:border-[#FFDF73]">
                        <div className="flex flex-wrap items-center gap-3.5 justify-start md:justify-end mb-3">
                          {node.tag && (
                            <span className="px-3.5 py-1 rounded bg-[#2e090e] text-[#E6CA65] text-[12px] md:text-[13px] tracking-widest uppercase font-bold border border-[#D4AF37]/30">
                              {node.tag}
                            </span>
                          )}
                          {node.era && (
                            <span className="font-sans text-[24px] md:text-[28px] text-gold-gradient font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                              {node.era}
                            </span>
                          )}
                        </div>
                        {node.title && (
                          <h3 className="font-sans text-[20px] md:text-[22px] text-[#FAF7F2] mb-3 font-bold leading-snug">
                            {node.title}
                          </h3>
                        )}
                        {node.desc && (
                          <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]/90 leading-relaxed font-normal text-justify">
                            {node.desc}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Spacer right */}
                    <div className="hidden md:block w-1/2" />
                  </>
                ) : (
                  <>
                    {/* Spacer left */}
                    <div className="hidden md:block w-1/2" />
                    {/* Right side content */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-14">
                      <div
                        className={`card-lacquer p-7 sm:p-9 rounded-xl relative overflow-hidden transition-all duration-500 hover:border-[#FFDF73] ${
                          isLive
                            ? 'bg-gradient-to-br from-[#3d0b0b]/90 via-[#24080b]/95 to-[#120304] border-[#FFDF73]/70 shadow-2xl'
                            : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3.5 justify-start mb-3">
                          {node.era && (
                            <span className="font-sans text-[24px] md:text-[28px] text-gold-gradient font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                              {node.era}
                            </span>
                          )}
                          {node.tag && (
                            <span
                              className={`px-3.5 py-1 rounded text-[12px] md:text-[13px] tracking-widest uppercase font-bold border ${
                                isLive
                                  ? 'bg-[#d49b1a] text-[#100202] border-[#FFE07D] shadow-[0_0_12px_rgba(233,195,73,0.3)]'
                                  : 'bg-[#2e090e] text-[#E6CA65] border-[#D4AF37]/30'
                              }`}
                            >
                              {node.tag}
                            </span>
                          )}
                        </div>
                        {node.title && (
                          <h3
                            className={`font-sans text-[20px] md:text-[22px] mb-3 font-bold leading-snug ${
                              isLive ? 'text-[#F3DE7E] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]' : 'text-[#FAF7F2]'
                            }`}
                          >
                            {node.title}
                          </h3>
                        )}
                        {node.desc && (
                          <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]/90 leading-relaxed font-normal text-justify">
                            {node.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      )}
    </section>
  );
};

export default JourneyTimelineSection;
