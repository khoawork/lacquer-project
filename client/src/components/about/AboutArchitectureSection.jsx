import React from 'react';

const AboutArchitectureSection = () => {
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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
            MÔ HÌNH HỆ THỐNG
          </span>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Kiến trúc nền tảng
          </h2>
          <p className="font-serif text-[20px] italic text-[#FFDF73]">
            Lõi bất biến – Vòng mở – Lớp vận hành
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* Concentric / Stepped Tiered Layout */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Tier 1: Lõi Bất Biến (Inner Core) */}
          <div className="p-6 md:p-8 rounded-xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden card-lacquer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">lens</span>
                </div>
                <div>
                  <span className="font-serif text-[12px] text-[#FFDF73] uppercase tracking-widest block mb-1 font-bold">
                    Tầng 01 • Tâm Lõi
                  </span>
                  <h3 className="font-serif text-[22px] md:text-[24px] text-gold-gradient font-bold">
                    Lõi bất biến (The Immutability Core)
                  </h3>
                  <p className="font-body text-[16px] text-[#FAF7F2] mt-2 max-w-2xl leading-relaxed">
                    Cơ chế tạo ảnh bằng tích tụ lớp, mài lộ, chiều sâu vật ánh sáng nội tại và thời gian.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Vòng Mở (Outer Belt) */}
          <div className="p-6 md:p-8 rounded-xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden card-lacquer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">hub</span>
                </div>
                <div>
                  <span className="font-serif text-[12px] text-[#FFDF73] uppercase tracking-widest block mb-1 font-bold">
                    Tầng 02 • Vành Đai Kết Nối
                  </span>
                  <h3 className="font-serif text-[22px] md:text-[24px] text-gold-gradient font-bold">
                    Vòng mở (The Collaborative Ring)
                  </h3>
                  <p className="font-body text-[16px] text-[#FAF7F2] mt-2 max-w-2xl leading-relaxed">
                    Hội tụ nghệ sĩ, curator, nghệ nhân, nhà khoa học, nhà thiết kế, kiến trúc sư, doanh nghiệp, startup và nhà đầu tư.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 3: Lớp Vận Hành (Operational Loop) */}
          <div className="p-6 md:p-8 rounded-xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden card-lacquer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">cyclone</span>
                </div>
                <div>
                  <span className="font-serif text-[12px] text-[#FFDF73] uppercase tracking-widest block mb-1 font-bold">
                    Tầng 03 • Hạ Tầng Triển Khai
                  </span>
                  <h3 className="font-serif text-[22px] md:text-[24px] text-gold-gradient font-bold">
                    Lớp vận hành (The Operational Loop)
                  </h3>
                  <p className="font-body text-[16px] text-[#FAF7F2] mt-2 max-w-2xl leading-relaxed">
                    <strong className="text-[#FFDF73] font-serif font-bold">LAB</strong> (Nghiên cứu &amp; Thử nghiệm vật liệu) —{' '}
                    <strong className="text-[#FFDF73] font-serif font-bold">STUDIO</strong> (Sáng tác &amp; Đồng hành cùng nghệ sĩ) —{' '}
                    <strong className="text-[#FFDF73] font-serif font-bold">SHOWCASE</strong> (Trưng bày, giám tuyển &amp; Công bố tác phẩm) —{' '}
                    <strong className="text-[#FFDF73] font-serif font-bold">MARKET</strong> (Thương mại hóa, bảo chứng &amp; Định giá di sản).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutArchitectureSection;

