import React from 'react';

const AdminOrders = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">Quản Lý Đơn Hàng</h2>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200 text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Mã Đơn</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Khách Hàng</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Tổng Tiền</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            <tr>
              <td className="px-4 py-3 font-semibold text-stone-800">ORD-2026-001</td>
              <td className="px-4 py-3">Nguyễn Văn An</td>
              <td className="px-4 py-3 font-semibold text-amber-700">4.750.000 ₫</td>
              <td className="px-4 py-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Hoàn thành
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

