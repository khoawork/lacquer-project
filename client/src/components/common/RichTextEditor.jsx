import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Undo,
  Redo,
  Maximize2,
  Minimize2,
  Code,
  Sparkles,
  HelpCircle,
  Loader2,
  Heading1,
  Heading2,
  Heading3,
  Type,
  X,
  FileText,
  FileUp,
  Sliders,
  Trash2,
  Check,
} from 'lucide-react';
import mammoth from 'mammoth';
import { uploadService } from '../../services/uploadService';
import { getImageUrl } from '../../configs/Apis';

/**
 * RichTextEditor - Trình soạn thảo văn bản phong phú phong cách Microsoft Word
 * Hỗ trợ:
 * - Định dạng văn bản đầy đủ (H2-H4, bold, italic, căn lề, danh sách, quote...)
 * - Tải gắn ảnh từ máy tính lên Cloudinary
 * - TẢI VĂN BẢN WORD (.DOCX) HOẶC PDF (.PDF): Tự động trích xuất nội dung văn bản,
 *   tự động quét và lưu toàn bộ ảnh trong tài liệu lên Cloudinary, và hiển thị xem trước.
 * - Dán ảnh trực tiếp từ Clipboard (Ctrl + V)
 * - Chế độ toàn màn hình và xem mã nguồn HTML
 */
