const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { User } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_lacquer_jwt_key_2026';
const TOKEN_EXPIRY = '24h'; // Thời gian hết hạn token là 24h theo yêu cầu

/**
 * Tự động khởi tạo tài khoản Admin mặc định nếu hệ thống chưa có
 */
const seedDefaultAdmin = async () => {
  try {
    const adminCount = await User.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = await User.create({
        username: 'admin',
        email: 'admin@lacquer.com',
        password: hashedPassword,
        name: 'Quản Trị Viên (Admin)',
        role: 'admin',
      });
      console.log('✅ Khởi tạo tài khoản Admin mặc định:', defaultAdmin.email, '(mật khẩu: admin123)');
    }
  } catch (error) {
    console.warn('⚠️ Kiểm tra tài khoản admin mặc định:', error.message);
  }
};

/**
 * Đăng nhập quản trị viên
 * @param {string} identifier - Email hoặc Username
 * @param {string} password - Mật khẩu dạng plain text
 */
const login = async (identifier, password) => {
  if (!identifier || !password) {
    throw new Error('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.');
  }

  // Tự động kiểm tra seed nếu chưa có user nào
  await seedDefaultAdmin();

  const trimmedIdentifier = String(identifier).trim().toLowerCase();

  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: trimmedIdentifier },
        { username: trimmedIdentifier },
      ],
    },
  });

  if (!user) {
    const error = new Error('Tài khoản hoặc mật khẩu không chính xác.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Tài khoản hoặc mật khẩu không chính xác.');
    error.statusCode = 401;
    throw error;
  }

  // Tạo token JWT có thời hạn 24 giờ
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  return {
    token,
    user: user.toSafeJSON(),
  };
};

/**
 * Xác thực token JWT
 */
const verifyToken = async (token) => {
  if (!token) {
    const error = new Error('Không tìm thấy token xác thực.');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user) {
    const error = new Error('Người dùng không tồn tại hoặc đã bị thu hồi quyền.');
    error.statusCode = 401;
    throw error;
  }

  return user.toSafeJSON();
};

module.exports = {
  seedDefaultAdmin,
  login,
  verifyToken,
  TOKEN_EXPIRY,
};
