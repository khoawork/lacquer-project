import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import siteServices from '../../services/siteServices';
import { getImageUrl } from '../../configs/Apis';

export default function FormsManager() {
  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await siteServices.getSubmissions();
      if (res.data && res.data.success && res.data.data) {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          ref: item.reference_code || `#SMVN-2026-${item.id}`,
          name: item.full_name,
          org: item.organization || 'Cá nhân',
          email: item.email,
          phone: item.phone,
          route: item.route_type || item.form_type || 'Liên hệ',
          message: item.message,
          attachments_url: item.attachments_url,
          status: item.status || 'new',
          created_at: new Date(item.created_at || item.createdAt || Date.now()).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        setSubmissions(mapped);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi tải danh sách hồ sơ từ máy chủ.');
      setSubmissions([]);
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
    const prevStatus = submissions.find((i) => i.id === id)?.status;
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      const res = await siteServices.updateSubmissionStatus(id, newStatus);
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Máy chủ từ chối cập nhật trạng thái.');
      }
      setStatusMsg({
        type: 'success',
        text: `Đã cập nhật trạng thái hồ sơ #${id} thành công!`,
      });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      // Rollback
      setSubmissions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: prevStatus } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => ({ ...prev, status: prevStatus }));
      }
      setStatusMsg({
        type: 'error',
        text: 'Cập nhật trạng thái thất bại: ' + (err.response?.data?.message || err.message),
      });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn hồ sơ #${id}? Thao tác này không thể hoàn tác.`)) {
      return;
    }

    try {
      const res = await siteServices.deleteSubmission(id);
      if (res.data?.success) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
        setSelectedItem(null);
        setStatusMsg({
          type: 'success',
          text: `Đã xóa hồ sơ #${id} thành công.`,
        });
        setTimeout(() => setStatusMsg(null), 3000);
      } else {
        throw new Error(res.data?.message || 'Máy chủ từ chối xóa hồ sơ.');
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Không thể xóa hồ sơ: ' + (err.response?.data?.message || err.message),
      });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#2c080d] to-[#180305] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl text-gold-gradient font-bold">
            Quản Lý Biểu Mẫu &amp; Hồ Sơ Tiếp Nhận
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">
            Tiếp nhận, xử lý và phản hồi các đề xuất kết nối, hồ sơ sáng tạo từ các tuyến tham gia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSubmissions}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#170305] hover:bg-[#28050a] border border-[#D4AF37]/35 text-xs text-[#FFDF73] transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded bg-[#170305] border border-[#D4AF37]/35 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#FFDF73]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Hồ sơ mới</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Đã phản hồi</option>
            <option value="archived">Lưu trữ</option>
          </select>
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

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/50 bg-[#3d1115]/80 text-red-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchSubmissions}
            className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 font-bold text-xs cursor-pointer"
          >
            Tải lại
          </button>
        </div>
      )}

      {/* Submissions Table */}
      <div className="rounded-xl border border-[#D4AF37]/30 bg-[#200508]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#FAF7F2]">
            <thead className="bg-[#180305] text-[#FFDF73] font-sans uppercase tracking-wider text-[11px] border-b border-[#D4AF37]/25">
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#EADBCE]/60">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FFDF73]" />
                    Đang tải danh sách hồ sơ...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#EADBCE]/60 italic">
                    Chưa có hồ sơ nào.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#FFDF73] whitespace-nowrap">
                      {row.ref}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#FAF7F2]">{row.name}</div>
                      <div className="text-[11px] text-[#EADBCE]/70">{row.org}</div>
                    </td>
                    <td className="p-4 text-[#EADBCE] font-sans">{row.route}</td>
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
                      {row.status === 'archived' && (
                        <span className="px-2.5 py-1 rounded bg-[#2b2b2b] border border-[#777]/40 text-[#bbb] font-semibold text-[11px]">
                          Lưu trữ
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
                ))
              )}
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
                <h3 className="font-sans text-xl font-bold text-[#FAF7F2] mt-0.5">
                  {selectedItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-[#FAF7F2]/60 hover:text-white p-1 cursor-pointer"
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
                <div className="text-[#FFDF73] font-sans font-bold">{selectedItem.route}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Email</span>
                <div className="text-[#FAF7F2] font-mono">{selectedItem.email}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider">Số điện thoại</span>
                <div className="text-[#FAF7F2] font-mono">{selectedItem.phone || 'Chưa cung cấp'}</div>
              </div>
            </div>

            {selectedItem.attachments_url && (
              <div className="p-3 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs">
                <span className="text-[#EADBCE]/60 uppercase tracking-wider block mb-1">
                  Tài liệu đính kèm:
                </span>
                <a
                  href={getImageUrl(selectedItem.attachments_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#FFDF73] hover:underline font-mono break-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedItem.attachments_url}</span>
                </a>
              </div>
            )}

            <div className="space-y-1 pt-2 border-t border-[#D4AF37]/20">
              <span className="text-xs text-[#EADBCE]/60 uppercase tracking-wider">
                Nội dung đề xuất kết nối:
              </span>
              <p className="p-3 rounded bg-[#140204] border border-[#D4AF37]/25 text-xs text-[#FAF7F2] leading-relaxed whitespace-pre-wrap">
                {selectedItem.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#EADBCE]/70">Trạng thái:</span>
                <select
                  value={selectedItem.status}
                  onChange={(e) => handleUpdateStatus(selectedItem.id, e.target.value)}
                  className="px-2.5 py-1 rounded bg-[#170305] border border-[#D4AF37]/35 text-xs text-[#FFDF73] focus:outline-none cursor-pointer"
                >
                  <option value="new">Mới</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="completed">Đã phản hồi</option>
                  <option value="archived">Lưu trữ</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteSubmission(selectedItem.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-bold transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="btn-gold px-4 py-1.5 rounded text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