const RichTextEditor = ({
  value = '',
  onChange,
  onDocumentParsed,
  placeholder = 'Nhập nội dung bài viết chi tiết tại đây...',
  minHeight = '380px',
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const savedSelectionRef = useRef(null);

  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value || '');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [importingDoc, setImportingDoc] = useState(false);
  const [importStatusText, setImportStatusText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragUploadCount, setDragUploadCount] = useState(0);
  const dragCounterRef = useRef(0);

  // Modals
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageCaptionInput, setImageCaptionInput] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrlInput, setLinkUrlInput] = useState('');
  const [linkTextInput, setLinkTextInput] = useState('');

  // State chỉnh sửa kích thước và chú thích (caption) của ảnh
  const [editingImage, setEditingImage] = useState(null);
  const [imageSizePercent, setImageSizePercent] = useState(100);
  const [imageAlign, setImageAlign] = useState('center');
  const [imageCaptionText, setImageCaptionText] = useState('');
  const [imageAltText, setImageAltText] = useState('');

  // Đồng bộ giá trị từ ngoài vào editor nếu khác biệt lớn
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlSource(value || '');
  }, [value, isHtmlMode]);

  // Lưu vị trí con trỏ hiện tại
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  // Khôi phục con trỏ
  const restoreSelection = () => {
    if (savedSelectionRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  // Chèn HTML tại vị trí con trỏ
  const insertHtml = useCallback(
    (html) => {
      if (isHtmlMode) {
        setHtmlSource((prev) => prev + html);
        if (onChange) onChange(htmlSource + html);
        return;
      }

      if (editorRef.current) {
        editorRef.current.focus();
        restoreSelection();

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          const frag = document.createDocumentFragment();
          let node;
          let lastNode = null;
          while ((node = tempDiv.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          if (lastNode) {
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else {
          document.execCommand('insertHTML', false, html);
        }

        handleInput();
      }
    },
    [isHtmlMode, htmlSource, onChange]
  );

  // Thực thi lệnh document.execCommand
  const executeCommand = (command, val = null) => {
    if (isHtmlMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, val);
      handleInput();
    }
  };

  // Khi nội dung editor thay đổi
  const handleInput = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtmlSource(newHtml);
      if (onChange) {
        onChange(newHtml);
      }
    }
  };

  // 1. Xử lý tải ảnh lẻ từ máy tính lên Cloudinary và chèn vào bài viết
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedUrl = await uploadService.uploadImage(file);
      const fullUrl = getImageUrl(uploadedUrl);

      // Chèn khối ảnh kèm caption đẹp mắt chuẩn bảo tàng di sản
      const imageHtml = `
        <figure class="my-6 text-center select-none" style="text-align: center; margin: 1.5rem auto;">
          <img src="${fullUrl}" alt="${file.name || 'Ảnh tư liệu'}" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-h-[520px] object-cover transition-all" style="width: 100%; max-width: 100%; margin: 0 auto; display: block;" />
          <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans" contenteditable="true" data-placeholder="Nhập chú thích ảnh...">
            Tư liệu: ${file.name.replace(/\.[^/.]+$/, '')}
          </figcaption>
        </figure>
        <p><br /></p>
      `;

      insertHtml(imageHtml);
    } catch (err) {
      alert('Không thể tải ảnh lên: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 2. XỬ LÝ TỆP WORD (.DOCX) HOẶC PDF -> ĐƯA THẲNG VÀO Ô NỘI DUNG CHI TIẾT
  const processDocFile = async (file) => {
    if (!file) return;

    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    setImportingDoc(true);

    try {
      let finalHtml = '';
      let uploadedImageCount = 0;
      let docTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

      // ƯU TIÊN 1: Nếu là tệp Word (.docx, .doc) -> Xử lý trực tiếp trên trình duyệt qua thư viện mammoth
      // Tự động quét và đưa toàn bộ ảnh nhúng lên Cloudinary mà không phụ thuộc backend
      if (ext === '.docx' || ext === '.doc') {
        setImportStatusText('Đang đọc tệp Word và tải ảnh lên Cloudinary...');
        try {
          const arrayBuffer = await file.arrayBuffer();
          const options = {
            convertImage: mammoth.images.inline((element) => {
              return element.read('base64').then(async (imageBufferBase64) => {
                const mime = element.contentType || 'image/jpeg';
                const dataUri = `data:${mime};base64,${imageBufferBase64}`;
                try {
                  const cloudUrl = await uploadService.uploadImage(dataUri);
                  uploadedImageCount++;
                  return { src: cloudUrl };
                } catch (upErr) {
                  console.warn('Lỗi tải ảnh Word lên Cloudinary:', upErr);
                  return { src: dataUri };
                }
              });
            }),
          };

          const conversion = await mammoth.convertToHtml({ arrayBuffer }, options);
          let rawHtml = conversion.value || '';

          // Chuẩn hóa ảnh sang thẻ figure đẹp mắt
          rawHtml = rawHtml.replace(/<img\s+src="([^"]+)"([^>]*)>/gi, (match, src) => {
            return `
              <figure class="my-6 text-center select-none" contenteditable="false">
                <img src="${src}" alt="Ảnh từ tài liệu Word" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-w-full mx-auto max-h-[520px] object-cover" />
                <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans">
                  Ảnh tư liệu trích xuất từ tài liệu Word
                </figcaption>
              </figure>
              <p><br /></p>
            `;
          });

          finalHtml = rawHtml;
        } catch (docxErr) {
          console.warn('Lỗi phân tích Word trực tiếp trên trình duyệt:', docxErr);
        }
      }

      // ƯU TIÊN 2: Nếu chưa có nội dung (ví dụ tệp PDF hoặc Word cần fallback qua server)
      if (!finalHtml) {
        setImportStatusText('Đang gửi tệp đến máy chủ để trích xuất nội dung...');
        try {
          const result = await uploadService.parseDocument(file);
          if (result && result.html) {
            finalHtml = result.html;
            uploadedImageCount = result.imageCount || 0;
            if (result.title) docTitle = result.title;
          }
        } catch (serverErr) {
          if (serverErr.response?.status === 404) {
            throw new Error(
              'Máy chủ backend trả về 404 cho API /parse-document. Hãy khởi động lại backend (Ctrl + C và npm start) để áp dụng route mới.'
            );
          }
          throw serverErr;
        }
      }

      if (!finalHtml || !finalHtml.trim()) {
        alert('Tài liệu không chứa nội dung văn bản có thể trích xuất.');
        return;
      }

      // ĐƯA TOÀN BỘ NỘI DUNG VÀO Ô NỘI DUNG CHI TIẾT NGAY LẬP TỨC
      if (editorRef.current && !isHtmlMode) {
        editorRef.current.innerHTML = finalHtml;
      }
      setHtmlSource(finalHtml);
      if (onChange) {
        onChange(finalHtml);
      }

      if (onDocumentParsed) {
        onDocumentParsed({
          title: docTitle,
          html: finalHtml,
          filename: file.name,
          imageCount: uploadedImageCount,
        });
      }

      alert(
        `Đã đưa toàn bộ nội dung từ tệp "${file.name}" vào ô nội dung chi tiết thành công!` +
          (uploadedImageCount > 0 ? ` (Đã tự động lưu ${uploadedImageCount} ảnh trong bài lên Cloudinary)` : '')
      );
    } catch (err) {
      console.error('Lỗi khi nạp tài liệu:', err);
      alert('Lỗi nạp tài liệu: ' + (err.message || 'Vui lòng kiểm tra lại tệp'));
    } finally {
      setImportingDoc(false);
      setImportStatusText('');
      if (docInputRef.current) {
        docInputRef.current.value = '';
      }
    }
  };

  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processDocFile(file);
    }
  };

  // 3. KÉO VÀ THẢ ẢNH TRỰC TIẾP VÀO Ô SOẠN THẢO (DRAG & DROP)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const files = Array.from(e.dataTransfer?.files || []);

    // Trường hợp 1: Nếu người dùng kéo file Word (.docx) hoặc PDF
    const docFile = files.find((f) => {
      const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
      return ext === '.docx' || ext === '.doc' || ext === '.pdf';
    });
    if (docFile) {
      await processDocFile(docFile);
      return;
    }

    // Trường hợp 2: Lọc các file ảnh máy tính được kéo vào
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));

    // Trường hợp 3: Kéo ảnh từ trình duyệt / tab khác (URL ảnh hoặc HTML)
    if (imageFiles.length === 0) {
      const htmlData = e.dataTransfer.getData('text/html');
      const uriList = e.dataTransfer.getData('text/uri-list');
      if (htmlData && /<img/i.test(htmlData)) {
        insertHtml(htmlData);
        return;
      }
      if (uriList && /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(uriList)) {
        const imgHtml = `
          <figure class="my-6 text-center select-none" contenteditable="false">
            <img src="${uriList}" alt="Ảnh liên kết" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-w-full mx-auto max-h-[520px] object-cover" />
            <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans">Ảnh liên kết</figcaption>
          </figure>
          <p><br /></p>
        `;
        insertHtml(imgHtml);
        return;
      }
      return;
    }

    // Trường hợp 4: Tải danh sách ảnh được kéo thả lên Cloudinary và chèn vào vị trí soạn thảo
    try {
      setUploading(true);
      setDragUploadCount(imageFiles.length);

      for (let i = 0; i < imageFiles.length; i++) {
        const imgFile = imageFiles[i];
        const uploadedUrl = await uploadService.uploadImage(imgFile);
        const fullUrl = getImageUrl(uploadedUrl);
        const caption = imgFile.name
          ? imgFile.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
          : 'Ảnh tư liệu bài viết';

        const imageHtml = `
          <figure class="my-6 text-center select-none" style="text-align: center; margin: 1.5rem auto;">
            <img src="${fullUrl}" alt="${caption}" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-h-[520px] object-cover transition-all" style="width: 100%; max-width: 100%; margin: 0 auto; display: block;" />
            <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans" contenteditable="true" data-placeholder="Nhập chú thích ảnh...">${caption}</figcaption>
          </figure>
          <p><br /></p>
        `;
        insertHtml(imageHtml);
      }
    } catch (err) {
      console.error('Lỗi khi tải ảnh kéo thả:', err);
      alert('Không thể tải ảnh kéo thả lên Cloudinary: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setUploading(false);
      setDragUploadCount(0);
    }
  };

  // 4. Hỗ trợ dán ảnh trực tiếp từ Clipboard (Ctrl + V)
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          try {
            setUploading(true);
            const uploadedUrl = await uploadService.uploadImage(file);
            const fullUrl = getImageUrl(uploadedUrl);
            const imageHtml = `
              <figure class="my-6 text-center select-none" style="text-align: center; margin: 1.5rem auto;">
                <img src="${fullUrl}" alt="Ảnh dán từ clipboard" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-h-[520px] object-cover transition-all" style="width: 100%; max-width: 100%; margin: 0 auto; display: block;" />
                <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans" contenteditable="true" data-placeholder="Nhập chú thích ảnh...">
                  Ảnh tư liệu bổ sung
                </figcaption>
              </figure>
              <p><br /></p>
            `;
            insertHtml(imageHtml);
          } catch (err) {
            console.error('Lỗi upload ảnh dán clipboard:', err);
          } finally {
            setUploading(false);
          }
        }
        break;
      }
    }
  };

  // Xác nhận chèn ảnh từ URL
  const handleConfirmImageUrl = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;

    const fullUrl = getImageUrl(imageUrlInput.trim());
    const caption = imageCaptionInput.trim() || 'Ảnh tư liệu bài viết';

    const imageHtml = `
      <figure class="my-6 text-center select-none" style="text-align: center; margin: 1.5rem auto;">
        <img src="${fullUrl}" alt="${caption}" class="rounded-xl border border-[#D4AF37]/40 shadow-2xl max-h-[520px] object-cover transition-all" style="width: 100%; max-width: 100%; margin: 0 auto; display: block;" />
        <figcaption class="text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans" contenteditable="true" data-placeholder="Nhập chú thích ảnh...">${caption}</figcaption>
      </figure>
      <p><br /></p>
    `;

    insertHtml(imageHtml);
    setShowUrlModal(false);
    setImageUrlInput('');
    setImageCaptionInput('');
  };

  // Xác nhận chèn liên kết
  const handleConfirmLink = (e) => {
    e.preventDefault();
    if (!linkUrlInput.trim()) return;

    const url = linkUrlInput.trim();
    const text = linkTextInput.trim() || url;
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#FFDF73] underline hover:text-white">${text}</a>`;

    insertHtml(linkHtml);
    setShowLinkModal(false);
    setLinkUrlInput('');
    setLinkTextInput('');
  };

  // 5. XỬ LÝ CLICK VÀO ẢNH ĐỂ CHỈNH SỬA KÍCH THƯỚC VÀ CHÚ THÍCH (CAPTION)
  const handleEditorClick = (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
      const figure = target.closest('figure');
      const figcaption = figure ? figure.querySelector('figcaption') : null;

      // Xác định tỉ lệ % hoặc px hiện tại của ảnh
      let percent = 100;
      const widthVal = target.style.width || target.getAttribute('width') || '';
      if (widthVal.endsWith('%')) {
        percent = parseInt(widthVal, 10) || 100;
      } else if (widthVal.endsWith('px')) {
        const px = parseInt(widthVal, 10);
        const parentW = editorRef.current ? editorRef.current.clientWidth : 800;
        percent = Math.min(100, Math.max(20, Math.round((px / parentW) * 100)));
      }

      // Xác định căn lề hiện tại
      let align = 'center';
      if (figure) {
        if (
          figure.style.textAlign === 'left' ||
          figure.style.float === 'left' ||
          figure.classList.contains('text-left')
        ) {
          align = 'left';
        } else if (
          figure.style.textAlign === 'right' ||
          figure.style.float === 'right' ||
          figure.classList.contains('text-right')
        ) {
          align = 'right';
        }
      }

      const caption = figcaption ? figcaption.innerText : '';
      const alt = target.alt || '';

      setEditingImage({
        imgElement: target,
        figureElement: figure,
        src: target.src,
      });
      setImageSizePercent(percent);
      setImageAlign(align);
      setImageCaptionText(caption);
      setImageAltText(alt);
    }
  };

  // Áp dụng chỉnh sửa kích thước, căn lề và chú thích ảnh
  const handleApplyImageEdit = (e) => {
    if (e) e.preventDefault();
    if (!editingImage || !editingImage.imgElement) return;

    const img = editingImage.imgElement;
    let figure = editingImage.figureElement || img.closest('figure');

    // 1. Áp dụng kích thước chiều rộng
    img.style.width = `${imageSizePercent}%`;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';

    // 2. Áp dụng văn bản thay thế (alt)
    img.alt = imageAltText || '';

    // 3. Đảm bảo có thẻ figure bọc quanh ảnh
    if (!figure) {
      figure = document.createElement('figure');
      figure.className = 'my-6 select-none';
      img.parentNode.insertBefore(figure, img);
      figure.appendChild(img);
    }

    // 4. Áp dụng căn lề hiển thị
    figure.style.display = 'block';
    if (imageAlign === 'left') {
      figure.style.textAlign = 'left';
      figure.style.marginLeft = '0';
      figure.style.marginRight = 'auto';
      img.style.marginLeft = '0';
      img.style.marginRight = 'auto';
    } else if (imageAlign === 'right') {
      figure.style.textAlign = 'right';
      figure.style.marginLeft = 'auto';
      figure.style.marginRight = '0';
      img.style.marginLeft = 'auto';
      img.style.marginRight = '0';
    } else {
      figure.style.textAlign = 'center';
      figure.style.marginLeft = 'auto';
      figure.style.marginRight = 'auto';
      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
    }

    // 5. Áp dụng chú thích ảnh (Caption)
    let figcaption = figure.querySelector('figcaption');
    if (imageCaptionText && imageCaptionText.trim()) {
      if (!figcaption) {
        figcaption = document.createElement('figcaption');
        figcaption.className = 'text-xs text-[#EADBCE]/75 italic mt-2.5 font-sans';
        figure.appendChild(figcaption);
      }
      figcaption.innerText = imageCaptionText.trim();
      figcaption.contentEditable = 'true';
      figcaption.setAttribute('data-placeholder', 'Nhập chú thích ảnh...');
    } else {
      if (figcaption) {
        figcaption.remove();
      }
    }

    handleInput();
    setEditingImage(null);
  };

  // Xóa ảnh được chọn
  const handleDeleteImage = () => {
    if (!editingImage) return;
    if (window.confirm('Bạn có chắc chắn muốn xóa ảnh này khỏi bài viết?')) {
      const { imgElement, figureElement } = editingImage;
      if (figureElement) {
        figureElement.remove();
      } else if (imgElement) {
        imgElement.remove();
      }
      handleInput();
      setEditingImage(null);
    }
  };

  // Đếm từ và ký tự
  const stats = React.useMemo(() => {
    const text = (htmlSource || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const charCount = text ? text.length : 0;
    return { wordCount, charCount };
  }, [htmlSource]);

  return (
    <div
      className={`flex flex-col rounded-xl border border-[#D4AF37]/40 bg-[#140305] shadow-2xl transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-[100] rounded-none border-none bg-[#140305]'
          : 'relative w-full'
      }`}
    >
      {/* File input ẩn cho upload ảnh máy tính */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
        className="hidden"
      />

      {/* File input ẩn cho upload tệp Word / PDF */}
      <input
        type="file"
        ref={docInputRef}
        onChange={handleDocUpload}
        accept=".docx, .doc, .pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
        className="hidden"
      />

      {/* TOOLBAR CHÍNH PHONG CÁCH WORD (RIBBON) */}
      <div className="shrink-0 flex flex-wrap items-center gap-1.5 p-2 bg-[#200508] border-b border-[#D4AF37]/30 text-[#FAF7F2] select-none rounded-t-xl">
        {/* NÚT TẢI FILE WORD / PDF LÊN (TỰ ĐỘNG LƯU ẢNH TRÊN CLOUD & PREVIEW) */}
        <button
          type="button"
          onClick={() => {
            if (docInputRef.current) docInputRef.current.click();
          }}
          disabled={importingDoc || isHtmlMode}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#205295] to-[#0A2647] hover:brightness-125 border border-[#60A5FA]/60 text-white text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer disabled:opacity-50"
          title="Tải tệp Word (.docx) hoặc PDF (.pdf) lên. Toàn bộ chữ và ảnh trong tệp sẽ được lưu lên Cloud và xem trước tại đây"
        >
          {importingDoc ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          ) : (
            <FileUp className="w-3.5 h-3.5 text-blue-300" />
          )}
          <span>{importingDoc ? 'Đang đọc file & lưu ảnh...' : 'Nhập Word '}</span>
        </button>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* Nhóm Heading / Định dạng khối */}
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') executeCommand('formatBlock', '<p>');
            else if (val === 'h2') executeCommand('formatBlock', '<h2>');
            else if (val === 'h3') executeCommand('formatBlock', '<h3>');
            else if (val === 'h4') executeCommand('formatBlock', '<h4>');
            else if (val === 'blockquote') executeCommand('formatBlock', '<blockquote>');
          }}
          disabled={isHtmlMode}
          defaultValue="p"
          className="px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-xs text-[#FFDF73] font-bold focus:outline-none cursor-pointer"
        >
          <option value="p">Đoạn văn (Normal)</option>
          <option value="h2">Tiêu đề lớn (H2)</option>
          <option value="h3">Tiêu đề vừa (H3)</option>
          <option value="h4">Tiêu đề nhỏ (H4)</option>
          <option value="blockquote">Trích dẫn (Quote)</option>
        </select>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* Nhóm In đậm, Nghiêng, Gạch chân */}
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          disabled={isHtmlMode}
          title="In đậm (Ctrl+B)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('italic')}
          disabled={isHtmlMode}
          title="In nghiêng (Ctrl+I)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('underline')}
          disabled={isHtmlMode}
          title="Gạch chân (Ctrl+U)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('strikeThrough')}
          disabled={isHtmlMode}
          title="Gạch ngang chữ"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* Nhóm Căn lề */}
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          disabled={isHtmlMode}
          title="Căn trái"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          disabled={isHtmlMode}
          title="Căn giữa"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          disabled={isHtmlMode}
          title="Căn phải"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('justifyFull')}
          disabled={isHtmlMode}
          title="Căn đều hai bên"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* Nhóm Danh sách & Trích dẫn */}
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          disabled={isHtmlMode}
          title="Danh sách dấu chấm"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          disabled={isHtmlMode}
          title="Danh sách số"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('insertHorizontalRule')}
          disabled={isHtmlMode}
          title="Chèn đường kẻ phân đoạn"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* NÚT GẮN ẢNH TỪ MÁY TÍNH */}
        <button
          type="button"
          onClick={() => {
            saveSelection();
            if (fileInputRef.current) fileInputRef.current.click();
          }}
          disabled={uploading || isHtmlMode}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#120204] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow cursor-pointer disabled:opacity-50"
          title="Tải ảnh lẻ từ máy tính chèn vào bài viết"
        >
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#120204]" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>{uploading ? 'Đang tải ảnh...' : 'Gắn ảnh máy tính'}</span>
        </button>

        {/* Chèn ảnh từ URL */}
        <button
          type="button"
          onClick={() => {
            saveSelection();
            setShowUrlModal(true);
          }}
          disabled={isHtmlMode}
          title="Chèn ảnh từ đường link URL trực tuyến"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#FFDF73] transition cursor-pointer"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* NÚT CHỈNH SỬA CỠ VÀ CHÚ THÍCH ẢNH */}
        <button
          type="button"
          onClick={() => {
            if (editorRef.current) {
              const firstImg = editorRef.current.querySelector('img');
              if (firstImg) {
                firstImg.click();
              } else {
                alert('Chưa có hình ảnh nào trong bài viết. Hãy kéo thả ảnh hoặc bấm [Gắn ảnh máy tính] để chèn ảnh trước.');
              }
            }
          }}
          disabled={isHtmlMode}
          title="Chỉnh sửa kích cỡ & chú thích ảnh (Hoặc click trực tiếp vào bất kỳ ảnh nào trong bài)"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#D4AF37]/45 bg-[#1b0306] hover:bg-[#3d090f] text-[#FFDF73] text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cỡ & Chú thích ảnh</span>
        </button>

        {/* Chèn Link */}
        <button
          type="button"
          onClick={() => {
            saveSelection();
            setShowLinkModal(true);
          }}
          disabled={isHtmlMode}
          title="Chèn liên kết (Link)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-[#D4AF37]/25 mx-1" />

        {/* Hoàn tác / Làm lại */}
        <button
          type="button"
          onClick={() => executeCommand('undo')}
          disabled={isHtmlMode}
          title="Hoàn tác (Ctrl+Z)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('redo')}
          disabled={isHtmlMode}
          title="Làm lại (Ctrl+Y)"
          className="p-1.5 rounded hover:bg-[#3d090f] text-[#EADBCE] hover:text-[#FFDF73] transition cursor-pointer"
        >
          <Redo className="w-4 h-4" />
        </button>

        {/* Phía bên phải: HTML Mode & Toàn màn hình */}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isHtmlMode) {
                if (editorRef.current) {
                  editorRef.current.innerHTML = htmlSource;
                }
                setIsHtmlMode(false);
              } else {
                if (editorRef.current) {
                  setHtmlSource(editorRef.current.innerHTML);
                }
                setIsHtmlMode(true);
              }
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
              isHtmlMode
                ? 'bg-[#FFDF73] text-[#120204]'
                : 'bg-[#100203] text-[#EADBCE]/80 border border-[#D4AF37]/30 hover:text-white'
            }`}
            title="Chuyển đổi xem mã nguồn HTML"
          >
            <span className="flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              <span>HTML</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 hover:border-[#FFDF73] text-[#FFDF73] transition cursor-pointer"
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* VÙNG NỘI DUNG SOẠN THẢO (WYSIWYG HOẶC HTML SOURCE) - HỖ TRỢ KÉO THẢ ẢNH & FILE WORD */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 flex flex-col p-4 overflow-y-auto relative transition-colors ${
          isDragging ? 'bg-[#27060a]' : ''
        }`}
      >
        {isHtmlMode ? (
          <textarea
            value={htmlSource}
            onChange={(e) => {
              setHtmlSource(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            placeholder="Mã nguồn HTML của bài viết..."
            className="w-full flex-1 min-h-[350px] p-4 font-mono text-xs text-amber-200 bg-[#0d0103] border border-[#D4AF37]/30 rounded-lg focus:outline-none leading-relaxed"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onClick={handleEditorClick}
            onInput={handleInput}
            onKeyUp={saveSelection}
            onMouseUp={saveSelection}
            onPaste={handlePaste}
            data-placeholder={placeholder}
            style={{ minHeight }}
            className="prose-lacquer w-full flex-1 outline-none font-body text-[16px] text-[#FAF7F2] leading-[1.9] focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#EADBCE]/40 empty:before:pointer-events-none"
          />
        )}

        {/* OVERLAY HIỂN THỊ KHI ĐANG KÉO ẢNH TRÊN KHUNG */}
        {isDragging && (
          <div className="absolute inset-2 z-40 bg-[#160205]/95 backdrop-blur-sm border-2 border-dashed border-[#FFDF73] rounded-xl flex flex-col items-center justify-center p-6 text-center pointer-events-none shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-2xl bg-[#3d090f] border border-[#FFDF73]/70 flex items-center justify-center text-[#FFDF73] mb-3 shadow-[0_0_25px_rgba(255,223,115,0.4)] animate-bounce">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="font-sans text-base font-bold text-[#FFDF73] uppercase tracking-wider mb-1">
              Thả ảnh vào đây để tải lên Cloudinary & chèn vào bài
            </h4>
            <p className="text-xs text-[#EADBCE]/85 max-w-md">
              Hệ thống tự động tối ưu hóa, lưu trữ vĩnh viễn trên Cloudinary và chèn vào vị trí con trỏ của bài viết.
            </p>
            <span className="mt-3 px-3 py-1 rounded-full bg-[#2a060b] border border-[#D4AF37]/40 text-[11px] font-mono text-amber-200">
              Có thể kéo thả nhiều ảnh cùng lúc, hoặc kéo thả tệp Word (.docx)
            </span>
          </div>
        )}

        {/* OVERLAY KHI ĐANG TẢI ẢNH KÉO THẢ LÊN CLOUDINARY */}
        {uploading && (
          <div className="absolute inset-0 z-35 bg-[#120204]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#FFDF73]" />
            <p className="text-sm font-bold text-[#FFDF73]">
              Đang tải ảnh lên Cloudinary và chèn vào bài viết...
            </p>
            {dragUploadCount > 0 && (
              <p className="text-xs text-[#EADBCE]/75">Đang xử lý {dragUploadCount} ảnh...</p>
            )}
          </div>
        )}

        {/* Loading Overlay khi đang Import file Word / PDF */}
        {importingDoc && (
          <div className="absolute inset-0 z-30 bg-[#120204]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Loader2 className="w-9 h-9 animate-spin text-[#FFDF73]" />
            <div className="space-y-1">
              <h4 className="font-sans text-base font-bold text-[#FFDF73]">
                Đang xử lý tệp Word / PDF...
              </h4>
              <p className="text-xs text-[#EADBCE]/80">
                {importStatusText || 'Đang trích xuất văn bản và tự động lưu hình ảnh lên cloud...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* THANH TRẠNG THÁI & ĐẾM TỪ Ở ĐÁY */}
      <div className="shrink-0 px-4 py-2 bg-[#1a0407] border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between text-[11px] text-[#EADBCE]/70 font-sans">
        <div className="flex items-center gap-3">
          <span>
            Số từ: <strong className="text-[#FFDF73]">{stats.wordCount}</strong>
          </span>
          <span>•</span>
          <span>
            Ký tự: <strong className="text-[#FFDF73]">{stats.charCount}</strong>
          </span>
          <span>•</span>
          <span className="italic text-[#EADBCE]/70">
            Hỗ trợ kéo thả ảnh trực tiếp, dán ảnh (Ctrl+V) hoặc nhập tệp Word (.docx).
          </span>
        </div>

        {uploading && (
          <div className="flex items-center gap-1.5 text-amber-300 font-bold animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang nạp ảnh lên máy chủ di sản...</span>
          </div>
        )}
      </div>

      {/* MODAL: CHÈN ẢNH TỪ URL */}
      {showUrlModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#200407] border border-[#D4AF37]/60 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2.5">
              <h4 className="text-sm font-bold text-[#FFDF73] uppercase tracking-wide">
                Chèn Ảnh Từ Đường Dẫn Trực Tuyến
              </h4>
              <button
                type="button"
                onClick={() => setShowUrlModal(false)}
                className="text-[#EADBCE]/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmImageUrl} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#FFDF73] font-bold mb-1">
                  Đường dẫn ảnh (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://domain.com/image.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/40 text-white focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#EADBCE]/80 font-bold mb-1">
                  Chú thích ảnh (Caption)
                </label>
                <input
                  type="text"
                  placeholder="VD: Nghệ nhân thực hiện công đoạn mài lộ..."
                  value={imageCaptionInput}
                  onChange={(e) => setImageCaptionInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/40 text-white focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-3 py-1.5 rounded border border-[#D4AF37]/30 text-[#EADBCE] hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#120204] font-bold"
                >
                  Chèn ảnh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CHÈN LIÊN KẾT */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#200407] border border-[#D4AF37]/60 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2.5">
              <h4 className="text-sm font-bold text-[#FFDF73] uppercase tracking-wide">
                Chèn Liên Kết (Link)
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-[#EADBCE]/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmLink} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#FFDF73] font-bold mb-1">
                  Đường dẫn Web (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={linkUrlInput}
                  onChange={(e) => setLinkUrlInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/40 text-white focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#EADBCE]/80 font-bold mb-1">
                  Văn bản hiển thị
                </label>
                <input
                  type="text"
                  placeholder="VD: Tìm hiểu thêm về Làng nghề Hạ Thái..."
                  value={linkTextInput}
                  onChange={(e) => setLinkTextInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/40 text-white focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3 py-1.5 rounded border border-[#D4AF37]/30 text-[#EADBCE] hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#120204] font-bold"
                >
                  Tạo liên kết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CHỈNH SỬA KÍCH THƯỚC ẢNH VÀ GẮN CHÚ THÍCH (CAPTION) */}
      {editingImage && (
        <div className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#200407] border border-[#D4AF37]/60 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3d090f] border border-[#D4AF37]/45 flex items-center justify-center text-[#FFDF73]">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-sans text-base font-bold text-[#FFDF73] uppercase tracking-wide">
                  Chỉnh Sửa Kích Thước & Chú Thích Ảnh
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingImage(null)}
                className="text-[#EADBCE]/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Preview */}
            <div className="flex items-center justify-center p-3 rounded-xl bg-[#120204] border border-[#D4AF37]/20 max-h-[160px] overflow-hidden">
              <img
                src={editingImage.src}
                alt="Xem trước ảnh"
                className="max-h-[140px] max-w-full rounded-lg object-contain border border-[#D4AF37]/30"
              />
            </div>

            <form onSubmit={handleApplyImageEdit} className="space-y-4 text-xs font-sans">
              {/* Kích thước ảnh */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#FFDF73] font-bold uppercase tracking-wider">
                    Kích Thước Ảnh ({imageSizePercent}%)
                  </label>
                  <span className="text-[11px] text-[#EADBCE]/70 italic">
                    Kéo thanh trượt hoặc chọn tỉ lệ
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={imageSizePercent}
                    onChange={(e) => setImageSizePercent(Number(e.target.value))}
                    className="flex-1 accent-amber-400 cursor-pointer"
                  />
                  <span className="w-12 text-right font-mono font-bold text-amber-300">
                    {imageSizePercent}%
                  </span>
                </div>

                {/* Nút bấm tỉ lệ nhanh */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '25% (Nhỏ)', val: 25 },
                    { label: '50% (Vừa)', val: 50 },
                    { label: '75% (Lớn)', val: 75 },
                    { label: '100% (Tràn)', val: 100 },
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      type="button"
                      onClick={() => setImageSizePercent(btn.val)}
                      className={`py-1.5 rounded text-xs font-bold transition border cursor-pointer ${
                        imageSizePercent === btn.val
                          ? 'bg-[#FFDF73] text-[#120204] border-[#FFDF73]'
                          : 'bg-[#100203] text-[#EADBCE]/85 border-[#D4AF37]/30 hover:border-[#FFDF73]'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vị trí căn lề */}
              <div>
                <label className="block text-[#FFDF73] font-bold uppercase tracking-wider mb-1.5">
                  Vị Trí Căn Lề
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'left', label: 'Căn Trái', icon: AlignLeft },
                    { id: 'center', label: 'Căn Giữa', icon: AlignCenter },
                    { id: 'right', label: 'Căn Phải', icon: AlignRight },
                  ].map((al) => {
                    const IconComp = al.icon;
                    return (
                      <button
                        key={al.id}
                        type="button"
                        onClick={() => setImageAlign(al.id)}
                        className={`py-1.5 px-2 rounded flex items-center justify-center gap-1.5 text-xs font-bold transition border cursor-pointer ${
                          imageAlign === al.id
                            ? 'bg-[#FFDF73] text-[#120204] border-[#FFDF73]'
                            : 'bg-[#100203] text-[#EADBCE]/85 border-[#D4AF37]/30 hover:border-[#FFDF73]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{al.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chú thích ảnh (Caption) */}
              <div>
                <label className="block text-[#FFDF73] font-bold uppercase tracking-wider mb-1">
                  Chú Thích Hiển Thị Dưới Ảnh (Caption)
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Nghệ nhân thực hiện công đoạn mài lộ then và thếp vàng..."
                  value={imageCaptionText}
                  onChange={(e) => setImageCaptionText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/40 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                />
                <span className="text-[10px] text-[#EADBCE]/60 italic mt-0.5 block">
                  💡 Mẹo: Bạn cũng có thể click trực tiếp vào dòng chữ dưới ảnh trong bài để gõ sửa nhanh.
                </span>
              </div>

              {/* Văn bản thay thế (Alt) */}
              <div>
                <label className="block text-[#EADBCE]/80 font-bold mb-1">
                  Văn Bản Thay Thế (Alt text cho SEO)
                </label>
                <input
                  type="text"
                  placeholder="Mô tả nội dung bức ảnh..."
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/40 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              {/* Footer buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 hover:bg-red-900 transition flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa ảnh</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingImage(null)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/35 text-xs text-[#EADBCE] hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#120204] text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Lưu thay đổi</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
