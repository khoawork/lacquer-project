import React from 'react';
import { Palette, Sparkles, Feather, Bookmark } from 'lucide-react';

const JourneyMastersSection = () => {
  const masters = [
    {
      name: 'Nguyễn Gia Trí',
      years: '1908 — 1993',
      role: 'Đại thụ Trừu tượng & Huyền thoại Sơn mài',
      contribution:
        'Người xác lập đỉnh cao nghệ thuật sơn mài hội họa Việt Nam, đưa kỹ thuật mài lộ và phối hợp vỏ trứng, vàng quỳ, son tươi lên tầm triết học thị giác độc nhất vô nhị. Tác phẩm tiêu biểu: "Vườn xuân Trung Nam Bắc".',
      tag: 'Bậc thầy Khai sáng',
    },
    {
      name: 'Phạm Hậu',
      years: '1903 — 1995',
      role: 'Bậc thầy Tạo hình Bình phong & Phong cảnh',
      contribution:
        'Khai phá cấu trúc bình phong sơn mài nhiều tấm, tạo dựng ngôn ngữ phong cảnh Bắc Bộ thanh nhã, cẩn trọng trong từng lớp then và xà cừ. Ông là người đặt nền móng đào tạo thế hệ thợ mài đầu tiên.',
      tag: 'Cổ điển Mẫu mực',
    },
    {
      name: 'Trần Quang Trân',
      years: '1900 — 1969',
      role: 'Họa sĩ Tiên phong Thử nghiệm Bột vàng',
      contribution:
        'Cùng với Joseph Inguimberty là những người đầu tiên dám đem nhựa sơn ta thử nghiệm trên mặt gỗ phẳng, phát hiện ra kỹ thuật rây bột vàng dưới lớp cánh gián mỏng để bắt ánh sáng tự nhiên.',
      tag: 'Khai sơn Phá thạch',
    },
    {
      name: 'Nguyễn Khang',
      years: '1912 — 1989',
      role: 'Hiệu trưởng & Nhà Sư phạm Mỹ thuật Lỗi lạc',
      contribution:
        'Dành trọn cuộc đời cho sự nghiệp đào tạo và sáng tác sơn mài hàn lâm. Tác phẩm của ông mang tinh thần tráng lệ, tôn vinh văn hóa cội nguồn và kỹ thuật mài màu chuẩn xác tuyệt đối.',
      tag: 'Tượng đài Sư phạm',
    },
    {
      name: 'Nguyễn Sáng',
      years: '1923 — 1988',
      role: 'Bậc thầy Hiện thực & Tượng đài Cách mạng',
      contribution:
        'Tác giả kiệt tác "Kết nạp Đảng ở Điện Biên Phủ" - Bảo vật Quốc gia. Ông đã chứng minh sơn mài có thể diễn tả nỗi đau, khí phách và chiều sâu tâm lý con người một cách rung chuyển và chân thực.',
      tag: 'Bảo vật Quốc gia',
    },
    {
      name: 'Nguyễn Tư Nghiêm',
      years: '1919 — 2016',
      role: 'Cầu nối Dân gian & Hiện đại Hậu Bách niên',
      contribution:
        'Hòa quyện điêu khắc đình làng cổ truyền với nhịp điệu mỹ thuật hiện đại qua các điệu múa cổ, 12 con giáp và huyền tích dân tộc. Ông đưa chất mộc của sơn ta trở về nguyên bản tinh thần Việt.',
      tag: 'Hồn cốt Dân gian',
    },
  ];

  return (
    <section
      className="relative w-full py-20 lg:py-28"
      id="bac-thay-tien-phong"
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(48, 12, 17, 0.95) 0%, rgba(26, 6, 9, 0.98) 55%, rgb(16, 3, 5) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Tiêu đề mục */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#350a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Palette className="w-4 h-4 text-[#FFDF73]" />
            <span className="font-serif text-[13px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold">
              BẬC THẦY HỘI HỌA
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Những Cánh Chim Đầu Đàn Tạc Nên Di Sản
          </h2>
          <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed">
            Mỗi bậc thầy là một hành trình sáng tạo độc bản, vượt qua định kiến để khắc ghi tên tuổi mỹ thuật Việt Nam trên bản đồ nghệ thuật quốc tế.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* Lưới danh nhân Bento 6 thẻ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {masters.map((master, idx) => (
            <div
              key={idx}
              className="card-lacquer p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Header thẻ: Huy hiệu & Năm sinh năm mất */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded border border-[#D4AF37]/40 bg-[#30080c] text-[#FFDF73] font-serif text-[11px] uppercase tracking-wider font-bold">
                    {master.tag}
                  </span>
                  <span className="font-serif text-[14px] text-[#EADBCE]/80 tracking-widest font-semibold">
                    {master.years}
                  </span>
                </div>

                {/* Tên danh họa */}
                <h3 className="font-serif text-2xl text-gold-gradient font-bold leading-tight group-hover:text-[#FFDF73] transition-colors">
                  {master.name}
                </h3>

                {/* Vai trò */}
                <p className="font-serif text-[15px] italic text-[#FFDF73] font-medium leading-snug">
                  {master.role}
                </p>

                {/* Đóng góp lịch sử */}
                <p className="font-body text-[15px] sm:text-[16px] text-[#FAF7F2] leading-relaxed pt-2">
                  {master.contribution}
                </p>
              </div>

              {/* Chân thẻ bài */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between text-[#FFDF73]">
                <div className="flex items-center gap-2 text-[12px] uppercase font-serif tracking-widest">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Dấu ấn thế kỷ</span>
                </div>
                <Bookmark className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FFDF73] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyMastersSection;

