import React from 'react';
import {
  Handshake,
  Users,
  Shield,
  Globe,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Sparkles,
  Layers,
  ChevronDown,
  Check,
  Search,
  ShieldCheck,
  Palette,
  Paintbrush,
  Hammer,
  Compass,
  Cpu,
  BookOpen,
  Landmark,
  Megaphone,
  Database,
  Wallet,
  Share2,
  GraduationCap,
  Store,
  Image as ImageIcon,
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
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

  const filteredIcons = React.useMemo(() => {
    if (!search.trim()) return Object.entries(icons);
    const query = search.toLowerCase();
    return Object.entries(icons).filter(([key, item]) =>
      key.toLowerCase().includes(query) || (item.label && item.label.toLowerCase().includes(query))
    );
  }, [icons, search]);

  return (
    <div className="relative space-y-1" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <label className="block text-[10px] uppercase text-[#EADBCE]/70">
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

      {/* Trigger Button */}
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
          className={`w-4 h-4 text-[#FFDF73] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg bg-[#180406] border border-[#D4AF37]/60 shadow-[0_12px_32px_rgba(0,0,0,0.95)] p-2 backdrop-blur-md">
          {/* Search box */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-[#D4AF37]/60 absolute left-2 top-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm biểu tượng Lucide..."
              className="w-full pl-7 pr-2.5 py-1 text-xs rounded bg-[#0d0103] border border-[#D4AF37]/30 text-white placeholder-[#EADBCE]/40 focus:border-[#FFDF73] focus:outline-none"
              autoFocus
            />
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5 custom-scrollbar pr-0.5">
            {/* Tùy chọn Tự động */}
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-xs text-left transition cursor-pointer ${
                !value
                  ? 'bg-[#3d090f] text-[#FFDF73] font-bold border border-[#FFDF73]/40'
                  : 'text-[#EADBCE]/80 hover:bg-[#28070b] hover:text-white'
              }`}
            >
              <div className="w-6 h-6 rounded bg-[#100203] border border-[#D4AF37]/30 flex items-center justify-center text-[#FFDF73] shrink-0">
                ✦
              </div>
              <span className="flex-1 truncate">✦ Tự động (theo vai trò / từ khóa)</span>
              {!value && <Check className="w-3.5 h-3.5 text-[#FFDF73] shrink-0" />}
            </button>

            {/* Danh sách các biểu tượng Lucide trực quan */}
            {filteredIcons.map(([key, item]) => {
              const IconCmp = item.component;
              const isSelected = value === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onChange(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-xs text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#3d090f] text-[#FFDF73] font-bold border border-[#FFDF73]/50 shadow-[0_0_8px_rgba(255,223,115,0.3)]'
                      : 'text-[#EADBCE]/85 hover:bg-[#28070b] hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-[#100203] border border-[#D4AF37]/30 flex items-center justify-center text-[#FFDF73] shrink-0">
                    <IconCmp className="w-3.5 h-3.5" />
                  </div>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FFDF73] shrink-0" />}
                </button>
              );
            })}

            {filteredIcons.length === 0 && (
              <div className="py-3 text-center text-xs text-[#EADBCE]/50 italic">
                Không tìm thấy biểu tượng phù hợp
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const DEFAULT_CORE_UNITS = [
  {
    id: 1,
    role: 'CƠ QUAN ĐIỀU PHỐI NỀN TẢNG',
    name: 'VIỆN KỶ LỤC VIỆT NAM (VIETKINGS)',
    desc: 'Điều phối chiến lược nền tảng; kết nối mạng lưới chuyên gia; tổ chức nghiên cứu, tư liệu hóa, đề cử và xác lập các chuyên đề kỷ lục phù hợp; góp phần lan tỏa giá trị sơn mài Việt Nam trong nước và quốc tế.',
    tags: 'Xác thực kỷ lục, Bảo trợ dữ liệu di sản, Mạng lưới quốc tế',
    icon: 'ShieldCheck',
  },
  {
    id: 2,
    role: 'ĐƠN VỊ CHỦ TRÌ NỘI DUNG',
    name: 'TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO',
    desc: 'Xây dựng cấu trúc nội dung, phát triển chương trình liên ngành, kết nối công nghiệp văn hóa và triển khai các mô hình hợp tác sáng tạo.',
    tags: 'Phát triển nội dung, Liên kết công nghiệp văn hóa, Đổi mới sáng tạo',
    icon: 'Palette',
  },
];

const DEFAULT_ADVISORY_PANELS = [
  {
    id: 1,
    icon: 'Paintbrush',
    title: 'Mỹ Thuật & Lịch Sử Nghệ Thuật',
    desc: 'Thẩm định giá trị học thuật, niên đại trường phái và ngôn ngữ tạo hình.',
    status: 'Đang cập nhật',
  },
  {
    id: 2,
    icon: 'Hammer',
    title: 'Làng Nghề & Kỹ Thuật Sơn Mài',
    desc: 'Bảo tồn bí quyết thủ công, quy chuẩn vật liệu sơn ta và kỹ thuật cổ truyền.',
    status: 'Đang cập nhật',
  },
  {
    id: 3,
    icon: 'Compass',
    title: 'Thiết Kế & Kiến Trúc Ứng Dụng',
    desc: 'Định hình không gian đương đại, ngôn ngữ tạo dáng và sản phẩm di sản.',
    status: 'Đang cập nhật',
  },
  {
    id: 4,
    icon: 'Cpu',
    title: 'Kinh Tế Di Sản & Công Nghệ Số',
    desc: 'Số hóa lưu trữ, định danh số bản quyền và chuyển giao thương mại bền vững.',
    status: 'Đang cập nhật',
  },
];

const DEFAULT_PROJECT_TEAMS = [
  {
    id: 1,
    num: '01',
    icon: 'BookOpen',
    title: '01. Nội dung – học thuật',
    desc: 'Nghiên cứu, biên tập, diễn giả, kỷ yếu và hồ sơ chuyên đề.',
    tag: 'Học thuật & Xuất bản',
  },
  {
    id: 2,
    num: '02',
    icon: 'Landmark',
    title: '02. Sáng tạo – triển lãm',
    desc: 'Tác phẩm, không gian, nghệ sĩ, nghệ nhân và trải nghiệm công chúng.',
    tag: 'Không gian & Trưng bày',
  },
  {
    id: 3,
    num: '03',
    icon: 'Handshake',
    title: '03. Đối ngoại – đối tác',
    desc: 'Trường, viện, doanh nghiệp, nhà tài trợ và mạng lưới quốc tế.',
    tag: 'Liên kết & Mạng lưới',
  },
  {
    id: 4,
    num: '04',
    icon: 'Megaphone',
    title: '04. Truyền thông – cộng đồng',
    desc: 'Nhận diện, báo chí, mạng xã hội, giáo dục và open call.',
    tag: 'Truyền thông di sản',
  },
  {
    id: 5,
    num: '05',
    icon: 'Database',
    title: '05. Công nghệ – dữ liệu',
    desc: 'Website, kho tư liệu, mã định danh, bản quyền và lưu trữ số.',
    tag: 'Hạ tầng số & Kho lưu trữ',
  },
  {
    id: 6,
    num: '06',
    icon: 'Wallet',
    title: '06. Vận hành – tài chính',
    desc: 'Kế hoạch, ngân sách, hậu cần, pháp lý và đánh giá hiệu quả.',
    tag: 'Quản trị & Pháp lý',
  },
];

const DEFAULT_NETWORK_PARTNERS = [
  {
    id: 1,
    icon: 'Share2',
    title: 'Không Gian Đổi Mới Sáng Tạo & Viện Nghiên Cứu',
    status: 'Đang cập nhật',
  },
  {
    id: 2,
    icon: 'GraduationCap',
    title: 'Cơ Sở Đào Tạo Mỹ Thuật & Thiết Kế',
    status: 'Đang cập nhật',
  },
  {
    id: 3,
    icon: 'Store',
    title: 'Hiệp Hội Làng Nghề & Doanh Nghiệp Vật Liệu',
    status: 'Đang cập nhật',
  },
  {
    id: 4,
    icon: 'Image',
    title: 'Bảo Tàng, Không Gian Trưng Bày & Truyền Thông',
    status: 'Đang cập nhật',
  },
];

const LeadershipPageEditor = ({
  parsedProps = {},
  handlePropChange,
  handleSavePage,
  saving = false,
}) => {
  // 1. Core Units List
  const rawCoreUnits = parsedProps.core_units;
  const coreUnits =
    Array.isArray(rawCoreUnits) && rawCoreUnits.length > 0
      ? rawCoreUnits
      : DEFAULT_CORE_UNITS;

  const handleCoreUnitChange = (index, field, value) => {
    const updated = [...coreUnits];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('core_units', updated);
  };

  const handleAddCoreUnit = () => {
    const newUnit = {
      id: Date.now(),
      role: 'ĐƠN VỊ ĐỒNG HÀNH MỚI',
      name: 'TÊN ĐƠN VỊ / TỔ CHỨC',
      desc: 'Mô tả vai trò, nhiệm vụ và sứ mệnh đồng hành cùng hành trình di sản sơn mài.',
      tags: 'Đồng hành, Di sản, Hợp tác',
      icon: 'ShieldCheck',
    };
    handlePropChange('core_units', [...coreUnits, newUnit]);
  };

  const handleRemoveCoreUnit = (index) => {
    if (coreUnits.length <= 1) {
      alert('Trang cần ít nhất 1 cơ quan điều phối!');
      return;
    }
    const updated = coreUnits.filter((_, i) => i !== index);
    handlePropChange('core_units', updated);
  };

  const handleMoveCoreUnit = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= coreUnits.length) return;
    const updated = [...coreUnits];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    handlePropChange('core_units', updated);
  };

  // 2. Advisory Panels List
  const rawAdvisory = parsedProps.advisory_panels;
  const advisoryPanels =
    Array.isArray(rawAdvisory) && rawAdvisory.length > 0
      ? rawAdvisory
      : DEFAULT_ADVISORY_PANELS;

  const handleAdvisoryChange = (index, field, value) => {
    const updated = [...advisoryPanels];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('advisory_panels', updated);
  };

  const handleAddAdvisory = () => {
    const newPanel = {
      id: Date.now(),
      icon: 'Paintbrush',
      title: 'Lĩnh Vực Chuyên Môn Mới',
      desc: 'Mô tả trọng trách học thuật, chuyên môn giám định và thẩm định di sản.',
      status: 'Đang cập nhật',
    };
    handlePropChange('advisory_panels', [...advisoryPanels, newPanel]);
  };

  const handleRemoveAdvisory = (index) => {
    if (advisoryPanels.length <= 1) {
      alert('Cần giữ ít nhất 1 lĩnh vực chuyên môn trong Hội đồng!');
      return;
    }
    const updated = advisoryPanels.filter((_, i) => i !== index);
    handlePropChange('advisory_panels', updated);
  };

  const handleMoveAdvisory = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= advisoryPanels.length) return;
    const updated = [...advisoryPanels];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    handlePropChange('advisory_panels', updated);
  };

  // 3. Project Teams List
  const rawTeams = parsedProps.project_teams;
  const projectTeams =
    Array.isArray(rawTeams) && rawTeams.length > 0
      ? rawTeams
      : DEFAULT_PROJECT_TEAMS;

  const handleTeamChange = (index, field, value) => {
    const updated = [...projectTeams];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('project_teams', updated);
  };

  const handleAddTeam = () => {
    const nextNum = String(projectTeams.length + 1).padStart(2, '0');
    const newTeam = {
      id: Date.now(),
      num: nextNum,
      icon: 'BookOpen',
      title: `${nextNum}. Ban chức năng mới`,
      desc: 'Mô tả nhiệm vụ cụ thể, kế hoạch triển khai và phạm vi phụ trách của ban.',
      tag: 'Ban thực thi',
    };
    handlePropChange('project_teams', [...projectTeams, newTeam]);
  };

  const handleRemoveTeam = (index) => {
    if (projectTeams.length <= 1) {
      alert('Cần giữ ít nhất 1 ban dự án!');
      return;
    }
    const updated = projectTeams.filter((_, i) => i !== index);
    handlePropChange('project_teams', updated);
  };

  const handleMoveTeam = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projectTeams.length) return;
    const updated = [...projectTeams];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    handlePropChange('project_teams', updated);
  };

  // 4. Network Partners List
  const rawPartners = parsedProps.network_partners;
  const networkPartners =
    Array.isArray(rawPartners) && rawPartners.length > 0
      ? rawPartners
      : DEFAULT_NETWORK_PARTNERS;

  const handlePartnerChange = (index, field, value) => {
    const updated = [...networkPartners];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('network_partners', updated);
  };

  const handleAddPartner = () => {
    const newPartner = {
      id: Date.now(),
      icon: 'Share2',
      title: 'Nhóm Đối Tác / Tổ Chức Mới',
      status: 'Đang cập nhật',
    };
    handlePropChange('network_partners', [...networkPartners, newPartner]);
  };

  const handleRemovePartner = (index) => {
    if (networkPartners.length <= 1) {
      alert('Cần giữ ít nhất 1 nhóm đối tác!');
      return;
    }
    const updated = networkPartners.filter((_, i) => i !== index);
    handlePropChange('network_partners', updated);
  };

  const handleMovePartner = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= networkPartners.length) return;
    const updated = [...networkPartners];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    handlePropChange('network_partners', updated);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Save Action Bar */}
      {handleSavePage && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-[#2a080c] via-[#1a0407] to-[#120204] border border-[#D4AF37]/40 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3d090f] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] shadow-[0_0_12px_rgba(255,223,115,0.3)]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-[#FFDF73]">
                Quản Trị Nội Dung: Ban Điều Hành &amp; Hội Đồng Cố Vấn
              </h4>
              <p className="text-xs text-[#EADBCE]/70">
                Cho phép thêm, sửa, xóa, đổi icon Lucide và sắp xếp thứ tự từng item của các khối.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA7C11] text-[#120204] text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      )}

      {/* SECTION 1: HERO (KHÔNG CÓ PHẦN LOGO) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Handshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Ban Điều Hành (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề chính, huy hiệu trọng trách và đoạn mô tả dẫn nhập.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              placeholder="VD: NHỮNG NGƯỜI GIỮ NHỊP CHO HÀNH TRÌNH"
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả dẫn nhập (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              placeholder="Nhập mô tả dẫn nhập cho trang..."
              className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs leading-relaxed focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: CORE UNITS (CƠ QUAN ĐIỀU PHỐI NỀN TẢNG & CHỦ TRÌ NỘI DUNG) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 2: Cơ Quan Điều Phối Nền Tảng &amp; Chủ Trì ({coreUnits.length} đơn vị)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cho phép thêm, sửa tên, vai trò, nhãn thẻ, chọn icon Lucide dạng dropdown và xóa đơn vị.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddCoreUnit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a080c] hover:bg-[#4f0c11] border border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] transition cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Đơn Vị</span>
          </button>
        </div>

        <div className="space-y-4">
          {coreUnits.map((unit, idx) => {
            const UnitIcon = resolveLeadershipIcon(unit.icon, idx === 0 ? ShieldCheck : Palette);

            return (
              <div
                key={unit.id || idx}
                className="p-4 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-3 relative group hover:border-[#FFDF73]/50 transition"
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold flex items-center justify-center font-mono">
                      #{idx + 1}
                    </span>
                    <div className="w-7 h-7 rounded bg-[#200508] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73]">
                      <UnitIcon className="w-4 h-4" />
                    </div>
                    <span className="font-sans text-sm font-bold text-[#FFDF73]">
                      {unit.name || `Cơ quan #${idx + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveCoreUnit(idx, -1)}
                      disabled={idx === 0}
                      title="Di chuyển lên"
                      className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveCoreUnit(idx, 1)}
                      disabled={idx === coreUnits.length - 1}
                      title="Di chuyển xuống"
                      className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveCoreUnit(idx)}
                      title="Xóa đơn vị này"
                      className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-1">
                      Vai trò / Chức vụ hiển thị
                    </label>
                    <input
                      type="text"
                      value={unit.role || ''}
                      onChange={(e) => handleCoreUnitChange(idx, 'role', e.target.value)}
                      placeholder="VD: CƠ QUAN ĐIỀU PHỐI NỀN TẢNG"
                      className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-semibold focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-1">
                      Tên cơ quan / Đơn vị
                    </label>
                    <input
                      type="text"
                      value={unit.name || ''}
                      onChange={(e) => handleCoreUnitChange(idx, 'name', e.target.value)}
                      placeholder="VD: VIỆN KỶ LỤC VIỆT NAM (VIETKINGS)"
                      className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] font-bold focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div>
                    <IconSelectDropdown
                      label="Biểu tượng Lucide (Icon)"
                      value={unit.icon || ''}
                      onChange={(val) => handleCoreUnitChange(idx, 'icon', val)}
                      icons={LEADERSHIP_ICONS}
                      resolvedIcon={UnitIcon}
                      defaultPlaceholder="Tự động theo vai trò"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-1">
                      Mô tả chức năng &amp; nhiệm vụ
                    </label>
                    <textarea
                      rows={2}
                      value={unit.desc || ''}
                      onChange={(e) => handleCoreUnitChange(idx, 'desc', e.target.value)}
                      placeholder="Nhập mô tả hoạt động..."
                      className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white leading-relaxed focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-1">
                      Các nhãn thẻ nổi bật (Phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(unit.tags)
                          ? unit.tags.join(', ')
                          : unit.tags || ''
                      }
                      onChange={(e) => handleCoreUnitChange(idx, 'tags', e.target.value)}
                      placeholder="Xác thực kỷ lục, Bảo trợ dữ liệu di sản, Mạng lưới quốc tế"
                      className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: ADVISORY PANELS (HỘI ĐỒNG CHUYÊN MÔN) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 3: Hội Đồng Chuyên Môn &amp; Lĩnh Vực Thẩm Định ({advisoryPanels.length} lĩnh vực)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cấu hình tiêu đề, châm ngôn và các cột lĩnh vực thẩm định học thuật.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddAdvisory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a080c] hover:bg-[#4f0c11] border border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] transition cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Lĩnh Vực</span>
          </button>
        </div>

        {/* Tiêu đề khối */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối (advisory_title)
            </label>
            <input
              type="text"
              value={parsedProps.advisory_title || ''}
              onChange={(e) => handlePropChange('advisory_title', e.target.value)}
              placeholder="VD: Hội đồng chuyên môn"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Châm ngôn / Trích dẫn (advisory_subtitle)
            </label>
            <input
              type="text"
              value={parsedProps.advisory_subtitle || ''}
              onChange={(e) => handlePropChange('advisory_subtitle', e.target.value)}
              placeholder="VD: “Bảo chứng chiều sâu học thuật và nghề nghiệp”"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-[#FFE599] italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả tổng quan (advisory_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.advisory_desc || ''}
              onChange={(e) => handlePropChange('advisory_desc', e.target.value)}
              placeholder="Mô tả chức năng Hội đồng..."
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white leading-relaxed focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các panel */}
        <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73]">
            Danh Sách Các Lĩnh Vực Chuyên Môn
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {advisoryPanels.map((panel, idx) => {
              const PanelIcon = resolveLeadershipIcon(panel.icon, Paintbrush);

              return (
                <div
                  key={panel.id || idx}
                  className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-2.5 relative group hover:border-[#FFDF73]/50 transition"
                >
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-[11px] font-bold flex items-center justify-center font-mono">
                        #{idx + 1}
                      </span>
                      <PanelIcon className="w-4 h-4 text-[#FFDF73]" />
                      <span className="font-sans text-xs font-bold text-[#FFDF73] truncate">
                        {panel.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveAdvisory(idx, -1)}
                        disabled={idx === 0}
                        title="Lên"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveAdvisory(idx, 1)}
                        disabled={idx === advisoryPanels.length - 1}
                        title="Xuống"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveAdvisory(idx)}
                        title="Xóa"
                        className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Tên lĩnh vực
                        </label>
                        <input
                          type="text"
                          value={panel.title || ''}
                          onChange={(e) => handleAdvisoryChange(idx, 'title', e.target.value)}
                          placeholder="VD: Mỹ Thuật & Lịch Sử..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-semibold focus:border-[#FFDF73] focus:outline-none"
                        />
                      </div>
                      <div>
                        <IconSelectDropdown
                          label="Biểu tượng Lucide"
                          value={panel.icon || ''}
                          onChange={(val) => handleAdvisoryChange(idx, 'icon', val)}
                          icons={LEADERSHIP_ICONS}
                          resolvedIcon={PanelIcon}
                          defaultPlaceholder="Chọn biểu tượng"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                        Mô tả trọng trách
                      </label>
                      <textarea
                        rows={2}
                        value={panel.desc || ''}
                        onChange={(e) => handleAdvisoryChange(idx, 'desc', e.target.value)}
                        placeholder="Mô tả thẩm định..."
                        className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white focus:border-[#FFDF73] focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                        Trạng thái hiển thị chân thẻ
                      </label>
                      <input
                        type="text"
                        value={panel.status || ''}
                        onChange={(e) => handleAdvisoryChange(idx, 'status', e.target.value)}
                        placeholder="VD: Đang cập nhật, Thường trực..."
                        className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] italic focus:border-[#FFDF73] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 4: PROJECT TEAMS (BAN DỰ ÁN) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 4: Ban Dự Án Thực Thi ({projectTeams.length} ban chức năng)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Thêm, sửa, xóa các ban chuyên trách thực hiện từng mảng công việc của dự án.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddTeam}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a080c] hover:bg-[#4f0c11] border border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] transition cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Ban Dự Án</span>
          </button>
        </div>

        {/* Tiêu đề khối Ban dự án */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối (teams_title)
            </label>
            <input
              type="text"
              value={parsedProps.teams_title || ''}
              onChange={(e) => handlePropChange('teams_title', e.target.value)}
              placeholder="VD: Ban Dự Án"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Châm ngôn khối (teams_subtitle)
            </label>
            <input
              type="text"
              value={parsedProps.teams_subtitle || ''}
              onChange={(e) => handlePropChange('teams_subtitle', e.target.value)}
              placeholder="VD: “Biến định hướng thành hoạt động”"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-[#FFE599] italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các ban */}
        <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73]">
            Danh Sách Ban Chức Năng
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projectTeams.map((team, idx) => {
              const TeamIcon = resolveLeadershipIcon(team.icon, BookOpen);

              return (
                <div
                  key={team.id || idx}
                  className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-2.5 relative group hover:border-[#FFDF73]/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-[11px] font-bold flex items-center justify-center font-mono">
                          {team.num || `#${idx + 1}`}
                        </span>
                        <TeamIcon className="w-4 h-4 text-[#FFDF73]" />
                        <span className="font-sans text-xs font-bold text-[#FFDF73] truncate">
                          {team.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveTeam(idx, -1)}
                          disabled={idx === 0}
                          title="Lên"
                          className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveTeam(idx, 1)}
                          disabled={idx === projectTeams.length - 1}
                          title="Xuống"
                          className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeam(idx)}
                          title="Xóa"
                          className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                            Số STT
                          </label>
                          <input
                            type="text"
                            value={team.num || ''}
                            onChange={(e) => handleTeamChange(idx, 'num', e.target.value)}
                            placeholder="01, 02..."
                            className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-mono focus:border-[#FFDF73] focus:outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <IconSelectDropdown
                            label="Biểu tượng Lucide"
                            value={team.icon || ''}
                            onChange={(val) => handleTeamChange(idx, 'icon', val)}
                            icons={LEADERSHIP_ICONS}
                            resolvedIcon={TeamIcon}
                            defaultPlaceholder="Chọn icon"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Tên ban chức năng
                        </label>
                        <input
                          type="text"
                          value={team.title || ''}
                          onChange={(e) => handleTeamChange(idx, 'title', e.target.value)}
                          placeholder="VD: 01. Nội dung – học thuật..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold focus:border-[#FFDF73] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Mô tả nhiệm vụ
                        </label>
                        <textarea
                          rows={2}
                          value={team.desc || ''}
                          onChange={(e) => handleTeamChange(idx, 'desc', e.target.value)}
                          placeholder="Nhập nhiệm vụ..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white focus:border-[#FFDF73] focus:outline-none leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Nhãn phân loại (Thẻ chân)
                        </label>
                        <input
                          type="text"
                          value={team.tag || ''}
                          onChange={(e) => handleTeamChange(idx, 'tag', e.target.value)}
                          placeholder="VD: Học thuật & Xuất bản..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] uppercase font-mono text-[10px] focus:border-[#FFDF73] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 5: NETWORK PARTNERS (MẠNG LƯỚI PHỐI HỢP & KÊU GỌI) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 5: Mạng Lưới Phối Hợp &amp; Đối Tác ({networkPartners.length} nhóm)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cấu hình các nhóm đối tác chiến lược và nút kêu gọi hợp tác.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddPartner}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a080c] hover:bg-[#4f0c11] border border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] transition cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Nhóm Đối Tác</span>
          </button>
        </div>

        {/* Cấu hình tiêu đề & Nút CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối (network_title)
            </label>
            <input
              type="text"
              value={parsedProps.network_title || ''}
              onChange={(e) => handlePropChange('network_title', e.target.value)}
              placeholder="VD: Mạng lưới phối hợp"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Châm ngôn khối (network_subtitle)
            </label>
            <input
              type="text"
              value={parsedProps.network_subtitle || ''}
              onChange={(e) => handlePropChange('network_subtitle', e.target.value)}
              placeholder="VD: “Cùng tạo nên hệ sinh thái”"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-[#FFE599] italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả mạng lưới (network_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.network_desc || ''}
              onChange={(e) => handlePropChange('network_desc', e.target.value)}
              placeholder="Mô tả các nhóm đối tác..."
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white leading-relaxed focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Nhãn nút kêu gọi đối tác (network_btn_text)
            </label>
            <input
              type="text"
              value={parsedProps.network_btn_text || ''}
              onChange={(e) => handlePropChange('network_btn_text', e.target.value)}
              placeholder="VD: TRỞ THÀNH ĐỐI TÁC"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#FFDF73] mb-1">
              Liên kết nút kêu gọi (network_btn_link)
            </label>
            <input
              type="text"
              value={parsedProps.network_btn_link || ''}
              onChange={(e) => handlePropChange('network_btn_link', e.target.value)}
              placeholder="mailto:info@sonmaihoihoavietnam.com hoặc /contact"
              className="w-full px-3 py-1.5 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white font-mono focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các nhóm đối tác */}
        <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73]">
            Danh Sách Các Nhóm Đối Tác
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {networkPartners.map((partner, idx) => {
              const PartnerIcon = resolveLeadershipIcon(partner.icon, Share2);

              return (
                <div
                  key={partner.id || idx}
                  className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/30 space-y-2 relative group hover:border-[#FFDF73]/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-[11px] font-bold flex items-center justify-center font-mono">
                          #{idx + 1}
                        </span>
                        <PartnerIcon className="w-4 h-4 text-[#FFDF73]" />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMovePartner(idx, -1)}
                          disabled={idx === 0}
                          title="Lên"
                          className="p-0.5 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePartner(idx, 1)}
                          disabled={idx === networkPartners.length - 1}
                          title="Xuống"
                          className="p-0.5 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemovePartner(idx)}
                          title="Xóa"
                          className="p-0.5 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <IconSelectDropdown
                          label="Biểu tượng Lucide"
                          value={partner.icon || ''}
                          onChange={(val) => handlePartnerChange(idx, 'icon', val)}
                          icons={LEADERSHIP_ICONS}
                          resolvedIcon={PartnerIcon}
                          defaultPlaceholder="Chọn biểu tượng"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Tên nhóm đối tác
                        </label>
                        <textarea
                          rows={2}
                          value={partner.title || ''}
                          onChange={(e) => handlePartnerChange(idx, 'title', e.target.value)}
                          placeholder="VD: Cơ Sở Đào Tạo..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-semibold focus:border-[#FFDF73] focus:outline-none leading-snug"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-[#EADBCE]/70 mb-0.5">
                          Trạng thái hiển thị
                        </label>
                        <input
                          type="text"
                          value={partner.status || ''}
                          onChange={(e) => handlePartnerChange(idx, 'status', e.target.value)}
                          placeholder="VD: Đang cập nhật..."
                          className="w-full px-2 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] italic focus:border-[#FFDF73] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Save Action Bar */}
      {handleSavePage && (
        <div className="flex justify-end pt-4 pb-8">
          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA7C11] text-[#120204] text-sm font-bold uppercase tracking-wider shadow-2xl hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Đang lưu hệ thống...' : 'Lưu Tất Cả Thay Đổi Trang Ban Điều Hành'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadershipPageEditor;
