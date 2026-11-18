const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

let mammoth = null;
try {
  mammoth = require('mammoth');
} catch (e) {
  console.warn('⚠️ Module mammoth chưa được tải:', e.message);
}

let pdfParse = null;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  console.warn('⚠️ Module pdf-parse chưa được tải:', e.message);
}

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

// Helper trích xuất các luồng ảnh JPEG từ buffer file (cho tài liệu PDF)
const extractJpegsFromBuffer = (buffer) => {
  const images = [];
  let startIndex = 0;
  while (startIndex < buffer.length - 4) {
    let foundStart = -1;
    for (let i = startIndex; i < buffer.length - 2; i++) {
      if (buffer[i] === 0xff && buffer[i + 1] === 0xd8 && buffer[i + 2] === 0xff) {
        foundStart = i;
        break;
      }
    }
    if (foundStart === -1) break;

    let foundEnd = -1;
    for (let i = foundStart + 3; i < buffer.length - 1; i++) {
      if (buffer[i] === 0xff && buffer[i + 1] === 0xd9) {
        foundEnd = i + 2;
        break;
      }
    }

    if (foundEnd !== -1) {
      const imgBuf = buffer.subarray(foundStart, foundEnd);
      // Chỉ lấy ảnh có kích thước lớn hơn 2KB (tránh các icon nhỏ/nhiễu)
      if (imgBuf.length > 2048) {
        images.push(imgBuf);
      }
      startIndex = foundEnd;
    } else {
      break;
    }
  }
  return images;
};

