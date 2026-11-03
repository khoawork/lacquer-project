import React from 'react';
import { Calendar, Award, Sparkles, Feather, Layers, Globe, ShieldCheck } from 'lucide-react';
import FloatingSparkles from '../common/FloatingSparkles';

const JourneyTimelineSection = () => {
  const milestones = [
    {
      period: '1925 — 1945',
      badge: 'GIAI ĐOẠN I • KHỞI NGUYÊN',
      title: 'Khai sinh Hội họa Sơn mài tại Trường Mỹ thuật Đông Dương',
      desc: 'Dưới sự khuyến khích của Joseph Inguimberty và Victor Tardieu, các sinh viên mỹ thuật tài hoa như Trần Quang Trân, Phạm Hậu, Nguyễn Gia Trí, Nguyễn Khang đã dũng cảm đưa nhựa sơn ta ra khỏi khuôn khổ trang trí đồ thờ tự, phát minh kỹ thuật mài trong nước, dát vàng quỳ, cẩn xà cừ và rây vỏ trứng để tạo nên các tác phẩm hội họa độc bản đầu tiên.',
      icon: Feather,
      highlights: [
        '1927: Những thể nghiệm đầu tiên đưa chất liệu sơn ta vào tranh giá vẽ',
        '1932: Hoàn thiện kỹ thuật mài ủ dưới nước tạo chiều sâu đa tầng',
        '1939: Bậc thầy Nguyễn Gia Trí xác lập ngôn ngữ sơn mài trừu tượng và huyền thoại',
      ],
      tag: 'Khởi nguyên Bách niên',
    },
    {
      period: '1945 — 1975',
      badge: 'GIAI ĐOẠN II • KHÁNG CHIẾN & HIỆN THỰC',
      title: 'Mạch sống Kháng chiến & Bản sắc Nghệ thuật Độc lập',
      desc: 'Vượt qua muôn vàn gian khổ của chiến tranh, các họa sĩ mang theo bảng màu sơn ta ra mặt trận. Sơn mài không chỉ tái hiện khí thế hào hùng của dân tộc mà còn khắc họa vẻ đẹp lao động, tình quân dân và phong cảnh đất nước với bảng màu đầm ấm, mộc mạc và chân thực.',
      icon: Award,
      highlights: [
        'Khắc họa chân dung người lính, nông dân và vẻ đẹp kiên cường của cách mạng',
        'Gắn liền tên tuổi Nguyễn Sáng, Nguyễn Tư Nghiêm, Huỳnh Văn Gấm, Phan Kế An...',
        'Tác phẩm "Kết nạp Đảng ở Điện Biên Phủ" trở thành Bảo vật Quốc gia vô giá',
      ],
      tag: 'Bảo vật Quốc gia',
    },
    {
      period: '1975 — 1990',
      badge: 'GIAI ĐOẠN III • PHỤC HƯNG & ĐỔI MỚI',
      title: 'Thống nhất Đất nước & Hồi sinh Làng nghề Cổ truyền',
      desc: 'Giai đoạn đất nước thống nhất mở ra sự giao lưu mỹ thuật hai miền Nam - Bắc. Nghệ thuật sơn mài tìm về cội nguồn các làng nghề truyền thống lâu đời như Hạ Thái (Hà Nội), Đình Bảng (Bắc Ninh), Tương Bình Hiệp (Bình Dương) để dung nạp tinh hoa tay nghề thủ công của các nghệ nhân bậc thầy.',
      icon: Layers,
      highlights: [
        'Kết nối mật thiết giữa họa sĩ tạo hình hàn lâm và nghệ nhân làng nghề',
        'Mở rộng bảng màu với sơn cánh gián, then chín, bạc thếp và vỏ trai tự nhiên',
        'Hình thành các xưởng sáng tác tập thể và hợp tác xã sơn mài xuất khẩu',
      ],
      tag: 'Nối nhịp Di sản',
    },
    {
      period: '1990 — 2020',
      badge: 'GIAI ĐOẠN IV • HỘI NHẬP & ĐƯƠNG ĐẠI',
      title: 'Vươn ra Biển lớn & Đa dạng hóa Ngôn ngữ Nghệ thuật',
      desc: 'Thời kỳ Đổi mới và mở cửa đón nhận làn sóng giao lưu quốc tế sâu rộng. Thế hệ họa sĩ đương đại kết hợp tinh hoa thủ công truyền thống với ngôn ngữ tạo hình trừu tượng, sắp đặt, điêu khắc không gian và mỹ thuật ý niệm, đưa tác phẩm sơn mài Việt Nam xuất hiện trang trọng tại các bảo tàng mỹ thuật hàng đầu thế giới.',
      icon: Globe,
      highlights: [
        'Triển lãm quốc tế tại Pháp, Nhật Bản, Hàn Quốc, Mỹ và Singapore',
        'Thử nghiệm sơn mài trên các cấu trúc điêu khắc 3D và vật liệu mới',
        'Ghi nhận kỷ lục thị trường đấu giá mỹ thuật quốc tế (Sotheby’s, Christie’s)',
      ],
      tag: 'Hội nhập Toàn cầu',
    },
    {
      period: '2020 — 2030',
      badge: 'GIAI ĐOẠN V • THẾ KỶ MỚI',
      title: 'Bách niên Khởi sắc: Khoa học Vật liệu, Định danh & Kinh tế Di sản',
      desc: 'Hướng tới dấu mốc 100 năm (1930 - 2030), Hành trình kết nối toàn diện hệ sinh thái: nghiên cứu nông hóa vùng trồng cây sơn Phú Thọ, số hóa kho tư liệu bách niên, thiết lập hồ sơ định danh tác phẩm có giá trị pháp lý, và đưa nghệ thuật sơn mài trở thành trụ cột công nghiệp văn hóa độc bản của Việt Nam.',
      icon: ShieldCheck,
      highlights: [
        'Chương trình Kỷ lục Bách niên Sơn mài Hội họa Việt Nam',
        'Xây dựng Kỷ yếu nghiên cứu 4 tập chuẩn mực khoa học hàn lâm',
        'Định vị sơn mài như di sản quốc gia đại diện trong kỷ nguyên kinh tế sáng tạo',
      ],
      tag: 'Tầm nhìn 2030',
    },
  ];

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      id="bien-nien-su"
      style={{
        background: 'linear-gradient(rgba(26, 7, 10, 0.98) 0%, rgba(38, 10, 15, 0.94) 50%, rgba(20, 5, 7, 0.99) 100%)',
      }}
    >
      {/* Đốm sáng vàng kim bay lơ lửng */}
      <FloatingSparkles size={4.5} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Tiêu đề mục */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#350a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Calendar className="w-4 h-4 text-[#FFDF73]" />
            <span className="font-serif text-[13px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold">
              BIÊN NIÊN SỬ BÁCH NIÊN
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-[46px] lg:leading-[54px] text-gold-gradient font-bold tracking-tight">
            Năm Mốc Son Khắc Họa Dòng Chảy Lịch Sử
          </h2>
          <p className="font-body text-[17px] md:text-[18px] text-[#FAF7F2] leading-relaxed">
            Hành trình 100 năm là sự kế thừa liên tục giữa bàn tay người thợ làng nghề, trí tuệ họa sĩ bậc thầy và khát vọng sáng tạo của thời đại.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* Trục dòng thời gian (Timeline Cards) */}
        <div className="relative space-y-12 before:absolute before:inset-0 before:left-4 md:before:left-1/2 md:before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37]/20 before:via-[#FFDF73]/60 before:to-[#D4AF37]/20">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-12 group`}
              >
                {/* Điểm nút trên trục thời gian */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#200508] border-2 border-[#FFDF73] flex items-center justify-center text-[#FFDF73] shadow-[0_0_18px_rgba(255,223,115,0.7)] z-20 group-hover:scale-115 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF73]" />
                </div>

                {/* Khoảng trống bên đối diện (desktop) */}
                <div className="hidden md:block md:w-1/2" />

                {/* Thẻ nội dung */}
                <div className="ml-12 md:ml-0 md:w-1/2 card-lacquer p-7 sm:p-9 rounded-2xl relative">
                  {/* Badge mốc thời gian */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded border border-[#D4AF37]/50 bg-[#3a0a0f] text-[#FFDF73] font-serif text-[12px] md:text-[13px] tracking-widest uppercase font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                      {item.badge}
                    </span>
                    <span className="font-serif text-[18px] md:text-[20px] font-bold text-[#FFDF73] tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  {/* Tiêu đề mốc son */}
                  <h3 className="font-serif text-[22px] md:text-[26px] text-gold-gradient font-bold leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Nội dung mô tả */}
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* Các dấu ấn nổi bật */}
                  <div className="space-y-2.5 pt-4 border-t border-[#D4AF37]/25">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rotate-45 bg-[#FFDF73] shadow-[0_0_6px_#FFDF73] flex-shrink-0 mt-2" />
                        <span className="font-body text-[15px] text-[#FAF7F2]/90 leading-snug">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimelineSection;

