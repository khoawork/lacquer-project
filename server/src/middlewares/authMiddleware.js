const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_lacquer_jwt_key_2026';

/**
 * Middleware bảo vệ các route dành cho Quản trị viên
 */
const verifyAdminToken = async (req, res, next) => {
  try {
    let token = null;

    // 1. Kiểm tra trong header Authorization (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 2. Kiểm tra trong cookies nếu header không có
    if (!token && req.cookies) {
      token = req.cookies.admin_token || req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn.',
      });
    }

    // 3. Giải mã và kiểm tra hạn sử dụng của token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Lấy thông tin user trong DB
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại hoặc đã bị khóa.',
      });
    }

    req.user = user.toSafeJSON();
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Phiên đăng nhập đã hết hạn (sau 24h). Vui lòng đăng nhập lại.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token xác thực không hợp lệ.',
    });
  }
};

module.exports = {
  verifyAdminToken,
};
