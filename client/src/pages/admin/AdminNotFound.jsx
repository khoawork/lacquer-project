import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, LayoutDashboard, Globe } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="flex-1 min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#2a070b]/90 to-[#140204]/95 p-8 text-center space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#521515] border border-[#ffb3ae]/40 text-[#ffb3ae] mx-auto flex items-center justify-center shadow-lg">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#3d0b11] border border-[#D4AF37]/40 text-[#FFDF73] text-[11px] font-mono font-bold uppercase tracking-widest">
            Mã lỗi 404 — Phân Hệ Quản Trị
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
            Không Tìm Thấy Trang Quản Trị
          </h2>
          <p className="text-xs sm:text-sm text-[#EADBCE]/70 leading-relaxed max-w-md mx-auto">
            Đường dẫn nội bộ bạn đang truy cập không tồn tại, đã được di chuyển hoặc đang trong quá trình nâng cấp hệ thống.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wider text-[#1a0406] bg-[#d49b1a] hover:bg-[#FFDF73] transition-all shadow-md cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Về Bảng Điều Khiển</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-xs tracking-wider text-[#FAF7F2]/80 hover:text-white bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#FFDF73]" />
            <span>Xem Website Ngoài</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
