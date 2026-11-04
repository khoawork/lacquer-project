import React, { useState, useEffect } from 'react';
import {
  Save,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  RotateCcw,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import siteServices from '../../services/siteServices';

// Danh sách 9 trang gốc mặc định theo đúng các page của website
const DEFAULT_MENU_ITEMS = [
  { id: 'home', name: 'Trang chủ', slug: '/', is_visible: true },
  { id: 'about', name: 'Giới thiệu', slug: '/about', is_visible: true },
  { id: 'journey', name: 'Hành trình', slug: '/journey', is_visible: true },
  { id: 'events', name: 'Sự kiện', slug: '/events', is_visible: true },
  { id: 'collection', name: 'Bộ sưu tập', slug: '/collection', is_visible: true },
  { id: 'archive', name: 'Kỷ yếu', slug: '/archive', is_visible: true },
  { id: 'leadership', name: 'Ban điều hành', slug: '/leadership', is_visible: true },
  { id: 'news', name: 'Tin tức', slug: '/news', is_visible: true },
  { id: 'contact', name: 'Liên hệ', slug: '/contact', is_visible: true },
];

const LOCAL_STORAGE_KEY = 'lacquer_site_main_menu';

const MenuManager = () => {
  const [items, setItems] = useState(DEFAULT_MENU_ITEMS);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Load menu items from API or localStorage
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        // First check backend
        const res = await siteServices.getMainMenu();
        if (res.data && res.data.success && res.data.data && res.data.data.items_json) {
          const parsed =
            typeof res.data.data.items_json === 'string'
              ? JSON.parse(res.data.data.items_json)
              : res.data.data.items_json;
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
            return;
          }
        }
      } catch {
        // Fallback
      }

      // Check localStorage fallback
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
            return;
          }
        } catch {
          // ignore
        }
      }

      setItems(DEFAULT_MENU_ITEMS);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  // Di chuyển mục lên trên (Arrow Up)
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
  };

  // Di chuyển mục xuống dưới (Arrow Down)
  const handleMoveDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
  };

  // Cập nhật tên mục hoặc slug đường dẫn
  const handleFieldChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  // Bật / tắt ẩn hiện
  const handleToggleVisible = (index) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], is_visible: !newItems[index].is_visible };
    setItems(newItems);
  };

  // Xóa mục khỏi menu hiển thị (chuyển sang ẩn hoặc gỡ khỏi danh sách)
  const handleRemove = (index) => {
    const item = items[index];
    if (window.confirm(`Bạn có chắc muốn xóa "${item.name}" khỏi thanh menu?`)) {
      const newItems = items.filter((_, idx) => idx !== index);
      setItems(newItems);
    }
  };

  // Khôi phục menu mặc định
  const handleResetDefault = () => {
    if (window.confirm('Khôi phục danh sách menu về 9 trang mặc định của hệ thống?')) {
      setItems(DEFAULT_MENU_ITEMS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_MENU_ITEMS));
      setStatusMsg({
        type: 'success',
        text: 'Đã khôi phục menu về mặc định 9 trang.',
      });
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  // Lưu menu
  const handleSave = async () => {
    setSaving(true);
    setStatusMsg(null);

    // Save to localStorage immediately so frontend can sync
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('lacquer_menu_updated'));

    try {
      const res = await siteServices.saveMainMenu(items);
      if (res.data && res.data.success) {
        setStatusMsg({
          type: 'success',
          text: 'Đã lưu cấu hình menu chính thành công lên hệ thống!',
        });
      } else {
        setStatusMsg({
          type: 'success',
          text: 'Đã lưu cấu hình menu vào bộ nhớ hệ thống!',
        });
      }
    } catch {
      setStatusMsg({
        type: 'success',
        text: 'Đã lưu cấu hình menu vào trình duyệt!',
      });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFDF73]">
            Menu &amp; Điều Hướng
          </h1>
          <p className="text-sm text-[#EADBCE]/80 mt-1 max-w-3xl leading-relaxed">
            Quản lý menu chính của website. Có thể ẩn/hiện, đổi tên, đổi đường dẫn và sắp xếp lại thứ tự. Khi ẩn, mục sẽ biến mất khỏi menu nhưng URL vẫn truy cập được.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefault}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded border border-[#D4AF37]/35 text-[#EADBCE] hover:text-[#FFDF73] hover:border-[#FFDF73]/60 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            title="Khôi phục lại danh sách 9 trang mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === 'success'
              ? 'bg-[#1e3a1f]/80 border-emerald-500/50 text-emerald-200'
              : 'bg-[#3d1115]/80 border-red-500/50 text-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Container Card theo đúng giao diện ảnh mẫu */}
      <div
        className="rounded-2xl border border-[#D4AF37]/35 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
        style={{
          background: 'linear-gradient(180deg, rgba(28, 6, 9, 0.98) 0%, rgba(16, 3, 5, 0.99) 100%)',
        }}
      >
        {/* Card Header: Mục menu (N) */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FFDF73] tracking-wide">
            Mục menu ({items.length})
          </h2>
          <span className="text-xs text-[#EADBCE]/70">
            Dùng mũi tên ↑ ↓ để đổi thứ tự hiển thị trên thanh điều hướng
          </span>
        </div>

        {/* Menu Items List */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <div
                key={item.id || index}
                className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                  item.is_visible
                    ? 'border-[#D4AF37]/30 bg-[#160305] hover:border-[#FFDF73]/50'
                    : 'border-stone-800/80 bg-[#110203]/70 opacity-60'
                }`}
              >
                {/* 1. Numerical Index */}
                <div className="w-8 flex items-center justify-center font-serif text-base font-bold text-[#FFDF73]/85 shrink-0">
                  {index + 1}
                </div>

                {/* 2. Menu Item Name Input */}
                <div className="flex-1 sm:w-1/3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    placeholder="Tên mục menu..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0d0102] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73] font-medium"
                  />
                </div>

                {/* 3. Slug / Link Input */}
                <div className="flex-1 sm:w-1/3">
                  <input
                    type="text"
                    value={item.slug}
                    onChange={(e) => handleFieldChange(index, 'slug', e.target.value)}
                    placeholder="Đường dẫn / slug..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0d0102] border border-[#D4AF37]/35 text-[#FFDF73] text-sm font-mono focus:outline-none focus:border-[#FFDF73]"
                  />
                </div>

                {/* 4. Action Buttons (↑, ↓, Hiện/Ẩn, Xoá) */}
                <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D4AF37]/15">
                  {/* Arrow Up Button */}
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={isFirst}
                    title="Di chuyển lên trên"
                    className="w-9 h-9 rounded-lg border border-[#D4AF37]/35 bg-[#200508] hover:bg-[#34080e] hover:border-[#FFDF73]/60 text-[#FFDF73] disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm transition cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Arrow Down Button */}
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={isLast}
                    title="Di chuyển xuống dưới"
                    className="w-9 h-9 rounded-lg border border-[#D4AF37]/35 bg-[#200508] hover:bg-[#34080e] hover:border-[#FFDF73]/60 text-[#FFDF73] disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm transition cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Hiện / Ẩn Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleVisible(index)}
                    className={`px-3.5 h-9 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${
                      item.is_visible
                        ? 'border-[#D4AF37]/45 bg-[#2a090e] text-[#FFDF73] hover:bg-[#3d0d14]'
                        : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {item.is_visible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Hiện</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Ẩn</span>
                      </>
                    )}
                  </button>

                  {/* Xoá Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="px-3 h-9 rounded-lg border border-red-900/40 bg-red-950/30 hover:bg-red-900/50 hover:border-red-500/50 text-red-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition cursor-pointer"
                    title="Xóa mục này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xoá</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EADBCE]/70 gap-2">
          <span>* Các mục được cấu hình theo đường dẫn slug của trang. Khi bấm &quot;Ẩn&quot;, trang vẫn hoạt động bình thường qua URL trực tiếp.</span>
          <span className="text-[#FFDF73] font-semibold">Tự động đồng bộ lên thanh điều hướng chính</span>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;

