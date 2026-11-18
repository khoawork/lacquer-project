import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Save,
  Globe,
  Sliders,
  Mail,
  Phone,
  MapPin,
  Share2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import siteServices from '../../services/siteServices';

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('brand');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Settings state
  const [brandSettings, setBrandSettings] = useState({
    siteName: 'Hành Trình 100 Năm Sơn Mài Hội Họa Việt Nam',
    tagline: 'Tôn Vinh Di Sản — Kiến Tạo Kỷ Nguyên',
    logoUrl: '/assets/logo.png',
    faviconUrl: '/favicon.ico',
    footerCopyright: '© 1930 - 2030 Hành Trình 100 Năm Sơn Mài Hội Họa Việt Nam. All Rights Reserved.',
    footerDescription:
      'Chương trình bảo tồn và vinh danh nghệ thuật sơn mài hội họa bác học Việt Nam, kết nối nghệ nhân, giới giám tuyển và các định chế nghệ thuật toàn cầu.',
  });

  const [contactSettings, setContactSettings] = useState({
    hotline: '(+84) 28 3822 8888',
    email: 'bandoehanh@sonmaivietnam100nam.vn',
    address: '273 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    officeHours: 'Thứ Hai - Thứ Bảy: 08:30 - 17:30',
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: 'https://facebook.com/sonmaivietnam100',
    youtube: 'https://youtube.com/@sonmaivietnam100',
    instagram: 'https://instagram.com/sonmai_vietnam_art',
    linkedin: 'https://linkedin.com/company/vietnam-lacquer-art',
  });

  useEffect(() => {
    let cancelled = false;

    const fetchSettings = async () => {
      try {
        const res = await siteServices.getSettings();
        const { success, data, message } = res.data;
        if (!success || !data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error(message || 'Dữ liệu cài đặt không hợp lệ.');
        }
        if (cancelled) return;

        if (data.brand) setBrandSettings((prev) => ({ ...prev, ...data.brand }));
        if (data.contact) setContactSettings((prev) => ({ ...prev, ...data.contact }));
        if (data.social) setSocialSettings((prev) => ({ ...prev, ...data.social }));
      } catch (error) {
        if (!cancelled) {
          setStatusMsg({
            type: 'error',
            text: 'Không thể tải cài đặt: ' + (error.response?.data?.message || error.message),
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSettings();
    return () => { cancelled = true; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMsg(null);
    try {
      const results = await Promise.all([
        siteServices.updateSetting('brand', brandSettings),
        siteServices.updateSetting('contact', contactSettings),
        siteServices.updateSetting('social', socialSettings),
      ]);
      const failed = results.find((res) => !res.data.success);
      if (failed) throw new Error(failed.data.message || 'Lưu cài đặt thất bại.');

      setStatusMsg({
        type: 'success',
        text: 'Đã lưu cấu hình Logo, Footer & Hệ Thống thành công!',
      });
    } catch (error) {
      setStatusMsg({
        type: 'error',
        text: 'Không thể lưu đầy đủ cài đặt: ' + (error.response?.data?.message || error.message),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
            <Sliders className="w-4 h-4 text-[#FFDF73]" />
            <span>Cấu hình Hệ Thống & Nhận Diện</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#FFDF73] mt-1">
            Quản Lý Logo, Footer & Điều Hướng
          </h1>
          <p className="text-sm text-[#EADBCE]/80 mt-1">
            Chỉnh sửa toàn quyền các thông tin thương hiệu, logo, chân trang, mạng xã hội và hệ thống menu.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading || saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{loading ? 'Đang tải...' : saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
        </button>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2 overflow-x-auto">
        {[
          { key: 'brand', label: 'Logo & Thương Hiệu', icon: ImageIcon },
          { key: 'contact', label: 'Thông Tin Liên Hệ', icon: Phone },
          { key: 'social', label: 'Mạng Xã Hội', icon: Share2 },
          { key: 'menu', label: 'Menu & Điều Hướng', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#d49b1a] text-[#1a0406] shadow-md'
                  : 'text-[#FAF7F2]/80 hover:bg-[#3a0b10] hover:text-[#FFDF73]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Logo & Thương Hiệu */}
      {activeTab === 'brand' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 shadow-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(38, 8, 12, 0.95) 0%, rgba(22, 4, 6, 0.98) 100%)',
            }}
          >
            <h3 className="font-sans text-lg font-bold text-[#FFDF73] border-b border-[#D4AF37]/20 pb-2">
              Thông Tin Thương Hiệu Chính
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Tên Dự Án / Đơn Vị
              </label>
              <input
                type="text"
                value={brandSettings.siteName}
                onChange={(e) => setBrandSettings({ ...brandSettings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Khẩu Hiệu / Tagline
              </label>
              <input
                type="text"
                value={brandSettings.tagline}
                onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Đường Dẫn Logo Chính (URL / Path)
              </label>
              <input
                type="text"
                value={brandSettings.logoUrl}
                onChange={(e) => setBrandSettings({ ...brandSettings, logoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Favicon URL
              </label>
              <input
                type="text"
                value={brandSettings.faviconUrl}
                onChange={(e) => setBrandSettings({ ...brandSettings, faviconUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 shadow-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(38, 8, 12, 0.95) 0%, rgba(22, 4, 6, 0.98) 100%)',
            }}
          >
            <h3 className="font-sans text-lg font-bold text-[#FFDF73] border-b border-[#D4AF37]/20 pb-2">
              Nội Dung Chân Trang (Footer)
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Đoạn Giới Thiệu Chân Trang
              </label>
              <textarea
                rows={4}
                value={brandSettings.footerDescription}
                onChange={(e) =>
                  setBrandSettings({ ...brandSettings, footerDescription: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Bản Quyền Copyright
              </label>
              <input
                type="text"
                value={brandSettings.footerCopyright}
                onChange={(e) =>
                  setBrandSettings({ ...brandSettings, footerCopyright: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Thông Tin Liên Hệ */}
      {activeTab === 'contact' && (
        <div
          className="p-6 rounded-2xl border border-[#D4AF37]/30 space-y-5 shadow-xl max-w-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(38, 8, 12, 0.95) 0%, rgba(22, 4, 6, 0.98) 100%)',
          }}
        >
          <h3 className="font-sans text-lg font-bold text-[#FFDF73] border-b border-[#D4AF37]/20 pb-2">
            Thông Tin Đường Dây Nóng & Trụ Sở
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Hotline Tiếp Nhận
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#FFDF73] absolute left-3 top-3" />
                <input
                  type="text"
                  value={contactSettings.hotline}
                  onChange={(e) =>
                    setContactSettings({ ...contactSettings, hotline: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
                Email Ban Thư Ký
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#FFDF73] absolute left-3 top-3" />
                <input
                  type="email"
                  value={contactSettings.email}
                  onChange={(e) =>
                    setContactSettings({ ...contactSettings, email: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
              Địa Chỉ Văn Phòng / Tòa Nhà
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#FFDF73] absolute left-3 top-3" />
              <input
                type="text"
                value={contactSettings.address}
                onChange={(e) =>
                  setContactSettings({ ...contactSettings, address: e.target.value })
                }
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5">
              Thời Gian Làm Việc
            </label>
            <input
              type="text"
              value={contactSettings.officeHours}
              onChange={(e) =>
                setContactSettings({ ...contactSettings, officeHours: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Mạng Xã Hội */}
      {activeTab === 'social' && (
        <div
          className="p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 shadow-xl max-w-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(38, 8, 12, 0.95) 0%, rgba(22, 4, 6, 0.98) 100%)',
          }}
        >
          <h3 className="font-sans text-lg font-bold text-[#FFDF73] border-b border-[#D4AF37]/20 pb-2">
            Liên Kết Truyền Thông & Mạng Xã Hội
          </h3>

          {Object.entries(socialSettings).map(([key, val]) => (
            <div key={key}>
              <label className="block text-xs uppercase tracking-wider text-[#FFDF73] font-bold mb-1.5 capitalize">
                {key} URL
              </label>
              <input
                type="text"
                value={val}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, [key]: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Menu & Điều Hướng */}
      {activeTab === 'menu' && (
        <div
          className="p-8 rounded-2xl border border-[#D4AF37]/35 space-y-4 shadow-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(38, 8, 12, 0.95) 0%, rgba(22, 4, 6, 0.98) 100%)',
          }}
        >
          <div className="space-y-2">
            <h3 className="font-sans text-xl font-bold text-[#FFDF73]">
              Quản Lý Menu Chính &amp; Sắp Xếp Theo Slug
            </h3>
            <p className="text-sm text-[#EADBCE]/80 leading-relaxed max-w-2xl">
              Hệ thống đã tách riêng mô-đun quản lý vị trí, ẩn/hiện và sắp xếp lại thứ tự các mục menu bằng nút mũi tên (↑ ↓) chuyên biệt theo đúng chuẩn.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/system/menus"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-lg"
            >
              <span>Mở Trình Quản Trị Menu Chuyên Biệt</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;

