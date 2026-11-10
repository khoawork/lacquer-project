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
  Copy,
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
  Hash,
  HelpCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import {
  LEADERSHIP_ICONS,
  resolveLeadershipIcon,
} from '../../leadership/leadershipIconRegistry';

// Danh sách các loại ô nhập
const FIELD_TYPES = [
  { value: 'text', label: 'Văn bản ngắn (Text)', badge: 'TEXT', defaultIcon: 'User' },
  { value: 'email', label: 'Địa chỉ Email (Email)', badge: 'EMAIL', defaultIcon: 'Mail' },
  { value: 'tel', label: 'Số điện thoại (Tel)', badge: 'TEL', defaultIcon: 'Phone' },
  { value: 'select', label: 'Danh sách lựa chọn (Select)', badge: 'SELECT', defaultIcon: 'LayoutGrid' },
  { value: 'textarea', label: 'Đoạn văn bản (Textarea)', badge: 'TEXTAREA', defaultIcon: 'MessageSquare' },
  { value: 'file', label: 'Tệp đính kèm (File / Upload)', badge: 'FILE', defaultIcon: 'Upload' },
  { value: 'url', label: 'Đường dẫn liên kết (URL)', badge: 'URL', defaultIcon: 'Link' },
  { value: 'number', label: 'Số (Number)', badge: 'NUMBER', defaultIcon: 'Hash' },
];

// Danh sách biểu tượng hỗ trợ cho ô nhập
const FIELD_ICONS = {
  default: { label: 'Mặc định theo loại ô', icon: HelpCircle },
  User: { label: 'Người dùng / Họ tên (User)', icon: User },
  Mail: { label: 'Hộp thư điện tử (Mail)', icon: Mail },
  Phone: { label: 'Số điện thoại (Phone)', icon: Phone },
  LayoutGrid: { label: 'Danh mục / Lĩnh vực (LayoutGrid)', icon: LayoutGrid },
  Building2: { label: 'Cơ quan / Đơn vị (Building2)', icon: Building2 },
  MapPin: { label: 'Địa chỉ / Tỉnh thành (MapPin)', icon: MapPin },
  MessageSquare: { label: 'Tin nhắn / Lời nhắn (MessageSquare)', icon: MessageSquare },
  FileText: { label: 'Văn bản / Kỷ yếu (FileText)', icon: FileText },
  Upload: { label: 'Tệp đính kèm (Upload)', icon: Upload },
  Link: { label: 'Đường dẫn liên kết (Link)', icon: LinkIcon },
  Sparkles: { label: 'Sáng tạo / Dự án (Sparkles)', icon: Sparkles },
  Calendar: { label: 'Thời gian / Ngày (Calendar)', icon: Calendar },
  Tag: { label: 'Từ khóa / Nhãn (Tag)', icon: Tag },
};

// Danh sách độ rộng Layout Grid
const GRID_OPTIONS = [
  { value: '12/12', label: '12/12', desc: '100% (Toàn dòng)' },
  { value: '6/12', label: '6/12', desc: '50% (Nửa dòng)' },
  { value: '4/12', label: '4/12', desc: '33% (1/3 dòng)' },
  { value: '8/12', label: '8/12', desc: '66% (2/3 dòng)' },
  { value: '3/12', label: '3/12', desc: '25% (1/4 dòng)' },
];

