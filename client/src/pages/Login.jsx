import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@lacquer.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển hướng sang trang Admin sau khi đăng nhập thành công
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-stone-200 mt-10">
      <h2 className="text-2xl font-bold font-sans text-center text-stone-900 mb-6">Đăng Nhập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg transition-colors"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;

