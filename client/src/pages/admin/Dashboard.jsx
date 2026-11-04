import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Info,
  Calendar,
  Compass,
  Palette,
  BookOpen,
  Users,
  Newspaper,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';

const AdminDashboard = () => {
  const pagesList = [
    { name: 'Trang chủ', path: '/admin/pages/home', icon: Home, desc: 'Bản sắc hội họa, Hero 100vh, 4 hướng mở & pipeline' },
    { name: 'Giới thiệu', path: '/admin/pages/about', icon: Info, desc: 'Từ di sản đến hạ tầng, sứ mệnh & 3 nguyên tắc' },
    { name: 'Hành trình', path: '/admin/pages/journey', icon: Compass, desc: 'Dòng chảy 100 năm (1930–2030) qua các mốc son' },
    { name: 'Sự kiện', path: '/admin/pages/events', icon: Calendar, desc: 'Tọa đàm, đại triển lãm, diễn đàn SIHUB' },
    { name: 'Bộ sưu tập', path: '/admin/pages/collection', icon: Palette, desc: 'Cửu Cửu, Bách Thụ Đồng Tâm, tác phẩm độc bản' },
    { name: 'Kỷ yếu', path: '/admin/pages/archive', icon: BookOpen, desc: 'Kỷ yếu Bách Niên toàn quốc, tài liệu học thuật' },
    { name: 'Ban điều hành', path: '/admin/pages/leadership', icon: Users, desc: 'Hội đồng cố vấn, nghệ nhân ưu tú & giám tuyển' },
    { name: 'Tin tức', path: '/admin/pages/news', icon: Newspaper, desc: 'Tư liệu nghiên cứu, bài viết chuyên sâu' },
    { name: 'Liên hệ', path: '/admin/pages/contact', icon: Mail, desc: 'Thông tin đường dây nóng, 5 tuyến tham gia' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div
        className="p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/35 relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #2d080c 0%, #1a0407 100%)',
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180305] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-serif font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hệ Thống CMS Quản Trị Trung Tâm</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl text-gold-gradient font-bold">
            Bảng Điều Khiển — Hành Trình 100 Năm Sơn Mài
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
            Hệ thống cho phép Ban Điều Hành chỉnh sửa toàn quyền từng trang nội dung theo mô hình chuẩn: <code className="text-[#FFDF73]">Page (id, name, slug, props: JSON)</code>. Slug chỉ nằm trong page.
          </p>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-[#D4AF37]/30 bg-[#220508]/80 shadow-lg space-y-1">
          <span className="text-xs font-serif font-semibold text-[#EADBCE] uppercase tracking-wider">
            Trang Quản Trị
          </span>
          <div className="text-2xl font-bold font-serif text-[#FFDF73]">9 Trang</div>
          <span className="text-[11px] text-[#FAF7F2]/60">Chỉnh sửa toàn quyền nội dung</span>
        </div>

        <div className="p-5 rounded-xl border border-[#D4AF37]/30 bg-[#220508]/80 shadow-lg space-y-1">
          <span className="text-xs font-serif font-semibold text-[#EADBCE] uppercase tracking-wider">
            Kỳ Sự Kiện Di Sản
          </span>
          <div className="text-2xl font-bold font-serif text-[#FFDF73]">12+ Kỳ</div>
          <span className="text-[11px] text-[#FAF7F2]/60">Tọa đàm, triển lãm &amp; showcase</span>
        </div>

        <div className="p-5 rounded-xl border border-[#D4AF37]/30 bg-[#220508]/80 shadow-lg space-y-1">
          <span className="text-xs font-serif font-semibold text-[#EADBCE] uppercase tracking-wider">
            Bộ Sưu Tập Bách Niên
          </span>
          <div className="text-2xl font-bold font-serif text-[#FFDF73]">03 Độc Bản</div>
          <span className="text-[11px] text-[#FAF7F2]/60">Cửu Cửu, Bách Thụ, Du Lãm</span>
        </div>

        <div className="p-5 rounded-xl border border-[#D4AF37]/30 bg-[#220508]/80 shadow-lg space-y-1">
          <span className="text-xs font-serif font-semibold text-[#EADBCE] uppercase tracking-wider">
            Hồ Sơ Đề Xuất
          </span>
          <div className="text-2xl font-bold font-serif text-[#FFDF73]">48 Tiếp Nhận</div>
          <span className="text-[11px] text-[#FAF7F2]/60">Đã mã hóa #SMVN-2026</span>
        </div>
      </div>

      {/* Pages Management Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <h2 className="font-serif text-lg font-bold text-[#FFDF73] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FFDF73]" />
            <span>Nội Dung Website: 9 Trang Quản Lý Toàn Quyền</span>
          </h2>
          <span className="text-xs text-[#EADBCE]/70 font-sans">Chọn trang để mở trình biên tập</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagesList.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.path}
                to={p.path}
                className="group p-5 rounded-xl border border-[#D4AF37]/30 bg-[#200508]/85 hover:bg-[#34080e] hover:border-[#FFDF73]/70 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#3d0b10] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Live
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#FAF7F2] group-hover:text-[#FFDF73] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-body text-xs text-[#EADBCE]/70 mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-semibold text-[#FFDF73]">
                  <span>Mở Trình Quản Trị</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
