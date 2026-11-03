import React from 'react';

const AdminProducts = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-stone-800">Danh Sách Sản Phẩm Sơn Mài</h2>
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-sm">
          + Thêm sản phẩm
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200 text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Tên Sản Phẩm</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Giá</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Kho</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            <tr>
              <td className="px-4 py-3">#1</td>
              <td className="px-4 py-3 font-medium text-stone-900">Tranh Sơn Mài Sen Vàng Hoàng Cung</td>
              <td className="px-4 py-3 text-amber-700 font-semibold">3.500.000 ₫</td>
              <td className="px-4 py-3">15</td>
              <td className="px-4 py-3 text-stone-500">
                <button className="text-blue-600 hover:underline mr-3">Sửa</button>
                <button className="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;

