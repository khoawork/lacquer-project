import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const LOGO_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAqUWnQqENiDwQq0E-78tCGDi8nH-V2QAr7rWqeY08mfP1xwj6nEvKF_UHpLydEdCqOFNmQgNzG8sWkeA5vPVodIVWrGYDrv7trEoQzmnw2GkEtFknxoZYx_fiBsnbk-NIajfEnmO3jIc9cC6j0i9bE5-XVEE8bbQycOML2I-4UDsLs4tUrAtq7U4WLkeZDpxkF9x3VZBFGy3NGG3NmTGee_OF2ZZkU51vzgLnEN7okIcP1BueZpNUTXmnHOG1xdiKI5RM';

  return (
    <footer className="w-full border-t border-[#D4AF37]/30" style={{ backgroundColor: 'rgb(28, 6, 8)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Phân khu 1: Thương hiệu & Tuyên ngôn (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37] flex items-center justify-center bg-black/60 shadow-[0_0_18px_rgba(212,175,55,0.4)] flex-shrink-0">
                <img
                  alt="Hành trình 100 năm Sơn mài Hội họa Việt Nam Logo"
                  className="w-full h-full object-contain rounded-full"
                  src={LOGO_URL}
                />
              </div>
              <div>
                <h3 className="font-serif text-[20px] md:text-[22px] font-bold uppercase tracking-wide text-gold-gradient leading-snug">
                  Hành trình 100 năm Sơn mài Hội họa Việt Nam (1930–2030)
                </h3>
              </div>
            </div>

            <p className="font-serif text-[17px] md:text-[18px] italic text-[#EADBCE] leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              “Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.”
            </p>

            <p className="font-body text-[15px] text-[#FAF7F2]/80 leading-relaxed max-w-md">
              Chương trình quốc gia kết nối mỹ thuật tạo hình, nghiên cứu khoa học vật liệu sơn ta và chấn hưng kinh tế di sản văn hóa Việt Nam hướng tới kỷ niệm bách niên.
            </p>
          </div>

          {/* Phân khu 2: Đơn vị bảo trợ & Chủ trì / Credits (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-[13px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold whitespace-nowrap">
                ĐƠN VỊ TỔ CHỨC & ĐIỀU PHỐI
              </span>
              <div className="w-10 h-0.5 bg-[#D4AF37]/50 mt-1"></div>
            </div>
            <div className="space-y-3 font-serif">
              <div className="p-3 rounded-lg bg-[#180303] border border-[#D4AF37]/25 space-y-1">
                <span className="text-[12px] uppercase tracking-wider text-[#FFDF73] font-semibold block">
                  Điều phối nền tảng:
                </span>
                <div className="text-[17px] font-bold text-[#FAF7F2]">
                  Viện Kỷ lục Việt Nam
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#180303] border border-[#D4AF37]/25 space-y-1">
                <span className="text-[12px] uppercase tracking-wider text-[#FFDF73] font-semibold block">
                  Chủ trì nội dung:
                </span>
                <div className="text-[17px] font-bold text-[#FAF7F2]">
                  Trung tâm Công nghiệp Sáng tạo
                </div>
              </div>
            </div>
          </div>

          {/* Phân khu 3: Thông tin liên hệ chính thức / Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-[13px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold whitespace-nowrap">
                LIÊN HỆ CHÍNH THỨC
              </span>
              <div className="w-10 h-0.5 bg-[#D4AF37]/50 mt-1"></div>
            </div>
            <div className="space-y-3 font-body text-[15px]">
              <div className="flex items-start gap-2.5 text-[#FAF7F2]">
                <Mail className="w-5 h-5 text-[#FFDF73] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-[12px] uppercase tracking-wider text-[#EADBCE]">
                    Thư điện tử:
                  </div>
                  <a
                    className="text-[#FFDF73] hover:underline font-medium break-all"
                    href="mailto:info@sonmaihoihoavietnam.com"
                  >
                    info@sonmaihoihoavietnam.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-[#FAF7F2]">
                <Phone className="w-5 h-5 text-[#FFDF73] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-[12px] uppercase tracking-wider text-[#EADBCE]">
                    Đường dây nóng:
                  </div>
                  <div className="text-[#FAF7F2] font-semibold">
                    Ms. Khánh – <span className="text-[#FFDF73]">090 900 2207</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-[#FAF7F2]">
                <MapPin className="w-5 h-5 text-[#FFDF73] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-[12px] uppercase tracking-wider text-[#EADBCE]">
                    Địa bàn điều phối:
                  </div>
                  <div className="text-[#FAF7F2]">
                    Hà Nội • TP. Hồ Chí Minh • Phú Thọ
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Phân khu 4: Chân trang bản quyền pháp lý / Copyright Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#D4AF37]/25 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-serif text-[14px] md:text-[15px] text-[#EADBCE] tracking-wide leading-relaxed">
            © 2026 Hành trình 100 năm Sơn mài Hội họa Việt Nam. Bảo lưu mọi quyền. Nội dung và hình ảnh chỉ được sử dụng khi có sự đồng ý của đơn vị quản lý.
          </p>
          <div className="flex items-center gap-6 text-[#FFDF73] font-serif text-[13px] tracking-wider uppercase whitespace-nowrap">
            <a className="hover:underline" href="#dieu-khoan">
              Điều khoản bảo mật
            </a>
            <span>•</span>
            <a className="hover:underline" href="#quy-che">
              Quy chế tác quyền
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
