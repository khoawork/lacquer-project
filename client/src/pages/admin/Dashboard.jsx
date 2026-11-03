import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-stone-800">Tổng Quan Hệ Thống</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
          <p className="text-sm text-stone-500">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">128.500.000 ₫</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
          <p className="text-sm text-stone-500">Đơn hàng mới</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">24</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
          <p className="text-sm text-stone-500">Tổng sản phẩm</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">56</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

