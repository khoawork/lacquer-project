import React from 'react';
import {
  BookOpen,
  Layers,
  BookMarked,
  Sparkles,
  Award,
  Save,
  RefreshCw,
  Send,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  FileText,
  Upload,
  ChevronDown,
  Check,
  Search,
} from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';
import {
  SCHEMA_TYPE_ICONS,
  SCHEMA_STATUS_ICONS,
  resolveTypeIcon,
  resolveStatusIcon,
} from '../../archive/archiveIconRegistry';

const DEFAULT_VOLUMES = [
  {
    vol: 'TẬP I',
    era: '1930 — 1954',
    title: 'Vật liệu tự nhiên & Kỹ pháp Then cổ truyền',
    focus: 'Từ kỹ nghệ phủ bóng dân gian đến ngôn ngữ hội họa bác học độc bản tại trường Mỹ thuật Đông Dương.',
    pages: '380 trang',
    papers: '24 Chuyên luận khoa học',
    status: 'Đã hoàn tất bản thảo',
  },
  {
    vol: 'TẬP II',
    era: '1954 — 1986',
    title: 'Các danh họa tiêu biểu và tác phẩm kinh điển',
    focus: 'Khảo sát điền dã vùng cây sơn ta Phú Thọ, kỹ thuật ủ then Hạ Thái, Tương Bình Hiệp và chuỗi cung ứng vật liệu.',
    pages: '420 trang',
    papers: '32 Hồ sơ điền dã',
    status: 'Đang biên tập phản biện',
  },
  {
    vol: 'TẬP III',
    era: '1986 — 2010',
    title: 'Kinh tế di sản & Thị trường nghệ thuật đương đại',
    focus: 'Hệ thống tác giả, trường phái sáng tác tiêu biểu: Nguyễn Gia Trí, Phạm Hậu, Nguyễn Tư Nghiêm, Trần Văn Cẩn...',
    pages: '510 trang',
    papers: '45 Hồ sơ tác phẩm bảo vật',
    status: 'Đang thẩm định tư liệu',
  },
  {
    vol: 'TẬP IV',
    era: '2010 — 2030',
    title: 'Hồ sơ đề cử Di sản Văn hóa Thế giới',
    focus: 'Thực hành thử nghiệm, định danh số, bảo tồn tích hợp và chiến lược đưa sơn mài Việt Nam bước ra thế giới.',
    pages: '460 trang',
    papers: '38 Đề xuất mô hình kinh tế số',
    status: 'Đang tiếp nhận bản thảo',
  },
];

const DEFAULT_CATEGORIES = [
  {
    id: 'history',
    title: 'Lịch sử và mỹ học',
    desc: 'Các bài nghiên cứu về tiến trình hình thành, ngôn ngữ tạo hình, hệ màu, không gian, ánh sáng và vị trí của sơn mài trong mỹ thuật Việt Nam hiện đại.',
    btnLabel: 'Tra cứu chuyên đề',
  },
  {
    id: 'masters',
    title: 'Con người và truyền thừa',
    desc: 'Chân dung họa sĩ, nghệ nhân, nhà giáo, nhà nghiên cứu, nhà sưu tập và những người góp phần duy trì mạch nghề qua các thế hệ di sản.',
    btnLabel: 'Danh họa & Nghệ nhân',
  },
  {
    id: 'materials',
    title: 'Làng nghề và vật liệu',
    desc: 'Tư liệu về vùng nguyên liệu, vóc, sơn ta, son trát, vàng quỳ, vỏ trứng, kỹ thuật ủ – mài – đánh bóng, cùng thách thức của chuỗi cung ứng bản địa.',
    btnLabel: 'Hồ sơ làng nghề',
  },
  {
    id: 'creativity',
    title: 'Sáng tạo và ứng dụng',
    desc: 'Nghiên cứu, thử nghiệm và trường hợp thực tế về sơn mài trong thiết kế nội thất, kiến trúc cảnh quan, thời trang xa xỉ, điện ảnh, truyền thông số, giáo dục mỹ cảm và sản phẩm văn hóa đương thời.',
    btnLabel: 'Khảo sát ứng dụng đương đại',
  },
  {
    id: 'economy',
    title: 'Kinh tế di sản và nền tảng số',
    desc: 'Các mô hình định danh, giám định, bản quyền sở hữu trí tuệ, lưu trữ phi tập trung, thương mại hóa có trách nhiệm và xây dựng thị trường sơn mài minh bạch.',
    btnLabel: 'Khung pháp lý & Số hóa',
  },
];

