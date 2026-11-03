import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedEventsSection = () => {
  return (
    <section
      className="relative w-full py-24 bg-[#180303] border-t border-[#D4AF37]/20"
      id="su-kien"
      style={{
        background: 'linear-gradient(rgb(38, 8, 12) 0%, rgb(28, 5, 7) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="font-serif text-[15px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold whitespace-nowrap">
              SỰ KIỆN NỔI BẬT
            </span>
            <h2 className="font-serif text-[34px] md:text-[46px] font-bold text-gold-gradient leading-tight">
              Chuỗi hoạt động đưa di sản vào đời sống
            </h2>
            <p className="font-body text-[18px] text-[#FAF7F2] leading-relaxed">
              Hành trình được hiện thực hóa qua các kỳ tọa đàm, triển lãm, trình diễn sáng tác, chương trình kỷ lục, hoạt động giáo dục và kết nối liên ngành Mỗi kỳ là một lát cắt chuyên sâu, đồng thời bổ sung dữ liệu cho hồ sơ 100 năm.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="btn-gold px-6 py-2.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
            >
              Xem lịch sự kiện
            </Link>
            <Link
              to="/events"
              className="btn-gold-outline px-6 py-2.5 rounded text-[15px] font-bold uppercase tracking-wider whitespace-nowrap inline-block"
            >
              Sự kiện đã diễn ra
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Event 1 */}
          <article className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative h-60 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Hội thảo chuyên sâu sơn mài"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj8hOf6OtOosVlLwIHxkjtVOh_T9QMxKbMQdcKtVVSH9syhS_CKkjeVeGkS5_eX4nLFBhl8q4VzHM5VAZfndgDRySW_6Y10Pe0312ZPzUVvpqiwt6-Y5LmxM33gbBtEUKCuNqHl4GXLr9_XrtVZLfHBaaPP7c_cSWpJ00C4KEAbpO3dyz7xxZoj-q_l8nWyMJvFWmQ2Ad7BDnQW4gv580yuehtpNQiW42opMfC2tCPjQPTagRmAstnsg"
              />
              <div className="absolute top-3 left-3 bg-[#2b0606]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] uppercase tracking-wider font-bold whitespace-nowrap">
                Tọa Đàm Quốc Tế
              </div>
              <div className="absolute bottom-3 right-3 bg-[#140202]/90 border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1 rounded text-[#FAF7F2] font-serif text-[12px] font-semibold whitespace-nowrap">
                Hà Nội • 15/04/2026
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-[22px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Kỷ nguyên Sơn Mài: Từ Đông Dương đến Toàn Cầu
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed line-clamp-3">
                  Quy tụ các nhà phê bình mỹ thuật từ Pháp, Nhật Bản và Việt Nam làm rõ vị thế độc tôn của chất liệu sơn ta trong bản đồ nghệ thuật hiện đại thế giới.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 font-serif text-[15px] uppercase tracking-wider text-[#FFDF73] hover:text-[#FFF3CC] font-bold pt-2 whitespace-nowrap"
              >
                Đăng ký tham dự{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </article>

          {/* Event 2 */}
          <article className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative h-60 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Đại triển lãm tranh sơn mài"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxD_WO1IVZYP6MR4AV5ZR66m90QGssGa99_G9X-3VMv5QVaD3mVJIonK-uv0w9MTb0TQ2r1k0JGA0VAOIm-u8maBJ50TanV8L9gtADbAwMPYL3crjlrKys-WNRRAIkBttap90bIdehfHIa8b-G_mhFmUPieKdWSfluZkrq14nVVL_gwGMRzMVqld8nUhVmnmgz9ivKXuoWgJ9rHPP6mJWxSADItJR9m7eL9a8XkkirdJYXc-uSBWHPaA"
              />
              <div className="absolute top-3 left-3 bg-[#3d0808]/90 border border-[#FFDF73]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] uppercase tracking-wider font-bold whitespace-nowrap">
                Đại Triển Lãm Thế Kỷ
              </div>
              <div className="absolute bottom-3 right-3 bg-[#140202]/90 border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1 rounded text-[#FAF7F2] font-serif text-[12px] font-semibold whitespace-nowrap">
                Bảo tàng Mỹ thuật • 2026
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-[22px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Âm Vang Cánh Gián: 100 Năm Kiệt Tác
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed line-clamp-3">
                  Trưng bày hơn 120 kiệt tác sơn mài qua các thời kỳ lịch sử, tái hiện trọn vẹn hành trình biến chuyển từ thủ công mỹ nghệ dân gian thành bảo vật quốc gia.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 font-serif text-[15px] uppercase tracking-wider text-[#FFDF73] hover:text-[#FFF3CC] font-bold pt-2 whitespace-nowrap"
              >
                Xem chi tiết triển lãm{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </article>

          {/* Event 3 */}
          <article className="card-lacquer rounded-lg overflow-hidden flex flex-col group">
            <div className="relative h-60 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Trình diễn kỹ nghệ sơn mài của nghệ nhân"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq4xcdughL0KYYvlyAzXhVu6JB6Us7Z6mKaR00bqeRSCYxQB4UfeXfR3AzgYmU6C3w8N-6WyNmwAKBJtXZzlttYMcp-MHC9EuEORhfXjl99ihqt8jeKfHEeDLLqEiNCab4JD6uh2lZHIsG5NBusxBg1_9TMp3zAaQPqrn7Mii-6zRHEMRYg-MA_NwnF10kQbxl0fWLA1A8vDrTnROvSpH1Vj_z9RMwVC-8k3eOXVRYiHK6DNftln_nkw"
              />
              <div className="absolute top-3 left-3 bg-[#2b0606]/90 border border-[#D4AF37]/50 backdrop-blur-md px-3 py-1 rounded text-[#FFDF73] font-serif text-[12px] uppercase tracking-wider font-bold whitespace-nowrap">
                Trình Diễn Di Sản
              </div>
              <div className="absolute bottom-3 right-3 bg-[#140202]/90 border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1 rounded text-[#FAF7F2] font-serif text-[12px] font-semibold whitespace-nowrap">
                Văn Miếu • Hằng tháng
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-[22px] font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors leading-snug">
                  Đêm Hội Nghệ Nhân Sơn Hà Thần Diệu
                </h3>
                <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed line-clamp-3">
                  Không gian thị phạm trực tiếp kỹ nghệ dát vàng quỳ, cẩn vỏ ốc xà cừ và mài ủ độc bản dưới sự dẫn dắt của các nghệ nhân nhân dân làng nghề trăm tuổi.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 font-serif text-[15px] uppercase tracking-wider text-[#FFDF73] hover:text-[#FFF3CC] font-bold pt-2 whitespace-nowrap"
              >
                Lịch trình diễn{' '}
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;

