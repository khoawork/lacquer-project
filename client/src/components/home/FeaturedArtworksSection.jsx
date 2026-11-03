import React from 'react';
import { Link } from 'react-router-dom';
import FloatingSparkles from '../common/FloatingSparkles';

const FeaturedArtworksSection = () => {
  return (
    <section
      className="relative w-full py-24 bg-[#120202] border-t border-[#D4AF37]/20"
      id="bo-suu-tap"
      style={{
        background: 'linear-gradient(rgb(28, 5, 7) 0%, rgb(39, 9, 13) 100%)',
      }}
    >
      {/* Gold Dust Sparkles */}
      <FloatingSparkles size={4.5} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#D4AF37]/6 rounded-full blur-[140px] ambient-glow-disc" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="font-serif text-[15px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
              BỘ SƯU TẬP
            </span>
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
              Những tác phẩm viết tiếp mạch di sản
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2]">
              Từ "Cửu Cửu - Mạch Ngầm Tinh Hoa", "Bách Thụ Đồng Tam Viên" đến "Du Lãm", các bộ sưu tập không chỉ trưng bày kỹ thuật, mà kể câu chuyện về ký ức, cộng đồng, chuyển động và khả năng ứng dụng mới của sơn mài Việt Nam.
            </p>
          </div>
          <Link
            to="/collection"
            className="btn-gold hidden md:inline-flex items-center gap-2 px-8 py-3 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Khám phá trọn bộ sưu tập{' '}
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </Link>
        </div>

        {/* Artworks Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork 1 */}
          <div className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#100202]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Kiệt tác tranh sơn mài rồng vàng"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEa_RaXKcNQyDo6ev-pTftpuK4I92c8InMGUgtTUJr7d4d3NzSAddUT-1bm9LCioxnl1CSa2HSMwZzAWgpi-2IU5t3FC6qYyoWATxan9LHzk5WiYNm6EbbsorqB3a50pIYKLEmIljvZLT-F70rlFkQy-Kxb92kvBIXLLWpbBuOsWjN6FwjkEagD2b-rSg13qhgAoK-FIZPO8CPOsi-hr4dklX0dcp54Mu_N-tlC0Wyv03i-5AQ55UaDQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160303] via-transparent to-transparent opacity-65" />
              <div className="absolute top-3 right-3 bg-[#100202]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] font-bold tracking-wider whitespace-nowrap">
                TÁC PHẨM 01
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="font-serif text-[14px] text-[#FFDF73] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                  Sơn Ta • Vàng Quỳ • Cẩn Xà Cừ Cổ
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Cửu Cửu — Mạch Ngầm Tinh Hoa
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                  Tác phẩm thể hiện dòng chảy di sản cuộn trào qua các tầng sơn then thẳm sâu, gợi nhắc 9 thập kỷ đổi mới sáng tạo không ngừng của mỹ thuật nước nhà.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between font-serif text-[14px] text-[#EADBCE]">
                <span className="font-medium whitespace-nowrap">Kích thước: 180 × 240 cm</span>
                <span className="text-[#FFDF73] font-bold whitespace-nowrap">Sưu tập Quốc gia</span>
              </div>
            </div>
          </div>

          {/* Artwork 2 */}
          <div className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#100202]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Bình phong sơn mài đại cảnh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCexZN5PdB3YP3SHYzKWyNItMYNeoiYzF2bYlM_EcSzhbCdsKVZfJXt2zlYaLHp2Dx7zAV80i2rVQtkgwl3KX8eH1e-cEyiyG-TjdqHLBi8Cef8NtcIQl1587qLDrGlXx5rAN-BqpYMXgHTAm9OQvgbgPlCcPwZddtNBpdtETcSaMfWkTgAaYzY173Pgy01shIHISz_024TQV8s0D3EHJcVTOeKkA72gSPM_HwtmyvwHY3Aa38SOehFOw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160303] via-transparent to-transparent opacity-65" />
              <div className="absolute top-3 right-3 bg-[#100202]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] font-bold tracking-wider whitespace-nowrap">
                TÁC PHẨM 02
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="font-serif text-[14px] text-[#FFDF73] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                  Bình Phong Đại Cảnh 6 Tấm
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Bách Thụ Đồng Tâm Viên
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                  Biểu tượng sự hội tụ của một trăm thế hệ nghệ nhân và họa sư cùng vun đắp cho khu vườn di sản mỹ thuật Việt Nam trường tồn và rực rỡ.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between font-serif text-[14px] text-[#EADBCE]">
                <span className="font-medium whitespace-nowrap">Kích thước: 200 × 360 cm</span>
                <span className="text-[#FFDF73] font-bold whitespace-nowrap">Tập thể Nghệ nhân</span>
              </div>
            </div>
          </div>

          {/* Artwork 3 */}
          <div className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#100202]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Sơn mài biểu hiện trừu tượng đương đại"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9WR2BKz0sjTphMA_KiHRMZ3AwzX_M6Pchw9MOZU7yaHXCQQaXEYdWBQt3Z79Efm138PH6AHA4KofNH2j551tbHmvb1hLeG0qaVyqk_e73vEjaPQTxjhQm4yAs8E-GYp2fWMsa1WR3jz-FQ6ckbc7pJQe6zUg2sIfQEomieApd9OcpI6Y-4oNNgpw_gAM_o_0YDCFhTI0I-NojayQ1l5sVwX-HJzswfOqyYQKLn-r6tEEB7QVklFRT3g"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160303] via-transparent to-transparent opacity-65" />
              <div className="absolute top-3 right-3 bg-[#100202]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] font-bold tracking-wider whitespace-nowrap">
                TÁC PHẨM 03
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="font-serif text-[14px] text-[#FFDF73] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                  Sơn Mài Biểu Hiện Đương Đại
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Du Lãm Cõi Vô Cùng
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                  Tác phẩm thể hiện cuộc đối thoại triết học Đông - Tây, nơi không gian hội họa sơn mài phá vỡ tính ước lệ để vươn tới chiều kích trừu tượng thanh thoát.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between font-serif text-[14px] text-[#EADBCE]">
                <span className="font-medium whitespace-nowrap">Kích thước: 160 × 160 cm</span>
                <span className="text-[#FFDF73] font-bold whitespace-nowrap">Họa sĩ Đương đại</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/collection"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Khám phá trọn bộ sưu tập{' '}
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworksSection;