const DEFAULT_SCHEMA_ROWS = [
  {
    id: 1,
    type: 'Bài nghiên cứu',
    icon: 'FileText',
    fields:
      'Tiêu đề; tóm tắt; tác giả; đơn vị; từ khóa; tài liệu tham khảo; tệp tải về (PDF chuẩn OCR)',
    status: 'Chuẩn học thuật • Đã xác thực',
    status_icon: 'CheckCircle2',
  },
  {
    id: 2,
    type: 'Nhân vật',
    icon: 'UserCheck',
    fields:
      'Họ tên; vai trò; giai đoạn hoạt động; địa phương; câu chuyện nghề; tư liệu kiểm chứng; hình ảnh lưu trữ',
    status: 'Hồ sơ tiểu sử bảo chứng',
    status_icon: 'Shield',
  },
  {
    id: 3,
    type: 'Làng nghề',
    icon: 'Warehouse',
    fields:
      'Tên làng nghề; địa bàn tọa lạc; lịch sử sơ khởi; kỹ thuật đặc thù; quy mô nhân lực; thách thức nguyên liệu',
    status: 'Dữ liệu điền dã xác minh',
    status_icon: 'SearchCheck',
  },
  {
    id: 4,
    type: 'Tác phẩm',
    icon: 'Palette',
    fields:
      'Mã định danh độc bản; tác giả; năm sáng tác; chất liệu (sơn then, cánh gián, son trầm, vàng quỳ); kích thước; lịch sử lưu lạc',
    status: 'Định danh số & Chip NFC',
    status_icon: 'Cpu',
  },
  {
    id: 5,
    type: 'Sự kiện',
    icon: 'Calendar',
    fields:
      'Thời gian; địa điểm; đơn vị đồng tổ chức; chương trình chi tiết; diễn giả; kết quả học thuật; tài liệu và video lưu trữ',
    status: 'Lưu trữ đa phương tiện số',
    status_icon: 'Video',
  },
];