// POST /api/upload/parse-document (Tải tệp Word .docx hoặc PDF .pdf lên, trích xuất văn bản + tự động upload ảnh lên Cloudinary)
router.post('/parse-document', (req, res) => {
  uploadDocumentMulter.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Lỗi khi nhận tệp tài liệu',
      });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tệp Word (.docx) hoặc PDF (.pdf)',
      });
    }

    const originalname = req.file.originalname || 'document';
    const ext = path.extname(originalname).toLowerCase();
    const uploadedImages = [];

    try {
      if (ext === '.docx' || ext === '.doc') {
        if (!mammoth) {
          return res.status(500).json({
            success: false,
            message: 'Module xử lý tài liệu Word (mammoth) chưa khả dụng trên máy chủ',
          });
        }

        // Tùy chọn chuyển đổi cho mammoth: Bắt toàn bộ ảnh nhúng và tải lên Cloudinary
        const options = {
          convertImage: mammoth.images.inline((element) => {
            return element.read().then(async (imageBuffer) => {
              try {
                if (
                  process.env.CLOUDINARY_CLOUD_NAME &&
                  process.env.CLOUDINARY_API_KEY &&
                  process.env.CLOUDINARY_API_SECRET
                ) {
                  const uploadRes = await uploadBufferToCloudinary(
                    imageBuffer,
                    `word_embed_${Date.now()}`
                  );
                  const cloudUrl = uploadRes.secure_url || uploadRes.url;
                  uploadedImages.push(cloudUrl);
                  return { src: cloudUrl };
                } else {
                  const base64 = imageBuffer.toString('base64');
                  const mime = element.contentType || 'image/jpeg';
                  const base64Src = `data:${mime};base64,${base64}`;
                  uploadedImages.push(base64Src);
                  return { src: base64Src };
                }
              } catch (upErr) {
                console.warn('Lỗi tải ảnh Word lên Cloudinary:', upErr.message);
                const base64 = imageBuffer.toString('base64');
                const mime = element.contentType || 'image/jpeg';
                return { src: `data:${mime};base64,${base64}` };
              }
            });
          }),
        };

        const result = await mammoth.convertToHtml({ buffer: req.file.buffer }, options);
        let rawHtml = result.value || '';

        // Tinh chỉnh thẻ img thành khối figure đẹp mắt đồng bộ phong cách di sản
        rawHtml = rawHtml.replace(/<img\s+src="([^"]+)"([^>]*)>/gi, (match, src, rest) => {
          return `
            <figure class="my-6 text-center select-none" contenteditable="false">
              <img src="${src}" alt="Ảnh tư liệu từ tài liệu Word" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-w-full mx-auto max-h-[520px] object-cover" />
              <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans">
                Ảnh tư liệu trích xuất từ tài liệu Word
              </figcaption>
            </figure>
            <p><br /></p>
          `;
        });

        const suggestedTitle = path.parse(originalname).name.replace(/[_-]/g, ' ');

        return res.json({
          success: true,
          message: `Trích xuất tài liệu Word thành công! Đã lưu ${uploadedImages.length} ảnh lên cloud.`,
          type: 'docx',
          filename: originalname,
          title: suggestedTitle,
          html: rawHtml,
          imageCount: uploadedImages.length,
          images: uploadedImages,
        });
      } else if (ext === '.pdf') {
        if (!pdfParse) {
          return res.status(500).json({
            success: false,
            message: 'Module xử lý tài liệu PDF (pdf-parse) chưa khả dụng trên máy chủ',
          });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const textContent = pdfData.text || '';

        // Trích xuất ảnh JPEG nhúng trong PDF (nếu có) và tải lên Cloudinary
        const extractedJpegs = extractJpegsFromBuffer(req.file.buffer);
        for (let i = 0; i < extractedJpegs.length; i++) {
          try {
            if (
              process.env.CLOUDINARY_CLOUD_NAME &&
              process.env.CLOUDINARY_API_KEY &&
              process.env.CLOUDINARY_API_SECRET
            ) {
              const uploadRes = await uploadBufferToCloudinary(
                extractedJpegs[i],
                `pdf_embed_${Date.now()}_${i}`
              );
              uploadedImages.push(uploadRes.secure_url || uploadRes.url);
            }
          } catch (imgErr) {
            console.warn('Lỗi upload ảnh PDF lên Cloudinary:', imgErr.message);
          }
        }

        // Định dạng văn bản từ PDF thành các đoạn HTML chuẩn
        const rawLines = textContent.split(/\r?\n/);
        const paragraphs = [];
        let currentP = '';

        for (const line of rawLines) {
          const trimmed = line.trim();
          if (!trimmed) {
            if (currentP) {
              paragraphs.push(currentP);
              currentP = '';
            }
          } else {
            currentP = currentP ? `${currentP} ${trimmed}` : trimmed;
          }
        }
        if (currentP) paragraphs.push(currentP);

        let formattedHtml = '';
        paragraphs.forEach((p, idx) => {
          if (idx === 0 && p.length < 120) {
            formattedHtml += `<h2>${p}</h2>\n`;
          } else if (p.length < 80 && idx < 5) {
            formattedHtml += `<h3>${p}</h3>\n`;
          } else {
            formattedHtml += `<p>${p}</p>\n`;
          }
        });

        // Chèn các ảnh trích xuất được từ PDF vào bài viết
        if (uploadedImages.length > 0) {
          uploadedImages.forEach((imgUrl, imgIdx) => {
            formattedHtml += `
              <figure class="my-6 text-center select-none" contenteditable="false">
                <img src="${imgUrl}" alt="Ảnh tư liệu từ tệp PDF #${imgIdx + 1}" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-w-full mx-auto max-h-[520px] object-cover" />
                <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans">
                  Ảnh tư liệu trích xuất từ tài liệu PDF (Ảnh #${imgIdx + 1})
                </figcaption>
              </figure>
              <p><br /></p>
            `;
          });
        }

        const suggestedTitle = path.parse(originalname).name.replace(/[_-]/g, ' ');

        return res.json({
          success: true,
          message: `Trích xuất tài liệu PDF thành công! Đã lưu ${uploadedImages.length} ảnh lên cloud.`,
          type: 'pdf',
          filename: originalname,
          title: suggestedTitle,
          html: formattedHtml,
          imageCount: uploadedImages.length,
          images: uploadedImages,
          numPages: pdfData.numpages,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Định dạng tệp không được hỗ trợ. Vui lòng chọn tệp Word (.docx) hoặc PDF (.pdf)',
        });
      }
    } catch (parseError) {
      console.error('Lỗi khi phân tích tệp tài liệu:', parseError);
      return res.status(500).json({
        success: false,
        message: `Lỗi khi phân tích tài liệu: ${parseError.message || parseError}`,
      });
    }
  });
});

module.exports = router;
