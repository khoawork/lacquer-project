import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check, RefreshCw, Link as LinkIcon } from 'lucide-react';
import uploadService from '../../services/uploadService';
import { getImageUrl } from '../../configs/Apis';

const ImageUploader = ({ value, onChange, label = 'Hình Ảnh', placeholder = 'https://...' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);
  const inputId = useRef(`file_upload_${Math.random().toString(36).substring(2, 9)}`).current;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chỉ chọn tệp định dạng hình ảnh (PNG, JPG, WEBP, GIF, SVG)');
      return;
    }

    // Limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('Dung lượng ảnh không được vượt quá 10MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const uploadedUrl = await uploadService.uploadImage(file);
      onChange(uploadedUrl);
    } catch (err) {
      setError('Tải ảnh thất bại: ' + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setError(null);
  };

  const previewSrc = getImageUrl(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase font-bold text-[#FFDF73] tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-2 py-0.5 rounded font-semibold transition ${
              inputMode === 'upload'
                ? 'bg-[#d49b1a] text-black'
                : 'text-[#EADBCE]/70 hover:text-[#FFDF73]'
            }`}
          >
            Tải lên từ máy
          </button>
          <span className="text-[#D4AF37]/40">|</span>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-2 py-0.5 rounded font-semibold transition ${
              inputMode === 'url'
                ? 'bg-[#d49b1a] text-black'
                : 'text-[#EADBCE]/70 hover:text-[#FFDF73]'
            }`}
          >
            Nhập link URL
          </button>
        </div>
      </div>

      {/* Preview Box & Upload Area */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl bg-[#140305] border border-[#D4AF37]/35 shadow-inner">
        {/* Preview Frame */}
        <div className="relative w-28 h-24 sm:w-32 sm:h-24 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#0d0203] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
          {previewSrc ? (
            <>
              <img
                src={previewSrc}
                alt="Xem trước hình ảnh"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://res.cloudinary.com/ds11ggie4/image/upload/v1793672616/starbucks-removebg-preview_unczzr.png';
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 p-1 rounded-full bg-red-950/90 text-red-300 hover:text-white border border-red-500/50 shadow transition cursor-pointer"
                title="Gỡ ảnh này"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#D4AF37]/40 text-center p-2">
              <ImageIcon className="w-7 h-7 mb-1" />
              <span className="text-[10px] uppercase font-sans">Chưa có ảnh</span>
            </div>
          )}
        </div>

        {/* Action controls */}
        <div className="flex-1 w-full space-y-2">
          {inputMode === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={inputId}
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#2e070b] hover:bg-[#3e0b10] border border-[#D4AF37]/50 text-[#FFDF73] text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm ${
                    uploading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {uploading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FFDF73]" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#FFDF73]" />
                  )}
                  <span>{uploading ? 'Đang tải lên...' : 'Chọn ảnh từ máy tính'}</span>
                </button>

                {previewSrc && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã đính kèm ảnh</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#EADBCE]/60 mt-1.5">
                Hỗ trợ PNG, JPG, JPEG, WEBP, SVG tối đa 10MB. Ảnh sẽ được tự động tối ưu và lưu trữ trên Cloudinary CDN.
              </p>
            </div>
          ) : (
            <div className="relative">
              <LinkIcon className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-3" />
              <input
                type="url"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#0e0204] border border-[#D4AF37]/35 text-[#FAF7F2] text-xs focus:outline-none focus:border-[#FFDF73]"
              />
              <p className="text-[11px] text-[#EADBCE]/60 mt-1">
                Dán đường dẫn trực tiếp (URL Cloudinary, Unsplash hoặc liên kết web).
              </p>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

