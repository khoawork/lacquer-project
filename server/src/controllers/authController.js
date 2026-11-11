const authService = require('../services/authService');

/**
 * Controller xử lý xác thực và phiên làm việc Quản trị viên
 */
const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;

    const { token, user } = await authService.login(identifier, password);

    // Thời gian hết hạn cookie là 24 giờ (24 * 60 * 60 * 1000 ms)
    const maxAgeMs = 24 * 60 * 60 * 1000;
    const isProduction = process.env.NODE_ENV === 'production';

    // Lưu token vào cookie của response
    res.cookie('admin_token', token, {
      maxAge: maxAgeMs,
      httpOnly: false, // Để client script có thể truy cập nếu cần kiểm tra trạng thái
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công.',
      token,
      expiresIn: '24h',
      user,
    });
  } catch (error) {
    const status = error.statusCode || 400;
    return res.status(status).json({
      success: false,
      message: error.message || 'Đăng nhập thất bại.',
    });
  }
};

/**
 * Lấy thông tin tài khoản hiện tại từ token (Cookie hoặc Bearer Header)
 */
const getMe = async (req, res) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies) {
      token = req.cookies.admin_token || req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Chưa có phiên đăng nhập.',
      });
    }

    const user = await authService.verifyToken(token);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Phiên làm việc không hợp lệ.',
    });
  }
};

/**
 * Đăng xuất: Xóa cookie chứa token
 */
const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const clearOptions = {
      path: '/',
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    };

    res.clearCookie('admin_token', clearOptions);
    res.clearCookie('token', clearOptions);

    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng xuất.',
    });
  }
};

module.exports = {
  login,
  getMe,
  logout,
};
