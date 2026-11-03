import React from 'react';
import { ShieldCheck, Cpu, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';

const JourneyFutureSection = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Khoa học & Chuẩn hóa Vật liệu',
      desc: 'Phối hợp các viện nghiên cứu phân tích hóa lý nhựa sơn ta, thử nghiệm vóc chịu khí hậu nhiệt đới - ôn đới và bảo tồn gen giống cây sơn quý.',
    },
    {
      icon: ShieldCheck,
      title: 'Số hóa & Hộ chiếu Định danh',
      desc: 'Thiết lập hồ sơ di sản số, công nghệ định danh chống giả mạo và cấp chứng thư xuất xứ nghệ thuật minh bạch cho các tác phẩm kiệt tác.',
    },
    {
      icon: GraduationCap,
      title: 'Đào tạo & Kế thừa Tri thức',
      desc: 'Mở rộng các xưởng thực hành Masterclass, kết nối các danh họa hàng đầu truyền dạy bí quyết cho thế hệ nghệ sĩ và nhà thiết kế trẻ.',
    },
    {
      icon: TrendingUp,
      title: 'Kinh tế Di sản Toàn cầu',
      desc: 'Đưa sản phẩm sơn mài mỹ thuật cao cấp vào chuỗi cung ứng văn hóa, bảo tàng quốc tế và các sàn giao dịch nghệ thuật uy tín thế giới.',
    },
  ];

  return (
    <section
      className="relative w-full py-20 lg:py-28"
      id="tuong-lai-di-san"
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(46, 12, 17, 0.95) 0%, rgba(24, 6, 9, 0.98) 60%, rgb(15, 3, 5) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Tiêu đề mục */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-serif text-[13px] uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
            BƯỚC VÀO THẾ KỶ MỚI
          </span>
          <h2 className="font-serif text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight">
            Hạ Tầng Sáng Tạo &amp; Tương Lai 2030
          </h2>
          <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed">
            Hành trình không chỉ tôn vinh quá khứ mà còn kiến tạo một hệ sinh thái tự chủ, sống động và vững bền cho trăm năm kế tiếp.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mx-auto mt-2" />
        </div>

        {/* 4 Trụ cột tương lai */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="card-lacquer p-7 rounded-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#450d0d] to-[#180303] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-[20px] text-[#FFDF73] font-bold leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-[15px] text-[#FAF7F2] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D4AF37]/20 flex items-center gap-2 text-[#FFDF73] text-[12px] font-serif uppercase tracking-widest font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Trọng tâm 2026–2030</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyFutureSection;

