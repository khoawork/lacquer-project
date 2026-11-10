import {
  FileText,
  UserCheck,
  Warehouse,
  Palette,
  Calendar,
  CheckCircle2,
  Shield,
  SearchCheck,
  Cpu,
  Video,
  Sparkles,
  BookOpen,
  Award,
  Landmark,
  Scroll,
  Folder,
  Image,
  Globe,
  Camera,
  Layers,
  Archive,
  Compass,
  FileCheck,
  Search,
  BookMarked,
  Newspaper,
  Library,
  Feather,
  Users,
  Box,
  MapPin,
  Clock,
  History,
  Tag,
  Bookmark,
  Lightbulb,
} from 'lucide-react';

export const SCHEMA_TYPE_ICONS = {
  FileText: { component: FileText, label: 'Bài viết / Tài liệu (FileText)' },
  UserCheck: { component: UserCheck, label: 'Nhân vật / Nghệ nhân (UserCheck)' },
  Warehouse: { component: Warehouse, label: 'Làng nghề / Xưởng nghề (Warehouse)' },
  Palette: { component: Palette, label: 'Tác phẩm / Mỹ thuật (Palette)' },
  Calendar: { component: Calendar, label: 'Sự kiện / Lịch trình (Calendar)' },
  BookOpen: { component: BookOpen, label: 'Sách / Kỷ yếu (BookOpen)' },
  BookMarked: { component: BookMarked, label: 'Chuyên đề / Đánh dấu (BookMarked)' },
  Award: { component: Award, label: 'Kỷ lục / Giải thưởng (Award)' },
  Landmark: { component: Landmark, label: 'Viện bảo tàng / Di tích (Landmark)' },
  Scroll: { component: Scroll, label: 'Cuộn thư / Sắc phong (Scroll)' },
  Folder: { component: Folder, label: 'Hồ sơ lưu trữ (Folder)' },
  Image: { component: Image, label: 'Hình ảnh / Tranh ảnh (Image)' },
  Camera: { component: Camera, label: 'Nhiếp ảnh điền dã (Camera)' },
  Video: { component: Video, label: 'Video tư liệu (Video)' },
  Cpu: { component: Cpu, label: 'Định danh số / Chip NFC (Cpu)' },
  Shield: { component: Shield, label: 'Bảo chứng / Bản quyền (Shield)' },
  SearchCheck: { component: SearchCheck, label: 'Điền dã xác minh (SearchCheck)' },
  Globe: { component: Globe, label: 'Quốc tế / Nền tảng số (Globe)' },
  Library: { component: Library, label: 'Thư viện di sản (Library)' },
  Newspaper: { component: Newspaper, label: 'Báo chí / Ấn phẩm (Newspaper)' },
  Feather: { component: Feather, label: 'Khảo cứu / Bút tích (Feather)' },
  Users: { component: Users, label: 'Cộng đồng / Hội đồng (Users)' },
  Box: { component: Box, label: 'Hiện vật / Lưu kho (Box)' },
  MapPin: { component: MapPin, label: 'Địa danh / Tọa độ (MapPin)' },
  History: { component: History, label: 'Lịch sử / Niên biểu (History)' },
  Layers: { component: Layers, label: 'Phân tầng / Lớp sơn (Layers)' },
  Sparkles: { component: Sparkles, label: 'Tinh hoa / Điểm sáng (Sparkles)' },
  Compass: { component: Compass, label: 'Định hướng / La bàn (Compass)' },
  FileCheck: { component: FileCheck, label: 'Hồ sơ đã duyệt (FileCheck)' },
  Tag: { component: Tag, label: 'Thẻ phân loại (Tag)' },
  Bookmark: { component: Bookmark, label: 'Dấu trang ghi nhớ (Bookmark)' },
  Lightbulb: { component: Lightbulb, label: 'Ý tưởng / Đổi mới (Lightbulb)' },
  Archive: { component: Archive, label: 'Lưu trữ tổng thể (Archive)' },
};

export const SCHEMA_STATUS_ICONS = {
  CheckCircle2: { component: CheckCircle2, label: 'Đã xác thực / Chuẩn (CheckCircle2)' },
  Shield: { component: Shield, label: 'Hồ sơ bảo chứng (Shield)' },
  SearchCheck: { component: SearchCheck, label: 'Điền dã xác minh (SearchCheck)' },
  Cpu: { component: Cpu, label: 'Định danh số & Chip NFC (Cpu)' },
  Video: { component: Video, label: 'Đa phương tiện số (Video)' },
  Award: { component: Award, label: 'Xác lập kỷ lục (Award)' },
  Sparkles: { component: Sparkles, label: 'Tiêu chuẩn học thuật (Sparkles)' },
  Clock: { component: Clock, label: 'Đang thẩm định (Clock)' },
  FileCheck: { component: FileCheck, label: 'Đã kiểm tra (FileCheck)' },
};

export const resolveTypeIcon = (iconName, typeText = '', fallbackIndex = 0) => {
  if (iconName && SCHEMA_TYPE_ICONS[iconName]) {
    return SCHEMA_TYPE_ICONS[iconName].component;
  }
  const lower = String(typeText).toLowerCase();
  if (lower.includes('nghiên cứu') || lower.includes('bài') || lower.includes('tài liệu')) return FileText;
  if (lower.includes('nhân vật') || lower.includes('người') || lower.includes('họa sĩ') || lower.includes('nghệ nhân')) return UserCheck;
  if (lower.includes('làng nghề') || lower.includes('xưởng') || lower.includes('địa bàn')) return Warehouse;
  if (lower.includes('tác phẩm') || lower.includes('tranh') || lower.includes('vật phẩm')) return Palette;
  if (lower.includes('sự kiện') || lower.includes('hoạt động') || lower.includes('lịch')) return Calendar;

  const fallbackList = [FileText, UserCheck, Warehouse, Palette, Calendar, BookOpen, Sparkles];
  return fallbackList[fallbackIndex % fallbackList.length];
};

export const resolveStatusIcon = (iconName, statusText = '') => {
  if (iconName && SCHEMA_STATUS_ICONS[iconName]) {
    return SCHEMA_STATUS_ICONS[iconName].component;
  }
  const lower = String(statusText).toLowerCase();
  if (lower.includes('xác thực') || lower.includes('chuẩn') || lower.includes('hoàn tất')) return CheckCircle2;
  if (lower.includes('bảo chứng') || lower.includes('hồ sơ')) return Shield;
  if (lower.includes('xác minh') || lower.includes('điền dã')) return SearchCheck;
  if (lower.includes('chip') || lower.includes('số') || lower.includes('nfc')) return Cpu;
  if (lower.includes('video') || lower.includes('phương tiện')) return Video;
  return CheckCircle2;
};
