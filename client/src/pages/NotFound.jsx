import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold font-serif text-stone-900 mb-4">404</h1>
      <p className="text-stone-600 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFound;