// Hàm chuyển nhãn tiếng Việt sang slug mã khóa
function toSlugKey(str) {
  if (!str) return 'truong';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Phân giải icon thực tế cho form preview
function resolveFieldIcon(field) {
  const iconKey = field.icon;
  if (iconKey && iconKey !== 'default' && FIELD_ICONS[iconKey]) {
    return FIELD_ICONS[iconKey].icon;
  }
  const typeObj = FIELD_TYPES.find((t) => t.value === field.type);
  const defIconName = typeObj?.defaultIcon || 'User';
  return FIELD_ICONS[defIconName]?.icon || User;
}

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

// Dữ liệu mặc định 5 trường như trong hình ảnh người dùng tải lên
const DEFAULT_FORM_FIELDS = [
  {
    id: 'f_1',
    label: 'Họ và tên',
    placeholder: 'Ví dụ: Nguyễn Văn An',
    type: 'text',
    icon: 'User',
    gridWidth: '6/12',
    key: 'ho_va_ten',
    required: true,
  },
  {
    id: 'f_2',
    label: 'Địa chỉ Email',
    placeholder: 'name@domain.com',
    type: 'email',
    icon: 'Mail',
    gridWidth: '6/12',
    key: 'email',
    required: true,
  },
  {
    id: 'f_3',
    label: 'Số điện thoại liên hệ',
    placeholder: 'Ví dụ: 0912 345 678',
    type: 'tel',
    icon: 'Phone',
    gridWidth: '6/12',
    key: 'so_dien_thoai',
    required: false,
  },
  {
    id: 'f_4',
    label: 'Lĩnh vực quan tâm',
    placeholder: 'Vui lòng chọn lĩnh vực',
    type: 'select',
    icon: 'LayoutGrid',
    gridWidth: '6/12',
    key: 'linh_vuc',
    required: false,
    options: [
      'Tư vấn tham gia Tuyến sáng tác',
      'Đóng góp tư liệu Kỷ yếu',
      'Hợp tác doanh nghiệp & tài trợ',
      'Đăng ký chương trình giáo dục',
      'Liên hệ báo chí & truyền thông',
      'Đóng góp ý kiến khác',
    ],
  },
  {
    id: 'f_5',
    label: 'Nội dung lời nhắn / Đề xuất chi tiết',
    placeholder: 'Quý vị vui lòng mô tả chi tiết nội dung cần tư vấn hoặc đề xuất hợp tác...',
    type: 'textarea',
    icon: 'MessageSquare',
    gridWidth: '12/12',
    key: 'noi_dung',
    required: true,
  },
];

const DEFAULT_ROUTES = [
  {
    id: 1,
    key: 'artist',
    icon: 'Palette',
    badge: 'TUYẾN 01 • SÁNG TÁC',
    title: 'Tham gia với tư cách nghệ sĩ / nghệ nhân',
    desc: 'Đăng ký Open Studio, triển lãm, trình diễn sáng tác, workshop, chương trình lưu trú nghệ thuật hoặc đề xuất bộ sưu tập độc bản vinh danh bách niên.',
    buttonText: 'GỬI HỒ SƠ SÁNG TẠO',
  },
  {
    id: 2,
    key: 'academic',
    icon: 'BookOpen',
    badge: 'TUYẾN 02 • HỌC THUẬT',
    title: 'Tham gia với tư cách chuyên gia / nhà nghiên cứu',
    desc: 'Đề xuất tham luận, phản biện học thuật, gửi bài viết cho Kỷ yếu bách niên, cố vấn chuyên đề di sản hoặc đóng góp tư liệu lịch sử quý giá.',
    buttonText: 'ĐỀ XUẤT CHUYÊN MÔN',
  },
  {
    id: 3,
    key: 'business',
    icon: 'Building2',
    badge: 'TUYẾN 03 • ĐỒNG HÀNH DOANH NGHIỆP',
    title: 'Hợp tác doanh nghiệp và thương hiệu',
    desc: 'Đồng sáng tạo sản phẩm, ứng dụng sơn mài trong kiến trúc - nội thất đương đại, tài trợ di sản, licensing bản quyền hoặc bảo trợ không gian văn hóa.',
    buttonText: 'ĐỀ XUẤT HỢP TÁC',
  },
  {
    id: 4,
    key: 'education',
    icon: 'GraduationCap',
    badge: 'TUYẾN 04 • GIÁO DỤC DI SẢN',
    title: 'Trường học và cộng đồng',
    desc: 'Tổ chức tham quan bảo tàng xưởng, lớp học chuyên đề nghệ thuật, hoạt động trải nghiệm thực hành, dự án sinh viên hoặc mạng lưới tình nguyện viên văn hóa.',
    buttonText: 'ĐĂNG KÝ CHƯƠNG TRÌNH',
  },
  {
    id: 5,
    key: 'press',
    icon: 'Megaphone',
    badge: 'TUYẾN 05 • TRUYỀN THÔNG ĐẠI CHÚNG',
    title: 'Báo chí và truyền thông',
    desc: 'Nhận bộ tài liệu báo chí chính thức (Press Kit), hình ảnh tư liệu độ phân giải cao được cấp quyền sử dụng, đặt lịch phỏng vấn Ban cố vấn và đầu mối phát ngôn.',
    buttonText: 'LIÊN HỆ TRUYỀN THÔNG',
  },
];

const ContactPageEditor = ({
  parsedProps = {},
  handlePropChange,
  handleSavePage,
  saving = false,
}) => {
  // Đảm bảo danh sách trường form luôn hợp lệ
  const fields = useMemo(() => {
    if (Array.isArray(parsedProps.form_fields) && parsedProps.form_fields.length > 0) {
      return parsedProps.form_fields;
    }
    return DEFAULT_FORM_FIELDS;
  }, [parsedProps.form_fields]);

  // Đảm bảo routes luôn là mảng hợp lệ
  const routes = useMemo(() => {
    if (Array.isArray(parsedProps.routes) && parsedProps.routes.length > 0) {
      return parsedProps.routes;
    }
    return DEFAULT_ROUTES;
  }, [parsedProps.routes]);

  // ==================== CÁC HÀM XỬ LÝ TRƯỜNG DỮ LIỆU CỦA FORM ====================
  const handleFieldChange = (index, key, val) => {
    const next = [...fields];
    const current = { ...next[index], [key]: val };

    // Tự động gợi ý mã khóa khi người dùng gõ tên trường
    if (key === 'label' && (!current.key || current.key.startsWith('truong_') || current.key === toSlugKey(next[index].label))) {
      current.key = toSlugKey(val);
    }
    next[index] = current;
    handlePropChange('form_fields', next);
  };

  const handleAddField = () => {
    const newIdx = fields.length + 1;
    const newField = {
      id: `f_${Date.now()}`,
      label: `Trường thông tin #${newIdx}`,
      placeholder: 'Nhập thông tin...',
      type: 'text',
      icon: 'default',
      gridWidth: '12/12',
      key: `truong_${newIdx}`,
      required: false,
    };
    handlePropChange('form_fields', [...fields, newField]);
  };

  const handleDuplicateField = (index) => {
    const target = fields[index];
    const cloned = {
      ...target,
      id: `f_${Date.now()}`,
      label: `${target.label} (Bản sao)`,
      key: `${target.key || 'truong'}_copy`,
    };
    const next = [...fields];
    next.splice(index + 1, 0, cloned);
    handlePropChange('form_fields', next);
  };

  const handleDeleteField = (index) => {
    if (fields.length <= 1) {
      alert('Form cần giữ lại ít nhất 1 trường thông tin.');
      return;
    }
    const next = fields.filter((_, idx) => idx !== index);
    handlePropChange('form_fields', next);
  };

  const handleMoveField = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= fields.length) return;
    const next = [...fields];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    handlePropChange('form_fields', next);
  };

  // ==================== CÁC HÀM XỬ LÝ TUYẾN THAM GIA ====================
  const handleRouteChange = (index, field, value) => {
    const nextRoutes = [...routes];
    nextRoutes[index] = { ...nextRoutes[index], [field]: value };
    handlePropChange('routes', nextRoutes);
  };

  const handleAddRoute = () => {
    const newIndex = routes.length + 1;
    const newRoute = {
      id: Date.now(),
      key: `route_${newIndex}`,
      icon: 'Palette',
      badge: `TUYẾN 0${newIndex} • KẾT NỐI MỚI`,
      title: 'Tên tuyến tham gia mới',
      desc: 'Mô tả tóm tắt định hướng kết nối...',
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

  return (
    <div className="space-y-8 select-none">
      {/* THANH ĐIỀU HƯỚNG LƯU TRANG */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#180406] border border-[#D4AF37]/40 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#FFDF73] uppercase tracking-wide">
              Cấu Hình &amp; Biên Tập Form Liên Hệ Trực Tuyến
            </h2>
            <p className="text-xs text-[#EADBCE]/70">
              Tùy biến các trường nhập liệu trên biểu mẫu và xem trước giao diện biểu mẫu tức thì bên dưới.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D4AF37]/35 text-[#EADBCE] hover:text-[#FFDF73] text-xs font-serif uppercase tracking-wider transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở Web Ngoài</span>
          </a>

          {handleSavePage && (
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-serif font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================== KHU VỰC CẤU HÌNH CÁC TRƯỜNG THÔNG TIN FORM (THEO ẢNH USER) ===================== */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Cấu Hình Các Trường Thông Tin Của Form
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Tự do thêm, sửa, sao chép, đổi độ rộng Layout Grid và phân bổ vị trí các ô nhập liệu.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#1a0507] text-xs font-serif font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm trường thông tin mới</span>
          </button>
        </div>

        {/* Cấu hình tiêu đề & thông điệp chính của Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#140305] p-4 rounded-xl border border-[#D4AF37]/25">
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Huy hiệu cổng tiếp nhận (form_portal_badge)
            </label>
            <input
              type="text"
              value={parsedProps.form_portal_badge ?? 'CỔNG TIẾP NHẬN TRỰC TUYẾN'}
              onChange={(e) => handlePropChange('form_portal_badge', e.target.value)}
              placeholder="Ví dụ: CỔNG TIẾP NHẬN TRỰC TUYẾN"
              className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính của Form (form_title)
            </label>
            <input
              type="text"
              value={parsedProps.form_title ?? 'GỬI PHẢN HỒI HOẶC YÊU CẦU TƯ VẤN'}
              onChange={(e) => handlePropChange('form_title', e.target.value)}
              placeholder="Ví dụ: GỬI PHẢN HỒI HOẶC YÊU CẦU TƯ VẤN"
              className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả hướng dẫn người dùng (form_description)
            </label>
            <textarea
              rows={2}
              value={
                parsedProps.form_description ??
                'Quý vị vui lòng để lại thông tin và nội dung cần tư vấn để Ban Thư ký Trung tâm hỗ trợ.'
              }
              onChange={(e) => handlePropChange('form_description', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                Ghi chú bắt buộc (form_note)
              </label>
              <input
                type="text"
                value={parsedProps.form_note ?? 'Các trường có dấu * là bắt buộc.'}
                onChange={(e) => handlePropChange('form_note', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                Nhãn nút gửi (form_submit_text)
              </label>
              <input
                type="text"
                value={parsedProps.form_submit_text ?? 'GỬI THÔNG TIN'}
                onChange={(e) => handlePropChange('form_submit_text', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FFDF73] font-bold text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* DANH SÁCH CÁC THẺ TRƯỜNG DỮ LIỆU (CHÍNH XÁC NHƯ ẢNH USER) */}
        <div className="space-y-4">
          {fields.map((field, idx) => {
            const typeInfo =
              FIELD_TYPES.find((t) => t.value === field.type) || FIELD_TYPES[0];
            const gridInfo =
              GRID_OPTIONS.find((g) => g.value === field.gridWidth) || GRID_OPTIONS[0];

            return (
              <div
                key={field.id || idx}
                className="p-5 rounded-2xl bg-[#140305] border border-[#D4AF37]/35 hover:border-[#FFDF73]/70 transition shadow-lg space-y-4"
              >
                {/* Header Thẻ Trường: Số thứ tự, Tên trường, Badge Type, Badge Width, Nút Thao tác */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                    <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#140305] text-xs font-bold flex items-center justify-center shrink-0 shadow">
                      {idx + 1}
                    </span>
                    <span className="font-serif text-sm font-bold text-[#FAF7F2] truncate">
                      {field.label || `Trường thông tin #${idx + 1}`}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#3a080c] border border-[#D4AF37]/40 text-[#FFDF73]">
                      {typeInfo.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-sans text-[#EADBCE]/80 bg-[#1c0508] border border-[#D4AF37]/25">
                      {gridInfo.desc}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveField(idx, -1)}
                      title="Di chuyển lên"
                      className="p-1.5 rounded-lg text-[#FAF7F2]/60 hover:text-[#FFDF73] hover:bg-[#240609] disabled:opacity-25 transition cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === fields.length - 1}
                      onClick={() => handleMoveField(idx, 1)}
                      title="Di chuyển xuống"
                      className="p-1.5 rounded-lg text-[#FAF7F2]/60 hover:text-[#FFDF73] hover:bg-[#240609] disabled:opacity-25 transition cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateField(idx)}
                      title="Sao chép trường này"
                      className="p-1.5 rounded-lg text-[#FAF7F2]/60 hover:text-[#FFDF73] hover:bg-[#240609] transition cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteField(idx)}
                      title="Xóa trường này"
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-200 hover:bg-red-950/50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* HÀNG 1: TÊN TRƯỜNG, GỢI Ý (PLACEHOLDER), LOẠI Ô NHẬP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      TÊN TRƯỜNG (NHÃN) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={field.label || ''}
                      onChange={(e) => handleFieldChange(idx, 'label', e.target.value)}
                      placeholder="Trường thông tin #..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      GỢI Ý NHẬP LIỆU (PLACEHOLDER)
                    </label>
                    <input
                      type="text"
                      value={field.placeholder || ''}
                      onChange={(e) => handleFieldChange(idx, 'placeholder', e.target.value)}
                      placeholder="Nhập thông tin..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      LOẠI Ô NHẬP
                    </label>
                    <select
                      value={field.type || 'text'}
                      onChange={(e) => handleFieldChange(idx, 'type', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FFDF73] text-xs focus:border-[#FFDF73] focus:outline-none cursor-pointer"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t.value} value={t.value} className="bg-[#140305] text-[#FAF7F2]">
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* HÀNG 2: BIỂU TƯỢNG Ô NHẬP & ĐỘ RỘNG TRÊN BIỂU MẪU (LAYOUT GRID) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-5">
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      Biểu tượng ô nhập
                    </label>
                    <select
                      value={field.icon || 'default'}
                      onChange={(e) => handleFieldChange(idx, 'icon', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none cursor-pointer"
                    >
                      {Object.entries(FIELD_ICONS).map(([k, item]) => (
                        <option key={k} value={k} className="bg-[#140305] text-[#FAF7F2]">
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full border border-[#D4AF37]/60 text-[#FFDF73] text-[9px] flex items-center justify-center font-serif font-bold">
                        i
                      </span>
                      <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80">
                        ĐỘ RỘNG TRÊN BIỂU MẪU (LAYOUT GRID)
                      </label>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 bg-[#0e0204] p-1 rounded-lg border border-[#D4AF37]/30">
                      {GRID_OPTIONS.map((g) => {
                        const isSelected = (field.gridWidth || '12/12') === g.value;
                        return (
                          <button
                            key={g.value}
                            type="button"
                            onClick={() => handleFieldChange(idx, 'gridWidth', g.value)}
                            className={`py-1.5 text-center rounded text-xs font-mono font-bold transition cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-[#140305] shadow-md'
                                : 'text-[#EADBCE]/70 hover:text-white hover:bg-[#240609]'
                            }`}
                          >
                            {g.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* HÀNG 3: MÃ KHÓA (KEY / CỘT SHEET) & CHECKBOX BẮT BUỘC */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8">
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      MÃ KHÓA (KEY / CỘT SHEET) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={field.key || ''}
                      onChange={(e) => handleFieldChange(idx, 'key', e.target.value)}
                      placeholder="Ví dụ: truong_1, ho_va_ten..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FFDF73] font-mono text-xs focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-4 flex items-center pt-3 sm:pt-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(field.required)}
                        onChange={(e) => handleFieldChange(idx, 'required', e.target.checked)}
                        className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-[#FAF7F2]">Bắt buộc</span>
                    </label>
                  </div>
                </div>

                {/* HÀNG TÙY CHỌN DÀNH CHO LOẠI Ô DROPDOWN / SELECT */}
                {field.type === 'select' && (
                  <div className="pt-2 border-t border-[#D4AF37]/15">
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      CÁC MỤC LỰA CHỌN (DROPDOWN OPTIONS) — Phân tách bằng dấu phẩy
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(field.options)
                          ? field.options.join(', ')
                          : field.options || ''
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          idx,
                          'options',
                          e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        )
                      }
                      placeholder="Mục 1, Mục 2, Mục 3..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Nút thêm trường mới ở dưới cùng */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleAddField}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-dashed border-[#D4AF37]/50 hover:border-[#FFDF73] text-[#FFDF73] hover:bg-[#3d090f]/50 text-xs font-serif uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm một trường thông tin khác</span>
          </button>
        </div>
      </div>

      {/* ===================== KHU VỰC XEM TRƯỚC PHẦN FORM (CHÍNH XÁC NHƯ ẢNH USER) ===================== */}
      <div className="space-y-4">
        {/* Tiêu đề mục Xem trước */}
        <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#FFDF73] uppercase tracking-wider">
          <Eye className="w-4 h-4 text-[#FFDF73]" />
          <span>Xem trước Form liên hệ thực tế</span>
        </div>

        {/* Khung Form Xem Trước: Thẻ nền sáng với dải viền hoàng gia, đúng theo ảnh chụp màn hình */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl bg-white text-gray-900 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-300/40 overflow-hidden relative">
          {/* Dải màu nhấn hoàng kim đỉnh thẻ */}
          <div className="h-1.5 bg-gradient-to-r from-amber-500 via-[#8b111e] to-amber-500 w-full" />

          <div className="p-6 sm:p-10 space-y-5">
            {/* Huy hiệu Cổng tiếp nhận */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center text-amber-700 text-xs font-bold shrink-0">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-serif font-bold tracking-[0.18em] uppercase text-amber-700">
                {parsedProps.form_portal_badge || 'CỔNG TIẾP NHẬN TRỰC TUYẾN'}
              </span>
            </div>

            {/* Tiêu đề chính */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#7a0c16] uppercase tracking-tight leading-tight">
              {parsedProps.form_title || 'GỬI PHẢN HỒI HOẶC YÊU CẦU TƯ VẤN'}
            </h2>

            {/* Đoạn mô tả dẫn nhập */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              {parsedProps.form_description ||
                'Quý vị vui lòng để lại thông tin và nội dung cần tư vấn để Ban Thư ký Trung tâm hỗ trợ.'}
            </p>

            {/* Ghi chú trường bắt buộc */}
            <div className="text-xs text-gray-500 italic pt-0.5">
              {parsedProps.form_note || 'Các trường có dấu * là bắt buộc.'}
            </div>

            {/* LƯỚI 12 CỘT HIỂN THỊ CÁC TRƯỜNG THEO ĐỘ RỘNG GRID ĐƯỢC CHỌN */}
            <div className="grid grid-cols-12 gap-4 pt-2">
              {fields.map((f, fIdx) => {
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

                const IconComponent = resolveFieldIcon(f);

                return (
                  <div key={f.id || f.key || fIdx} className={colClass}>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 font-sans">
                      {f.label || `Trường thông tin #${fIdx + 1}`}
                      {f.required && (
                        <span className="text-red-600 ml-1 font-bold">*</span>
                      )}
                    </label>

                    {f.type === 'textarea' ? (
                      <div className="relative rounded-xl border border-gray-300 bg-gray-50/70 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all p-3">
                        <div className="flex items-start gap-2.5">
                          {IconComponent && (
                            <IconComponent className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                          )}
                          <textarea
                            rows={4}
                            placeholder={f.placeholder || 'Nhập thông tin...'}
                            className="w-full bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-y"
                          />
                        </div>
                      </div>
                    ) : f.type === 'select' ? (
                      <div className="relative rounded-xl border border-gray-300 bg-gray-50/70 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all flex items-center px-3 py-2.5">
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-amber-600 shrink-0 mr-2.5" />
                        )}
                        <select className="w-full bg-transparent border-none text-sm text-gray-800 focus:outline-none appearance-none cursor-pointer pr-6">
                          <option value="" disabled selected>
                            {f.placeholder || 'Vui lòng chọn...'}
                          </option>
                          {(f.options || []).map((opt, oIdx) => (
                            <option key={oIdx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-amber-600 pointer-events-none absolute right-3" />
                      </div>
                    ) : (
                      <div className="relative rounded-xl border border-gray-300 bg-gray-50/70 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all flex items-center px-3 py-2.5">
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-amber-600 shrink-0 mr-2.5" />
                        )}
                        <input
                          type={f.type || 'text'}
                          placeholder={f.placeholder || 'Nhập thông tin...'}
                          className="w-full bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Nút gửi đề xuất */}
            <div className="pt-4">
              <button
                type="button"
                className="w-full py-4 px-6 rounded-xl font-serif text-sm sm:text-base font-bold uppercase tracking-wider text-white shadow-xl transition-all cursor-pointer hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2"
                style={{
                  background:
                    'linear-gradient(135deg, #a31826 0%, #7a0c16 50%, #52070e 100%)',
                  boxShadow: '0 8px 24px rgba(122, 12, 22, 0.35)',
                }}
              >
                <span>{parsedProps.form_submit_text || 'GỬI THÔNG TIN'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CÁC PHẦN KHÁC: HERO & TUYẾN ĐỒNG HÀNH ===================== */}
      <details className="p-5 rounded-2xl bg-[#140305] border border-[#D4AF37]/25 shadow-lg group">
        <summary className="font-serif text-sm font-bold text-[#FFDF73] uppercase tracking-wider cursor-pointer list-none flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Mở rộng: Chỉnh sửa Khung Đầu Trang (Hero Banner) &amp; Tuyến Đồng Hành</span>
          </span>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>

        <div className="pt-5 space-y-6">
          {/* SECTION HERO */}
          <div className="p-4 rounded-xl bg-[#1e0508] border border-[#D4AF37]/30 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFDF73] uppercase">
              1. Khung Đầu Trang (Hero Banner)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                  Huy hiệu đầu trang (badge)
                </label>
                <input
                  type="text"
                  value={parsedProps.badge ?? '✦ BÁCH NIÊN KẾT NỐI • ĐỒNG HÀNH & LAN TỎA ✦'}
                  onChange={(e) => handlePropChange('badge', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu đề chính (headline)
                </label>
                <input
                  type="text"
                  value={parsedProps.headline ?? 'MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP'}
                  onChange={(e) => handlePropChange('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                  Mô tả dẫn nhập (description)
                </label>
                <textarea
                  rows={2}
                  value={
                    parsedProps.description ??
                    'Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm, một ý tưởng nghiên cứu hoặc một đề xuất hợp tác, hãy kết nối với chúng tôi. Không có đóng góp nào là nhỏ khi cùng hướng đến việc viết tiếp một di sản chung của nền nghệ thuật Việt Nam.'
                  }
                  onChange={(e) => handlePropChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#0e0204] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION TUYẾN ĐỒNG HÀNH */}
          <div className="p-4 rounded-xl bg-[#1e0508] border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-[#FFDF73] uppercase">
                2. Các Tuyến Tham Gia Đồng Hành ({routes.length} tuyến)
              </h4>
              <button
                type="button"
                onClick={handleAddRoute}
                className="px-3 py-1 rounded bg-[#D4AF37] text-[#140305] text-xs font-bold uppercase cursor-pointer"
              >
                + Thêm tuyến
              </button>
            </div>

            <div className="space-y-3">
              {routes.map((route, idx) => {
                const ResolvedComp = resolveLeadershipIcon(route.icon, Compass);
                return (
                  <div
                    key={route.id || route.key || idx}
                    className="p-3 rounded-lg bg-[#0e0204] border border-[#D4AF37]/30 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#FFDF73]">
                          #{idx + 1}
                        </span>
                        <span className="text-xs font-serif font-bold text-[#FAF7F2]">
                          {route.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveRoute(idx, -1)}
                          className="p-1 text-[#FFDF73] disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === routes.length - 1}
                          onClick={() => handleMoveRoute(idx, 1)}
                          className="p-1 text-[#FFDF73] disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRoute(idx)}
                          className="p-1 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={route.badge || ''}
                        onChange={(e) => handleRouteChange(idx, 'badge', e.target.value)}
                        placeholder="Huy hiệu tuyến..."
                        className="px-2 py-1 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={route.title || ''}
                        onChange={(e) => handleRouteChange(idx, 'title', e.target.value)}
                        placeholder="Tiêu đề tuyến..."
                        className="px-2 py-1 rounded bg-[#180406] border border-[#D4AF37]/30 text-xs text-white"
                      />
                      <IconSelectDropdown
                        label="Biểu tượng Lucide"
                        value={route.icon}
                        onChange={(newIcon) => handleRouteChange(idx, 'icon', newIcon)}
                        resolvedIcon={ResolvedComp}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default ContactPageEditor;
