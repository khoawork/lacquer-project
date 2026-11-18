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

// Multer cho tài liệu đính kèm (PDF, DOCX, ZIP tối đa 25MB)
const documentFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.pdf', '.doc', '.docx', '.zip', '.rar', '.7z'];
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/octet-stream',
  ];

  if (allowedExts.includes(ext) || allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận tài liệu định dạng PDF, DOC, DOCX, ZIP (tối đa 25MB)'), false);
  }
};

const uploadDocumentMulter = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
  fileFilter: documentFileFilter,
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

/**
 * Helper tải tệp tài liệu (PDF, DOCX, ZIP) lên Cloudinary với resource_type: 'raw'
 */
const uploadDocumentBufferToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const parsed = path.parse(originalname);
    const safeBase = parsed.name.replace(/[^a-zA-Z0-9]/g, '_');
    const ext = parsed.ext.toLowerCase();

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'lacquer_project/documents',
        public_id: `${safeBase}_${Date.now()}${ext}`,
        resource_type: 'raw',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

// POST /api/upload/document (Tải tệp đính kèm PDF, DOCX, ZIP tối đa 25MB)
router.post('/document', (req, res) => {
  uploadDocumentMulter.single('document')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Dung lượng tệp vượt quá giới hạn 25MB',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Lỗi khi tải tệp tài liệu',
      });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tệp tài liệu (PDF, DOC, DOCX, ZIP)',
      });
    }

    try {
      // 1. Nếu có cấu hình Cloudinary
      if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ) {
        const result = await uploadDocumentBufferToCloudinary(
          req.file.buffer,
          req.file.originalname
        );
        return res.json({
          success: true,
          message: 'Tải tài liệu lên máy chủ thành công',
          url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          filename: req.file.originalname,
        });
      }

      // 2. Fallback lưu local nếu chưa cấu hình Cloudinary
      const uploadDir = path.join(__dirname, '../../uploads/documents');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const parsed = path.parse(req.file.originalname);
      const safeBase = parsed.name.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `doc-${Date.now()}-${safeBase}${parsed.ext.toLowerCase()}`;
      fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);

      return res.json({
        success: true,
        message: 'Tải tài liệu cục bộ thành công',
        url: `/uploads/documents/${filename}`,
        filename: req.file.originalname,
      });
    } catch (uploadError) {
      console.error('Lỗi khi tải tài liệu:', uploadError);
      return res.status(500).json({
        success: false,
        message: `Lỗi tải tài liệu: ${uploadError.message || uploadError}`,
      });
    }
  });
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
