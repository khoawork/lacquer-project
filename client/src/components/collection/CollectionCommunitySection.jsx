import React from 'react';
import { Users, Award, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const CollectionCommunitySection = () => {
  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-24 select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #28080c 0%, #1a0507 55%, #120304 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 bg-[#3d0c0f] border border-[#D4AF37]/35 text-[#FFDF73] text-[12px] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Đồng kiến tạo mở</span>
          </div>

          <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] text-gold-gradient uppercase font-bold mb-4">
            DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC
          </h2>

          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90">
            Mở rộng biên độ nghệ thuật sơn mài: từ xưởng họa cá nhân đến dấu ấn bàn tay của muôn người.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Card 1: Bách Họa Liên Hoa */}
          <div
            className="p-8 md:p-10 rounded-2xl relative flex flex-col justify-between card-lacquer group"
            style={{
              background: 'rgba(26, 5, 7, 0.88)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className="px-3.5 py-1 rounded font-serif text-[#FFDF73] uppercase text-[12px] font-bold"
                  style={{
                    background: 'rgb(61, 12, 15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC
                </span>
                <Users className="w-7 h-7 text-[#FFDF73]" />
              </div>

              <h3 className="font-serif text-[24px] sm:text-[28px] text-gold-gradient uppercase tracking-wide font-bold">
                BÁCH HỌA LIÊN HOA
              </h3>

              <p className="font-body text-[15px] sm:text-[16px] text-[#FAF7F2]/95 leading-relaxed">
                Không gian đồng sáng tác nơi nhiều bàn tay cùng tạo nên một tác phẩm lớn. Chương trình đề cao trải nghiệm thực hành, tính cộng đồng và khả năng biến người xem thành người tham gia trực tiếp vào tiến trình bồi đắp bề mặt sơn mài.
              </p>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className="btn-gold-outline w-full py-3 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                onClick={() => alert('Đang mở trang chi tiết hành trình đồng sáng tác Bách Họa Liên Hoa...')}
              >
                <span>Xem hành trình đồng sáng tác</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          </div>

          {/* Card 2: Xác lập Kỷ lục Thủ Chỉ Đầu */}
          <div
            className="p-8 md:p-10 rounded-2xl relative flex flex-col justify-between card-lacquer group"
            style={{
              background: 'rgba(26, 5, 7, 0.88)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className="px-3.5 py-1 rounded font-serif text-[#FFDF73] uppercase text-[12px] font-bold"
                  style={{
                    background: 'rgb(61, 12, 15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  XÁC LẬP KỶ LỤC • ĐỀ CỬ CHÍNH THỨC
                </span>
                <Award className="w-7 h-7 text-[#FFDF73]" />
              </div>

              <h3 className="font-serif text-[22px] sm:text-[26px] text-gold-gradient uppercase tracking-wide font-bold leading-snug">
                TÁC PHẨM NHIỀU NGƯỜI CÙNG SÁNG TẠO BẰNG “THỦ CHỈ ĐẦU” TRÊN VẬT LIỆU SƠN MÀI CÔNG NGHỆ
              </h3>

              <p className="font-body text-[15px] sm:text-[16px] text-[#FAF7F2]/95 leading-relaxed">
                Một thử nghiệm giao thoa giữa hành vi tạo dấu, chất liệu mới và tinh thần cộng đồng; được tổ chức theo quy trình kiểm chứng khoa học, tư liệu hóa và xác lập dữ liệu kỷ lục rõ ràng cùng Tổ chức Kỷ lục Việt Nam (VietKings).
              </p>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className="btn-gold-outline w-full py-3 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                onClick={() => alert('Đang mở hồ sơ kiểm chứng đề cử kỷ lục VietKings...')}
              >
                <span>Xem hồ sơ kiểm chứng kỷ lục</span>
                <CheckCircle className="w-4 h-4 text-[#FFDF73]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionCommunitySection;

