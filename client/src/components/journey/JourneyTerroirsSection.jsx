import React from 'react';
import { MapPin, Sprout, Hammer, Sparkles, Compass } from 'lucide-react';

const JourneyTerroirsSection = () => {
  const terroirs = [
    {
      region: 'Phú Thọ',
      badge: 'CỘI NGUỒN VẬT LIỆU',
      title: 'Thủ phủ Cây Sơn Ta & Nhựa Sơn Nguyên Bản',
      desc: 'Nơi cây sơn ta (Rhus Succedanea) chắt chiu tinh túy của vùng đồi trung du đất Tổ để cho ra thứ nhựa sơn dẻo dai, bóng sâu và bền bỉ qua hàng thế kỷ. Đây là nguồn linh hồn vật chất độc tôn không một loại sơn hóa học nào có thể thay thế.',
      stats: 'Hơn 1.000 năm khai thác nhựa sơn tự nhiên',
      icon: Sprout,
    },
    {
      region: 'Hạ Thái — Thường Tín, Hà Nội',
      badge: 'LÀNG NGHỀ TRUYỀN THỐNG BẮC BỘ',
      title: 'Cái nôi Nghệ thuật Sơn Then & Sơn Cánh Gián',
      desc: 'Ngôi làng cổ hơn 200 năm tuổi ven sông Nhuệ, nơi những gia tộc nghệ nhân gìn giữ bí quyết ủ sơn, mài dưới nước lạnh và kỹ thuật cẩn vỏ trứng, thếp vàng quỳ đạt độ tinh xảo tột cùng phục vụ triều đình và xuất khẩu.',
      stats: 'Hơn 200 năm truyền thống & hàng trăm xưởng thủ công',
      icon: Hammer,
    },
    {
      region: 'Tương Bình Hiệp — Bình Dương',
      badge: 'KINH ĐÔ SƠN MÀI PHƯƠNG NAM',
      title: 'Đỉnh cao Kỹ nghệ Cẩn Ốc & Sơn Mài Xuất khẩu',
      desc: 'Trung tâm giao lưu mỹ nghệ Nam Bộ phát triển từ thế kỷ 18, nổi danh với phong cách sơn mài đắp nổi, cẩn ốc xà cừ ngũ sắc lộng lẫy và những bộ tranh khổ lớn mang tinh thần phóng khoáng của đất phương Nam.',
      stats: 'Di sản văn hóa phi vật thể quốc gia được vinh danh',
      icon: MapPin,
    },
  ];

  return (
    <section
      className="relative w-full py-20 lg:py-28"
      id="coi-nguon-lang-nghe"
      style={{
        background: 'linear-gradient(rgba(22, 5, 7, 0.98) 0%, rgba(36, 9, 13, 0.92) 50%, rgba(18, 4, 6, 0.98) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Tiêu đề mục */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#350a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Compass className="w-4 h-4 text-[#FFDF73]" />
            <span className="font-serif text-[13px] tracking-[0.25em] text-[#FFDF73] uppercase font-bold">
              ĐỊA BÀN DI SẢN
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Cội Nguồn Đất &amp; Tinh Hoa Làng Nghề
          </h2>
          <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed">
            Hội họa sơn mài không thể tách rời vùng đất nuôi dưỡng cây sơn và đôi bàn tay tài hoa của những nghệ nhân giữ lửa nơi làng cổ.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* 3 Vùng đất di sản */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {terroirs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card-lacquer p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded border border-[#D4AF37]/40 bg-[#30080c] text-[#FFDF73] font-serif text-[11px] uppercase tracking-wider font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <span className="font-serif text-[13px] text-[#FFDF73] uppercase tracking-widest block mb-1 font-bold">
                      {item.region}
                    </span>
                    <h3 className="font-serif text-[22px] md:text-[24px] text-gold-gradient font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-body text-[16px] text-[#FAF7F2] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center gap-2 text-[#FFDF73] font-serif text-[13px] tracking-wide">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>{item.stats}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTerroirsSection;

