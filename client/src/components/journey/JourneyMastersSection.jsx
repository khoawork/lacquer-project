import React from 'react';
import { Palette, Sparkles, Feather, Bookmark } from 'lucide-react';

const JourneyMastersSection = ({ pageProps }) => {
  const masters = Array.isArray(pageProps?.masters) ? pageProps.masters : [];

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
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#350a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Palette className="w-4 h-4 text-[#E6CA65]" />
            <span className="font-sans text-[13px] tracking-[0.25em] text-[#E6CA65] uppercase font-bold">
              BẬC THẦY HỘI HỌA
            </span>
          </div>
          <h2 className="font-sans text-3xl lg:text-[44px] lg:leading-[52px] text-gold-gradient font-bold tracking-tight py-4">
            Những Cánh Chim Đầu Đàn Tạc Nên Di Sản
          </h2>
          <p className="font-body text-[17px] text-[#FAF7F2] leading-relaxed">
            Mỗi bậc thầy là một hành trình sáng tạo độc bản, vượt qua định kiến để khắc ghi tên tuổi mỹ thuật Việt Nam trên bản đồ nghệ thuật quốc tế.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#E6CA65] to-transparent mx-auto mt-2" />
        </div>

        {/* Lưới danh nhân Bento 6 thẻ */}
        {masters.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="card-lacquer p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Header thẻ: Huy hiệu & Năm sinh năm mất */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded border border-[#D4AF37]/40 bg-[#30080c] text-[#E6CA65] font-sans text-[11px] uppercase tracking-wider font-bold">
                      {master.tag}
                    </span>
                    <span className="font-sans text-[14px] text-[#EADBCE]/80 tracking-widest font-semibold">
                      {master.years}
                    </span>
                  </div>

                  {/* Tên danh họa */}
                  <h3 className="font-sans text-[22px] md:text-[24px] text-gold-gradient font-bold leading-tight group-hover:text-[#F5DE9C] transition-colors">
                    {master.name}
                  </h3>

                  {/* Vai trò */}
                  <p className="font-sans text-[14px] md:text-[15px] italic text-[#E6CA65] font-medium leading-snug">
                    {master.role}
                  </p>

                  {/* Đóng góp lịch sử */}
                  <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2] leading-relaxed pt-2">
                    {master.contribution}
                  </p>
                </div>

                {/* Chân thẻ bài */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between text-[#E6CA65]">
                  <div className="flex items-center gap-2 text-[12px] uppercase font-sans tracking-widest">
                    <Feather className="w-3.5 h-3.5" />
                    <span>Dấu ấn thế kỷ</span>
                  </div>
                  <Bookmark className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FFDF73] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
      </div>
    </section>
  );
};

export default JourneyMastersSection;

