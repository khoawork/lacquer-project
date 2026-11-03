import React, { useState } from 'react';

export default function ContactFormSection({ selectedRoute, setSelectedRoute, formRef }) {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    routeType: selectedRoute || '',
    proposalMessage: '',
    documentUrl: '',
    termsAgreed: false,
  });

  const [fileName, setFileName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Synchronize when selectedRoute changes from outside
  React.useEffect(() => {
    if (selectedRoute) {
      setFormData((prev) => ({ ...prev, routeType: selectedRoute }));
    }
  }, [selectedRoute]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `#SMVN-2026-REG-${randomCode}`;
    setReferenceCode(ref);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      routeType: '',
      proposalMessage: '',
      documentUrl: '',
      termsAgreed: false,
    });
    setFileName('');
    if (setSelectedRoute) setSelectedRoute('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@sonmaihoihoavietnam.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={formRef} className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Proposal Submission Form (Col 7) */}
        <div
          className="lg:col-span-7 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl relative shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.75) 0%, rgba(20, 5, 8, 0.9) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
          }}
        >
          <div className="border-b border-[#D4AF37]/20 pb-5 mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FFDF73] font-bold">
              GỬI ĐỀ XUẤT KẾT NỐI
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">
              Vui lòng điền thông tin chi tiết. Ban điều hành cam kết bảo mật hồ sơ và liên hệ trong 48 giờ.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* 1. Full name & Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="fullName">
                  HỌ VÀ TÊN / DANH XƯNG <span className="text-[#ffb3ae]">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Họa sĩ / Nhà nghiên cứu / Ông..."
                  className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                  style={{
                    backgroundColor: 'rgba(28, 7, 11, 0.75)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="organization">
                  ĐƠN VỊ / TỔ CHỨC / VAI TRÒ
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Xưởng sáng tác, Trường ĐH Mỹ thuật..."
                  className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                  style={{
                    backgroundColor: 'rgba(28, 7, 11, 0.75)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                />
              </div>
            </div>

            {/* 2. Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="email">
                  EMAIL LIÊN HỆ <span className="text-[#ffb3ae]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="dia-chi-email@domain.com"
                  className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                  style={{
                    backgroundColor: 'rgba(28, 7, 11, 0.75)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="phone">
                  SỐ ĐIỆN THOẠI <span className="text-[#ffb3ae]">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="090 xxx xxxx"
                  className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                  style={{
                    backgroundColor: 'rgba(28, 7, 11, 0.75)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                />
              </div>
            </div>

            {/* 3. Group Category */}
            <div className="space-y-1.5">
              <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="routeType">
                NHÓM NHU CẦU KẾT NỐI <span className="text-[#ffb3ae]">*</span>
              </label>
              <div className="relative">
                <select
                  id="routeType"
                  name="routeType"
                  required
                  value={formData.routeType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                  style={{
                    backgroundColor: 'rgba(28, 7, 11, 0.95)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <option value="" disabled className="bg-[#1a0508] text-[#FAF7F2]/60">
                    -- Vui lòng chọn tuyến tham gia --
                  </option>
                  <option value="artist" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến 01: Nghệ sĩ / Nghệ nhân sơn mài
                  </option>
                  <option value="academic" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến 02: Chuyên gia / Nhà nghiên cứu học thuật
                  </option>
                  <option value="business" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến 03: Hợp tác Doanh nghiệp và Thương hiệu
                  </option>
                  <option value="education" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến 04: Trường học và Dự án Cộng đồng
                  </option>
                  <option value="press" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến 05: Báo chí &amp; Cơ quan Truyền thông
                  </option>
                  <option value="other" className="bg-[#1a0508] text-[#FAF7F2]">
                    Tuyến khác: Đóng góp tư liệu quý / Lưu trữ gia đình
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#FFDF73]">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            {/* 4. Content Description */}
            <div className="space-y-1.5">
              <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="proposalMessage">
                NỘI DUNG MUỐN KẾT NỐI <span className="text-[#ffb3ae]">*</span>
              </label>
              <textarea
                id="proposalMessage"
                name="proposalMessage"
                required
                rows={4}
                value={formData.proposalMessage}
                onChange={handleChange}
                placeholder="Mô tả ngắn gọn nội dung ý tưởng, tác phẩm, tư liệu hoặc phương thức hợp tác bạn mong muốn đề xuất cùng dự án Bách niên..."
                className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all resize-y"
                style={{
                  backgroundColor: 'rgba(28, 7, 11, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              />
            </div>

            {/* 5. Document / Portfolio Link Upload */}
            <div className="space-y-2">
              <label className="block font-serif text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold">
                TỆP ĐÍNH KÈM HOẶC LIÊN KẾT HỒ SƠ
              </label>
              <div
                className="p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3"
                style={{
                  backgroundColor: 'rgba(20, 5, 8, 0.85)',
                  border: '1px dashed rgba(212, 175, 55, 0.35)',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-[#FFDF73] text-2xl shrink-0">
                    cloud_upload
                  </span>
                  <div className="min-w-0">
                    <div className="font-sans text-xs sm:text-sm text-[#FAF7F2] truncate">
                      Đính kèm Portfolio, Hồ sơ năng lực hoặc Tác phẩm
                    </div>
                    <div className="font-sans text-[11px] text-[#FAF7F2]/60 truncate">
                      Hỗ trợ PDF, DOCX, ZIP tối đa 25MB hoặc dán URL Drive
                    </div>
                  </div>
                </div>
                <label className="shrink-0 px-4 py-2 rounded bg-[#37352e] text-[#FFDF73] hover:bg-[#E9C349] hover:text-[#241a00] font-serif text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors">
                  CHỌN TỆP
                  <input type="file" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {fileName && (
                <div className="text-xs text-[#FFDF73] flex items-center gap-1.5 px-1">
                  <span className="material-symbols-outlined text-sm">attach_file</span>
                  <span>Đã chọn tệp: {fileName}</span>
                </div>
              )}

              <input
                type="url"
                name="documentUrl"
                value={formData.documentUrl}
                onChange={handleChange}
                placeholder="Hoặc dán liên kết Google Drive / Dropbox / Behance tại đây..."
                className="w-full px-4 py-2.5 rounded-lg text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] transition-all mt-1"
                style={{
                  backgroundColor: 'rgba(28, 7, 11, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              />
            </div>

            {/* 6. Privacy Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="termsCheck"
                name="termsAgreed"
                required
                type="checkbox"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded accent-[#D4AF37] cursor-pointer"
              />
              <label htmlFor="termsCheck" className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed cursor-pointer select-none">
                Tôi xác nhận thông tin cung cấp là chính xác và đồng ý cho phép Ban Điều Hành lưu trữ, xử lý thông tin để phối hợp triển khai theo quy định bảo mật của dự án.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg uppercase tracking-wider font-serif font-bold text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, rgb(255, 223, 115) 0%, rgb(233, 195, 73) 50%, rgb(196, 155, 40) 100%)',
                  color: 'rgb(46, 21, 0)',
                  border: '1px solid rgb(255, 230, 140)',
                  boxShadow: '0 4px 20px rgba(233, 195, 73, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                }}
              >
                <span>GỬI THÔNG TIN ĐỀ XUẤT</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Direct Project Office Info (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="backdrop-blur-xl p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.75) 0%, rgba(20, 5, 8, 0.9) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
            }}
          >
            {/* Subtle corner ornament */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#521515]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1 mb-6 border-b border-[#D4AF37]/20 pb-4">
              <span className="font-serif text-[11px] md:text-xs text-[#FFDF73] uppercase tracking-[0.2em] block font-semibold">
                KÊNH CHÍNH THỨC
              </span>
              <h3 className="font-serif text-2xl text-[#FFDF73] font-bold">
                KẾT NỐI TRỰC TIẾP
              </h3>
            </div>

            {/* Contact Data List */}
            <div className="space-y-5 divide-y divide-[#D4AF37]/15">
              {/* Email */}
              <div className="pt-4 first:pt-0 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    HỘP THƯ ĐIỆN TỬ DỰ ÁN
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-medium truncate mt-0.5">
                    info@sonmaihoihoavietnam.com
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 font-serif text-xs text-[#FFDF73] hover:underline transition-colors mt-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">
                      {copied ? 'done' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép địa chỉ thư'}</span>
                  </button>
                </div>
              </div>

              {/* Hotline */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    ĐƯỜNG DÂY NÓNG ĐIỀU PHỐI
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-semibold mt-0.5">
                    Ms. Khánh — 090 900 2207
                  </div>
                  <div className="font-sans text-xs text-[#FAF7F2]/70 mt-0.5">
                    Hỗ trợ đối tác, nghệ sĩ và tiếp nhận thông tin 24/7
                  </div>
                </div>
              </div>

              {/* Coordinate Headquarters */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    ĐỊA BÀN HOẠT ĐỘNG CHÍNH
                  </div>
                  <div className="font-serif text-base text-[#FFDF73] italic font-semibold mt-0.5">
                    Hà Nội • TP. Hồ Chí Minh • Phú Thọ
                  </div>
                  <div className="font-sans text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                    Trụ sở điều phối trung tâm đang trong giai đoạn hoàn thiện chuẩn bị cho chuỗi sự kiện Khởi Sắc 2026.
                  </div>
                </div>
              </div>

              {/* Response SLA */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    THỜI GIAN PHẢN HỒI
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-medium mt-0.5">
                    Trong vòng 02 ngày làm việc chính thức
                  </div>
                  <div className="font-sans text-xs text-[#FAF7F2]/70 mt-0.5">
                    Phân loại và chuyển đến Tiểu ban chuyên môn tương ứng.
                  </div>
                </div>
              </div>
            </div>

            {/* Archival Heritage Security Box */}
            <div
              className="mt-6 p-4 rounded-xl border border-dashed border-[#D4AF37]/35 relative"
              style={{ background: 'rgba(22, 5, 8, 0.85)' }}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#FFDF73] text-xl shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="font-sans text-xs text-[#FAF7F2]/90 leading-relaxed">
                  Mọi thông tin, hồ sơ tác phẩm và đề xuất nghiên cứu đều được bảo mật, mã hóa định danh và quản lý theo chuẩn lưu trữ của <strong className="text-[#FFDF73] font-semibold">Viện Kỷ Lục Việt Nam (VietKings)</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-8 text-center relative border border-[#D4AF37]/45 shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_32px_rgba(233,195,73,0.25)] animate-fade-in"
            style={{
              background: 'linear-gradient(145deg, #24080b 0%, #150305 100%)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#FAF7F2]/60 hover:text-[#FAF7F2] p-1 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Golden Seal Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#521515] flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_24px_rgba(233,195,73,0.35)] border border-[#D4AF37]/40">
              <span className="material-symbols-outlined text-3xl sm:text-4xl">task_alt</span>
            </div>

            {/* Heading */}
            <span className="font-serif text-xs text-[#FFDF73] tracking-[0.25em] uppercase block mb-1 font-semibold">
              MÃ HỒ SƠ LƯU TRỮ
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFDF73] font-bold mb-3">
              TIẾP NHẬN THÀNH CÔNG
            </h3>

            {/* Body Copy */}
            <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed mb-6">
              Cảm ơn bạn đã kết nối. Ban Điều Hành Dự Án 100 Năm Sơn Mài Hội Họa Việt Nam đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất. Mỗi đóng góp của bạn đều là một viên gạch quý báu đắp xây di sản chung.
            </p>

            {/* Reference Code */}
            <div
              className="py-2.5 px-5 rounded-lg mb-6 inline-block border border-[#D4AF37]/30"
              style={{ background: 'rgba(16, 2, 4, 0.8)' }}
            >
              <span className="font-serif text-xs text-[#FAF7F2]/60 mr-2 uppercase tracking-wider">
                MÃ THAM CHIẾU:
              </span>
              <span className="font-mono text-sm sm:text-base text-[#FFDF73] font-bold tracking-widest">
                {referenceCode}
              </span>
            </div>

            {/* Action Button */}
            <div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-3 px-6 rounded-lg font-serif text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-[#37352e] hover:bg-[#E9C349] hover:text-[#241a00] text-[#FFDF73] cursor-pointer"
              >
                GỬI THÊM YÊU CẦU KHÁC
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

