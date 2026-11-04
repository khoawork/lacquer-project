import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  Archive,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  User,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import siteServices from '../../services/siteServices';

const mockSubmissions = [
  {
    id: 1,
    ref: '#SMVN-2026-REG-8821',
    name: 'Họa sĩ Nguyễn Văn Tuấn',
    org: 'Xưởng Sơn mài Hạ Thái',
    email: 'tuan.lacquer@gmail.com',
    phone: '0912 345 678',
    route: 'Tuyến 01: Sáng tác',
    message: 'Đăng ký tham gia trưng bày bộ tranh sơn khắc truyền thống phối hợp vàng quỳ tại Đại lễ 2026.',
    status: 'new',
    created_at: '04/11/2026 09:15',
  },
  {
    id: 2,
    ref: '#SMVN-2026-REG-4319',
    name: 'TS. Trần Minh Khoa',
    org: 'Đại học Mỹ thuật Việt Nam',
    email: 'khoa.tm@vnu.edu.vn',
    phone: '0988 776 655',
    route: 'Tuyến 02: Học thuật',
    message: 'Đề xuất tham luận: Đặc tính hóa sinh của nhựa sơn ta Phú Thọ và kỹ nghệ bảo quản tranh sơn mài qua thế kỷ.',
    status: 'processing',
    created_at: '03/11/2026 14:30',
  },
  {
    id: 3,
    ref: '#SMVN-2026-REG-7702',
    name: 'Bà Lê Hương Giang',
    org: 'Tập đoàn Di Sản Sáng Tạo',
    email: 'giang.le@heritagegroup.vn',
    phone: '0903 888 999',
    route: 'Tuyến 03: Hợp tác Doanh nghiệp',
    message: 'Đề xuất bảo trợ không gian văn hóa trưng bày và ứng dụng sản phẩm sơn mài vào chuỗi khách sạn di sản.',
    status: 'completed',
    created_at: '02/11/2026 11:20',
  },
];

export default function FormsManager() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await siteServices.getSubmissions();
      if (res.data && res.data.success && res.data.data) {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          ref: item.reference_code || `#SMVN-2026-${item.id}`,
          name: item.full_name,
          org: item.organization || 'Cá nhân',
          email: item.email,
          phone: item.phone,
          route: item.form_type || 'Liên hệ',
          message: item.message,
          status: item.status || 'new',
          created_at: new Date(item.created_at || Date.now()).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        if (mapped.length > 0) {
          setSubmissions(mapped);
        }
      }
    } catch (err) {
      console.warn('Lỗi khi tải hồ sơ từ API, dùng danh sách mẫu:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filtered = submissions.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const handleUpdateStatus = async (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, status: newStatus });
    }

    try {
      await siteServices.updateSubmissionStatus(id, newStatus);
    } catch (err) {
      console.warn('Cập nhật trạng thái offline:', err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#2c080d] to-[#180305] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold">
            Quản Lý Biểu Mẫu &amp; Hồ Sơ Tiếp Nhận
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">
            Tiếp nhận, xử lý và phản hồi các đề xuất kết nối, hồ sơ sáng tạo từ các tuyến tham gia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded bg-[#170305] border border-[#D4AF37]/35 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#FFDF73]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Hồ sơ mới</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Đã phản hồi</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="rounded-xl border border-[#D4AF37]/30 bg-[#200508]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#FAF7F2]">
            <thead className="bg-[#180305] text-[#FFDF73] font-serif uppercase tracking-wider text-[11px] border-b border-[#D4AF37]/25">
              <tr>
                <th className="p-4">Mã hồ sơ</th>
                <th className="p-4">Họ tên &amp; Đơn vị</th>
                <th className="p-4">Tuyến đăng ký</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/15">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#FFDF73] whitespace-nowrap">
                    {row.ref}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#FAF7F2]">{row.name}</div>
                    <div className="text-[11px] text-[#EADBCE]/70">{row.org}</div>
                  </td>
                  <td className="p-4 text-[#EADBCE] font-serif">{row.route}</td>
                  <td className="p-4 text-[11px] text-[#FAF7F2]/60 whitespace-nowrap">
                    {row.created_at}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {row.status === 'new' && (
                      <span className="px-2.5 py-1 rounded bg-[#521515] border border-[#ffb3ae]/40 text-[#ffb3ae] font-semibold text-[11px]">
                        Mới tiếp nhận
                      </span>
                    )}
                    {row.status === 'processing' && (
                      <span className="px-2.5 py-1 rounded bg-[#d49b1a]/20 border border-[#d49b1a]/40 text-[#FFDF73] font-semibold text-[11px]">
                        Đang xử lý
                      </span>
                    )}
                    {row.status === 'completed' && (
                      <span className="px-2.5 py-1 rounded bg-[#1b4332]/40 border border-[#52b788]/40 text-[#52b788] font-semibold text-[11px]">
                        Đã phản hồi
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(row)}
                      className="px-3 py-1.5 rounded bg-[#38080c] hover:bg-[#d49b1a] hover:text-[#180407] border border-[#D4AF37]/40 text-[#FFDF73] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#2d080c] to-[#1a0407] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div>
                <span className="text-xs font-mono text-[#FFDF73] font-bold">
                  {selectedItem.ref}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#FAF7F2] mt-0.5">
                  {selectedItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-[#FAF7F2]/60 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Đơn vị / Vai trò</span>
                <div className="text-[#FAF7F2] font-medium">{selectedItem.org}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Tuyến tham gia</span>
                <div className="text-[#FFDF73] font-serif font-bold">{selectedItem.route}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Email</span>
                <div className="text-[#FAF7F2] font-mono">{selectedItem.email}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Số điện thoại</span>
                <div className="text-[#FAF7F2] font-mono">{selectedItem.phone}</div>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#D4AF37]/20">
              <span className="text-xs text-[#EADBCE]/60 uppercase tracking-wider">
                Nội dung đề xuất kết nối:
              </span>
              <p className="p-3 rounded bg-[#140204] border border-[#D4AF37]/25 text-xs text-[#FAF7F2] leading-relaxed">
                {selectedItem.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#EADBCE]/70">Đổi trạng thái:</span>
                <select
                  value={selectedItem.status}
                  onChange={(e) => handleUpdateStatus(selectedItem.id, e.target.value)}
                  className="px-2.5 py-1 rounded bg-[#170305] border border-[#D4AF37]/35 text-xs text-[#FFDF73] focus:outline-none"
                >
                  <option value="new">Mới</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="completed">Đã phản hồi</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="btn-gold px-4 py-1.5 rounded text-xs uppercase font-bold tracking-wider"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