// Reusable Custom Icon Dropdown Component
function IconSelectDropdown({
  label,
  value,
  onChange,
  icons,
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
              placeholder="Tìm kiếm biểu tượng..."
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
              <span className="flex-1 truncate">✦ Tự động (theo từ khóa / tên)</span>
              {!value && <Check className="w-3.5 h-3.5 text-[#FFDF73] shrink-0" />}
            </button>

            {/* Danh sách các biểu tượng hiển thị trực quan */}
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

const ArchivePageEditor = ({
  parsedProps,
  handlePropChange,
  handleSavePage,
  saving = false,
}) => {
  // 1. Quản lý danh sách các tập ấn bản chuyên khảo (Volumes)
  const rawVolumes = parsedProps.volumes;
  const volumesList = Array.isArray(rawVolumes) && rawVolumes.length > 0
    ? rawVolumes
    : [
        {
          vol: 'TẬP I',
          era: '1930 — 1954',
          title: parsedProps.vol1_title || DEFAULT_VOLUMES[0].title,
          focus: parsedProps.vol1_desc || DEFAULT_VOLUMES[0].focus,
          pages: '380 trang',
          papers: '24 Chuyên luận khoa học',
          status: 'Đã hoàn tất bản thảo',
        },
        {
          vol: 'TẬP II',
          era: '1954 — 1986',
          title: parsedProps.vol2_title || DEFAULT_VOLUMES[1].title,
          focus: parsedProps.vol2_desc || DEFAULT_VOLUMES[1].focus,
          pages: '420 trang',
          papers: '32 Hồ sơ điền dã',
          status: 'Đang biên tập phản biện',
        },
        {
          vol: 'TẬP III',
          era: '1986 — 2010',
          title: parsedProps.vol3_title || DEFAULT_VOLUMES[2].title,
          focus: parsedProps.vol3_desc || DEFAULT_VOLUMES[2].focus,
          pages: '510 trang',
          papers: '45 Hồ sơ tác phẩm bảo vật',
          status: 'Đang thẩm định tư liệu',
        },
        {
          vol: 'TẬP IV',
          era: '2010 — 2030',
          title: parsedProps.vol4_title || DEFAULT_VOLUMES[3].title,
          focus: parsedProps.vol4_desc || DEFAULT_VOLUMES[3].focus,
          pages: '460 trang',
          papers: '38 Đề xuất mô hình kinh tế số',
          status: 'Đang tiếp nhận bản thảo',
        },
      ];

  const handleUpdateVolumes = (newList) => {
    handlePropChange('volumes', newList);
    // Đồng bộ ngược lại các biến vol1 - vol4 cho tương thích ngược
    if (newList[0]) {
      handlePropChange('vol1_title', newList[0].title || '');
      handlePropChange('vol1_desc', newList[0].focus || newList[0].desc || '');
    }
    if (newList[1]) {
      handlePropChange('vol2_title', newList[1].title || '');
      handlePropChange('vol2_desc', newList[1].focus || newList[1].desc || '');
    }
    if (newList[2]) {
      handlePropChange('vol3_title', newList[2].title || '');
      handlePropChange('vol3_desc', newList[2].focus || newList[2].desc || '');
    }
    if (newList[3]) {
      handlePropChange('vol4_title', newList[3].title || '');
      handlePropChange('vol4_desc', newList[3].focus || newList[3].desc || '');
    }
  };

  const handleAddVolume = () => {
    const nextNum = volumesList.length + 1;
    const newVol = {
      id: Date.now(),
      vol: `TẬP ${nextNum}`,
      era: '2030+',
      title: 'Chuyên khảo mới',
      focus: 'Mô tả trọng tâm khảo cứu và các chuyên đề học thuật...',
      pages: '350 trang',
      papers: '20 Chuyên luận',
      status: 'Đang tiếp nhận bản thảo',
    };
    handleUpdateVolumes([...volumesList, newVol]);
  };

  const handleRemoveVolume = (idxToRemove) => {
    const updated = volumesList.filter((_, idx) => idx !== idxToRemove);
    handleUpdateVolumes(updated);
  };

  const handleVolumeFieldChange = (idx, field, value) => {
    const updated = volumesList.map((vol, i) => (i === idx ? { ...vol, [field]: value } : vol));
    handleUpdateVolumes(updated);
  };

  const handleMoveVolume = (idx, delta) => {
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= volumesList.length) return;
    const updated = [...volumesList];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleUpdateVolumes(updated);
  };

  // 2. Quản lý danh sách 5 Phân Hệ Tri Thức Cốt Lõi (Categories)
  const rawCategories = parsedProps.categories;
  const categoriesList = Array.isArray(rawCategories) && rawCategories.length > 0
    ? rawCategories
    : DEFAULT_CATEGORIES;

  const handleCategoryFieldChange = (idx, field, value) => {
    const updated = categoriesList.map((cat, i) => (i === idx ? { ...cat, [field]: value } : cat));
    handlePropChange('categories', updated);
  };

  // 3. Quản lý danh sách các loại tư liệu chuẩn hóa (Data Schema Rows)
  const rawSchema = parsedProps.schema_rows;
  const schemaList = Array.isArray(rawSchema) && rawSchema.length > 0
    ? rawSchema
    : DEFAULT_SCHEMA_ROWS;

  const handleAddSchemaRow = () => {
    const nextNum = schemaList.length + 1;
    const newRow = {
      id: Date.now(),
      type: `Loại tư liệu #${nextNum}`,
      icon: 'FileText',
      fields: 'Tiêu đề; tóm tắt; tác giả; đơn vị; từ khóa; tài liệu tham khảo; tệp tải về...',
      status: 'Chuẩn học thuật • Đã xác thực',
      status_icon: 'CheckCircle2',
    };
    handlePropChange('schema_rows', [...schemaList, newRow]);
  };

  const handleRemoveSchemaRow = (idxToRemove) => {
    const updated = schemaList.filter((_, idx) => idx !== idxToRemove);
    handlePropChange('schema_rows', updated);
  };

  const handleSchemaFieldChange = (idx, field, value) => {
    const updated = schemaList.map((row, i) => (i === idx ? { ...row, [field]: value } : row));
    handlePropChange('schema_rows', updated);
  };

  const handleMoveSchemaRow = (idx, delta) => {
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= schemaList.length) return;
    const updated = [...schemaList];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    handlePropChange('schema_rows', updated);
  };

  return (
    <div className="space-y-8">
      {/* ================= THANH TIÊU ĐỀ & NÚT LƯU NHANH ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/35 shadow-lg">
        <div>
          <span className="text-[11px] font-mono text-[#FFDF73] uppercase tracking-wider block">
            CẤU HÌNH TRANG HỆ THỐNG
          </span>
          <h2 className="font-sans text-xl font-bold text-white">
            Trang Kỷ Yếu Di Sản Bách Niên (/archive)
          </h2>
          <p className="text-xs text-[#EADBCE]/70">
            Quản trị kho tri thức, 4 chỉ số di sản, 5 phân hệ cốt lõi, 4 tập chuyên khảo và cổng nhận tư liệu.
          </p>
        </div>

        {handleSavePage && (
          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-xs uppercase tracking-wider transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu trang...' : 'Lưu Trang Kỷ Yếu'}</span>
          </button>
        )}
      </div>

      {/* ================= PHẦN 1: HERO & 4 CHỈ SỐ DI SẢN ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang &amp; 4 Chỉ Số Di Sản (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Tiêu đề lớn, đoạn văn mô tả và 4 chỉ số khảo cứu (khớp chính xác với giao diện công chúng).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn trang (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              placeholder="VD: KHO TRI THỨC CỦA MỘT DI SẢN ĐANG SỐNG"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn văn mô tả giám tuyển (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              placeholder="VD: Kỷ yếu không chỉ ghi lại những gì đã xảy ra. Đây là không gian tập hợp, kiểm chứng và kết nối tri thức..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none leading-relaxed"
            />
          </div>

          {/* 4 Chỉ Số Di Sản */}
          <div className="md:col-span-2 pt-3 border-t border-[#D4AF37]/20">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-3">
              4 Chỉ Số Khảo Cứu Di Sản (Metrics Bar)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Chỉ số 1 */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">CHỈ SỐ #1</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số hiển thị</label>
                  <input
                    type="text"
                    value={parsedProps.stat1_num || ''}
                    onChange={(e) => handlePropChange('stat1_num', e.target.value)}
                    placeholder="VD: 05"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tiêu đề nhãn</label>
                  <input
                    type="text"
                    value={parsedProps.stat1_label || ''}
                    onChange={(e) => handlePropChange('stat1_label', e.target.value)}
                    placeholder="VD: PHÂN HỆ TRI THỨC CỐT LÕI"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Phụ đề giải thích</label>
                  <input
                    type="text"
                    value={parsedProps.stat1_sub || ''}
                    onChange={(e) => handlePropChange('stat1_sub', e.target.value)}
                    placeholder="VD: Tiêu chuẩn viện bảo tàng"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Chỉ số 2 */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">CHỈ SỐ #2</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số hiển thị</label>
                  <input
                    type="text"
                    value={parsedProps.stat2_num || ''}
                    onChange={(e) => handlePropChange('stat2_num', e.target.value)}
                    placeholder="VD: 100+"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tiêu đề nhãn</label>
                  <input
                    type="text"
                    value={parsedProps.stat2_label || ''}
                    onChange={(e) => handlePropChange('stat2_label', e.target.value)}
                    placeholder="VD: CHUYÊN KHẢO & NGHIÊN CỨU"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Phụ đề giải thích</label>
                  <input
                    type="text"
                    value={parsedProps.stat2_sub || ''}
                    onChange={(e) => handlePropChange('stat2_sub', e.target.value)}
                    placeholder="VD: Học giả & Nghệ nhân kỳ cựu"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Chỉ số 3 */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">CHỈ SỐ #3</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số hiển thị</label>
                  <input
                    type="text"
                    value={parsedProps.stat3_num || ''}
                    onChange={(e) => handlePropChange('stat3_num', e.target.value)}
                    placeholder="VD: 07"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tiêu đề nhãn</label>
                  <input
                    type="text"
                    value={parsedProps.stat3_label || ''}
                    onChange={(e) => handlePropChange('stat3_label', e.target.value)}
                    placeholder="VD: KỲ HÀNH TRÌNH LƯU TRỮ SỐ"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Phụ đề giải thích</label>
                  <input
                    type="text"
                    value={parsedProps.stat3_sub || ''}
                    onChange={(e) => handlePropChange('stat3_sub', e.target.value)}
                    placeholder="VD: Hồ sơ đa phương tiện 4K"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Chỉ số 4 */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">CHỈ SỐ #4 (VIETKINGS)</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số / Biểu trưng</label>
                  <input
                    type="text"
                    value={parsedProps.stat4_num || ''}
                    onChange={(e) => handlePropChange('stat4_num', e.target.value)}
                    placeholder="VD: VIETKINGS"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tiêu đề nhãn</label>
                  <input
                    type="text"
                    value={parsedProps.stat4_label || ''}
                    onChange={(e) => handlePropChange('stat4_label', e.target.value)}
                    placeholder="VD: CHUẨN HÓA KIỂM CHỨNG"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Phụ đề giải thích</label>
                  <input
                    type="text"
                    value={parsedProps.stat4_sub || ''}
                    onChange={(e) => handlePropChange('stat4_sub', e.target.value)}
                    placeholder="VD: Xác thực kỷ lục di sản"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Ảnh Bìa Kỷ Yếu Khảo Cứu Quốc Gia (cover_image)"
              value={parsedProps.cover_image || ''}
              onChange={(val) => handlePropChange('cover_image', val)}
            />
          </div>
        </div>
      </div>

      {/* ================= PHẦN 2: 5 PHÂN HỆ TRI THỨC CỐT LÕI ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 2: 5 Phân Hệ Tri Thức Cốt Lõi (Categories)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Cấu hình tiêu đề và các phân hệ nghiên cứu lưu trữ học thuật.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề phân hệ (categories_title)
            </label>
            <input
              type="text"
              value={parsedProps.categories_title || ''}
              onChange={(e) => handlePropChange('categories_title', e.target.value)}
              placeholder="VD: 5 Phân Hệ Tri Thức Cốt Lõi"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả phân hệ (categories_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.categories_desc || ''}
              onChange={(e) => handlePropChange('categories_desc', e.target.value)}
              placeholder="Khung cấu trúc học thuật bao quát toàn bộ tiến trình lịch sử..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách 5 phân hệ */}
        <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73]">
            Chi Tiết Từng Phân Hệ Tri Thức ({categoriesList.length} phân hệ)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoriesList.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="p-3.5 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1.5">
                  <span className="text-xs font-mono font-bold text-[#FFDF73]">
                    PHÂN HỆ {String(cat.id || idx + 1).toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tên phân hệ</label>
                  <input
                    type="text"
                    value={cat.title || ''}
                    onChange={(e) => handleCategoryFieldChange(idx, 'title', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Mô tả phân hệ</label>
                  <textarea
                    rows={2}
                    value={cat.desc || ''}
                    onChange={(e) => handleCategoryFieldChange(idx, 'desc', e.target.value)}
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Nhãn nút tra cứu</label>
                  <input
                    type="text"
                    value={cat.btnLabel || ''}
                    onChange={(e) => handleCategoryFieldChange(idx, 'btnLabel', e.target.value)}
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PHẦN 3: BỐN TẬP CHUYÊN KHẢO THẾ KỶ ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 3: Bốn Tập Chuyên Khảo Thế Kỷ (1930–2030)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Quản lý các tập ấn bản kỷ yếu, chuyên luận khoa học và trạng thái xuất bản. Đang có:{' '}
                <strong className="text-[#FFDF73] font-bold">{volumesList.length}</strong> tập.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddVolume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/50 text-xs font-bold text-[#FFDF73] hover:text-white transition shadow cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Tập Mới</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối (volumes_title)
            </label>
            <input
              type="text"
              value={parsedProps.volumes_title || ''}
              onChange={(e) => handlePropChange('volumes_title', e.target.value)}
              placeholder="VD: Bốn Tập Chuyên Khảo Thế Kỷ (1930–2030)"
              className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Nhãn nút mục lục (volumes_index_btn)
            </label>
            <input
              type="text"
              value={parsedProps.volumes_index_btn || ''}
              onChange={(e) => handlePropChange('volumes_index_btn', e.target.value)}
              placeholder="VD: Xem mục lục tổng quát"
              className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả khối (volumes_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.volumes_desc || ''}
              onChange={(e) => handlePropChange('volumes_desc', e.target.value)}
              placeholder="Công trình xuất bản quy mô quốc gia quy tụ các nhà nghiên cứu..."
              className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các tập ấn bản */}
        <div className="space-y-4 pt-3 border-t border-[#D4AF37]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volumesList.map((vol, idx) => (
              <div
                key={vol.id || idx}
                className="p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-3 relative group"
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold font-mono">
                      {vol.vol || `TẬP ${idx + 1}`}
                    </span>
                    <span className="font-sans text-sm font-bold text-[#FFDF73] truncate max-w-[180px]">
                      {vol.title || `Tập #${idx + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveVolume(idx, -1)}
                      disabled={idx === 0}
                      title="Di chuyển lên"
                      className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveVolume(idx, 1)}
                      disabled={idx === volumesList.length - 1}
                      title="Di chuyển xuống"
                      className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveVolume(idx)}
                      title="Xóa tập này"
                      className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Ký hiệu tập</label>
                    <input
                      type="text"
                      value={vol.vol || ''}
                      onChange={(e) => handleVolumeFieldChange(idx, 'vol', e.target.value)}
                      placeholder="VD: TẬP I"
                      className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Niên đại / Giai đoạn</label>
                    <input
                      type="text"
                      value={vol.era || ''}
                      onChange={(e) => handleVolumeFieldChange(idx, 'era', e.target.value)}
                      placeholder="VD: 1930 — 1954"
                      className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Tiêu đề tập</label>
                  <input
                    type="text"
                    value={vol.title || ''}
                    onChange={(e) => handleVolumeFieldChange(idx, 'title', e.target.value)}
                    placeholder="VD: Vật liệu tự nhiên & Kỹ pháp Then cổ truyền"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Mô tả trọng tâm khảo cứu</label>
                  <textarea
                    rows={2}
                    value={vol.focus || vol.desc || ''}
                    onChange={(e) => handleVolumeFieldChange(idx, 'focus', e.target.value)}
                    placeholder="Từ kỹ nghệ phủ bóng dân gian đến ngôn ngữ hội họa bác học..."
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số chuyên luận</label>
                    <input
                      type="text"
                      value={vol.papers || ''}
                      onChange={(e) => handleVolumeFieldChange(idx, 'papers', e.target.value)}
                      placeholder="24 Chuyên luận"
                      className="w-full px-2 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Số trang</label>
                    <input
                      type="text"
                      value={vol.pages || ''}
                      onChange={(e) => handleVolumeFieldChange(idx, 'pages', e.target.value)}
                      placeholder="380 trang"
                      className="w-full px-2 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-[11px] focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Trạng thái</label>
                    <input
                      type="text"
                      value={vol.status || ''}
                      onChange={(e) => handleVolumeFieldChange(idx, 'status', e.target.value)}
                      placeholder="Đã hoàn tất bản thảo"
                      className="w-full px-2 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleAddVolume}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-dashed border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] hover:text-white transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Một Tập Khảo Cứu Khác</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= PHẦN 4: KHUNG CHUẨN DỮ LIỆU LƯU TRỮ ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 4: Khung Chuẩn Dữ Liệu Lưu Trữ Quốc Gia (Data Schema)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cho phép thêm, xóa, sửa và sắp xếp các loại tư liệu trong bảng chuẩn hóa dữ liệu. Đang có:{' '}
                <strong className="text-[#FFDF73] font-bold">{schemaList.length}</strong> loại tư liệu.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddSchemaRow}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/50 text-xs font-bold text-[#FFDF73] hover:text-white transition shadow cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Loại Tư Liệu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khung chuẩn (schema_title)
            </label>
            <input
              type="text"
              value={parsedProps.schema_title || ''}
              onChange={(e) => handlePropChange('schema_title', e.target.value)}
              placeholder="VD: Khung Chuẩn Dữ Liệu Lưu Trữ Quốc Gia"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả khung chuẩn (schema_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.schema_desc || ''}
              onChange={(e) => handlePropChange('schema_desc', e.target.value)}
              placeholder="Hệ thống chuẩn hóa thông tin đầu vào phục vụ kiểm định, tra cứu liên viện bảo tàng..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Bảng chỉnh sửa danh sách các loại tư liệu */}
        <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73]">
            Danh Sách Các Loại Tư Liệu &amp; Trường Thông Tin Bắt Buộc ({schemaList.length} mục)
          </label>

          <div className="space-y-3">
            {schemaList.map((row, idx) => {
              const TypeIcon = resolveTypeIcon(row.icon, row.type, idx);
              const StatusIcon = resolveStatusIcon(row.status_icon, row.status);

              return (
                <div
                  key={row.id || idx}
                  className="p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-[11px] font-bold flex items-center justify-center font-mono">
                        #{idx + 1}
                      </span>
                      <div className="w-7 h-7 rounded bg-[#200508] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73]">
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <span className="font-sans text-sm font-bold text-[#FFDF73]">
                        {row.type || `Loại tư liệu #${idx + 1}`}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded bg-[#2b070b] border border-[#D4AF37]/25 text-[#FFDF73] font-sans font-bold">
                        <StatusIcon className="w-3 h-3 text-[#FFDF73]" />
                        {row.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveSchemaRow(idx, -1)}
                        disabled={idx === 0}
                        title="Di chuyển lên"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSchemaRow(idx, 1)}
                        disabled={idx === schemaList.length - 1}
                        title="Di chuyển xuống"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSchemaRow(idx)}
                        title="Xóa loại tư liệu này"
                        className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Cột 1: Tên loại tư liệu & Icon Lucide */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase text-[#EADBCE]/70">
                        Tên loại tư liệu (Cột 1)
                      </label>
                      <input
                        type="text"
                        value={row.type || ''}
                        onChange={(e) => handleSchemaFieldChange(idx, 'type', e.target.value)}
                        placeholder="VD: Bài nghiên cứu, Nhân vật..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                      />
                    </div>

                    <IconSelectDropdown
                      label="Biểu tượng loại tư liệu (Cột 1)"
                      value={row.icon || ''}
                      onChange={(val) => handleSchemaFieldChange(idx, 'icon', val)}
                      icons={SCHEMA_TYPE_ICONS}
                      resolvedIcon={TypeIcon}
                      defaultPlaceholder="Tự động theo tên loại tư liệu"
                    />

                    {/* Cột 3: Trạng thái kiểm định & Icon Lucide */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase text-[#EADBCE]/70">
                        Nội dung trạng thái kiểm định (Cột 3)
                      </label>
                      <input
                        type="text"
                        value={row.status || ''}
                        onChange={(e) => handleSchemaFieldChange(idx, 'status', e.target.value)}
                        placeholder="VD: Chuẩn học thuật • Đã xác thực"
                        className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                      />
                    </div>

                    <IconSelectDropdown
                      label="Biểu tượng trạng thái (Cột 3)"
                      value={row.status_icon || ''}
                      onChange={(val) => handleSchemaFieldChange(idx, 'status_icon', val)}
                      icons={SCHEMA_STATUS_ICONS}
                      resolvedIcon={StatusIcon}
                      defaultPlaceholder="Tự động theo từ khóa trạng thái"
                    />

                    {/* Cột 2: Trường thông tin bắt buộc */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-[10px] uppercase text-[#EADBCE]/70">
                        Trường thông tin bắt buộc (Cột 2)
                      </label>
                      <textarea
                        rows={2}
                        value={row.fields || ''}
                        onChange={(e) => handleSchemaFieldChange(idx, 'fields', e.target.value)}
                        placeholder="Tiêu đề; tóm tắt; tác giả; đơn vị; từ khóa; tài liệu tham khảo; tệp tải về (PDF chuẩn OCR)..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleAddSchemaRow}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-dashed border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] hover:text-white transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Một Loại Tư Liệu Khác</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= PHẦN 5: KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA (CTA) ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 5: Kêu Gọi Đóng Góp Tư Liệu Văn Hóa (Cổng Tiếp Nhận Tư Liệu)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Thông điệp kêu gọi gửi bản thảo nghiên cứu, hồ sơ di sản và các nút điều hướng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ tag kêu gọi (call_tag)
            </label>
            <input
              type="text"
              value={parsedProps.call_tag || ''}
              onChange={(e) => handlePropChange('call_tag', e.target.value)}
              placeholder="VD: KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề kêu gọi (call_headline)
            </label>
            <input
              type="text"
              value={parsedProps.call_headline || ''}
              onChange={(e) => handlePropChange('call_headline', e.target.value)}
              placeholder="VD: Gửi tư liệu cho Kỷ yếu 100 năm"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn văn thuyết minh kêu gọi (call_desc)
            </label>
            <textarea
              rows={3}
              value={parsedProps.call_desc || ''}
              onChange={(e) => handlePropChange('call_desc', e.target.value)}
              placeholder="Hành trình tiếp nhận bài nghiên cứu, hồi ức nghề, hồ sơ tác phẩm, ảnh tư liệu..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none leading-relaxed"
            />
          </div>

          {/* 3 Nút hành động */}
          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-2">
              3 Nút Hành Động Tiếp Nhận
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Nút 1: Gửi tư liệu */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">NÚT 1 (NÚT CHÍNH VÀNG KIM)</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Nhãn nút</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn1_text || ''}
                    onChange={(e) => handlePropChange('call_btn1_text', e.target.value)}
                    placeholder="VD: Gửi tư liệu"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Đường dẫn liên kết</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn1_link || ''}
                    onChange={(e) => handlePropChange('call_btn1_link', e.target.value)}
                    placeholder="VD: /contact"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Nút 2: Đề xuất bài viết */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">NÚT 2 (NÚT VIỀN VÀNG)</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Nhãn nút</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn2_text || ''}
                    onChange={(e) => handlePropChange('call_btn2_text', e.target.value)}
                    placeholder="VD: Đề xuất bài viết"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Đường dẫn liên kết</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn2_link || ''}
                    onChange={(e) => handlePropChange('call_btn2_link', e.target.value)}
                    placeholder="VD: /contact"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Nút 3: Tải thể lệ */}
              <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73] block">NÚT 3 (TẢI THỂ LỆ PDF)</span>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Nhãn nút</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn3_text || ''}
                    onChange={(e) => handlePropChange('call_btn3_text', e.target.value)}
                    placeholder="VD: Tải thể lệ (PDF)"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#EADBCE]/70 mb-0.5">Đường dẫn tệp PDF</label>
                  <input
                    type="text"
                    value={parsedProps.call_btn3_link || ''}
                    onChange={(e) => handlePropChange('call_btn3_link', e.target.value)}
                    placeholder="VD: /contact hoặc https://..."
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Dòng cam kết bản quyền (call_guarantee)
            </label>
            <input
              type="text"
              value={parsedProps.call_guarantee || ''}
              onChange={(e) => handlePropChange('call_guarantee', e.target.value)}
              placeholder="VD: Bản quyền tác giả và quyền sở hữu trí tuệ được bảo hộ theo pháp luật hiện hành"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ================= NÚT LƯU CHÂN TRANG ================= */}
      {handleSavePage && (
        <div className="flex justify-end p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/35 shadow-lg">
          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-xs uppercase tracking-wider transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu trang...' : 'Lưu Trang Kỷ Yếu'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ArchivePageEditor;
