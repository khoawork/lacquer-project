const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route Đăng nhập (tạo token 24h & thiết lập cookie)
router.post('/login', authController.login);

// Route Kiểm tra phiên làm việc hiện tại
router.get('/me', authController.getMe);

// Route Đăng xuất (xóa cookie)
router.post('/logout', authController.logout);

module.exports = router;
