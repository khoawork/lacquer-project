import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import authServices from '../services/authServices';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('admin@lacquer.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Nếu đã đăng nhập trước đó thì chuyển hướng thẳng vào Admin
  useEffect(() => {
    if (authServices.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password) {
      setErrorMsg('Vui lòng điền đầy đủ tài khoản và mật khẩu.');
      return;
    }

    try {
      setLoading(true);
      const res = await authServices.login({
        email: identifier.trim(),
        username: identifier.trim(),
        password,
      });

      if (res.success) {
        // Chuyển hướng sang trang Admin hoặc trang trước đó
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.message || 'Đăng nhập không thành công.');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      const message =
        err.response?.data?.message ||
        'Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại!';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#100202] text-[#FAF7F2] font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(150,20,30,0.15)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c0407] border-2 border-[#D4AF37]/60 text-[#FFDF73] shadow-[0_0_25px_rgba(212,175,55,0.35)] mb-4">
            <Sparkles className="w-8 h-8 text-[#FFDF73]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#FFDF73]">
            SƠN MÀI CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#EADBCE]/75 tracking-widest uppercase mt-1">
            Hệ Thống Quản Trị Bách Niên Khởi Sắc
          </p>
        </div>

        {/* Card Form */}
        <div
          className="p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/30 bg-[#190407]/90 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#FAF7F2]">Đăng Nhập Quản Trị</h2>
              <p className="text-xs text-[#EADBCE]/60 mt-0.5">Truy cập bảng điều khiển hệ thống</p>
            </div>
           
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Username */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#EADBCE]/85 mb-2">
                Tài khoản hoặc Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@lacquer.com"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#24060a] border border-[#D4AF37]/30 text-[#FAF7F2] placeholder-[#EADBCE]/30 focus:outline-none focus:border-[#FFDF73] focus:ring-1 focus:ring-[#FFDF73] text-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#EADBCE]/85">
                  Mật khẩu
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#24060a] border border-[#D4AF37]/30 text-[#FAF7F2] placeholder-[#EADBCE]/30 focus:outline-none focus:border-[#FFDF73] focus:ring-1 focus:ring-[#FFDF73] text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#EADBCE]/60 hover:text-[#FFDF73] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember info */}
      

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#1a0406] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.6)] hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span>Đăng Nhập Quản Trị</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint for Demo */}
          <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 text-center">
            <p className="text-[11px] text-[#EADBCE]/50">
              Tài khoản mặc định: <span className="text-[#FFDF73]">admin@lacquer.com</span> | Mật khẩu: <span className="text-[#FFDF73]">admin123</span>
            </p>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#EADBCE]/70 hover:text-[#FFDF73] uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Quay lại trang chủ Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
