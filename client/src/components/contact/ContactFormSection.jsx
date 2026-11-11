import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Clock, ShieldCheck, Check, Copy, Upload, ArrowRight, X, ChevronDown, Paperclip } from 'lucide-react';
import siteServices from '../../services/siteServices';

export default function ContactFormSection({ selectedRoute, setSelectedRoute, formRef, pageProps }) {
  const emailAddress = pageProps?.email || 'info@sonmaihoihoavietnam.com';
  const hotline = pageProps?.hotline || 'Ms. Khánh — 090 900 2207';
  const hotlineSub = pageProps?.hotline_sub || 'Hỗ trợ đối tác, nghệ sĩ và tiếp nhận thông tin 24/7';
  const address = pageProps?.address || 'Hà Nội • TP. Hồ Chí Minh • Phú Thọ';
  const addressSub = pageProps?.address_sub || 'Trụ sở điều phối trung tâm đang trong giai đoạn hoàn thiện chuẩn bị cho chuỗi sự kiện Khởi Sắc 2026.';
  const officeHours = pageProps?.officeHours || 'Trong vòng 02 ngày làm việc chính thức';
  const officeHoursSub = pageProps?.officeHours_sub || 'Phân loại và chuyển đến Tiểu ban chuyên môn tương ứng.';
  const directBadge = pageProps?.direct_badge || 'KÊNH CHÍNH THỨC';
  const directTitle = pageProps?.direct_title || 'KẾT NỐI TRỰC TIẾP';
  const securityNote = pageProps?.security_note || 'Mọi thông tin, hồ sơ tác phẩm và đề xuất nghiên cứu đều được bảo mật, mã hóa định danh và quản lý theo chuẩn lưu trữ của Viện Kỷ Lục Việt Nam (VietKings).';

  // Cấu hình Form Tiếp Nhận & Thành Công
  const formTitle = pageProps?.form_title || 'GỬI ĐỀ XUẤT KẾT NỐI';
  const formDescription =
    pageProps?.form_description ||
    'Vui lòng điền thông tin chi tiết. Ban điều hành cam kết bảo mật hồ sơ và liên hệ trong 48 giờ.';
  const formNameLabel = pageProps?.form_name_label || 'HỌ VÀ TÊN / DANH XƯNG';
  const formNamePlaceholder = pageProps?.form_name_placeholder || 'Họa sĩ / Nhà nghiên cứu / Ông...';
  const formOrgLabel = pageProps?.form_org_label || 'ĐƠN VỊ / TỔ CHỨC / VAI TRÒ';
  const formOrgPlaceholder = pageProps?.form_org_placeholder || 'Xưởng sáng tác, Trường ĐH Mỹ thuật...';
  const formEmailLabel = pageProps?.form_email_label || 'EMAIL LIÊN HỆ';
  const formEmailPlaceholder = pageProps?.form_email_placeholder || 'dia-chi-email@domain.com';
  const formPhoneLabel = pageProps?.form_phone_label || 'SỐ ĐIỆN THOẠI';
  const formPhonePlaceholder = pageProps?.form_phone_placeholder || '090 xxx xxxx';
  const formRoutesLabel = pageProps?.form_routes_label || 'NHÓM NHU CẦU KẾT NỐI';
  const formRoutesPlaceholder = pageProps?.form_routes_placeholder || '-- Vui lòng chọn tuyến tham gia --';
  const formSubmitText = pageProps?.form_submit_text || 'GỬI THÔNG TIN ĐỀ XUẤT';
  const formTermsText =
    pageProps?.form_terms_text ||
    'Tôi xác nhận thông tin cung cấp là chính xác và đồng ý cho phép Ban Điều Hành lưu trữ, xử lý thông tin để phối hợp triển khai theo quy định bảo mật của dự án.';
  const formUploadLabel =
    pageProps?.form_upload_label || 'TỆP ĐÍNH KÈM HOẶC LIÊN KẾT HỒ SƠ';
  const formUploadHint =
    pageProps?.form_upload_hint ||
    'Đính kèm Portfolio, Hồ sơ năng lực hoặc Tác phẩm';
  const formUploadSubhint =
    pageProps?.form_upload_subhint ||
    'Hỗ trợ PDF, DOCX, ZIP tối đa 25MB hoặc dán URL Drive';
  const formFileBtnText = pageProps?.form_file_btn_text || 'CHỌN TỆP';
  const formLinkPlaceholder =
    pageProps?.form_link_placeholder ||
    'Hoặc dán liên kết Google Drive / Dropbox / Behance tại đây...';
  const formMessageLabel = pageProps?.form_message_label || 'NỘI DUNG MUỐN KẾT NỐI';
  const formMessagePlaceholder =
    pageProps?.form_message_placeholder ||
    'Mô tả ngắn gọn nội dung ý tưởng, tác phẩm, tư liệu hoặc phương thức hợp tác bạn mong muốn đề xuất cùng dự án Bách niên...';
  const modalBadge = pageProps?.modal_badge || 'MÃ HỒ SƠ LƯU TRỮ';
  const modalTitle = pageProps?.modal_title || 'TIẾP NHẬN THÀNH CÔNG';
  const modalMessage =
    pageProps?.modal_message ||
    'Cảm ơn bạn đã kết nối. Ban Điều Hành Dự Án 100 Năm Sơn Mài Hội Họa Việt Nam đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất. Mỗi đóng góp của bạn đều là một viên gạch quý báu đắp xây di sản chung.';
  const modalBtnText = pageProps?.modal_btn_text || 'GỬI THÊM YÊU CẦU KHÁC';

  const routeOptions = Array.isArray(pageProps?.routes) && pageProps.routes.length > 0
    ? pageProps.routes
    : [{ key: 'contact', title: 'Liên hệ chung' }];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `#SMVN-2026-REG-${randomCode}`;
    setReferenceCode(ref);

    try {
      // Thu thập các trường tùy chỉnh nếu có
      const customEntries = Object.entries(formData).filter(
        ([k, v]) => !['fullName', 'organization', 'email', 'phone', 'routeType', 'proposalMessage', 'documentUrl', 'termsAgreed'].includes(k) && v
      );
      let combinedMessage = formData.proposalMessage;
      if (customEntries.length > 0) {
        combinedMessage += '\n\n--- THÔNG TIN BỔ SUNG ---\n' + customEntries.map(([k, v]) => `${k}: ${v}`).join('\n');
      }

      await siteServices.submitForm({
        form_type: formData.routeType || 'contact',
        full_name: formData.fullName,
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        subject: `Đề xuất hợp tác: ${formData.routeType || 'Liên hệ chung'}`,
        message: combinedMessage,
        reference_code: ref,
      });
    } catch (err) {
      console.warn('Gửi form lưu trữ:', err.message);
    }

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
    navigator.clipboard.writeText(emailAddress);
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
            <h2 className="font-sans text-2xl sm:text-3xl text-[#FFDF73] font-bold">
              {formTitle}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">
              {formDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Nếu có cấu hình form_fields từ admin thì render động theo layout grid */}
            {Array.isArray(pageProps?.form_fields) && pageProps.form_fields.length > 0 ? (
              <div className="grid grid-cols-12 gap-4">
                {pageProps.form_fields.map((f, fIdx) => {
                  const colClass =
                    f.gridWidth === '6/12'
                      ? 'col-span-12 sm:col-span-6'
                      : f.gridWidth === '4/12'
                      ? 'col-span-12 sm:col-span-4'
                      : f.gridWidth === '8/12'
                      ? 'col-span-12 sm:col-span-8'
                      : f.gridWidth === '3/12'
                      ? 'col-span-12 sm:col-span-3'
                      : 'col-span-12';

                  const fieldName = f.key || `field_${fIdx}`;
                  const fieldVal = formData[fieldName] ?? '';

                  return (
                    <div key={f.id || f.key || fIdx} className={`${colClass} space-y-1.5`}>
                      <label
                        className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold"
                        htmlFor={fieldName}
                      >
                        {f.label || `Trường thông tin #${fIdx + 1}`}
                        {f.required && <span className="text-[#ffb3ae] ml-1 font-bold">*</span>}
                      </label>

                      {f.type === 'textarea' ? (
                        <textarea
                          id={fieldName}
                          name={fieldName}
                          required={Boolean(f.required)}
                          rows={4}
                          value={fieldVal}
                          onChange={handleChange}
                          placeholder={f.placeholder || ''}
                          className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all resize-y"
                          style={{
                            backgroundColor: 'rgba(28, 7, 11, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }}
                        />
                      ) : f.type === 'select' ? (
                        <div className="relative">
                          <select
                            id={fieldName}
                            name={fieldName}
                            required={Boolean(f.required)}
                            value={fieldVal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all pr-10"
                            style={{
                              backgroundColor: 'rgba(28, 7, 11, 0.95)',
                              border: '1px solid rgba(212, 175, 55, 0.3)',
                            }}
                          >
                            <option value="" disabled className="bg-[#1a0508] text-[#FAF7F2]/60">
                              {f.placeholder || '-- Vui lòng chọn --'}
                            </option>
                            {(f.options || []).map((opt, oIdx) => (
                              <option key={oIdx} value={opt} className="bg-[#1a0508] text-[#FAF7F2]">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#FFDF73]">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      ) : (
                        <input
                          id={fieldName}
                          name={fieldName}
                          required={Boolean(f.required)}
                          type={f.type || 'text'}
                          value={fieldVal}
                          onChange={handleChange}
                          placeholder={f.placeholder || ''}
                          className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                          style={{
                            backgroundColor: 'rgba(28, 7, 11, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                {/* 1. Full name & Organization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="fullName">
                      {formNameLabel} <span className="text-[#ffb3ae]">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={formNamePlaceholder}
                      className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                      style={{
                        backgroundColor: 'rgba(28, 7, 11, 0.75)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="organization">
                      {formOrgLabel}
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder={formOrgPlaceholder}
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
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="email">
                      {formEmailLabel} <span className="text-[#ffb3ae]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={formEmailPlaceholder}
                      className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                      style={{
                        backgroundColor: 'rgba(28, 7, 11, 0.75)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="phone">
                      {formPhoneLabel} <span className="text-[#ffb3ae]">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={formPhonePlaceholder}
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
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="routeType">
                    {formRoutesLabel} <span className="text-[#ffb3ae]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="routeType"
                      name="routeType"
                      required
                      value={formData.routeType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all pr-10"
                      style={{
                        backgroundColor: 'rgba(28, 7, 11, 0.95)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      <option value="" disabled className="bg-[#1a0508] text-[#FAF7F2]/60">
                        {formRoutesPlaceholder}
                      </option>
                      {routeOptions.map((r, idx) => (
                        <option key={r.key || idx} value={r.key} className="bg-[#1a0508] text-[#FAF7F2]">
                          {r.badge ? `${r.badge}: ` : ''}{r.title}
                        </option>
                      ))}
                      <option value="other" className="bg-[#1a0508] text-[#FAF7F2]">
                        Tuyến khác: Đóng góp tư liệu quý / Lưu trữ gia đình / Liên hệ chung
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#FFDF73]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 4. Content Description */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor="proposalMessage">
                    {formMessageLabel} <span className="text-[#ffb3ae]">*</span>
                  </label>
                  <textarea
                    id="proposalMessage"
                    name="proposalMessage"
                    required
                    rows={4}
                    value={formData.proposalMessage}
                    onChange={handleChange}
                    placeholder={formMessagePlaceholder}
                    className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all resize-y"
                    style={{
                      backgroundColor: 'rgba(28, 7, 11, 0.75)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  />
                </div>

                {/* 5. Document / Portfolio Link Upload */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold">
                    {formUploadLabel}
                  </label>
                  <div
                    className="p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3"
                    style={{
                      backgroundColor: 'rgba(20, 5, 8, 0.85)',
                      border: '1px dashed rgba(212, 175, 55, 0.35)',
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Upload className="w-6 h-6 text-[#FFDF73] shrink-0" />
                      <div className="min-w-0">
                        <div className="font-sans text-xs sm:text-sm text-[#FAF7F2] truncate">
                          {formUploadHint}
                        </div>
                        <div className="font-sans text-[11px] text-[#FAF7F2]/60 truncate">
                          {formUploadSubhint}
                        </div>
                      </div>
                    </div>
                    <label className="shrink-0 px-4 py-2 rounded bg-[#37352e] text-[#FFDF73] hover:bg-[#E9C349] hover:text-[#241a00] font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors">
                      {formFileBtnText}
                      <input type="file" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  {fileName && (
                    <div className="text-xs text-[#FFDF73] flex items-center gap-1.5 px-1">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Đã chọn tệp: {fileName}</span>
                    </div>
                  )}

                  <input
                    type="url"
                    name="documentUrl"
                    value={formData.documentUrl}
                    onChange={handleChange}
                    placeholder={formLinkPlaceholder}
                    className="w-full px-4 py-2.5 rounded-lg text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] transition-all mt-1"
                    style={{
                      backgroundColor: 'rgba(28, 7, 11, 0.75)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  />
                </div>

                {/* 6. Các trường tùy chỉnh do Admin bổ sung */}
                {Array.isArray(pageProps?.custom_fields) && pageProps.custom_fields.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {pageProps.custom_fields.map((field, fIdx) => {
                      const isFull = field.gridWidth === '12/12';
                      const colClass = isFull ? 'col-span-1 md:col-span-2' : 'col-span-1';
                      const fieldKey = field.key || `custom_${fIdx}`;
                      const fieldVal = formData[fieldKey] ?? '';

                      return (
                        <div key={field.id || fIdx} className={`${colClass} space-y-1.5`}>
                          <label className="block font-sans text-xs uppercase tracking-wider text-[#FAF7F2] font-semibold" htmlFor={fieldKey}>
                            {field.label || `Trường bổ sung #${fIdx + 1}`}
                            {field.required && <span className="text-[#ffb3ae] ml-1 font-bold">*</span>}
                          </label>

                          {field.type === 'textarea' ? (
                            <textarea
                              id={fieldKey}
                              name={fieldKey}
                              required={Boolean(field.required)}
                              rows={3}
                              value={fieldVal}
                              onChange={handleChange}
                              placeholder={field.placeholder || ''}
                              className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all resize-y"
                              style={{
                                backgroundColor: 'rgba(28, 7, 11, 0.75)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                              }}
                            />
                          ) : field.type === 'select' ? (
                            <div className="relative">
                              <select
                                id={fieldKey}
                                name={fieldKey}
                                required={Boolean(field.required)}
                                value={fieldVal}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all pr-10"
                                style={{
                                  backgroundColor: 'rgba(28, 7, 11, 0.95)',
                                  border: '1px solid rgba(212, 175, 55, 0.3)',
                                }}
                              >
                                <option value="" disabled className="bg-[#1a0508] text-[#FAF7F2]/60">
                                  {field.placeholder || '-- Vui lòng chọn --'}
                                </option>
                                {(field.options || []).map((opt, oIdx) => (
                                  <option key={oIdx} value={opt} className="bg-[#1a0508] text-[#FAF7F2]">
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#FFDF73]">
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          ) : (
                            <input
                              id={fieldKey}
                              name={fieldKey}
                              required={Boolean(field.required)}
                              type={field.type || 'text'}
                              value={fieldVal}
                              onChange={handleChange}
                              placeholder={field.placeholder || ''}
                              className="w-full px-4 py-3 rounded-lg text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#FFDF73] focus:border-[#FFDF73] transition-all"
                              style={{
                                backgroundColor: 'rgba(28, 7, 11, 0.75)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

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
                {formTermsText}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg uppercase tracking-wider font-sans font-bold text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, rgb(255, 223, 115) 0%, rgb(233, 195, 73) 50%, rgb(196, 155, 40) 100%)',
                  color: 'rgb(46, 21, 0)',
                  border: '1px solid rgb(255, 230, 140)',
                  boxShadow: '0 4px 20px rgba(233, 195, 73, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                }}
              >
                <span>{formSubmitText}</span>
                <ArrowRight className="w-5 h-5" />
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
              <h3 className="font-sans text-2xl text-[#FFDF73] font-bold">
                {directTitle}
              </h3>
            </div>

            {/* Contact Data List */}
            <div className="space-y-5 divide-y divide-[#D4AF37]/15">
              {/* Email */}
              <div className="pt-4 first:pt-0 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    HỘP THƯ ĐIỆN TỬ DỰ ÁN
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-medium truncate mt-0.5">
                    {emailAddress}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 font-sans text-xs text-[#FFDF73] hover:underline transition-colors mt-1 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#FFDF73]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#FFDF73]" />
                    )}
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép địa chỉ thư'}</span>
                  </button>
                </div>
              </div>

              {/* Hotline */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    ĐƯỜNG DÂY NÓNG ĐIỀU PHỐI
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-semibold mt-0.5">
                    {hotline}
                  </div>
                  {hotlineSub && (
                    <div className="font-sans text-xs text-[#FAF7F2]/70 mt-0.5">
                      {hotlineSub}
                    </div>
                  )}
                </div>
              </div>

              {/* Coordinate Headquarters */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    ĐỊA BÀN HOẠT ĐỘNG CHÍNH
                  </div>
                  <div className="font-sans text-base text-[#FFDF73] italic font-semibold mt-0.5">
                    {address}
                  </div>
                  {addressSub && (
                    <div className="font-sans text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                      {addressSub}
                    </div>
                  )}
                </div>
              </div>

              {/* Response SLA */}
              <div className="pt-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shrink-0 border border-[#D4AF37]/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-semibold">
                    THỜI GIAN PHẢN HỒI
                  </div>
                  <div className="font-sans text-sm sm:text-base text-[#FAF7F2] font-medium mt-0.5">
                    {officeHours}
                  </div>
                  {officeHoursSub && (
                    <div className="font-sans text-xs text-[#FAF7F2]/70 mt-0.5">
                      {officeHoursSub}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Archival Heritage Security Box */}
            <div
              className="mt-6 p-4 rounded-xl border border-dashed border-[#D4AF37]/35 relative"
              style={{ background: 'rgba(22, 5, 8, 0.85)' }}
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FFDF73] shrink-0 mt-0.5" />
                <div className="font-sans text-xs text-[#FAF7F2]/90 leading-relaxed">
                  {securityNote}
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
              <X className="w-5 h-5" />
            </button>

            {/* Golden Seal Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#521515] flex items-center justify-center text-[#FFDF73] mb-4 shadow-[0_0_24px_rgba(233,195,73,0.35)] border border-[#D4AF37]/40">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFDF73] stroke-[2.5]" />
            </div>

            {/* Heading */}
            <span className="font-sans text-xs text-[#FFDF73] tracking-[0.25em] uppercase block mb-1 font-semibold">
              {modalBadge}
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl text-[#FFDF73] font-bold mb-3">
              {modalTitle}
            </h3>

            {/* Body Copy */}
            <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed mb-6">
              {modalMessage}
            </p>

            {/* Reference Code */}
            <div
              className="py-2.5 px-5 rounded-lg mb-6 inline-block border border-[#D4AF37]/30"
              style={{ background: 'rgba(16, 2, 4, 0.8)' }}
            >
              <span className="font-sans text-xs text-[#FAF7F2]/60 mr-2 uppercase tracking-wider">
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
                className="w-full py-3 px-6 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-[#37352e] hover:bg-[#E9C349] hover:text-[#241a00] text-[#FFDF73] cursor-pointer"
              >
                {modalBtnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

