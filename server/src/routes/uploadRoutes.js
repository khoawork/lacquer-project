const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// Multer memory storage để đưa trực tiếp buffer lên Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận tệp định dạng hình ảnh (PNG, JPG, JPEG, WEBP, GIF, SVG)'), false);
    }
  },
});

// Middleware linh hoạt: chỉ gọi multer khi request là multipart/form-data
const handleUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  }
  next();
};

/**
 * Helper tải buffer lên Cloudinary qua upload_stream
 */
const uploadBufferToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const filenameWithoutExt = originalname
      ? path.parse(originalname).name.replace(/[^a-zA-Z0-9]/g, '_')
      : 'image';

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'lacquer_project',
        public_id: `${filenameWithoutExt}_${Date.now()}`,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

// POST /api/upload
router.post('/', handleUpload, async (req, res) => {
  try {
    // 1. Trường hợp người dùng tải tệp từ máy tính qua multipart/form-data
    if (req.file && req.file.buffer) {
      // Kiểm tra cấu hình Cloudinary
      if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ) {
        const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname);
        return res.json({
          success: true,
          message: 'Tải ảnh lên Cloudinary thành công',
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
        });
      }

      // Fallback lưu local nếu chưa cấu hình Cloudinary
      const uploadDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filename = `local-${Date.now()}-${req.file.originalname}`;
      fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);
      return res.json({
        success: true,
        message: 'Tải ảnh cục bộ thành công (chưa có Cloudinary)',
        url: `/uploads/${filename}`,
      });
    }

    // 2. Trường hợp gửi dữ liệu ảnh Base64
    if (req.body && (req.body.base64 || req.body.image)) {
      const base64Data = req.body.base64 || req.body.image;
      if (typeof base64Data === 'string' && base64Data.startsWith('data:image')) {
        if (
          process.env.CLOUDINARY_CLOUD_NAME &&
          process.env.CLOUDINARY_API_KEY &&
          process.env.CLOUDINARY_API_SECRET
        ) {
          const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'lacquer_project',
          });
          return res.json({
            success: true,
            message: 'Tải ảnh base64 lên Cloudinary thành công',
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Vui lòng chọn tệp ảnh hoặc cung cấp chuỗi Base64 hợp lệ',
    });
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
    res.status(500).json({
      success: false,
      message: `Lỗi tải ảnh lên Cloudinary: ${error.message || error}`,
    });
  }
});

// DELETE /api/upload/:public_id (Xóa ảnh trên Cloudinary khi cần)
router.delete('/:publicId(*)', async (req, res) => {
  try {
    const { publicId } = req.params;
    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Thiếu public_id của ảnh' });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return res.json({
      success: true,
      message: 'Đã xóa ảnh trên Cloudinary',
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
