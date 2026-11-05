const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Lấy danh sách tất cả các trang (hoặc lấy 1 trang theo query ?slug=...)
router.get('/', pageController.getAllPages);

// Tạo mới trang
router.post('/', pageController.createPage);

// Lấy trang theo ID
router.get('/id/:id', pageController.getPageById);
router.put('/id/:id', pageController.updatePage);
router.delete('/id/:id', pageController.deletePage);

// Cập nhật và xóa trang theo ID trực tiếp
router.put('/:id', pageController.updatePage);
router.delete('/:id', pageController.deletePage);

// Lấy và lưu trang theo slug qua route rõ ràng
router.get('/by-slug/:slug(*)', pageController.getPageBySlug);
router.post('/by-slug/:slug(*)', pageController.savePageBySlug);

// Lấy và lưu trang theo slug (slug chỉ nằm trong page)
router.get('/:slug', pageController.getPageBySlug);
router.post('/:slug', pageController.savePageBySlug);

module.exports = router;
