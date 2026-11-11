import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronDown,
  Check,
  ShieldCheck,
  Send,
  Save,
  Compass,
  Eye,
  Sliders,
  ExternalLink,
  MessageSquare,
  FileText,
  User,
  LayoutGrid,
  Upload,
  Link as LinkIcon,
  Calendar,
  Tag,
  Paperclip,
  CheckCircle2,
  Building2,
  PhoneCall,
  Hash,
} from 'lucide-react';
import {
  LEADERSHIP_ICONS,
  resolveLeadershipIcon,
} from '../../leadership/leadershipIconRegistry';

// Reusable Custom Lucide Icon Dropdown Component
function IconSelectDropdown({
  label,
  value,
  onChange,
  icons = LEADERSHIP_ICONS,
  resolvedIcon: ResolvedIcon,
  defaultPlaceholder = 'Tự động nhận diện',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = value && icons[value] ? icons[value] : null;
  const ActiveIcon = selectedItem ? selectedItem.component : ResolvedIcon;

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return Object.entries(icons);
    const query = search.toLowerCase();
    return Object.entries(icons).filter(
      ([key, item]) =>
        key.toLowerCase().includes(query) ||
        (item.label && item.label.toLowerCase().includes(query))
    );
  }, [icons, search]);

  return (
    <div className="relative space-y-1" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[9px] text-[#FFDF73]/70 hover:text-[#FFDF73] underline cursor-pointer"
          >
            Đặt lại tự động
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-2.5 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 hover:border-[#FFDF73] text-[#FAF7F2] text-xs flex items-center justify-between gap-2 transition cursor-pointer shadow-inner"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-[#240609] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shrink-0">
            {ActiveIcon ? <ActiveIcon className="w-3.5 h-3.5" /> : null}
          </div>
          <span className="truncate text-xs font-medium">
            {selectedItem ? selectedItem.label : `✦ ${defaultPlaceholder}`}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#FFDF73] shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-[#180406] border border-[#D4AF37]/60 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.9)] p-2 z-50 space-y-2 backdrop-blur-md">
          <div className="relative">
            <Search className="w-3 h-3 text-[#FFDF73]/60 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm biểu tượng..."
              className="w-full pl-7 pr-2.5 py-1 rounded bg-[#0d0103] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none placeholder-[#EADBCE]/40"
              autoFocus
            />
          </div>

          <div className="max-h-52 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
            {filteredIcons.map(([iconKey, iconItem]) => {
              const Comp = iconItem.component;
              const isSelected = value === iconKey;
              return (
                <button
                  key={iconKey}
                  type="button"
                  onClick={() => {
                    onChange(iconKey);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full px-2 py-1.5 rounded-lg flex items-center justify-between text-left text-xs transition cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] font-bold shadow-md'
                      : 'text-[#FAF7F2]/90 hover:bg-[#2b080d] hover:text-[#FFDF73]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#1a0507]/20 text-[#1a0507]'
                          : 'bg-[#240609] text-[#FFDF73] border border-[#D4AF37]/30'
                      }`}
                    >
                      <Comp className="w-3 h-3" />
                    </div>
                    <span className="truncate text-[11px]">
                      {iconItem.label || iconKey}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="w-3 h-3 text-[#1a0507] shrink-0 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const DEFAULT_ROUTES = [
  {
    id: 1,
    key: 'artist',
    icon: 'Palette',
    badge: 'TUYẾN 01 • SÁNG TÁC',
    title: 'Nghệ sĩ / Nghệ nhân sơn mài',
    desc: 'Đăng ký Open Studio, triển lãm, trình diễn sáng tác, workshop, chương trình lưu trú nghệ thuật hoặc đề xuất bộ sưu tập độc bản vinh danh bách niên.',
    buttonText: 'GỬI HỒ SƠ SÁNG TẠO',
  },
  {
    id: 2,
    key: 'academic',
    icon: 'BookOpen',
    badge: 'TUYẾN 02 • HỌC THUẬT',
    title: 'Chuyên gia / Nhà nghiên cứu học thuật',
    desc: 'Đề xuất tham luận, phản biện học thuật, gửi bài viết cho Kỷ yếu bách niên, cố vấn chuyên đề di sản hoặc đóng góp tư liệu lịch sử quý giá.',
    buttonText: 'ĐỀ XUẤT CHUYÊN MÔN',
  },
  {
    id: 3,
    key: 'business',
    icon: 'Building2',
    badge: 'TUYẾN 03 • ĐỒNG HÀNH DOANH NGHIỆP',
    title: 'Hợp tác Doanh nghiệp và Thương hiệu',
    desc: 'Đồng sáng tạo sản phẩm, ứng dụng sơn mài trong kiến trúc - nội thất đương đại, tài trợ di sản, licensing bản quyền hoặc bảo trợ không gian văn hóa.',
    buttonText: 'ĐỀ XUẤT HỢP TÁC',
  },
  {
    id: 4,
    key: 'education',
    icon: 'GraduationCap',
    badge: 'TUYẾN 04 • GIÁO DỤC DI SẢN',
    title: 'Trường học và Dự án Cộng đồng',
    desc: 'Tổ chức tham quan bảo tàng xưởng, lớp học chuyên đề nghệ thuật, hoạt động trải nghiệm thực hành, dự án sinh viên hoặc mạng lưới tình nguyện viên văn hóa.',
    buttonText: 'ĐĂNG KÝ CHƯƠNG TRÌNH',
  },
  {
    id: 5,
    key: 'press',
    icon: 'Megaphone',
    badge: 'TUYẾN 05 • TRUYỀN THÔNG ĐẠI CHÚNG',
    title: 'Báo chí & Cơ quan Truyền thông',
    desc: 'Nhận bộ tài liệu báo chí chính thức (Press Kit), hình ảnh tư liệu độ phân giải cao được cấp quyền sử dụng, đặt lịch phỏng vấn Ban cố vấn và đầu mối phát ngôn.',
    buttonText: 'LIÊN HỆ TRUYỀN THÔNG',
  },
];

const FIELD_TYPES = [
  { value: 'text', label: 'Văn bản ngắn (Text)' },
  { value: 'email', label: 'Địa chỉ Email (Email)' },
  { value: 'tel', label: 'Số điện thoại (Tel)' },
  { value: 'number', label: 'Số (Number)' },
  { value: 'select', label: 'Danh sách lựa chọn (Select)' },
  { value: 'textarea', label: 'Đoạn văn bản (Textarea)' },
  { value: 'url', label: 'Đường dẫn liên kết (URL)' },
];

const ContactPageEditor = ({
  parsedProps = {},
  handlePropChange,
  handleSavePage,
  saving = false,
}) => {
  // Routes
  const routes = useMemo(() => {
    if (Array.isArray(parsedProps.routes) && parsedProps.routes.length > 0) {
      return parsedProps.routes;
    }
    return DEFAULT_ROUTES;
  }, [parsedProps.routes]);

  const handleRouteChange = (index, field, value) => {
    const nextRoutes = routes.map((r, idx) => {
      if (idx !== index) return r;
      return { ...r, [field]: value };
    });
    handlePropChange('routes', nextRoutes);
  };

  const handleAddRoute = () => {
    const newRoute = {
      id: Date.now(),
      key: `tuyen_${routes.length + 1}`,
      icon: 'Palette',
      badge: `TUYẾN 0${routes.length + 1}`,
      title: 'Tuyến kết nối mới',
      desc: 'Mô tả ngắn gọn mục đích và quyền lợi tham gia của tuyến này...',
      buttonText: 'GỬI ĐỀ XUẤT',
    };
    handlePropChange('routes', [...routes, newRoute]);
  };

  const handleDeleteRoute = (index) => {
    if (routes.length <= 1) {
      alert('Trang liên hệ cần ít nhất 1 tuyến tham gia đồng hành.');
      return;
    }
    const nextRoutes = routes.filter((_, idx) => idx !== index);
    handlePropChange('routes', nextRoutes);
  };

  const handleMoveRoute = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= routes.length) return;
    const nextRoutes = [...routes];
    const temp = nextRoutes[index];
    nextRoutes[index] = nextRoutes[targetIdx];
    nextRoutes[targetIdx] = temp;
    handlePropChange('routes', nextRoutes);
  };

  // Custom Fields (Quản lý trường bổ sung vào form)
  const customFields = useMemo(() => {
    if (Array.isArray(parsedProps.custom_fields)) {
      return parsedProps.custom_fields;
    }
    return [];
  }, [parsedProps.custom_fields]);

  const handleAddCustomField = () => {
    const newField = {
      id: Date.now(),
      key: `field_${customFields.length + 1}`,
      label: 'Trường thông tin mới',
      placeholder: 'Nhập thông tin...',
      type: 'text',
      gridWidth: '6/12',
      required: false,
      options: ['Lựa chọn 1', 'Lựa chọn 2'],
    };
    handlePropChange('custom_fields', [...customFields, newField]);
  };

  const handleUpdateCustomField = (index, field, value) => {
    const next = customFields.map((f, idx) => {
      if (idx !== index) return f;
      return { ...f, [field]: value };
    });
    handlePropChange('custom_fields', next);
  };

  const handleDeleteCustomField = (index) => {
    const next = customFields.filter((_, idx) => idx !== index);
    handlePropChange('custom_fields', next);
  };

  const handleMoveCustomField = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= customFields.length) return;
    const next = [...customFields];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    handlePropChange('custom_fields', next);
  };

  // Header Hero
  const headline = parsedProps.headline ?? 'MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP';
  const description =
    parsedProps.description ??
    'Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm, một ý tưởng nghiên cứu hoặc một đề xuất hợp tác, hãy kết nối với chúng tôi. Không có đóng góp nào là nhỏ khi cùng hướng đến việc viết tiếp một di sản chung của nền nghệ thuật Việt Nam.';

  // Routes Title
  const routesTitle = parsedProps.routes_title ?? 'CÁC TUYẾN THAM GIA ĐỒNG HÀNH';

  // Form Fields
  const formTitle = parsedProps.form_title ?? 'GỬI ĐỀ XUẤT KẾT NỐI';
  const formDescription =
    parsedProps.form_description ??
    'Vui lòng điền thông tin chi tiết. Ban điều hành cam kết bảo mật hồ sơ và liên hệ trong 48 giờ.';
  const formNameLabel = parsedProps.form_name_label ?? 'HỌ VÀ TÊN / DANH XƯNG';
  const formNamePlaceholder =
    parsedProps.form_name_placeholder ?? 'Họa sĩ / Nhà nghiên cứu / Ông...';
  const formOrgLabel = parsedProps.form_org_label ?? 'ĐƠN VỊ / TỔ CHỨC / VAI TRÒ';
  const formOrgPlaceholder =
    parsedProps.form_org_placeholder ?? 'Xưởng sáng tác, Trường ĐH Mỹ thuật...';
  const formEmailLabel = parsedProps.form_email_label ?? 'EMAIL LIÊN HỆ';
  const formEmailPlaceholder =
    parsedProps.form_email_placeholder ?? 'dia-chi-email@domain.com';
  const formPhoneLabel = parsedProps.form_phone_label ?? 'SỐ ĐIỆN THOẠI';
  const formPhonePlaceholder =
    parsedProps.form_phone_placeholder ?? '090 xxx xxxx';
  const formRoutesLabel = parsedProps.form_routes_label ?? 'NHÓM NHU CẦU KẾT NỐI';
  const formRoutesPlaceholder =
    parsedProps.form_routes_placeholder ?? '-- Vui lòng chọn tuyến tham gia --';
  const formMessageLabel =
    parsedProps.form_message_label ?? 'NỘI DUNG MUỐN KẾT NỐI';
  const formMessagePlaceholder =
    parsedProps.form_message_placeholder ??
    'Mô tả ngắn gọn nội dung ý tưởng, tác phẩm, tư liệu hoặc phương thức hợp tác bạn mong muốn đề xuất cùng dự án Bách niên...';
  const formUploadLabel =
    parsedProps.form_upload_label ?? 'TỆP ĐÍNH KÈM HOẶC LIÊN KẾT HỒ SƠ';
  const formUploadHint =
    parsedProps.form_upload_hint ??
    'Đính kèm Portfolio, Hồ sơ năng lực hoặc Tác phẩm';
  const formUploadSubhint =
    parsedProps.form_upload_subhint ??
    'Hỗ trợ PDF, DOCX, ZIP tối đa 25MB hoặc dán URL Drive';
  const formFileBtnText = parsedProps.form_file_btn_text ?? 'CHỌN TỆP';
  const formLinkPlaceholder =
    parsedProps.form_link_placeholder ??
    'Hoặc dán liên kết Google Drive / Dropbox / Behance tại đây...';
  const formTermsText =
    parsedProps.form_terms_text ??
    'Tôi xác nhận thông tin cung cấp là chính xác và đồng ý cho phép Ban Điều Hành lưu trữ, xử lý thông tin để phối hợp triển khai theo quy định bảo mật của dự án.';
  const formSubmitText =
    parsedProps.form_submit_text ?? 'GỬI THÔNG TIN ĐỀ XUẤT';

  // Thông báo Popup thành công
  const modalTitle = parsedProps.modal_title ?? 'TIẾP NHẬN THÀNH CÔNG';
  const modalMessage =
    parsedProps.modal_message ??
    'Cảm ơn bạn đã kết nối. Ban Điều Hành Dự Án 100 Năm Sơn Mài Hội Họa Việt Nam đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất. Mỗi đóng góp của bạn đều là một viên gạch quý báu đắp xây di sản chung.';
  const modalBtnText = parsedProps.modal_btn_text ?? 'GỬI THÊM YÊU CẦU KHÁC';

  // Kênh kết nối trực tiếp (Cột bên phải)
  const directTitle = parsedProps.direct_title ?? 'KẾT NỐI TRỰC TIẾP';
  const emailAddress = parsedProps.email ?? 'info@sonmaihoihoavietnam.com';
  const hotline = parsedProps.hotline ?? 'Ms. Khánh — 090 900 2207';
  const hotlineSub =
    parsedProps.hotline_sub ??
    'Hỗ trợ đối tác, nghệ sĩ và tiếp nhận thông tin 24/7';
  const address =
    parsedProps.address ?? 'Hà Nội • TP. Hồ Chí Minh • Phú Thọ';
  const addressSub =
    parsedProps.address_sub ??
    'Trụ sở điều phối trung tâm đang trong giai đoạn hoàn thiện chuẩn bị cho chuỗi sự kiện Khởi Sắc 2026.';
  const officeHours =
    parsedProps.officeHours ?? 'Trong vòng 02 ngày làm việc chính thức';
  const officeHoursSub =
    parsedProps.officeHours_sub ??
    'Phân loại và chuyển đến Tiểu ban chuyên môn tương ứng.';
  const securityNote =
    parsedProps.security_note ??
    'Mọi thông tin, hồ sơ tác phẩm và đề xuất nghiên cứu đều được bảo mật, mã hóa định danh và quản lý theo chuẩn lưu trữ của Viện Kỷ Lục Việt Nam (VietKings).';

  return (
    <div className="space-y-8 select-none">
      {/* THANH ĐIỀU HƯỚNG LƯU TRANG */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#180406] border border-[#D4AF37]/40 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] shadow-md">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sans text-base sm:text-lg font-bold text-[#FFDF73] uppercase tracking-wide">
              Quản Trị Toàn Diện Trang Liên Hệ &amp; Biểu Mẫu
            </h2>
            <p className="text-xs text-[#EADBCE]/70">
              Chỉnh sửa Hero, Tuyến đồng hành, Biểu mẫu đề xuất (thêm/sửa trường) và Kênh kết nối trực tiếp.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D4AF37]/35 text-[#EADBCE] hover:text-[#FFDF73] text-xs font-sans uppercase tracking-wider transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở Trang Web</span>
          </a>

          {handleSavePage && (
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-sans font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================== PHẦN 1: KHUNG ĐẦU TRANG (HERO SECTION - ĐÃ BỎ BADGE) ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              1. Khung Đầu Trang (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề lớn và lời giới thiệu mở đầu trang Liên hệ.
            </p>
          </div>
        </div>

        <div className="space-y-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính đầu trang (headline)
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              placeholder="MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
              Đoạn mô tả dẫn nhập (description)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => handlePropChange('description', e.target.value)}
              placeholder="Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ===================== PHẦN 2: CÁC TUYẾN THAM GIA ĐỒNG HÀNH ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                2. Các Tuyến Tham Gia Đồng Hành ({routes.length} Tuyến)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Hiển thị thành các thẻ tuyến ở giữa trang và liên kết vào danh mục chọn tuyến của biểu mẫu.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddRoute}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-sans font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm Tuyến Mới</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khu vực các tuyến (routes_title)
            </label>
            <input
              type="text"
              value={routesTitle}
              onChange={(e) => handlePropChange('routes_title', e.target.value)}
              placeholder="CÁC TUYẾN THAM GIA ĐỒNG HÀNH"
              className="w-full px-3.5 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {routes.map((route, idx) => {
              const ResolvedComp = resolveLeadershipIcon(route.icon, Compass);
              return (
                <div
                  key={route.id || route.key || idx}
                  className="p-4 rounded-xl bg-[#0e0204] border border-[#D4AF37]/30 space-y-3 hover:border-[#FFDF73]/50 transition"
                >
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#3a080c] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-sans font-bold text-[#FAF7F2]">
                        {route.badge ? `${route.badge} — ` : ''}{route.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveRoute(idx, -1)}
                        className="p-1 text-[#FFDF73] disabled:opacity-20 hover:bg-[#240609] rounded cursor-pointer"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === routes.length - 1}
                        onClick={() => handleMoveRoute(idx, 1)}
                        className="p-1 text-[#FFDF73] disabled:opacity-20 hover:bg-[#240609] rounded cursor-pointer"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRoute(idx)}
                        className="p-1 text-red-400 hover:bg-[#240609] rounded cursor-pointer"
                        title="Xóa tuyến này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Huy hiệu tuyến
                      </label>
                      <input
                        type="text"
                        value={route.badge || ''}
                        onChange={(e) => handleRouteChange(idx, 'badge', e.target.value)}
                        placeholder="Ví dụ: TUYẾN 01 • SÁNG TÁC"
                        className="w-full px-2.5 py-1.5 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Tiêu đề tuyến
                      </label>
                      <input
                        type="text"
                        value={route.title || ''}
                        onChange={(e) => handleRouteChange(idx, 'title', e.target.value)}
                        placeholder="Ví dụ: Nghệ sĩ / Nghệ nhân sơn mài"
                        className="w-full px-2.5 py-1.5 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-white"
                      />
                    </div>
                    <IconSelectDropdown
                      label="Biểu tượng Lucide"
                      value={route.icon}
                      onChange={(newIcon) => handleRouteChange(idx, 'icon', newIcon)}
                      resolvedIcon={ResolvedComp}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Mô tả tuyến
                      </label>
                      <textarea
                        rows={2}
                        value={route.desc || ''}
                        onChange={(e) => handleRouteChange(idx, 'desc', e.target.value)}
                        placeholder="Mô tả quyền lợi và cách thức tham gia..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Chữ trên nút tuyến
                      </label>
                      <input
                        type="text"
                        value={route.buttonText || ''}
                        onChange={(e) => handleRouteChange(idx, 'buttonText', e.target.value)}
                        placeholder="Ví dụ: GỬI HỒ SƠ SÁNG TẠO"
                        className="w-full px-2.5 py-1.5 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-[#FFDF73] font-bold"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================== PHẦN 3: BIỂU MẪU ĐỀ XUẤT & THÊM TRƯỜNG DỮ LIỆU ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                3. Cấu Hình Biểu Mẫu "Gửi Đề Xuất Kết Nối" &amp; Thêm Trường Tùy Chỉnh
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Chỉnh sửa nhãn các ô hiện tại hoặc bấm thêm trường mới không giới hạn vào form.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCustomField}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-sans font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm Trường Vào Form</span>
          </button>
        </div>

        {/* Tiêu đề & mô tả form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính của Form (form_title)
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => handlePropChange('form_title', e.target.value)}
              placeholder="GỬI ĐỀ XUẤT KẾT NỐI"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn mô tả / Cam kết thời gian phản hồi (form_description)
            </label>
            <textarea
              rows={2}
              value={formDescription}
              onChange={(e) => handlePropChange('form_description', e.target.value)}
              placeholder="Vui lòng điền thông tin chi tiết. Ban điều hành cam kết bảo mật hồ sơ và liên hệ trong 48 giờ."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* CÁC TRƯỜNG THÔNG TIN MẶC ĐỊNH */}
        <div className="space-y-3">
          <h4 className="font-sans text-xs font-bold text-[#FFDF73] uppercase tracking-wider">
            A. Các Ô Thông Tin Chuẩn Của Form (Tùy biến Nhãn &amp; Placeholder)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
            {/* Họ và tên */}
            <div className="p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 1: Họ và tên / Danh xưng
              </span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Nhãn hiển thị (form_name_label)
                </label>
                <input
                  type="text"
                  value={formNameLabel}
                  onChange={(e) => handlePropChange('form_name_label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Gợi ý placeholder (form_name_placeholder)
                </label>
                <input
                  type="text"
                  value={formNamePlaceholder}
                  onChange={(e) => handlePropChange('form_name_placeholder', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                />
              </div>
            </div>

            {/* Đơn vị / Tổ chức */}
            <div className="p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 2: Đơn vị / Tổ chức / Vai trò
              </span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Nhãn hiển thị (form_org_label)
                </label>
                <input
                  type="text"
                  value={formOrgLabel}
                  onChange={(e) => handlePropChange('form_org_label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Gợi ý placeholder (form_org_placeholder)
                </label>
                <input
                  type="text"
                  value={formOrgPlaceholder}
                  onChange={(e) => handlePropChange('form_org_placeholder', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                />
              </div>
            </div>

            {/* Email liên hệ */}
            <div className="p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 3: Email liên hệ
              </span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Nhãn hiển thị (form_email_label)
                </label>
                <input
                  type="text"
                  value={formEmailLabel}
                  onChange={(e) => handlePropChange('form_email_label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Gợi ý placeholder (form_email_placeholder)
                </label>
                <input
                  type="text"
                  value={formEmailPlaceholder}
                  onChange={(e) => handlePropChange('form_email_placeholder', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 4: Số điện thoại
              </span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Nhãn hiển thị (form_phone_label)
                </label>
                <input
                  type="text"
                  value={formPhoneLabel}
                  onChange={(e) => handlePropChange('form_phone_label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                  Gợi ý placeholder (form_phone_placeholder)
                </label>
                <input
                  type="text"
                  value={formPhonePlaceholder}
                  onChange={(e) => handlePropChange('form_phone_placeholder', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                />
              </div>
            </div>

            {/* Nhóm nhu cầu kết nối */}
            <div className="md:col-span-2 p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 5: Nhóm nhu cầu kết nối (Dropdown)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                    Nhãn danh mục (form_routes_label)
                  </label>
                  <input
                    type="text"
                    value={formRoutesLabel}
                    onChange={(e) => handlePropChange('form_routes_label', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                    Gợi ý lựa chọn mặc định (form_routes_placeholder)
                  </label>
                  <input
                    type="text"
                    value={formRoutesPlaceholder}
                    onChange={(e) => handlePropChange('form_routes_placeholder', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Nội dung kết nối */}
            <div className="md:col-span-2 p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/20 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73] font-bold block uppercase">
                ✦ Ô 6: Nội dung muốn kết nối (Textarea)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                    Nhãn hiển thị (form_message_label)
                  </label>
                  <input
                    type="text"
                    value={formMessageLabel}
                    onChange={(e) => handlePropChange('form_message_label', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                    Gợi ý nội dung (form_message_placeholder)
                  </label>
                  <input
                    type="text"
                    value={formMessagePlaceholder}
                    onChange={(e) => handlePropChange('form_message_placeholder', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#EADBCE]/80 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== KHU VỰC THÊM TRƯỜNG TÙY CHỈNH ===================== */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-sans text-xs font-bold text-[#FFDF73] uppercase tracking-wider flex items-center gap-2">
              <span>B. Các Trường Bổ Sung Do Admin Tự Định Nghĩa ({customFields.length} Trường)</span>
            </h4>
            <button
              type="button"
              onClick={handleAddCustomField}
              className="px-3 py-1.5 rounded-lg bg-[#3a080c] hover:bg-[#520d14] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold uppercase transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Trường Mới</span>
            </button>
          </div>

          {customFields.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-[#D4AF37]/30 text-center text-[#EADBCE]/60 text-xs bg-[#120204]">
              Hiện chưa có trường bổ sung nào. Nhấn <strong>"Thêm Trường Vào Form"</strong> để tạo thêm các ô nhập liệu tùy ý (ví dụ: Năm sinh, Link Website, Đề tài nghiên cứu, Số lượng tác phẩm,...).
            </div>
          ) : (
            <div className="space-y-3">
              {customFields.map((field, idx) => (
                <div
                  key={field.id || idx}
                  className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/35 space-y-3 hover:border-[#FFDF73]/60 transition"
                >
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#140305] text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-sans font-bold text-[#FAF7F2]">
                        {field.label || `Trường #${idx + 1}`}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#3a080c] text-[#FFDF73] border border-[#D4AF37]/30">
                        {field.type || 'text'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1c0508] text-[#EADBCE]/70">
                        {field.gridWidth === '12/12' ? 'Toàn dòng (100%)' : 'Nửa dòng (50%)'}
                      </span>
                      {field.required && (
                        <span className="text-[10px] text-[#ffb3ae] font-bold">
                          * Bắt buộc
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveCustomField(idx, -1)}
                        className="p-1 text-[#FFDF73] disabled:opacity-20 hover:bg-[#240609] rounded cursor-pointer"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === customFields.length - 1}
                        onClick={() => handleMoveCustomField(idx, 1)}
                        className="p-1 text-[#FFDF73] disabled:opacity-20 hover:bg-[#240609] rounded cursor-pointer"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomField(idx)}
                        className="p-1 text-red-400 hover:bg-[#240609] rounded cursor-pointer"
                        title="Xóa trường này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Nhãn trường (Label)
                      </label>
                      <input
                        type="text"
                        value={field.label || ''}
                        onChange={(e) => handleUpdateCustomField(idx, 'label', e.target.value)}
                        placeholder="Ví dụ: Năm sinh / Nghệ danh..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Gợi ý (Placeholder)
                      </label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => handleUpdateCustomField(idx, 'placeholder', e.target.value)}
                        placeholder="Ví dụ: Nhập thông tin..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Loại ô nhập (Type)
                      </label>
                      <select
                        value={field.type || 'text'}
                        onChange={(e) => handleUpdateCustomField(idx, 'type', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs cursor-pointer"
                      >
                        {FIELD_TYPES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-[#180406]">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                        Độ rộng (Layout Grid)
                      </label>
                      <select
                        value={field.gridWidth || '6/12'}
                        onChange={(e) => handleUpdateCustomField(idx, 'gridWidth', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs cursor-pointer"
                      >
                        <option value="6/12" className="bg-[#180406]">Nửa dòng (50%)</option>
                        <option value="12/12" className="bg-[#180406]">Toàn dòng (100%)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(field.required)}
                        onChange={(e) => handleUpdateCustomField(idx, 'required', e.target.checked)}
                        className="h-3.5 w-3.5 accent-[#D4AF37]"
                      />
                      <span className="text-xs text-[#FAF7F2]/80">Bắt buộc nhập</span>
                    </label>

                    {field.type === 'select' && (
                      <div className="flex-1">
                        <input
                          type="text"
                          value={Array.isArray(field.options) ? field.options.join(', ') : ''}
                          onChange={(e) =>
                            handleUpdateCustomField(
                              idx,
                              'options',
                              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="Các tùy chọn cách nhau bởi dấu phẩy (VD: Hà Nội, TP.HCM, Khác)"
                          className="w-full px-2.5 py-1 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-xs text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tệp đính kèm & Cam kết & Nút gửi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khu vực đính kèm (form_upload_label)
            </label>
            <input
              type="text"
              value={formUploadLabel}
              onChange={(e) => handlePropChange('form_upload_label', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Gợi ý chính (form_upload_hint)
            </label>
            <input
              type="text"
              value={formUploadHint}
              onChange={(e) => handlePropChange('form_upload_hint', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Định dạng &amp; Dung lượng (form_upload_subhint)
            </label>
            <input
              type="text"
              value={formUploadSubhint}
              onChange={(e) => handlePropChange('form_upload_subhint', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Chữ trên nút chọn tệp (form_file_btn_text)
            </label>
            <input
              type="text"
              value={formFileBtnText}
              onChange={(e) => handlePropChange('form_file_btn_text', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Placeholder dán link Drive/Dropbox (form_link_placeholder)
            </label>
            <input
              type="text"
              value={formLinkPlaceholder}
              onChange={(e) => handlePropChange('form_link_placeholder', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Văn bản cam kết bảo mật checkbox (form_terms_text)
            </label>
            <textarea
              rows={2}
              value={formTermsText}
              onChange={(e) => handlePropChange('form_terms_text', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Nhãn nút gửi đề xuất (form_submit_text)
            </label>
            <input
              type="text"
              value={formSubmitText}
              onChange={(e) => handlePropChange('form_submit_text', e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#160305] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold uppercase"
            />
          </div>
        </div>

        {/* Modal Thông Báo Tiếp Nhận */}
        <div className="bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25 space-y-3">
          <h4 className="font-sans text-xs font-bold text-[#FFDF73] uppercase tracking-wider">
            C. Thông Báo Tiếp Nhận Thành Công (Popup Modal)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                Tiêu đề Popup (modal_title)
              </label>
              <input
                type="text"
                value={modalTitle}
                onChange={(e) => handlePropChange('modal_title', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                Nhãn nút gửi thêm (modal_btn_text)
              </label>
              <input
                type="text"
                value={modalBtnText}
                onChange={(e) => handlePropChange('modal_btn_text', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
                Lời cảm ơn và hướng dẫn (modal_message)
              </label>
              <textarea
                rows={2}
                value={modalMessage}
                onChange={(e) => handlePropChange('modal_message', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== PHẦN 4: KÊNH KẾT NỐI TRỰC TIẾP (CỘT PHẢI) ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              4. Kênh Kết Nối Trực Tiếp &amp; Trụ Sở Điều Phối (Cột Thông Tin Bên Phải)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Email, Hotline, Địa bàn hoạt động, Thời gian phản hồi và Lưu ý bảo mật.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối trực tiếp (direct_title)
            </label>
            <input
              type="text"
              value={directTitle}
              onChange={(e) => handlePropChange('direct_title', e.target.value)}
              placeholder="KẾT NỐI TRỰC TIẾP"
              className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Hộp thư điện tử (email)
            </label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => handlePropChange('email', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Đường dây nóng (hotline)
            </label>
            <input
              type="text"
              value={hotline}
              onChange={(e) => handlePropChange('hotline', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Phụ đề đường dây nóng (hotline_sub)
            </label>
            <input
              type="text"
              value={hotlineSub}
              onChange={(e) => handlePropChange('hotline_sub', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Địa bàn hoạt động chính (address)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => handlePropChange('address', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-[#FFDF73] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Thời gian phản hồi (officeHours)
            </label>
            <input
              type="text"
              value={officeHours}
              onChange={(e) => handlePropChange('officeHours', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Mô tả chi tiết trụ sở (address_sub)
            </label>
            <textarea
              rows={2}
              value={addressSub}
              onChange={(e) => handlePropChange('address_sub', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Ghi chú phản hồi (officeHours_sub)
            </label>
            <textarea
              rows={2}
              value={officeHoursSub}
              onChange={(e) => handlePropChange('officeHours_sub', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/70 mb-1">
              Ghi chú an ninh &amp; bảo mật lưu trữ (security_note)
            </label>
            <textarea
              rows={2}
              value={securityNote}
              onChange={(e) => handlePropChange('security_note', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-white text-xs"
            />
          </div>
        </div>

        {/* Nút lưu nhanh */}
        {handleSavePage && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-sans font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi Trang Liên Hệ'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ===================== KHUNG XEM TRƯỚC TRỰC QUAN (LIVE PREVIEW TOÀN TRANG LIÊN HỆ) ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#FFDF73]" />
            <h3 className="font-sans text-sm font-bold text-[#FFDF73] uppercase tracking-wider">
              Xem Trước Trực Quan Biểu Mẫu &amp; Kênh Kết Nối (Live Preview)
            </h3>
          </div>
          <span className="text-xs text-[#EADBCE]/60">
            Mô phỏng tức thì theo đúng giao diện thực tế
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI: FORM */}
          <div
            className="lg:col-span-7 backdrop-blur-xl p-6 sm:p-8 rounded-2xl relative shadow-2xl space-y-4"
            style={{
              background:
                'linear-gradient(145deg, rgba(42, 12, 16, 0.95) 0%, rgba(20, 5, 8, 0.98) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <div className="border-b border-[#D4AF37]/20 pb-3">
              <h2 className="font-sans text-xl sm:text-2xl text-[#FFDF73] font-bold">
                {formTitle}
              </h2>
              <p className="font-sans text-xs text-[#FAF7F2]/75 mt-1">
                {formDescription}
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                    {formNameLabel} <span className="text-[#ffb3ae]">*</span>
                  </label>
                  <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40">
                    {formNamePlaceholder}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                    {formOrgLabel}
                  </label>
                  <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40">
                    {formOrgPlaceholder}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                    {formEmailLabel} <span className="text-[#ffb3ae]">*</span>
                  </label>
                  <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40">
                    {formEmailPlaceholder}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                    {formPhoneLabel} <span className="text-[#ffb3ae]">*</span>
                  </label>
                  <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40">
                    {formPhonePlaceholder}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                  {formRoutesLabel} <span className="text-[#ffb3ae]">*</span>
                </label>
                <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/60 flex items-center justify-between">
                  <span>{formRoutesPlaceholder}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#FFDF73]" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-bold text-[#FAF7F2]">
                  {formMessageLabel} <span className="text-[#ffb3ae]">*</span>
                </label>
                <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40 min-h-[70px]">
                  {formMessagePlaceholder}
                </div>
              </div>

              {/* Hiển thị các trường tùy chỉnh trong preview */}
              {customFields.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {customFields.map((f, i) => (
                    <div
                      key={i}
                      className={`${f.gridWidth === '12/12' ? 'col-span-1 md:col-span-2' : 'col-span-1'} space-y-1`}
                    >
                      <label className="block text-[11px] uppercase font-bold text-[#FFDF73]">
                        {f.label || `Trường bổ sung #${i + 1}`}
                        {f.required && <span className="text-[#ffb3ae] ml-1">*</span>}
                      </label>
                      <div className="p-2.5 rounded bg-[#160305] border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/40">
                        {f.placeholder || 'Nhập thông tin...'}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-3 rounded uppercase font-bold text-xs text-[#241a00] flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(to right, #D4AF37, #FFDF73)' }}
                >
                  <span>{formSubmitText}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: KÊNH TRỰC TIẾP */}
          <div
            className="lg:col-span-5 backdrop-blur-xl p-6 rounded-2xl relative shadow-2xl space-y-4"
            style={{
              background:
                'linear-gradient(145deg, rgba(42, 12, 16, 0.95) 0%, rgba(20, 5, 8, 0.98) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
            }}
          >
            <div className="border-b border-[#D4AF37]/20 pb-3">
              <h3 className="font-sans text-xl text-[#FFDF73] font-bold">
                {directTitle}
              </h3>
            </div>

            <div className="space-y-3 divide-y divide-[#D4AF37]/15">
              <div className="pt-2 flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FFDF73] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#FAF7F2]/60 uppercase font-semibold">Hộp Thư Dự Án</div>
                  <div className="text-xs text-[#FAF7F2] font-medium">{emailAddress}</div>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-[#FFDF73] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#FAF7F2]/60 uppercase font-semibold">Đường Dây Nóng</div>
                  <div className="text-xs text-[#FAF7F2] font-semibold">{hotline}</div>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FFDF73] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#FAF7F2]/60 uppercase font-semibold">Địa Bàn Hoạt Động</div>
                  <div className="text-xs text-[#FFDF73] font-semibold">{address}</div>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FFDF73] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#FAF7F2]/60 uppercase font-semibold">Thời Gian Phản Hồi</div>
                  <div className="text-xs text-[#FAF7F2] font-medium">{officeHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageEditor;
