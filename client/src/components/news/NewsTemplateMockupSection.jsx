import React from 'react';

const NewsTemplateMockupSection = () => {
  const ARTICLE_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxI5AmPPAVCPcbNQs-TPMocO9OYMH8DWJNlekLgE6-7yGVblh_fXo_3YYqrBH6Zj5aR3XQgWOGjlFreAVS7CvQVb49MKIt89RrK-25-PDK2fnC4XBWCA2Zqs54qFE4pSW_TnNw3KrBe1IAI1IuQLGxU1sWdUBYzFp53YTwlEECtrKDx4ckNHf0FWRW0pg60_uvrpdvRTX1kV1FH2ttNh8G8sP3JSKXMYINcPRpAf79';

  return (
    <section
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-8 z-10 pt-4 pb-20 select-none w-full"
      id="single-article-template"
    >
      {/* Section Title & Subtitle */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#37352e]/60 border border-[#D4AF37]/35 shadow-sm">
          <span className="material-symbols-outlined text-[#FFDF73] text-[18px]">menu_book</span>
          <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-[0.2em] uppercase font-bold">
            QUY CHUẨN XUẤT BẢN KHOA HỌC
          </span>
        </div>
        <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] text-gold-gradient font-bold tracking-tight">
          KHUÔN MẪU CẤU TRÚC CHUẨN (SINGLE ARTICLE TEMPLATE)
        </h2>
        <p className="font-body text-[16px] md:text-[17px] text-[#FAF7F2]/80 max-w-2xl leading-relaxed">
          Quy chuẩn xuất bản bài viết nghiên cứu, biên khảo lý luận &amp; ký sự di sản chính thức thuộc Dự án Kỷ Yếu 100 Năm.
        </p>
      </div>

      {/* THE MOCKUP ARTICLE CONTAINER */}
      <div
        className="w-full rounded-2xl p-6 md:p-10 lg:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(82,21,21,0.25)] flex flex-col gap-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, rgba(38, 11, 15, 0.88) 0%, rgba(20, 5, 8, 0.96) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
        }}
      >
        {/* Subtle corner ornament markers */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-[#FFDF73]/30 rotate-45" />
        <div className="absolute top-4 right-4 w-3 h-3 bg-[#FFDF73]/30 rotate-45" />

        {/* (1) Top Meta bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl"
          style={{
            background: 'rgba(45, 12, 18, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
          }}
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] font-sans text-[#EADBCE]/80">
            <span className="flex items-center gap-1 text-[#FAF7F2]">
              <strong className="text-[#FFDF73] font-semibold">Tác giả:</strong> Vũ Tuấn Long
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#FAF7F2]">
              <strong className="text-[#FFDF73] font-semibold">Biên tập học thuật:</strong> Hội đồng Chuyên môn
            </span>
            <span>•</span>
            <span>Xuất bản: 12/11/2025</span>
            <span>•</span>
            <span>Cập nhật: 14/11/2025</span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[#FFDF73] text-[12px] font-sans font-semibold"
            style={{
              background: 'rgba(82, 21, 21, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <span className="material-symbols-outlined text-[15px]">timer</span>
            <span>Thời gian đọc: 8 phút</span>
          </div>
        </div>

        {/* (2) Heading of the Mock Article */}
        <div className="flex flex-col gap-2">
          <span className="font-serif text-[13px] md:text-[14px] text-[#FFDF73] tracking-widest uppercase font-bold">
            CHUYÊN ĐỀ LÝ LUẬN &amp; THỰC HÀNH MỸ THUẬT
          </span>
          <h3 className="font-serif text-[28px] sm:text-[36px] lg:text-[42px] lg:leading-[52px] text-gold-gradient font-bold drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)]">
            Nghệ Thuật Mài Lộ Và Chiều Sâu Triết Lý Của Ánh Sáng Tự Thân Trong Tranh Sơn Mài Việt Nam
          </h3>
        </div>

        {/* (3) Lead Paragraph */}
        <div
          className="p-6 rounded-xl shadow-md"
          style={{
            background: 'rgba(45, 12, 18, 0.7)',
            borderLeft: '4px solid #D4AF37',
            border: '1px solid rgba(212, 175, 55, 0.25)',
          }}
        >
          <p className="font-serif text-[18px] md:text-[20px] text-[#FAF7F2] leading-[1.9] font-normal italic">
            “Khác với hội họa phương Tây nơi vệt cọ và màu sắc được đắp nổi lên bề mặt toan, sơn mài Việt Nam là một cuộc tìm kiếm ngược vào lòng vật chất. Mỗi lớp son, then, vàng, bạc, vỏ trứng được kiên nhẫn vùi chôn dưới bóng tối của nhựa sơn tự nhiên, để rồi qua ngàn lượt mài nước, hình hài chỉ thực sự bừng tỉnh khi ánh sáng nội tại được giải phóng.”
          </p>
        </div>

        {/* (4) Featured Image Showcase with Museum Caption */}
        <div className="flex flex-col gap-2">
          <div className="w-full h-80 lg:h-[460px] rounded-xl overflow-hidden bg-[#120304] relative shadow-xl border border-[#D4AF37]/30">
            <img
              className="w-full h-full object-cover"
              src={ARTICLE_IMG}
              alt="Nghệ nhân thực hiện công đoạn mài nước"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305]/80 via-transparent to-transparent" />
          </div>
          <p className="font-body text-[14px] text-[#EADBCE]/80 italic px-1">
            Nghệ nhân thực hiện công đoạn mài nước tinh tế tại xưởng sơn mài cổ truyền Phú Thọ. Ảnh: Lưu trữ Hành trình 100 năm. Bản quyền thuộc Dự án Sơn mài Việt Nam.
          </p>
        </div>

        {/* (5) Body Content Sample & Blockquote */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-2">
          <h4 className="font-serif text-[24px] md:text-[26px] text-[#FFDF73] font-bold tracking-wide">
            I. Sự tích tụ của thời gian và vật liệu sống
          </h4>
          <p className="font-body text-[17px] md:text-[18px] text-[#FAF7F2] leading-[1.9] font-light">
            Nhựa sơn ta (Rhus Succedanea) thu hoạch từ vùng gò đồi Phú Thọ là một thực thể sống nhạy cảm với khí hậu và độ ẩm đất trời. Để tạo nên một tấm vóc phẳng mịn, người họa sĩ không thể cưỡng cầu thời gian. Mỗi lớp sơn sau khi quét phải nằm ủ yên trong buồng kín ẩm từ vài ngày đến hàng tuần lễ để khô từ bên trong lòng vật chất. Quá trình này đòi hỏi sự nhẫn nại phi thường, nơi nghệ thuật biến thành một phép dưỡng tâm thiền định.
          </p>

          {/* Elegant Monumental Blockquote */}
          <div
            className="my-4 p-6 rounded-r-xl shadow-lg relative"
            style={{
              background: 'rgba(82, 21, 21, 0.45)',
              borderLeft: '4px solid #D4AF37',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
              borderRight: '1px solid rgba(212, 175, 55, 0.15)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <span className="font-serif text-[60px] text-[#FFDF73]/25 absolute -top-4 left-3 select-none leading-none">
              “
            </span>
            <blockquote className="font-serif text-[22px] md:text-[24px] text-[#FFDF73] italic leading-relaxed pl-6 font-semibold">
              Trong sơn mài, người họa sĩ không đơn thuần là người tạo hình, mà là người đánh thức linh hồn của đất, của cây sơn và của lớp thời gian đã lắng đọng.
            </blockquote>
            <div className="text-[12px] font-sans text-[#EADBCE]/70 text-right mt-3 tracking-wider uppercase font-semibold">
              — Trích Kỷ yếu Học thuật Sơn mài Bách Niên
            </div>
          </div>

          <p className="font-body text-[17px] md:text-[18px] text-[#FAF7F2] leading-[1.9] font-light">
            Khi mài bằng đá ráp và than củi xoan dưới dòng nước trong, họa sĩ kiểm soát từng vi hạt phản quang. Không một nét cọ đơn lẻ nào được phô trương; toàn bộ linh hồn của bức tranh là sự giao hòa cộng hưởng giữa bóng tối thăm thẳm của then và ánh hoàng kim ẩn giấu.
          </p>
        </div>

        {/* (6) Distinct Lacquer Info Box */}
        <div
          className="rounded-xl p-6 md:p-8 shadow-xl"
          style={{
            background: 'rgba(40, 10, 15, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.32)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#FFDF73] text-[22px]">inventory_2</span>
            <h5 className="font-serif text-[18px] md:text-[20px] text-[#FFDF73] font-bold uppercase tracking-wider">
              HỒ SƠ TƯ LIỆU THAM CHIẾU LIÊN QUAN
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px]">
            <div
              className="flex flex-col gap-1 p-4 rounded-lg"
              style={{ background: 'rgba(22, 6, 9, 0.8)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
            >
              <span className="text-[11px] uppercase font-bold font-sans" style={{ color: '#FFDF73' }}>
                Tác phẩm tham chiếu:
              </span>
              <span className="font-serif text-[17px] font-bold text-[#FAF7F2]">
                Cửu Cửu - Mạch Ngầm Tinh Hoa
              </span>
              <span className="text-[12px] font-sans" style={{ color: 'rgba(232, 226, 216, 0.65)' }}>
                Mã định danh: VN-SM-100Y-CC01
              </span>
            </div>
            <div
              className="flex flex-col gap-1 p-4 rounded-lg"
              style={{ background: 'rgba(22, 6, 9, 0.8)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
            >
              <span className="text-[11px] uppercase font-bold font-sans" style={{ color: '#FFDF73' }}>
                Nhân vật đối thoại:
              </span>
              <span className="font-serif text-[17px] font-bold text-[#FAF7F2]">
                Nghệ nhân Ưu tú Nguyễn Văn Minh
              </span>
              <span className="text-[12px] font-sans" style={{ color: 'rgba(232, 226, 216, 0.65)' }}>
                Làng nghề sơn mài Phú Thọ (45 năm tuổi nghề)
              </span>
            </div>
            <div
              className="flex flex-col gap-1 p-4 rounded-lg"
              style={{ background: 'rgba(22, 6, 9, 0.8)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
            >
              <span className="text-[11px] uppercase font-bold font-sans" style={{ color: '#FFDF73' }}>
                Chuyên đề lưu trữ:
              </span>
              <span className="font-serif text-[17px] font-bold text-[#FAF7F2]">
                Kỷ yếu Phân hệ 01
              </span>
              <span className="text-[12px] font-sans" style={{ color: 'rgba(232, 226, 216, 0.65)' }}>
                Lịch sử &amp; Mỹ học sơn mài Việt Nam
              </span>
            </div>
          </div>
        </div>

        {/* (7) Bottom Meta, Article Tags & Call-to-action */}
        <div className="flex flex-col gap-6 pt-2">
          {/* Archival Hashtags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-sans font-bold text-[#D4AF37] mr-1">CHỦ ĐỀ:</span>
            {['#SonMaiHoiHoa', '#MaiLo', '#NgheThuatVietNam', '#DiSanBachNien', '#PhuTho', '#VietKings'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[#FFDF73] text-[12px] font-sans"
                  style={{ background: 'rgba(82, 21, 21, 0.6)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Related Articles Preview Mini-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <a
              className="p-4 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
              href="#"
              style={{ background: 'rgba(40, 10, 15, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase font-sans" style={{ color: 'rgba(232, 226, 216, 0.6)' }}>
                  BÀI VIẾT TRƯỚC
                </span>
                <span className="font-serif text-[16px] font-bold group-hover:text-[#FFDF73] transition-colors" style={{ color: '#FAF7F2' }}>
                  Lịch sử cây sơn ta và vùng đất tổ Hùng Vương
                </span>
              </div>
              <span className="material-symbols-outlined text-[24px] group-hover:-translate-x-1 transition-transform" style={{ color: '#D4AF37' }}>
                arrow_back
              </span>
            </a>
            <a
              className="p-4 rounded-xl transition-all flex items-center justify-between group text-right cursor-pointer"
              href="#"
              style={{ background: 'rgba(40, 10, 15, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
            >
              <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform order-last" style={{ color: '#D4AF37' }}>
                arrow_forward
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase font-sans" style={{ color: 'rgba(232, 226, 216, 0.6)' }}>
                  BÀI TIẾP THEO
                </span>
                <span className="font-serif text-[16px] font-bold group-hover:text-[#FFDF73] transition-colors" style={{ color: '#FAF7F2' }}>
                  Hội họa Đông Dương và bước ngoặt chuyển hóa sơn ta
                </span>
              </div>
            </a>
          </div>

          {/* Big Call-To-Action Box */}
          <div
            className="p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mt-4"
            style={{
              background: 'linear-gradient(135deg, rgba(82, 21, 21, 0.7) 0%, rgba(36, 10, 14, 0.85) 50%, rgba(82, 21, 21, 0.7) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.15)',
            }}
          >
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-serif text-[24px] md:text-[28px] font-bold" style={{ color: '#FFDF73', textShadow: '0 0 12px rgba(255, 223, 115, 0.3)' }}>
                Bạn có câu chuyện hoặc nghiên cứu về sơn mài?
              </h4>
              <p className="font-body text-[15px] md:text-[16px] font-light max-w-xl" style={{ color: '#FAF7F2' }}>
                Ban Biên tập Kỷ Yếu Di Sản luôn chào đón những phát hiện, góc nhìn học thuật, tư liệu hình ảnh và ký sự sống từ các nghệ nhân, nhà nghiên cứu và công chúng mộ điệu.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 flex-shrink-0">
              <a
                href="mailto:info@sonmaihoihoavietnam.com"
                className="btn-gold px-6 py-3 rounded font-serif text-[13px] md:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                GỬI BÀI VIẾT / TƯ LIỆU
              </a>
              <a
                href="/archive"
                className="btn-gold-outline px-6 py-3 rounded font-serif text-[13px] md:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                ĐĂNG KÝ HỌC THUẬT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTemplateMockupSection;
export { NewsTemplateMockupSection };

