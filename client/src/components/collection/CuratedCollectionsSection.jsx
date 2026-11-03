import React from 'react';
import { Palette, Grid, Sparkles, Layers, Droplets, Globe, ArrowRight, Eye, Film } from 'lucide-react';

const CuratedCollectionsSection = () => {
  const CUU_CUU_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBzn3gGKOtd04V_bHywnZQHLzqggz0F4qIQUbpj0oRjQe467xTVyQ6US9jkaUkofml9Lpj2SvyifhAKBqvE0RluAfP0Ri5Z2m7zvGsJRAMDRli5Et9cab5FKpqmMFMwle2qEPmI0Vk3AX5UhEJcJGRzcKvhfnNabZ_yEVf3sjXBYosgNtPloQxmCslYNxYRQ6jNqDfWZh97n4hYktijxcPlNt6bElNGvnWBPHcz1FZH';

  const BACH_THU_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7kmynYQYLLAUi40X00ZQ3J562jqYN5vyRUwOBRM2DE7C0mL8Wqh6UvCblnl0HBlCclJ0Ndgu96idZa778gsEl4FIOHbS205rGPTZe-8OjvIpJCacEF5PrZuSckAFRl3qkLUBYfpiRztD-9w1Uy6mCwOCe1yGSMx_LxW7B0_d2C1sBrWI7rklcCcDtm1PLDgTAUthL25-veXMMkPriRW8rGlYbv5KW2IB1LiR8vXtp';

  const DU_LAM_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLZ-yMyYhURH2EX2BLjuyf8RhhHSV4qTr1uoCo4AUhd1kVIbQ1fGiCeeFEDjy57JKr4kWEtauoLhsYmwdkzHWhdKRn3IXCOOBkEFH-IVMBQ02kv9PahRMAUBszCUfmfy3UqahHgdFgRNoYKewKPAgNvzpq6ZjWk9HapDweqoh9i5XdcPy4IsXWqzq1-YrFEsmYix9RjA1yToex8gBaPGjFy4t_h4lhqOnjl9gYzWu';

  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 space-y-28 md:space-y-36"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, #26080b 0%, #1a0507 45%, #120304 90%)',
      }}
      id="bo-suu-tap"
    >
      {/* ================= COLLECTION 01: CỬU CỬU ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        {/* Visual Card (Col 6) */}
        <div className="lg:col-span-6 relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/35 to-[#521515]/45 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          <div className="relative rounded-2xl p-3 md:p-4 overflow-hidden card-lacquer">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-[#0d0203]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Đĩa tròn sơn mài Cửu Cửu họa tiết Trống Đồng Đông Sơn"
                src={CUU_CUU_IMG}
              />
              {/* Archival Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#100203]/90 backdrop-blur-md flex items-center justify-between text-[#EADBCE] border border-[#D4AF37]/35 shadow-lg">
                <span className="font-serif tracking-wider uppercase text-[#FFDF73] font-bold text-[12px] sm:text-[13px]">
                  Số sê-ri di sản: CC-01 – CC-99
                </span>
                <span className="font-serif tracking-wider text-[#FAF7F2]/90 text-[12px] sm:text-[13px]">
                  Đường kính Ø 45 cm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Curator Concept (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded"
            style={{
              background: 'rgba(82, 21, 21, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <span className="font-serif text-[#FFDF73] uppercase tracking-[0.2em] text-[12px] font-bold">
              BỘ SƯU TẬP 01 • ĐỘC BẢN DI SẢN
            </span>
          </div>

          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] leading-tight font-bold text-gold-gradient uppercase">
            CỬU CỬU – MẠCH NGẦM TINH HOA
          </h2>

          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 leading-[1.85]">
            Bộ sưu tập 99 đĩa sơn mài khai thác hệ hoa văn trống đồng như một mạch ký ức xuyên suốt. Mỗi tác phẩm là một cách diễn giải độc lập; khi đặt cạnh nhau, 99 bề mặt tạo thành trường đối thoại giữa biểu tượng cổ và ngôn ngữ đương đại.
          </p>

          {/* Spec Detail List */}
          <div className="space-y-3.5 pt-2 font-body text-[15px] md:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
            <div className="flex items-start gap-3">
              <Palette className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Chất liệu:
                </strong>{' '}
                Vóc truyền thống, sơn then, sơn cánh gián, vàng quỳ 9999, bạc thếp và vỏ trứng mài lộ.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Grid className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Cấu trúc:
                </strong>{' '}
                99 tác phẩm đĩa tròn đường kính 45cm, định danh số sê-ri từ CC-01 đến CC-99.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Ý niệm:
                </strong>{' '}
                Đối thoại giữa văn minh Đông Sơn cổ sơ và nhịp đập hội họa đương đại thế kỷ 21.
              </div>
            </div>
          </div>

          {/* Buttons CTA */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              type="button"
              className="btn-gold px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
              onClick={() => alert('Đang mở danh mục 99 tác phẩm đĩa sơn mài Cửu Cửu...')}
            >
              <Eye className="w-4 h-4" />
              <span>Xem bộ sưu tập</span>
            </button>
            <button
              type="button"
              className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer"
              onClick={() => alert('Thông tin tư liệu: Vóc mộc gỗ gụ tự nhiên, vải màn tơ tằm, sơn ta Phú Thọ ủ then 12 nước.')}
            >
              Tìm hiểu vóc & chất liệu
            </button>
          </div>
        </div>
      </div>

      {/* ================= COLLECTION 02: BÁCH THỤ ĐỒNG TÂM VIÊN (Flipped Layout) ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        {/* Narrative (Col 6) - Order 2 on mobile, Order 1 on Desktop */}
        <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded"
            style={{
              background: 'rgba(82, 21, 21, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <span className="font-serif text-[#FFDF73] uppercase tracking-[0.2em] text-[12px] font-bold">
              BỘ SƯU TẬP 02 • ĐỒNG KIẾN TẠO LIÊN NGÀNH
            </span>
          </div>

          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] leading-tight font-bold text-gold-gradient uppercase">
            BÁCH THỤ ĐỒNG TÂM VIÊN
          </h2>

          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 leading-[1.85]">
            Một trăm mô-đun sơn mài được sáng tạo độc lập và kết nối thành một chỉnh thể. Tác phẩm biểu trưng cho tinh thần “đồng kiến tạo”: khác biệt không bị xóa đi, mà trở thành điều kiện để hình thành một hình thái chung lớn hơn.
          </p>

          {/* Spec Detail List */}
          <div className="space-y-3.5 pt-2 font-body text-[15px] md:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Quy mô:
                </strong>{' '}
                100 khối vóc lập thể liên hoàn quy tụ 100 góc nhìn sáng tạo từ các nghệ sĩ mỹ thuật toàn quốc.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Triết lý:
                </strong>{' '}
                Đa dạng trong thống nhất – mỗi nghệ sĩ giữ trọn cá tính bút pháp nhưng hài hòa trong một đại cảnh quan di sản.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Kỹ thuật:
                </strong>{' '}
                Mài lộ thủy mộc, dát lá bạc, xà cừ đại dương và sắc đỏ son bordeaux truyền thống.
              </div>
            </div>
          </div>

          {/* Buttons CTA */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              type="button"
              className="btn-gold px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
              onClick={() => alert('Đang mở thư viện số hiển thị 100 mô-đun Bách Thụ Đồng Tâm Viên...')}
            >
              <Eye className="w-4 h-4" />
              <span>Khám phá 100 mô-đun</span>
            </button>
            <button
              type="button"
              className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer"
              onClick={() => alert('Danh sách 100 họa sĩ và nghệ nhân tham gia đang được tổng hợp trong Kỷ yếu 100 năm.')}
            >
              Danh sách nghệ sĩ
            </button>
          </div>
        </div>

        {/* Mosaic Showcase (Col 6) - Order 1 on mobile, Order 2 on Desktop */}
        <div className="lg:col-span-6 relative group order-1 lg:order-2">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-l from-[#D4AF37]/35 to-[#521515]/45 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          <div className="relative rounded-2xl p-3 md:p-4 overflow-hidden card-lacquer">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-[#0d0203]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Đại cảnh quan liên kết 100 mô-đun Bách Thụ Đồng Tâm Viên"
                src={BACH_THU_IMG}
              />
              {/* Archival Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#100203]/90 backdrop-blur-md flex items-center justify-between text-[#EADBCE] border border-[#D4AF37]/35 shadow-lg">
                <span className="font-serif tracking-wider uppercase text-[#FFDF73] font-bold text-[12px] sm:text-[13px]">
                  Đại cảnh quan liên kết 100 tác phẩm
                </span>
                <span className="font-serif tracking-wider text-[#FAF7F2]/90 text-[12px] sm:text-[13px]">
                  Quy chuẩn vóc 30 × 30 cm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COLLECTION 03: DU LÃM ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        {/* Visual Card (Col 6) */}
        <div className="lg:col-span-6 relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/35 to-[#521515]/45 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          <div className="relative rounded-2xl p-3 md:p-4 overflow-hidden card-lacquer">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-[#0d0203]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Tuyệt tác sơn mài hội họa trên xe Vespa cổ Du Lãm"
                src={DU_LAM_IMG}
              />
              {/* Archival Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#100203]/90 backdrop-blur-md flex items-center justify-between text-[#EADBCE] border border-[#D4AF37]/35 shadow-lg">
                <span className="font-serif tracking-wider uppercase text-[#FFDF73] font-bold text-[12px] sm:text-[13px]">
                  Tuyệt phẩm Độc bản • Điêu khắc & Cơ khí
                </span>
                <span className="font-serif tracking-wider text-[#FAF7F2]/90 text-[12px] sm:text-[13px]">
                  Hội họa Sơn mài Trên Kim khí
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded"
            style={{
              background: 'rgba(82, 21, 21, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <span className="font-serif text-[#FFDF73] uppercase tracking-[0.2em] text-[12px] font-bold">
              BỘ SƯU TẬP 03 • DI SẢN LIÊN VĂN HÓA & BIỂU TƯỢNG
            </span>
          </div>

          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] leading-tight font-bold text-gold-gradient uppercase">
            DU LÃM
          </h2>

          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 leading-[1.85]">
            Sự gặp gỡ giữa sơn mài hội họa Việt Nam và biểu tượng Vespa cổ. Trên nền thiết tạo kinh điển, các lớp sơn, vàng, màu và ký ức mở ra một hình thức biểu đạt mới cho di sản. Mỗi vòng bánh xe là một vòng luân hồi của ký ức; mỗi lớp sơn là một tầng thời gian.
          </p>

          {/* Spec Detail List */}
          <div className="space-y-3.5 pt-2 font-body text-[15px] md:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Điểm nhấn:
                </strong>{' '}
                Thân xe kim loại đúc được xử lý lót vóc thủ công nhiều lớp, mài ướt hàng chục lần dưới nước giếng.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Họa tiết:
                </strong>{' '}
                Vũ điệu sóng nước thời Lý - Trần và mây cuộn hoàng gia thếp vàng 24K óng ánh trên nền sơn then bóng gương.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
                  Tầm vóc:
                </strong>{' '}
                Cầu nối văn hóa giữa cơ khí công nghiệp thẩm mỹ phương Tây và mỹ thuật thủ công phương Đông.
              </div>
            </div>
          </div>

          {/* Buttons CTA */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              type="button"
              className="btn-gold px-6 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
              onClick={() => alert('Đang mở thư viện tư liệu chi tiết tuyệt phẩm Vespa Du Lãm...')}
            >
              <Eye className="w-4 h-4" />
              <span>Chiêm ngưỡng tác phẩm Du Lãm</span>
            </button>
            <button
              type="button"
              className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
              onClick={() => alert('Đang phát đoạn phim tư liệu: 180 ngày chế tác phục tác độc bản Du Lãm.')}
            >
              <Film className="w-4 h-4" />
              <span>Xem phim tư liệu phục tác</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;

