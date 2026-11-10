import {
  ShieldCheck,
  Shield,
  Palette,
  Award,
  Landmark,
  Building2,
  Handshake,
  Globe,
  Sparkles,
  Users,
  Paintbrush,
  Hammer,
  Compass,
  Layers,
  Cpu,
  Coins,
  BookOpen,
  Scroll,
  SearchCheck,
  Megaphone,
  Database,
  Wallet,
  Share2,
  Network,
  GraduationCap,
  Store,
  Image,
  HeartHandshake,
  Trophy,
  FileText,
  UserCheck,
  Warehouse,
  CheckCircle2,
  Clock,
  History,
  Tag,
  Bookmark,
  Lightbulb,
  Radio,
  BookMarked,
  Library,
  Feather,
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  Send,
  MessageSquare,
} from 'lucide-react';

export const LEADERSHIP_ICONS = {
  // Điều phối & Bảo chứng
  ShieldCheck: { component: ShieldCheck, label: 'Bảo chứng / Điều phối (ShieldCheck)' },
  Shield: { component: Shield, label: 'Khiên bảo hộ / Bản quyền (Shield)' },
  Award: { component: Award, label: 'Viện kỷ lục / Giải thưởng (Award)' },
  Trophy: { component: Trophy, label: 'Kỷ lục / Danh hiệu (Trophy)' },
  CheckCircle2: { component: CheckCircle2, label: 'Xác thực chuẩn (CheckCircle2)' },
  Landmark: { component: Landmark, label: 'Bảo tàng / Viện di sản (Landmark)' },
  Building2: { component: Building2, label: 'Cơ quan / Tổ chức (Building2)' },
  Warehouse: { component: Warehouse, label: 'Xưởng nghề / Làng nghề (Warehouse)' },

  // Mỹ thuật & Kỹ thuật
  Palette: { component: Palette, label: 'Mỹ thuật / Hội họa (Palette)' },
  Paintbrush: { component: Paintbrush, label: 'Cọ vẽ / Nghệ thuật (Paintbrush)' },
  Hammer: { component: Hammer, label: 'Kỹ pháp / Thủ công (Hammer)' },
  Compass: { component: Compass, label: 'Kiến trúc / Định dáng (Compass)' },
  Layers: { component: Layers, label: 'Phân tầng / Lớp vóc (Layers)' },
  Scroll: { component: Scroll, label: 'Cuộn thư / Di sản (Scroll)' },

  // Học thuật & Nghiên cứu
  BookOpen: { component: BookOpen, label: 'Học thuật / Kỷ yếu (BookOpen)' },
  BookMarked: { component: BookMarked, label: 'Chuyên đề / Xuất bản (BookMarked)' },
  FileText: { component: FileText, label: 'Tư liệu / Văn kiện (FileText)' },
  Library: { component: Library, label: 'Thư viện di sản (Library)' },
  Feather: { component: Feather, label: 'Khảo cứu / Bút tích (Feather)' },
  SearchCheck: { component: SearchCheck, label: 'Giám định / Khảo sát (SearchCheck)' },

  // Đối ngoại, Mạng lưới & Truyền thông
  Handshake: { component: Handshake, label: 'Hợp tác / Đối tác (Handshake)' },
  HeartHandshake: { component: HeartHandshake, label: 'Đồng hành chiến lược (HeartHandshake)' },
  Users: { component: Users, label: 'Hội đồng / Nhân sự (Users)' },
  UserCheck: { component: UserCheck, label: 'Chuyên gia / Nghệ nhân (UserCheck)' },
  Megaphone: { component: Megaphone, label: 'Truyền thông / Lan tỏa (Megaphone)' },
  Radio: { component: Radio, label: 'Phát thanh / Thông cáo (Radio)' },
  Globe: { component: Globe, label: 'Mạng lưới quốc tế (Globe)' },
  Share2: { component: Share2, label: 'Kết nối hệ sinh thái (Share2)' },
  Network: { component: Network, label: 'Mạng lưới liên ngành (Network)' },

  // Công nghệ, Số hóa & Kinh tế
  Cpu: { component: Cpu, label: 'Công nghệ số / NFC (Cpu)' },
  Database: { component: Database, label: 'Kho dữ liệu / Hạ tầng (Database)' },
  Wallet: { component: Wallet, label: 'Tài chính / Vận hành (Wallet)' },
  Coins: { component: Coins, label: 'Kinh tế di sản (Coins)' },
  GraduationCap: { component: GraduationCap, label: 'Cơ sở đào tạo / Viện (GraduationCap)' },
  Store: { component: Store, label: 'Doanh nghiệp / Chuỗi cung ứng (Store)' },
  Image: { component: Image, label: 'Trưng bày / Không gian ảnh (Image)' },
  Sparkles: { component: Sparkles, label: 'Đổi mới / Sáng tạo (Sparkles)' },
  Lightbulb: { component: Lightbulb, label: 'Ý tưởng / Đột phá (Lightbulb)' },
  Clock: { component: Clock, label: 'Thời gian / Tiến độ (Clock)' },
  History: { component: History, label: 'Lịch sử / Truyền thừa (History)' },
  Tag: { component: Tag, label: 'Nhãn phân loại (Tag)' },
  Bookmark: { component: Bookmark, label: 'Đánh dấu (Bookmark)' },

  // Liên hệ & Tương tác
  Mail: { component: Mail, label: 'Hộp thư điện tử (Mail)' },
  Phone: { component: Phone, label: 'Điện thoại (Phone)' },
  PhoneCall: { component: PhoneCall, label: 'Đường dây nóng / Tổng đài (PhoneCall)' },
  MapPin: { component: MapPin, label: 'Địa điểm / Trụ sở (MapPin)' },
  Send: { component: Send, label: 'Gửi yêu cầu / Tương tác (Send)' },
  MessageSquare: { component: MessageSquare, label: 'Tin nhắn / Đàm thoại (MessageSquare)' },
};

// Ánh xạ tên icon cũ (Material Symbols) sang icon Lucide tương ứng
const LEGACY_MAP = {
  verified_user: ShieldCheck,
  palette: Palette,
  brush: Paintbrush,
  carpenter: Hammer,
  architecture: Compass,
  token: Cpu,
  menu_book: BookOpen,
  auto_stories: BookOpen,
  museum: Landmark,
  handshake: Handshake,
  campaign: Megaphone,
  database: Database,
  account_balance_wallet: Wallet,
  hub: Share2,
  school: GraduationCap,
  storefront: Store,
  gallery_thumbnail: Image,
  groups: Users,
  shield: Shield,
  award: Award,
  verified: ShieldCheck,
  diversity_3: Users,
  business: Building2,
  corporate_fare: Building2,
  support_agent: PhoneCall,
  pin_drop: MapPin,
  mail: Mail,
  phone: Phone,
};

export const resolveLeadershipIcon = (iconName, fallback = ShieldCheck) => {
  if (!iconName) return fallback;
  if (LEADERSHIP_ICONS[iconName]) {
    return LEADERSHIP_ICONS[iconName].component;
  }
  const lower = String(iconName).toLowerCase().trim();
  if (LEGACY_MAP[lower]) {
    return LEGACY_MAP[lower];
  }
  for (const [key, item] of Object.entries(LEADERSHIP_ICONS)) {
    if (key.toLowerCase() === lower) {
      return item.component;
    }
  }
  return fallback;
};
