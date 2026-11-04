import React, { useState, useEffect } from 'react';
import {
  Database,
  Newspaper,
  Palette,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Image as ImageIcon,
  Star,
  Layers,
  MapPin,
  Clock,
  User,
  Filter,
} from 'lucide-react';
import newsServices from '../../services/newsServices';
import collectionServices from '../../services/collectionServices';
import eventServices from '../../services/eventServices';
import ImageUploader from '../../components/common/ImageUploader';
import { getImageUrl } from '../../configs/Apis';

const DataCatalogManager = () => {
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'collections' | 'events'
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  // Data states
  const [newsList, setNewsList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [eventList, setEventList] = useState([]);

  // Modal State
  const [modalType, setModalType] = useState(null); // 'create_news' | 'edit_news' | 'create_collection' | 'edit_collection' | 'create_event' | 'edit_event'
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Preview Image Lightbox State
  const [lightboxImg, setLightboxImg] = useState(null);

  // Form States for News
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Nghiên cứu & Học thuật',
    author: 'Ban Giám Tuyển',
    summary: '',
    content: '',
    image: '',
    read_time: '5 phút đọc',
    is_featured: false,
  });

  // Form States for Collection
  const [collectionForm, setCollectionForm] = useState({
    title: '',
    subtitle: '',
    curator_statement: '',
    year: '1930 - 2030',
    period: 'Kỷ nguyên Bách Niên',
    cover_image: '',
    is_highlighted: false,
  });

  // Form States for Event
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Tọa đàm chuyên sâu',
    date_display: 'Thứ Bảy, 14 Tháng 11, 2026',
    location: 'Hội trường Di Sản SIHUB, 273 Điện Biên Phủ, Quận 3, TP.HCM',
    status: 'Sắp diễn ra',
    cover_image: '',
    description: '',
    content: '',
    is_featured: false,
  });

  // Load All Data
  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'news') {
        const res = await newsServices.getNews();
        if (res.data && res.data.success) {
          setNewsList(res.data.data || []);
        }
      } else if (activeTab === 'collections') {
        const res = await collectionServices.getCollections();
        if (res.data && res.data.success) {
          setCollectionList(res.data.data || []);
        }
      } else if (activeTab === 'events') {
        const res = await eventServices.getEvents();
        if (res.data && res.data.success) {
          setEventList(res.data.data || []);
        }
      }
    } catch (err) {
      console.warn('Lỗi tải danh mục dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setSearchTerm('');
  }, [activeTab]);

  // Đóng modal hoặc lightbox khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        else if (modalType) setModalType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalType, lightboxImg]);

  const showNotification = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ================= NEWS CRUD =================
  const openCreateNews = () => {
    setNewsForm({
      title: '',
      category: 'Nghiên cứu & Học thuật',
      author: 'Ban Giám Tuyển',
      summary: '',
      content: '',
      image: '',
      read_time: '5 phút đọc',
      is_featured: false,
    });
    setCurrentEditItem(null);
    setModalType('create_news');
  };

  const openEditNews = (item) => {
    setNewsForm({
      title: item.title || '',
      category: item.category || 'Nghiên cứu & Học thuật',
      author: item.author || 'Ban Giám Tuyển',
      summary: item.summary || '',
      content: item.content || '',
      image: item.image || item.thumbnail_url || item.cover_image || '',
      read_time: item.read_time || '5 phút đọc',
      is_featured: Boolean(item.is_featured),
    });
    setCurrentEditItem(item);
    setModalType('edit_news');
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...newsForm,
        thumbnail_url: newsForm.image,
        cover_image: newsForm.image,
      };
      if (modalType === 'create_news') {
        await newsServices.createNews(payload);
        showNotification('success', 'Đã thêm bài viết tin tức mới thành công!');
      } else {
        await newsServices.updateNews(currentEditItem.id, payload);
        showNotification('success', 'Đã cập nhật bài viết tin tức thành công!');
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi lưu bài viết: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNews = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;
    try {
      await newsServices.deleteNews(id);
      showNotification('success', 'Đã xóa bài viết thành công!');
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi xóa bài viết: ' + err.message);
    }
  };

  // ================= COLLECTION CRUD =================
  const openCreateCollection = () => {
    setCollectionForm({
      title: '',
      subtitle: '',
      curator_statement: '',
      year: '1930 - 2030',
      period: 'Kỷ nguyên Bách Niên',
      cover_image: '',
      is_highlighted: false,
    });
    setCurrentEditItem(null);
    setModalType('create_collection');
  };

  const openEditCollection = (item) => {
    setCollectionForm({
      title: item.title || item.name || '',
      subtitle: item.subtitle || '',
      curator_statement: item.curator_statement || item.description || '',
      year: item.year || '1930 - 2030',
      period: item.period || 'Kỷ nguyên Bách Niên',
      cover_image: item.cover_image || item.thumbnail_url || item.image || '',
      is_highlighted: Boolean(item.is_highlighted),
    });
    setCurrentEditItem(item);
    setModalType('edit_collection');
  };

  const handleSaveCollection = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: collectionForm.title,
        title: collectionForm.title,
        subtitle: collectionForm.subtitle,
        description: collectionForm.curator_statement || collectionForm.subtitle,
        curator_statement: collectionForm.curator_statement,
        year: collectionForm.year,
        period: collectionForm.period,
        cover_image: collectionForm.cover_image,
        thumbnail_url: collectionForm.cover_image,
        is_highlighted: collectionForm.is_highlighted,
      };

      if (modalType === 'create_collection') {
        await collectionServices.createCollection(payload);
        showNotification('success', 'Đã thêm bộ sưu tập mới thành công!');
      } else {
        await collectionServices.updateCollection(currentEditItem.id, payload);
        showNotification('success', 'Đã cập nhật bộ sưu tập thành công!');
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi lưu bộ sưu tập: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCollection = async (id, title) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bộ sưu tập "${title}"?`)) return;
    try {
      await collectionServices.deleteCollection(id);
      showNotification('success', 'Đã xóa bộ sưu tập thành công!');
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi xóa bộ sưu tập: ' + err.message);
    }
  };

  // ================= EVENT CRUD =================
  const openCreateEvent = () => {
    setEventForm({
      title: '',
      category: 'Tọa đàm chuyên sâu',
      date_display: 'Thứ Bảy, 14 Tháng 11, 2026',
      location: 'Hội trường Di Sản SIHUB, 273 Điện Biên Phủ, Quận 3, TP.HCM',
      status: 'Sắp diễn ra',
      cover_image: '',
      description: 'Chuyên đề: Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số.',
      content: 'Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.',
      is_featured: false,
    });
    setCurrentEditItem(null);
    setModalType('create_event');
  };

  const openEditEvent = (item) => {
    setEventForm({
      title: item.name || item.title || '',
      category: item.category || item.event_type || 'Tọa đàm chuyên sâu',
      date_display: item.date_display || (item.event_date ? new Date(item.event_date).toLocaleDateString('vi-VN') : ''),
      location: item.location || '',
      status:
        item.status === 'ongoing' || item.status === 'Đang diễn ra'
          ? 'Đang diễn ra'
          : item.status === 'completed' || item.status === 'Đã kết thúc'
          ? 'Đã kết thúc'
          : 'Sắp diễn ra',
      cover_image: item.thumbnail_url || item.cover_image || '',
      description: item.description || item.subtitle || '',
      content: item.content || '',
      is_featured: Boolean(item.is_featured),
    });
    setCurrentEditItem(item);
    setModalType('edit_event');
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: eventForm.title,
        title: eventForm.title,
        category: eventForm.category,
        date_display: eventForm.date_display,
        location: eventForm.location,
        thumbnail_url: eventForm.cover_image,
        cover_image: eventForm.cover_image,
        description: eventForm.description,
        content: eventForm.content,
        status: eventForm.status,
        is_featured: eventForm.is_featured,
      };

      if (modalType === 'create_event') {
        await eventServices.createEvent(payload);
        showNotification('success', 'Đã thêm sự kiện mới thành công!');
      } else {
        await eventServices.updateEvent(currentEditItem.id, payload);
        showNotification('success', 'Đã cập nhật sự kiện thành công!');
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi lưu sự kiện: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sự kiện "${title}"?`)) return;
    try {
      await eventServices.deleteEvent(id);
      showNotification('success', 'Đã xóa sự kiện thành công!');
      loadData();
    } catch (err) {
      showNotification('error', 'Lỗi xóa sự kiện: ' + err.message);
    }
  };

  // Helper to open create modal based on active tab
  const handleOpenCreateModal = () => {
    if (activeTab === 'news') openCreateNews();
    else if (activeTab === 'collections') openCreateCollection();
    else if (activeTab === 'events') openCreateEvent();
  };

  // Current active data list filtered by search
  const getCurrentFilteredList = () => {
    const term = searchTerm.toLowerCase().trim();
    if (activeTab === 'news') {
      return newsList.filter(
        (item) =>
          !term ||
          item.title?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.author?.toLowerCase().includes(term)
      );
    }
    if (activeTab === 'collections') {
      return collectionList.filter(
        (item) =>
          !term ||
          item.title?.toLowerCase().includes(term) ||
          item.subtitle?.toLowerCase().includes(term) ||
          item.period?.toLowerCase().includes(term)
      );
    }
    if (activeTab === 'events') {
      return eventList.filter(
        (item) =>
          !term ||
          item.title?.toLowerCase().includes(term) ||
          item.location?.toLowerCase().includes(term) ||
          item.event_type?.toLowerCase().includes(term)
      );
    }
    return [];
  };

  const filteredItems = getCurrentFilteredList();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
            <Database className="w-4 h-4 text-[#FFDF73]" />
            <span>Hệ Thống &bull; Danh Mục Dữ Liệu Đồng Bộ</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFDF73] mt-1">
            Quản Lý Danh Mục Dữ Liệu
          </h1>
          <p className="text-sm text-[#EADBCE]/80 mt-1">
            Mẫu hiển thị bảng dữ liệu chuẩn hóa thống nhất cho: <strong>Tin tức</strong>, <strong>Bộ sưu tập</strong>, và <strong>Sự kiện</strong>. Hỗ trợ tải ảnh trực tiếp từ máy tính.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded border border-[#D4AF37]/40 text-[#FFDF73] hover:bg-[#D4AF37]/15 text-sm font-semibold tracking-wider transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === 'news'
                ? 'Thêm Bài Viết'
                : activeTab === 'collections'
                ? 'Thêm Bộ Sưu Tập'
                : 'Thêm Sự Kiện'}
            </span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === 'success'
              ? 'bg-[#1e3a1f]/80 border-emerald-500/50 text-emerald-200'
              : 'bg-[#3d1115]/80 border-red-500/50 text-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Tab Navigation: Tin Tức | Bộ Sưu Tập | Sự Kiện */}
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-serif text-sm uppercase tracking-wider font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'news'
              ? 'bg-[#3a060b] text-[#FFDF73] border-[#FFDF73] shadow-[0_-2px_12px_rgba(255,223,115,0.25)]'
              : 'text-[#EADBCE]/70 border-transparent hover:text-[#FFDF73] hover:bg-[#250508]'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Bảng Tin Tức ({newsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('collections')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-serif text-sm uppercase tracking-wider font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'collections'
              ? 'bg-[#3a060b] text-[#FFDF73] border-[#FFDF73] shadow-[0_-2px_12px_rgba(255,223,115,0.25)]'
              : 'text-[#EADBCE]/70 border-transparent hover:text-[#FFDF73] hover:bg-[#250508]'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Bảng Bộ Sưu Tập ({collectionList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-serif text-sm uppercase tracking-wider font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'events'
              ? 'bg-[#3a060b] text-[#FFDF73] border-[#FFDF73] shadow-[0_-2px_12px_rgba(255,223,115,0.25)]'
              : 'text-[#EADBCE]/70 border-transparent hover:text-[#FFDF73] hover:bg-[#250508]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Bảng Sự Kiện ({eventList.length})</span>
        </button>
      </div>

      {/* Unified Search & Statistics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm kiếm trong ${activeTab === 'news' ? 'tin tức' : activeTab === 'collections' ? 'bộ sưu tập' : 'sự kiện'}...`}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#150305] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#FFDF73]"
          />
        </div>

        <div className="text-xs text-[#EADBCE]/75 flex items-center gap-2">
          <span>Hiển thị: <strong>{filteredItems.length}</strong> / {
            activeTab === 'news' ? newsList.length : activeTab === 'collections' ? collectionList.length : eventList.length
          } mục</span>
        </div>
      </div>

      {/* ================= CHUNG 1 MẪU HIỂN THỊ BẢNG (UNIFIED DATA TABLE TEMPLATE) ================= */}
      <div className="rounded-2xl border border-[#D4AF37]/35 overflow-hidden shadow-2xl bg-[#1e0407]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#2e070b] text-[#FFDF73] text-xs uppercase tracking-wider font-serif border-b border-[#D4AF37]/30">
              <tr>
                <th className="py-4 px-4 w-16">ID</th>
                <th className="py-4 px-4 w-32">Hình Ảnh</th>
                <th className="py-4 px-4">Tiêu Đề &amp; Thông Tin Chính</th>
                <th className="py-4 px-4">Phân Loại / Thể Loại</th>
                <th className="py-4 px-4">Thông Số Bổ Sung</th>
                <th className="py-4 px-4 w-32">Trạng Thái</th>
                <th className="py-4 px-4 w-28 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/20 text-[#EADBCE]">
              {/* Row Rendering with Unified Layout */}
              {filteredItems.map((item) => {
                // Determine normalized properties based on activeTab
                const isNews = activeTab === 'news';
                const isCollection = activeTab === 'collections';
                const isEvent = activeTab === 'events';

                // Lấy ảnh linh hoạt từ mọi trường có thể (thumbnail_url, cover_image, image)
                const imageSrc =item.thumbnail_url;

                const primaryTitle = isEvent ? item.name || item.title : item.title;
                const secondaryText = isNews
                  ? item.summary
                  : isCollection
                  ? item.subtitle || item.curator_statement
                  : item.content || item.description;

                const categoryBadge = isNews
                  ? item.category
                  : isCollection
                  ? item.period || 'Kỷ nguyên Bách Niên'
                  : item.category || item.event_type || 'Tọa đàm';

                return (
                  <tr key={item.id} className="hover:bg-[#290509] transition-colors">
                    {/* 1. ID */}
                    <td className="py-4 px-4 font-mono text-xs text-[#FFDF73] font-bold">
                      #{item.id}
                    </td>

                    {/* 2. Image (Thumbnail with Click-to-preview) */}
                    <td className="py-4 px-4">
                      {imageSrc ? (
                        <div
                          onClick={() => setLightboxImg(getImageUrl(imageSrc))}
                          className="relative w-16 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/45 shadow-[0_0_8px_rgba(212,175,55,0.25)] group cursor-pointer shrink-0"
                          title="Bấm để xem ảnh phóng to"
                        >
                          <img
                            src={getImageUrl(imageSrc)}
                            alt={primaryTitle}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDLII_JrLQ84STKhOfcm5xHYeQLCT0so1Vr1C2TfO0Nwqx7aQDf2DecFBcc9EzEd0WUq_zvST_ULERllNAKbwqTpaKezvqA_CjZ3m1c2IPYVDFI1N_5C8k-XQfUTglcGdyg8C2c4c9oxgJ56TE41A_F-h-YIHJFmDmeMWh9tSgH1CU81Ax0a4km8mUiK-KNy_yShZXP4Dqa3h-fjP6L7sXw83yzGLhFIpAsucyRT7nL';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-4 h-4 text-[#FFDF73]" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-[#100203] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#D4AF37]/50">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>

                    {/* 3. Title & Description */}
                    <td className="py-4 px-4 max-w-xs md:max-w-md">
                      <div className="font-semibold text-white font-serif text-[15px] line-clamp-1">
                        {primaryTitle}
                      </div>
                      <div className="text-xs text-[#EADBCE]/70 line-clamp-2 mt-0.5">
                        {secondaryText || 'Không có mô tả phụ'}
                      </div>
                    </td>

                    {/* 4. Category Badge */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3c090e] border border-[#D4AF37]/45 text-[#FFDF73] whitespace-nowrap">
                        {categoryBadge}
                      </span>
                    </td>

                    {/* 5. Additional Parameters */}
                    <td className="py-4 px-4 text-xs space-y-1">
                      {isNews && (
                        <>
                          <div className="flex items-center gap-1.5 text-[#EADBCE]">
                            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{item.author || 'Ban Giám Tuyển'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#EADBCE]/70 font-mono text-[11px]">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            <span>{item.read_time || '5 phút đọc'}</span>
                          </div>
                        </>
                      )}

                      {isCollection && (
                        <>
                          <div className="flex items-center gap-1.5 text-[#FFDF73] font-serif font-semibold">
                            <span>Niên đại: {item.year || '1930 - 2030'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#EADBCE]/75 text-[11px]">
                            <Layers className="w-3 h-3 text-[#D4AF37]" />
                            <span>{item.Artworks?.length || item.artworks?.length || 0} tác phẩm đính kèm</span>
                          </div>
                        </>
                      )}

                      {isEvent && (
                        <>
                          <div className="flex items-center gap-1.5 text-[#FFDF73] font-serif font-semibold">
                            <span>{item.date_display || 'Thứ Bảy, 14/11/2026'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#EADBCE]/75 text-[11px] line-clamp-1">
                            <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span className="line-clamp-1">{item.location || 'TP.HCM'}</span>
                          </div>
                        </>
                      )}
                    </td>

                    {/* 6. Status / Featured */}
                    <td className="py-4 px-4">
                      {isNews && (
                        item.is_featured ? (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-300" />
                            <span>Nổi bật</span>
                          </span>
                        ) : (
                          <span className="text-xs text-[#EADBCE]/60">Tiêu chuẩn</span>
                        )
                      )}

                      {isCollection && (
                        item.is_highlighted ? (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-300" />
                            <span>Tiêu biểu</span>
                          </span>
                        ) : (
                          <span className="text-xs text-[#EADBCE]/60">Sưu tập</span>
                        )
                      )}

                      {isEvent && (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            item.status === 'Đang diễn ra'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                              : item.status === 'Sắp diễn ra'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                              : 'bg-stone-900 text-stone-300 border border-stone-700'
                          }`}
                        >
                          {item.status || 'Sắp diễn ra'}
                        </span>
                      )}
                    </td>

                    {/* 7. Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            if (isNews) openEditNews(item);
                            else if (isCollection) openEditCollection(item);
                            else if (isEvent) openEditEvent(item);
                          }}
                          className="p-1.5 rounded hover:bg-[#3d090f] text-[#FFDF73] transition cursor-pointer"
                          title="Chỉnh sửa mục này"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (isNews) handleDeleteNews(item.id, item.title);
                            else if (isCollection) handleDeleteCollection(item.id, item.title);
                            else if (isEvent) handleDeleteEvent(item.id, item.title);
                          }}
                          className="p-1.5 rounded hover:bg-red-950/80 text-red-400 transition cursor-pointer"
                          title="Xóa mục này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty state */}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#EADBCE]/60">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Database className="w-8 h-8 text-[#D4AF37]/50" />
                      <p className="font-serif text-base">
                        {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có bản ghi nào trong bảng này'}
                      </p>
                      <button
                        onClick={handleOpenCreateModal}
                        className="text-xs text-[#FFDF73] underline hover:text-white"
                      >
                        Bấm vào đây để thêm mới
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: NEWS (CÓ IMAGE UPLOAD) ================= */}
      {(modalType === 'create_news' || modalType === 'edit_news') && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden"
          onClick={(e) => { if (e.target === e.currentTarget) setModalType(null); }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#200407] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header cố định */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#28060a]">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FFDF73]">
                {modalType === 'create_news' ? 'Thêm Bài Viết Tin Tức Mới' : `Chỉnh Sửa Tin Tức #${currentEditItem?.id}`}
              </h2>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-[#EADBCE]/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="flex-1 flex flex-col min-h-0">
              {/* Vùng cuộn nội dung form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Tiêu Đề Bài Viết *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>

                {/* UPLOAD ẢNH BÀI VIẾT */}
                <ImageUploader
                  label="Ảnh Bài Viết (Upload từ máy tính hoặc dán URL)"
                  value={newsForm.image}
                  onChange={(imgUrl) => setNewsForm({ ...newsForm, image: imgUrl })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Thể Loại
                    </label>
                    <select
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    >
                      <option value="Dòng chảy 100 năm">Dòng chảy 100 năm</option>
                      <option value="Nghiên cứu & Học thuật">Nghiên cứu & Học thuật</option>
                      <option value="Sự kiện & Tọa đàm">Sự kiện & Tọa đàm</option>
                      <option value="Chân dung nghệ sĩ">Chân dung nghệ sĩ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Tác Giả
                    </label>
                    <input
                      type="text"
                      value={newsForm.author}
                      onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Tóm Tắt Ngắn
                  </label>
                  <textarea
                    rows={2}
                    value={newsForm.summary}
                    onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Nội Dung Chi Tiết
                  </label>
                  <textarea
                    rows={5}
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none font-sans"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="news_featured"
                    checked={newsForm.is_featured}
                    onChange={(e) => setNewsForm({ ...newsForm, is_featured: e.target.checked })}
                    className="rounded border-[#D4AF37] text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="news_featured" className="text-sm text-[#FAF7F2] font-semibold cursor-pointer">
                    Đánh dấu là bài viết Nổi bật (Featured)
                  </label>
                </div>
              </div>

              {/* Footer cố định ở đáy */}
              <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[#D4AF37]/30 bg-[#180305]">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded border border-[#D4AF37]/40 text-[#EADBCE] hover:text-white hover:bg-[#3a0a10] text-sm transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-sm tracking-wider uppercase transition cursor-pointer shadow disabled:opacity-50"
                >
                  {submitting ? 'Đang lưu...' : 'Lưu Bài Viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: COLLECTION (CÓ IMAGE UPLOAD) ================= */}
      {(modalType === 'create_collection' || modalType === 'edit_collection') && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden"
          onClick={(e) => { if (e.target === e.currentTarget) setModalType(null); }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#200407] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header cố định */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#28060a]">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FFDF73]">
                {modalType === 'create_collection'
                  ? 'Thêm Bộ Sưu Tập Mới'
                  : `Chỉnh Sửa Bộ Sưu Tập #${currentEditItem?.id}`}
              </h2>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-[#EADBCE]/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="flex-1 flex flex-col min-h-0">
              {/* Vùng cuộn nội dung form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Tiêu Đề Bộ Sưu Tập *
                  </label>
                  <input
                    type="text"
                    required
                    value={collectionForm.title}
                    onChange={(e) => setCollectionForm({ ...collectionForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    placeholder="VD: Cửu Cửu — Mạch Ngầm Tinh Hoa"
                  />
                </div>

                {/* UPLOAD ẢNH BÌA BỘ SƯU TẬP */}
                <ImageUploader
                  label="Ảnh Bìa Bộ Sưu Tập (Upload từ máy tính hoặc dán URL)"
                  value={collectionForm.cover_image}
                  onChange={(imgUrl) => setCollectionForm({ ...collectionForm, cover_image: imgUrl })}
                />

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Phụ Đề / Tóm Lược
                  </label>
                  <input
                    type="text"
                    value={collectionForm.subtitle}
                    onChange={(e) => setCollectionForm({ ...collectionForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    placeholder="VD: 99 kiệt tác sơn mài hội họa bác học"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Niên Đại / Năm
                    </label>
                    <input
                      type="text"
                      value={collectionForm.year}
                      onChange={(e) => setCollectionForm({ ...collectionForm, year: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: 1930 - 2030"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Thời Kỳ
                    </label>
                    <input
                      type="text"
                      value={collectionForm.period}
                      onChange={(e) => setCollectionForm({ ...collectionForm, period: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: Kỷ nguyên Bách Niên"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Tuyên Ngôn Giám Tuyển (Curator Statement)
                  </label>
                  <textarea
                    rows={3}
                    value={collectionForm.curator_statement}
                    onChange={(e) => setCollectionForm({ ...collectionForm, curator_statement: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="col_highlighted"
                    checked={collectionForm.is_highlighted}
                    onChange={(e) => setCollectionForm({ ...collectionForm, is_highlighted: e.target.checked })}
                    className="rounded border-[#D4AF37] text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="col_highlighted" className="text-sm text-[#FAF7F2] font-semibold cursor-pointer">
                    Đánh dấu là Bộ sưu tập Tiêu biểu (Highlighted)
                  </label>
                </div>
              </div>

              {/* Footer cố định ở đáy */}
              <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[#D4AF37]/30 bg-[#180305]">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded border border-[#D4AF37]/40 text-[#EADBCE] hover:text-white hover:bg-[#3a0a10] text-sm transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-sm tracking-wider uppercase transition cursor-pointer shadow disabled:opacity-50"
                >
                  {submitting ? 'Đang lưu...' : 'Lưu Bộ Sưu Tập'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EVENT (CÓ IMAGE UPLOAD) ================= */}
      {(modalType === 'create_event' || modalType === 'edit_event') && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden"
          onClick={(e) => { if (e.target === e.currentTarget) setModalType(null); }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#200407] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header cố định */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#28060a]">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FFDF73]">
                {modalType === 'create_event' ? 'Thêm Sự Kiện Mới' : `Chỉnh Sửa Sự Kiện #${currentEditItem?.id}`}
              </h2>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-[#EADBCE]/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="flex-1 flex flex-col min-h-0">
              {/* Vùng cuộn nội dung form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Tên Sự Kiện *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    placeholder="VD: Đại Hội Thảo & Giám Tuyển: Kỷ Nguyên Đương Đại"
                  />
                </div>

                {/* UPLOAD ẢNH BÌA SỰ KIỆN */}
                <ImageUploader
                  label="Ảnh Bìa Sự Kiện (Upload từ máy tính hoặc dán URL)"
                  value={eventForm.cover_image}
                  onChange={(imgUrl) => setEventForm({ ...eventForm, cover_image: imgUrl })}
                />

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Chủ Đề Phụ / Mô Tả Ngắn
                  </label>
                  <input
                    type="text"
                    value={eventForm.subtitle}
                    onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Thời Gian Hiển Thị *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.date_display}
                      onChange={(e) => setEventForm({ ...eventForm, date_display: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: Thứ Bảy, 14 Tháng 11, 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Địa Điểm
                    </label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: Hội trường SIHUB, 273 Điện Biên Phủ, Q.3, TP.HCM"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Thể Loại Sự Kiện
                    </label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    >
                      <option value="Tọa đàm chuyên sâu">Tọa đàm chuyên sâu</option>
                      <option value="Đại triển lãm">Đại triển lãm</option>
                      <option value="Hội thảo">Hội thảo</option>
                      <option value="Tọa đàm">Tọa đàm</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Kỷ lục - Vinh danh">Kỷ lục - Vinh danh</option>
                      <option value="Lễ vinh danh">Lễ vinh danh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                      Trạng Thái
                    </label>
                    <select
                      value={eventForm.status}
                      onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                    >
                      <option value="Sắp diễn ra">Sắp diễn ra</option>
                      <option value="Đang diễn ra">Đang diễn ra</option>
                      <option value="Đã kết thúc">Đã kết thúc</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Mô Tả Tổng Quát
                  </label>
                  <textarea
                    rows={2}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Mô tả tóm tắt sự kiện..."
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                {/* NỘI DUNG CHI TIẾT & CÁC ĐẦU MỤC THAM LUẬN (CHỨA ĐẦY ĐỦ CHECKMARK VÀNG) */}
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Nội Dung Tham Luận &amp; Đầu Mục Hoạt Động (content)
                  </label>
                  <textarea
                    rows={4}
                    value={eventForm.content}
                    onChange={(e) => setEventForm({ ...eventForm, content: e.target.value })}
                    placeholder="Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.&#10;(Mỗi dòng sẽ tự động hiển thị thành một gạch đầu dòng kèm dấu kiểm vàng ✓ ngoài trang Sự kiện)"
                    className="w-full px-3 py-2 rounded bg-[#140305] border border-[#D4AF37]/40 text-white text-sm focus:border-[#FFDF73] focus:outline-none font-sans"
                  />
                  <p className="text-[11px] text-[#EADBCE]/60 mt-1">
                    Mỗi dòng sẽ tự động hiển thị thành một mục kèm biểu tượng dấu kiểm vàng (✓) trong thẻ sự kiện ngoài website.
                  </p>

                  {/* Preview Box hiển thị trực quan các đầu mục checkmark */}
                  {eventForm.content && (
                    <div className="mt-2.5 p-3 rounded-lg bg-[#140305]/90 border border-[#D4AF37]/35 text-xs space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#FFDF73] tracking-wider block">
                        Xem trước hiển thị ngoài trang web:
                      </span>
                      <ul className="space-y-1.5 text-[#FAF7F2]/90">
                        {eventForm.content
                          .split('\n')
                          .filter((l) => Boolean(l.trim()))
                          .map((line, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73] mt-0.5 shrink-0" />
                              <span>{line}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="event_featured"
                    checked={eventForm.is_featured}
                    onChange={(e) => setEventForm({ ...eventForm, is_featured: e.target.checked })}
                    className="rounded border-[#D4AF37] text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="event_featured" className="text-sm text-[#FAF7F2] font-semibold cursor-pointer">
                    Đánh dấu là Sự kiện Nổi bật (Featured Event)
                  </label>
                </div>
              </div>

              {/* Footer cố định ở đáy */}
              <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[#D4AF37]/30 bg-[#180305]">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded border border-[#D4AF37]/40 text-[#EADBCE] hover:text-white hover:bg-[#3a0a10] text-sm transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-sm tracking-wider uppercase transition cursor-pointer shadow disabled:opacity-50"
                >
                  {submitting ? 'Đang lưu...' : 'Lưu Sự Kiện'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIGHTBOX PREVIEW ================= */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={lightboxImg}
              alt="Phóng to"
              className="max-w-full max-h-[85vh] rounded-xl border border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.4)]"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-red-950 text-white border border-red-500 shadow cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCatalogManager;
