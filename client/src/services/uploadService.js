import { Apis, endpoints } from '../configs/Apis';

export const uploadService = {
  /**
   * Tải ảnh lên máy chủ qua FormData hoặc Base64
   * @param {File|Blob|string} fileOrBase64
   * @returns {Promise<string>} Trả về URL của ảnh đã tải lên
   */
  uploadImage: async (fileOrBase64) => {
    // Trường hợp là File hoặc Blob
    if (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob) {
      const formData = new FormData();
      formData.append('image', fileOrBase64);

      const res = await Apis().post(endpoints.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.success) {
        return res.data.url;
      }
      throw new Error(res.data?.message || 'Không thể tải ảnh lên');
    }

    // Trường hợp là base64 string
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:image')) {
      const res = await Apis().post(endpoints.upload, { base64: fileOrBase64 });
      if (res.data && res.data.success) {
        return res.data.url;
      }
      throw new Error(res.data?.message || 'Không thể tải ảnh base64 lên');
    }

    // Nếu đã là URL thông thường thì giữ nguyên
    return fileOrBase64;
  },
};

export default uploadService;

