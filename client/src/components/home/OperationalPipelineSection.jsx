import React from 'react';

const OperationalPipelineSection = () => {
  return (
    <section
      className="relative w-full py-24 bg-[#120202] border-t border-[#D4AF37]/20"
      id="mo-hinh"
      style={{
        background: 'linear-gradient(rgb(30, 6, 8) 0%, rgb(38, 8, 12) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
            Từ ý tưởng đến giá trị
          </h2>
          <p className="font-body text-[18px] text-[#FAF7F2]">
            Chu trình liên tục chuyển hóa chất xám nghiên cứu, năng lượng sáng tạo nghệ thuật thành các giá trị văn hóa và kinh tế bền vững cho đất nước.
          </p>
        </div>

        {/* Operational Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="card-lacquer p-7 rounded-lg flex flex-col justify-between space-y-6 group">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[36px] font-bold text-[#FFDF73]/40 group-hover:text-[#FFDF73] transition-colors">
                01
              </span>
              <span className="px-3 py-1 rounded bg-[#380808] border border-[#D4AF37]/35 font-serif text-[12px] text-[#FFDF73] tracking-widest uppercase font-bold whitespace-nowrap">
                KHỞI ĐỘNG
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-[26px] font-bold text-[#FAF7F2]">LAB</h3>
              <p className="font-serif text-[15px] text-[#FFDF73] tracking-wider font-semibold whitespace-nowrap">
                Nghiên cứu &amp; Thể nghiệm
              </p>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                Nghiên cứu lịch sử, lý luận, chất liệu và công nghệ.
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#2a0606] rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73]" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-lacquer p-7 rounded-lg flex flex-col justify-between space-y-6 group">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[36px] font-bold text-[#FFDF73]/40 group-hover:text-[#FFDF73] transition-colors">
                02
              </span>
              <span className="px-3 py-1 rounded bg-[#380808] border border-[#D4AF37]/35 font-serif text-[12px] text-[#FFDF73] tracking-widest uppercase font-bold whitespace-nowrap">
                SÁNG TẠO
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-[26px] font-bold text-[#FAF7F2]">STUDIO</h3>
              <p className="font-serif text-[15px] text-[#FFDF73] tracking-wider font-semibold whitespace-nowrap">
                Đồng hành nghệ nhân &amp; họa sĩ
              </p>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                Sáng tác, thử nghiệm, workshop và đồng kiến tạo.
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#2a0606] rounded-full overflow-hidden">
              <div className="w-2/4 h-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-lacquer p-7 rounded-lg flex flex-col justify-between space-y-6 group">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[36px] font-bold text-[#FFDF73]/40 group-hover:text-[#FFDF73] transition-colors">
                03
              </span>
              <span className="px-3 py-1 rounded bg-[#380808] border border-[#D4AF37]/35 font-serif text-[12px] text-[#FFDF73] tracking-widest uppercase font-bold whitespace-nowrap">
                HIỂN LỘ
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-[26px] font-bold text-[#FAF7F2]">SHOWCASE</h3>
              <p className="font-serif text-[15px] text-[#FFDF73] tracking-wider font-semibold whitespace-nowrap">
                Trưng bày &amp; Giám tuyển
              </p>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                Triển lãm, toạ đàm, trình diễn và không gian trải nghiệm.
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#2a0606] rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73]" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="card-lacquer p-7 rounded-lg flex flex-col justify-between space-y-6 group">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[36px] font-bold text-[#FFDF73]/40 group-hover:text-[#FFDF73] transition-colors">
                04
              </span>
              <span className="px-3 py-1 rounded bg-[#380808] border border-[#D4AF37]/35 font-serif text-[12px] text-[#FFDF73] tracking-widest uppercase font-bold whitespace-nowrap">
                LAN TỎA
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-[26px] font-bold text-[#FAF7F2]">MARKET</h3>
              <p className="font-serif text-[15px] text-[#FFDF73] tracking-wider font-semibold whitespace-nowrap">
                Thương mại hóa di sản
              </p>
              <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                Sản phẩm, bản quyền, hợp tác thương hiệu, đầu tư và thương mại hoá có trách nhiệm.
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#2a0606] rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalPipelineSection;

