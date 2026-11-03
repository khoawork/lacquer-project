import React from 'react';

const routes = [
  {
    key: 'artist',
    icon: 'palette',
    badge: 'TUYẾN 01 • SÁNG TÁC',
    title: 'Tham gia với tư cách nghệ sĩ / nghệ nhân',
    desc: 'Đăng ký Open Studio, triển lãm, trình diễn sáng tác, workshop, chương trình lưu trú nghệ thuật hoặc đề xuất bộ sưu tập độc bản vinh danh bách niên.',
    buttonText: 'GỬI HỒ SƠ SÁNG TẠO',
  },
  {
    key: 'academic',
    icon: 'auto_stories',
    badge: 'TUYẾN 02 • HỌC THUẬT',
    title: 'Tham gia với tư cách chuyên gia / nhà nghiên cứu',
    desc: 'Đề xuất tham luận, phản biện học thuật, gửi bài viết cho Kỷ yếu bách niên, cố vấn chuyên đề di sản hoặc đóng góp tư liệu lịch sử quý giá.',
    buttonText: 'ĐỀ XUẤT CHUYÊN MÔN',
  },
  {
    key: 'business',
    icon: 'corporate_fare',
    badge: 'TUYẾN 03 • ĐỒNG HÀNH DOANH NGHIỆP',
    title: 'Hợp tác doanh nghiệp và thương hiệu',
    desc: 'Đồng sáng tạo sản phẩm, ứng dụng sơn mài trong kiến trúc - nội thất đương đại, tài trợ di sản, licensing bản quyền hoặc bảo trợ không gian văn hóa.',
    buttonText: 'ĐỀ XUẤT HỢP TÁC',
  },
  {
    key: 'education',
    icon: 'school',
    badge: 'TUYẾN 04 • GIÁO DỤC DI SẢN',
    title: 'Trường học và cộng đồng',
    desc: 'Tổ chức tham quan bảo tàng xưởng, lớp học chuyên đề nghệ thuật, hoạt động trải nghiệm thực hành, dự án sinh viên hoặc mạng lưới tình nguyện viên văn hóa.',
    buttonText: 'ĐĂNG KÝ CHƯƠNG TRÌNH',
  },
  {
    key: 'press',
    icon: 'campaign',
    badge: 'TUYẾN 05 • TRUYỀN THÔNG ĐẠI CHÚNG',
    title: 'Báo chí và truyền thông',
    desc: 'Nhận bộ tài liệu báo chí chính thức (Press Kit), hình ảnh tư liệu độ phân giải cao được cấp quyền sử dụng, đặt lịch phỏng vấn Ban cố vấn và đầu mối phát ngôn.',
    buttonText: 'LIÊN HỆ TRUYỀN THÔNG',
  },
];

export default function ContactRoutesSection({ onSelectRoute }) {
  return (
    <section
      className="relative w-full py-16 sm:py-20 my-10"
      style={{
        background: 'linear-gradient(rgba(16, 3, 5, 0.4) 0%, rgba(32, 7, 11, 0.65) 50%, rgba(14, 2, 4, 0.5) 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-serif text-xs md:text-sm text-[#FFDF73] tracking-[0.25em] uppercase mb-1 font-semibold">
            PHƯƠNG THỨC KẾT NỐI
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFDF73] tracking-wide font-bold"
            style={{ textShadow: '0 0 20px rgba(233, 195, 73, 0.3)' }}
          >
            CÁC TUYẾN THAM GIA ĐỒNG HÀNH
          </h2>
        </div>

        {/* Top 3 Routes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.slice(0, 3).map((route) => (
            <div
              key={route.key}
              className="p-6 md:p-8 rounded-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.75) 0%, rgba(20, 5, 8, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-lg bg-[#521515]/80 flex items-center justify-center text-[#FFDF73]"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <span className="material-symbols-outlined text-[26px]">{route.icon}</span>
                </div>
                <div>
                  <span className="font-serif text-[11px] md:text-xs uppercase tracking-widest block mb-1 font-semibold text-[#FFDF73]">
                    {route.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-snug">
                    {route.title}
                  </h3>
                </div>
                <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#FAF7F2]/90">
                  {route.desc}
                </p>
              </div>

              <div
                className="pt-4 mt-6 rounded p-3 flex items-center justify-between"
                style={{
                  background: 'rgba(26, 6, 10, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectRoute(route.key)}
                  className="inline-flex items-center gap-2 font-serif text-xs md:text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded transition-all duration-200 text-[#FFDF73] hover:bg-[#E9C349] hover:text-[#241a00] cursor-pointer"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.45)' }}
                >
                  <span>{route.buttonText}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 2 Routes Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-5xl mx-auto">
          {routes.slice(3, 5).map((route) => (
            <div
              key={route.key}
              className="p-6 md:p-8 rounded-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.75) 0%, rgba(20, 5, 8, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-lg bg-[#521515]/80 flex items-center justify-center text-[#FFDF73]"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <span className="material-symbols-outlined text-[26px]">{route.icon}</span>
                </div>
                <div>
                  <span className="font-serif text-[11px] md:text-xs uppercase tracking-widest block mb-1 font-semibold text-[#FFDF73]">
                    {route.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-snug">
                    {route.title}
                  </h3>
                </div>
                <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#FAF7F2]/90">
                  {route.desc}
                </p>
              </div>

              <div
                className="pt-4 mt-6 rounded p-3 flex items-center justify-between"
                style={{
                  background: 'rgba(26, 6, 10, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectRoute(route.key)}
                  className="inline-flex items-center gap-2 font-serif text-xs md:text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded transition-all duration-200 text-[#FFDF73] hover:bg-[#E9C349] hover:text-[#241a00] cursor-pointer"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.45)' }}
                >
                  <span>{route.buttonText}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

