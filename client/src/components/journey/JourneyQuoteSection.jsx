import React from 'react';

const JourneyQuoteSection = ({ pageProps }) => {
  const quote = pageProps?.key_quote;

  if (!quote) return null;

  return (
    <section className="relative z-10 w-full pt-8! py-16 md:py-24 px-4 sm:px-6 lg:px-12 mb-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="ambient-glow-disc absolute top-[5%] right-1/4 w-[650px] h-[500px] bg-[#580d0d]/35 rounded-full blur-[160px]" />
        <div className="ambient-glow-disc absolute top-[40%] left-1/3 w-[600px] h-[550px] bg-[#D4AF37]/10 rounded-full blur-[160px]" />
        <div className="ambient-glow-disc absolute bottom-[5%] right-1/3 w-[550px] h-[450px] bg-[#4a0808]/40 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto card-lacquer p-10 md:p-16 rounded-2xl relative overflow-hidden text-center shadow-2xl transition-all duration-500">
        {/* Lacquer bloom backdrop glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="text-[#E6CA65] text-2xl font-sans mb-4">✦ ✦ ✦</div>
        <blockquote className="font-sans text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold italic text-gold-gradient max-w-4xl mx-auto leading-relaxed md:leading-relaxed mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {quote}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-[#E6CA65]/50" />
          <div className="w-2 h-2 rotate-45 bg-[#E6CA65] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
          <div className="w-12 h-px bg-[#E6CA65]/50" />
        </div>
      </div>
    </section>
  );
};

export default JourneyQuoteSection;

