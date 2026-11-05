import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Code,
  Layers,
  RefreshCw,
  Edit3,
} from 'lucide-react';
import pageServices from '../../services/pageServices';
import eventServices from '../../services/eventServices';
import collectionServices from '../../services/collectionServices';
import newsServices from '../../services/newsServices';

// Import các subcomponents tách riêng cho từng trang
import HomePageEditor from '../../components/admin/pages/HomePageEditor';
import AboutPageEditor from '../../components/admin/pages/AboutPageEditor';
import JourneyPageEditor from '../../components/admin/pages/JourneyPageEditor';
import EventsPageEditor from '../../components/admin/pages/EventsPageEditor';
import CollectionPageEditor from '../../components/admin/pages/CollectionPageEditor';
import ArchivePageEditor from '../../components/admin/pages/ArchivePageEditor';
import LeadershipPageEditor from '../../components/admin/pages/LeadershipPageEditor';
import NewsPageEditor from '../../components/admin/pages/NewsPageEditor';
import ContactPageEditor from '../../components/admin/pages/ContactPageEditor';

// Cấu hình 9 trang hệ thống được điều hướng trực tiếp từ Navigation bên trái
export const PAGE_CONFIG = {
  home: {
    key: 'home',
    slug: '/',
    name: 'TRANG CHỦ',
    publicPath: '/',
    label: 'Trang Chủ (Home)',
  },
  about: {
    key: 'about',
    slug: '/about',
    name: 'GIỚI THIỆU',
    publicPath: '/about',
    label: 'Giới Thiệu (About)',
  },
  journey: {
    key: 'journey',
    slug: '/journey',
    name: 'HÀNH TRÌNH',
    publicPath: '/journey',
    label: 'Hành Trình (Journey)',
  },
  events: {
    key: 'events',
    slug: '/events',
    name: 'SỰ KIỆN',
    publicPath: '/events',
    label: 'Sự Kiện (Events)',
  },
  collection: {
    key: 'collection',
    slug: '/collection',
    name: 'BỘ SƯU TẬP',
    publicPath: '/collection',
    label: 'Bộ Sưu Tập (Collection)',
  },
  archive: {
    key: 'archive',
    slug: '/archive',
    name: 'KỶ YẾU',
    publicPath: '/archive',
    label: 'Kỷ Yếu (Archive)',
  },
  leadership: {
    key: 'leadership',
    slug: '/leadership',
    name: 'BAN ĐIỀU HÀNH',
    publicPath: '/leadership',
    label: 'Ban Điều Hành (Leadership)',
  },
  news: {
    key: 'news',
    slug: '/news',
    name: 'TIN TỨC',
    publicPath: '/news',
    label: 'Tin Tức (News)',
  },
  contact: {
    key: 'contact',
    slug: '/contact',
    name: 'LIÊN HỆ',
    publicPath: '/contact',
    label: 'Liên Hệ (Contact)',
  },
};

// Dữ liệu props mặc định
export const DEFAULT_PAGE_PROPS = {
  '/': {
    hero_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6q50uNbfjHPDj6-2aHqeSR8DW1g_492VREK_fAsMYMK3DQhFaFVLvrzrgBfkcJiOO2Tais7QvRuBF8ALjaz4nBsOtz2_OYNR9WdWGDVxkBf7NcORDAYbMcd2mrPyEmwkKfmDP20xLS_6bePaBtTvSZ-Ka5jNUCOMMIDzFfKoQnsM1b5MSjmOee7IfSPeNcTZstFNnDOBIGFaWlb4VwSZlLpre2zH2b53XVJdHercK7LRBB90ttJrMYIg2tBWbMCmHl44',
    badge: '1930 • 2030 • BÁCH NIÊN KHỞI SẮC',
    headline: 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM',
    subtitle: 'Bản Sắc Hội Họa & Di Sản Nghệ Thuật',
    quote: 'Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.',
    hero_cta1_text: 'KHÁM PHÁ HÀNH TRÌNH',
    hero_cta1_link: '/journey',
    hero_cta2_text: 'THAM GIA ĐỒNG KIẾN TẠO',
    hero_cta2_link: '/contact',
    bottom_quote: '“Một thế kỷ mở đường — Một hành trình kế tục và bừng sáng.”',

    story_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUOowWq2-6yYBMnhlPakXy635SgnT6bWlRWvwNB1UVulyrbseIHbaOXgguNg7nh3lcMgUa-pvq8bBhYTzxFH2oC3t94vfeIIvVkf8_EjNo7MCYAVq030xWTgSQ0Byy3-DQVM0RutjVNBNGjT6b59Efk8bteqtEVz2k8PMTJjiN0oXe7gHfL_bNMpRxr6hE4walNjk5MugHU4qn8YFH8DPea3lNksCS_LSBmMEa5Mmi6lTXckCeijVQ',
    story_image_tag: 'Kỹ thuật truyền thống',
    story_image_title: 'Mài Dưới Dòng Nước Lộ Sắc',
    story_image_desc:
      'Sự kiên nhẫn bóc tách từng tầng sơn then, son cánh gián để vàng son ngọc diệp hiển lộ quang minh.',
    story_headline: 'Một thế kỷ — Một hành trình đang tiếp diễn',
    story_p1:
      'Sơn mài hội họa Việt Nam là kết quả diệu kỳ của sự gặp gỡ giữa nguồn nhựa sơn ta Phú Thọ huyền thoại, đôi bàn tay tài hoa của nghệ nhân cổ truyền và tư duy tạo hình hàn lâm hiện đại khởi nguồn từ Trường Mỹ thuật Đông Dương thập niên 1930.',
    story_p2:
      'Qua lớp lớp thời gian tôi luyện trong khói lửa kháng chiến, độc lập và đổi mới, sơn mài đã thoát thai khỏi một chất liệu trang trí mỹ nghệ đơn thuần để trở thành đỉnh cao ngôn ngữ tạo hình hội họa dân tộc. Năm 2030 không phải điểm kết thúc, mà là dấu mốc hoàn tất một thế kỷ để bước sang một chu kỳ kiến tạo tầm vóc mới.',
    story_callout: '“Không chỉ để xã hội xem. Để xã hội cùng làm.”',
    story_callout_desc:
      'Hành trình được kiến tạo như một hệ sinh thái mở, nơi người nghệ sĩ, nghệ nhân làng nghề, giới học giả, trường viện nghiên cứu, doanh nghiệp và công chúng yêu nghệ thuật cùng tương tác, kiến tạo và làm giàu sinh khí cho di sản.',

    pillars_headline: 'Bốn hướng mở của hành trình',
    pillars_desc:
      'Một mô hình đa chiều kết nối truyền thống nghìn năm cùng nhịp đập kinh tế sáng tạo toàn cầu hóa.',
    pillar1_title: 'Cộng đồng sáng tạo',
    pillar1_desc:
      'Mở rộng Open Studio, bảo trợ chương trình lưu trú nghệ sĩ trẻ, workshop thể nghiệm đa chất liệu và truyền cảm hứng hội họa sơn mài đến công chúng đa thế hệ.',
    pillar1_cta_text: 'Khám phá hoạt động',
    pillar1_cta_link: '/journey',
    pillar2_title: 'Công nghiệp văn hóa',
    pillar2_desc:
      'Định hình tiêu chuẩn sản phẩm mỹ thuật cao cấp, kết nối chuỗi cung ứng vật liệu truyền thống với các nhà thiết kế công nghiệp và nội thất đương đại.',
    pillar2_cta_text: 'Khám phá sản phẩm',
    pillar2_cta_link: '/collections',
    pillar3_title: 'Kinh tế di sản',
    pillar3_desc:
      'Xây dựng hạ tầng định giá, bảo chứng bản quyền và xác lập giá trị đầu tư cho các tác phẩm kiệt tác trên thị trường nghệ thuật quốc tế.',
    pillar3_cta_text: 'Khám phá dự án',
    pillar3_cta_link: '/events',
    pillar4_title: 'Đổi mới vật liệu',
    pillar4_desc:
      'Nghiên cứu khoa học về tính chất hóa sinh của cây sơn ta, quy chuẩn kỹ thuật mài then và phát triển các chế phẩm hỗ trợ sinh thái bền vững.',
    pillar4_cta_text: 'Khám phá thể nghiệm',
    pillar4_cta_link: '/archive',
    pillars_bottom_cta_text: 'XEM CHI TIẾT HỆ SINH THÁI',
    pillars_bottom_cta_link: '#mo-hinh',

    pipeline_headline: 'Từ ý tưởng đến giá trị',
    pipeline_desc:
      'Chu trình liên tục chuyển hóa chất xám nghiên cứu, năng lượng sáng tạo nghệ thuật thành các giá trị văn hóa và kinh tế bền vững cho đất nước.',
    step1_title: 'LAB',
    step1_sub: 'Nghiên cứu & Thể nghiệm',
    step1_desc: 'Nghiên cứu lịch sử, lý luận, chất liệu và công nghệ.',
    step2_title: 'STUDIO',
    step2_sub: 'Sáng tạo & Chế tác',
    step2_desc: 'Đồng hành cùng nghệ sĩ, nghệ nhân và xưởng nghề thực hành sáng tạo.',
    step3_title: 'SHOWCASE',
    step3_sub: 'Trưng bày & Lan tỏa',
    step3_desc: 'Đại triển lãm, tọa đàm chuyên sâu, ấn bản kỷ yếu và truyền thông số.',
    step4_title: 'MARKET',
    step4_sub: 'Thương mại hóa di sản',
    step4_desc: 'Đưa tác phẩm và sản phẩm văn hóa vào đời sống, đấu giá và du lịch di sản.',

    events_headline: 'Sự kiện & Hoạt động trọng điểm',
    events_desc:
      'Lịch trình các đại triển lãm, hội thảo chuyên sâu và workshop lưu trú nghệ thuật trải dài từ nay đến năm 2030.',
    events_all_link: '/events',
    featured_event_ids: [1, 2, 3],

    collections_headline: 'Kho tàng Kiệt tác Sơn mài',
    collections_desc:
      'Tuyển chọn các tác phẩm kinh điển và bộ sưu tập độc bản minh chứng cho kỹ nghệ bậc thầy qua các thời kỳ.',
    collections_all_link: '/collections',
    featured_collection_ids: [1, 2, 3],

    archive_headline: 'Kỷ yếu Di sản 100 năm',
    archive_sub: 'Công trình số hóa và khảo cứu toàn diện',
    archive_desc:
      'Bộ ấn phẩm đồ sộ gồm 4 tập nghiên cứu chuyên sâu, tập hợp tư liệu quý, bản đồ vùng nguyên liệu, chân dung các danh họa tiên phong và hồ sơ bảo tồn nghệ thuật sơn mài.',
    archive_cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6q50uNbfjHPDj6-2aHqeSR8DW1g_492VREK_fAsMYMK3DQhFaFVLvrzrgBfkcJiOO2Tais7QvRuBF8ALjaz4nBsOtz2_OYNR9WdWGDVxkBf7NcORDAYbMcd2mrPyEmwkKfmDP20xLS_6bePaBtTvSZ-Ka5jNUCOMMIDzFfKoQnsM1b5MSjmOee7IfSPeNcTZstFNnDOBIGFaWlb4VwSZlLpre2zH2b53XVJdHercK7LRBB90ttJrMYIg2tBWbMCmHl44',
    archive_stat1_num: '1.000+',
    archive_stat1_label: 'Tác phẩm số hóa',
    archive_stat2_num: '100+',
    archive_stat2_label: 'Hồ sơ danh họa',
    archive_stat3_num: '04',
    archive_stat3_label: 'Tập khảo cứu quốc gia',
    archive_cta_text: 'TẢI BẢN TÓM TẮT KỶ YẾU (PDF)',
    archive_cta_link: '/archive',

    cta_headline: 'Cùng chung tay kiến tạo một thế kỷ mới',
    cta_desc:
      'Chúng tôi chào đón sự đồng hành của các nghệ sĩ, nghệ nhân, nhà nghiên cứu, doanh nghiệp và người yêu nghệ thuật trong và ngoài nước để sơn mài Việt Nam tiếp tục tỏa sáng.',
    cta_btn1_text: 'ĐĂNG KÝ THAM GIA ĐỒNG HÀNH',
    cta_btn1_link: '/contact',
    cta_btn2_text: 'TÀI TRỢ & BẢO TRỢ NGHỆ THUẬT',
    cta_btn2_link: '/contact',
  },

  '/about': {
    badge: '1930 — 2030 • BÁCH NIÊN KHỞI SẮC | HỘI HỌA & DI SẢN',
    headline: 'TỪ DI SẢN ĐẾN HẠ TẦNG SÁNG TẠO',
    description:
      'Một thế kỷ sơn mài hội họa Việt Nam không chỉ được tạo nên bởi những tác phẩm. Đó là sự tích tụ của tri thức nghề, ký ức cộng đồng, thử nghiệm nghệ thuật, lao động vật chất và khát vọng định hình bản sắc Việt trong thế giới hiện đại.',
    hero_seal:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA24EfoXZ-0BkTAtHr86R5VGrGCuTXxzBwWBzS6BW8ubJh3WRm5JLnWAsNYz24M--l0Syg2ccpf3_D4HwB1iJ28MuZ20kXwWQEszu9acBuTPnr9YSt4UIjhexbP9D6ngfVnhiLL5KLfhCvri5KxGGaVlSkgmNhA7NvFG2HBzEPoxjMXbrjfAwSFAPToizyXoP_KDUlAFU8mFRWqBKMUGElun99GkbN1VVDtASUHjdW1Zx9NSHjWRYrDUlYL4BYBXi95rV0',
    hero_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA24EfoXZ-0BkTAtHr86R5VGrGCuTXxzBwWBzS6BW8ubJh3WRm5JLnWAsNYz24M--l0Syg2ccpf3_D4HwB1iJ28MuZ20kXwWQEszu9acBuTPnr9YSt4UIjhexbP9D6ngfVnhiLL5KLfhCvri5KxGGaVlSkgmNhA7NvFG2HBzEPoxjMXbrjfAwSFAPToizyXoP_KDUlAFU8mFRWqBKMUGElun99GkbN1VVDtASUHjdW1Zx9NSHjWRYrDUlYL4BYBXi95rV0',
    story_tag: 'KHỞI NGUỒN Ý NIỆM',
    story_headline: 'Vì sao Hành trình được hình thành?',
    story_quote: '“Nối liền đứt gãy giữa hàn lâm và làng nghề — Biến di sản tinh hoa thành tài nguyên sống động.”',
    story_p1:
      'Trong nhiều năm, sơn mài thường được nhìn qua hai lăng kính tách rời: một bên là mỹ thuật hàn lâm, một bên là thủ công - làng nghề. Hành trình 100 năm được khởi tạo để nối lại toàn bộ hệ sinh thái: từ lịch sử hội họa, nghệ nhân, họa sĩ, chất liệu và kỹ thuật đến thiết kế, công nghệ, truyền thông, giáo dục và thị trường.',
    story_p2:
      'Mục tiêu không phải đóng khung di sản trong quá khứ, mà tạo điều kiện để di sản tiếp tục sản sinh giá trị trong hiện tại, trao truyền một sinh quyển sáng tạo tự chủ, dĩnh đạc bước vào bách niên kế tiếp.',
    story_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUOowWq2-6yYBMnhlPakXy635SgnT6bWlRWvwNB1UVulyrbseIHbaOXgguNg7nh3lcMgUa-pvq8bBhYTzxFH2oC3t94vfeIIvVkf8_EjNo7MCYAVq030xWTgSQ0Byy3-DQVM0RutjVNBNGjT6b59Efk8bteqtEVz2k8PMTJjiN0oXe7gHfL_bNMpRxr6hE4walNjk5MugHU4qn8YFH8DPea3lNksCS_LSBmMEa5Mmi6lTXckCeijVQ',
    story_image_tag: 'TRIẾT LÝ TÍCH TỤ',
    story_image_title: 'Ba Tầng Chiều Sâu Di Sản',
    mv_tag: 'MỤC TIÊU CHIẾN LƯỢC',
    mv_title: 'Sứ mệnh Di sản & Tầm nhìn 2030',
    mission_badge: 'SỨ MỆNH',
    mission_title: 'Kích hoạt giá trị sống của sơn mài hội họa Việt Nam',
    mission: 'Kích hoạt giá trị sống của sơn mài hội họa Việt Nam',
    mission_point1_bold: 'Hệ thống hóa và lan tỏa:',
    mission_point1_text:
      'Tri thức về lịch sử, mỹ học, kỹ thuật và chân dung những bậc thầy sơn mài Việt Nam.',
    mission_point2_bold: 'Nền tảng đồng kiến tạo:',
    mission_point2_text:
      'Mở không gian để cộng đồng học giả, họa sĩ cùng nghiên cứu, thử nghiệm và công bố sáng tạo mới.',
    mission_point3_bold: 'Hội tụ kinh tế di sản:',
    mission_point3_text:
      'Kết nối mỹ thuật tạo hình với công nghiệp văn hóa, đổi mới vật liệu và nền tảng chuyển đổi số.',
    mission_point4_bold: 'Dữ liệu & Kỷ lục:',
    mission_point4_text:
      'Xây dựng hồ sơ định danh tác phẩm, xác lập chuyên đề kỷ lục bách niên có giá trị pháp lý lâu dài.',
    mission_point5_bold: 'Định vị toàn cầu:',
    mission_point5_text:
      'Khẳng định sơn mài hội họa như một ngôn ngữ nghệ thuật bác học độc bản của văn hóa Việt.',
    vision_badge: 'TẦM NHÌN 2030',
    vision_title: 'Một hệ sinh thái có khả năng tự vận hành và lan tỏa',
    vision:
      'Đến năm 2030, Hành trình hướng tới một mạng lưới bền vững gồm kho tư liệu số, chương trình nghiên cứu – sáng tạo, không gian trưng bày và trải nghiệm, chuỗi hợp tác liên ngành, cơ chế định danh tác phẩm và thị trường minh bạch; từ đó tạo nền tảng cho thế hệ kế tiếp tiếp tục phát triển.',
    vision_desc:
      'Đến năm 2030, Hành trình hướng tới một mạng lưới bền vững gồm kho tư liệu số, chương trình nghiên cứu – sáng tạo, không gian trưng bày và trải nghiệm, chuỗi hợp tác liên ngành, cơ chế định danh tác phẩm và thị trường minh bạch; từ đó tạo nền tảng cho thế hệ kế tiếp tiếp tục phát triển.',
    milestone_1_year: '2026',
    milestone_1_desc: 'Khởi sắc di sản • Chuỗi tọa đàm & Open Studio',
    milestone_2_year: '2028',
    milestone_2_desc: 'Công bố Kỷ yếu bách niên Tập I–IV & Số hóa bảo tồn',
    milestone_3_year: '2030',
    milestone_3_desc: 'Đại lễ Kỷ niệm 100 năm Hội họa Sơn mài Việt Nam',
    mission_points: [
      {
        bold: 'Hệ thống hóa và lan tỏa:',
        text: 'Tri thức về lịch sử, mỹ học, kỹ thuật và chân dung những bậc thầy sơn mài Việt Nam.',
      },
      {
        bold: 'Nền tảng đồng kiến tạo:',
        text: 'Mở không gian để cộng đồng học giả, họa sĩ cùng nghiên cứu, thử nghiệm và công bố sáng tạo mới.',
      },
      {
        bold: 'Hội tụ kinh tế di sản:',
        text: 'Kết nối mỹ thuật tạo hình với công nghiệp văn hóa, đổi mới vật liệu và nền tảng chuyển đổi số.',
      },
      {
        bold: 'Dữ liệu & Kỷ lục:',
        text: 'Xây dựng hồ sơ định danh tác phẩm, xác lập chuyên đề kỷ lục bách niên có giá trị pháp lý lâu dài.',
      },
      {
        bold: 'Định vị toàn cầu:',
        text: 'Khẳng định sơn mài hội họa như một ngôn ngữ nghệ thuật bác học độc bản của văn hóa Việt.',
      },
    ],
    milestones: [
      {
        year: '2026',
        desc: 'Khởi sắc di sản • Chuỗi tọa đàm & Open Studio',
      },
      {
        year: '2028',
        desc: 'Công bố Kỷ yếu bách niên Tập I–IV & Số hóa bảo tồn',
      },
      {
        year: '2030',
        desc: 'Đại lễ Kỷ niệm 100 năm Hội họa Sơn mài Việt Nam',
      },
    ],
    principles_tag: 'BA NGUYÊN TẮC CỐT LÕI',
    principles_title: 'Điều không thay đổi trong mọi hoạt động',
    principles_desc:
      'Bộ ba nguyên tắc chỉ đạo bất biến định hướng mọi sáng kiến, đối thoại và sáng tạo trong hành trình bách niên.',
    principles: [
      {
        num: '01',
        title: 'Bản chất trước hình thức',
        desc: 'Mọi đổi mới phải tôn trọng lõi tạo ảnh và chiều sâu vật chất của sơn mài.',
        tag: 'Tôn trọng cốt lõi',
      },
      {
        num: '02',
        title: 'Đồng kiến tạo thay vì độc quyền diễn giải',
        desc: 'Tri thức được hình thành từ nhiều chủ thể và nhiều vùng thực hành.',
        tag: 'Đối thoại đa chiều',
      },
      {
        num: '03',
        title: 'Giá trị dài hạn thay vì hiệu ứng sự kiện',
        desc: 'Mỗi hoạt động phải để lại dữ liệu, tác phẩm, quan hệ hợp tác hoặc năng lực mới.',
        tag: 'Bền vững thế kỷ',
      },
    ],
    arch_tag: 'MÔ HÌNH HỆ THỐNG',
    arch_title: 'Kiến trúc nền tảng',
    arch_subtitle: 'Lõi bất biến – Vòng mở – Lớp vận hành',
    arch_tiers: [
      {
        tier_badge: 'Tầng 01 • Tâm Lõi',
        title: 'Lõi bất biến (The Immutability Core)',
        desc: 'Cơ chế tạo ảnh bằng tích tụ lớp, mài lộ, chiều sâu vật ánh sáng nội tại và thời gian.',
        icon: 'lens',
      },
      {
        tier_badge: 'Tầng 02 • Vành Đai Kết Nối',
        title: 'Vòng mở (The Collaborative Ring)',
        desc: 'Hội tụ nghệ sĩ, curator, nghệ nhân, nhà khoa học, nhà thiết kế, kiến trúc sư, doanh nghiệp, startup và nhà đầu tư.',
        icon: 'hub',
      },
      {
        tier_badge: 'Tầng 03 • Hạ Tầng Triển Khai',
        title: 'Lớp vận hành (The Operational Loop)',
        desc: 'LAB (Nghiên cứu & Thử nghiệm vật liệu) — STUDIO (Sáng tác & Đồng hành cùng nghệ sĩ) — SHOWCASE (Trưng bày, giám tuyển & Công bố tác phẩm) — MARKET (Thương mại hóa di sản).',
        icon: 'cyclone',
      },
    ],
    comm_tag: 'CỘNG ĐỒNG ĐỒNG HÀNH',
    comm_title: 'Một hành trình dành cho nhiều cộng đồng',
    comm_desc:
      'Di sản chỉ tồn tại bền vững khi thuộc về tất cả những ai cùng trân quý và kiến tạo.',
    communities: [
      {
        icon: 'palette',
        title: 'Nghệ sĩ, nghệ nhân, làng nghề & nhà sưu tập',
        desc: 'Những người gìn giữ lửa nghề, khai phá ngôn ngữ tạo hình sơn mài mới và các nhà sưu tập gìn giữ báu vật cho hậu thế.',
      },
      {
        icon: 'menu_book',
        title: 'Nhà nghiên cứu, sinh viên, giảng viên & Cơ sở đào tạo',
        desc: 'Viện nghiên cứu, trường đại học mỹ thuật và giới lý luận phê bình kiến tạo hệ thống giáo trình, dữ liệu khoa học chuẩn mực.',
      },
      {
        icon: 'architecture',
        title: 'Doanh nghiệp sáng tạo, thương hiệu, kiến trúc sư, nhà thiết kế',
        desc: 'Đưa tinh hoa sơn mài vào không gian sống, kiến trúc cao cấp, thiết kế sản phẩm ứng dụng và thời trang đương đại.',
      },
      {
        icon: 'account_balance',
        title: 'Cơ quan văn hóa, tổ chức xã hội, quỹ và mạng lưới quốc tế',
        desc: 'Các đơn vị quản lý di sản, tổ chức phi chính phủ, bảo tàng ngoại giao mở rộng nhịp cầu giao lưu văn hóa liên quốc gia.',
      },
      {
        icon: 'groups_3',
        title: 'Công chúng yêu nghệ thuật & Thế hệ trẻ',
        desc: 'Mọi trái tim rung cảm trước vẻ đẹp sơn mài, mong muốn chạm vào di sản, thấu hiểu tinh hoa dân tộc và truyền cảm hứng tự hào đến bạn bè thế giới.',
      },
    ],
    cta_headline: 'Cùng trở thành một phần của Hành trình di sản',
    cta_desc:
      'Mỗi bàn tay, mỗi góc nhìn và mỗi nguồn lực đều có thể góp phần thắp sáng tương lai của nghệ thuật sơn mài Việt Nam bước vào thế kỷ mới.',
    cta_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpwqVIjojagpvlvPe0ivTpFXrw9nm4XweI5zUUEKSuj9OtFoea5AkYxnxeoNgfduQ7h6r7Kyfzr7RqXiLnjrg4VduONy_vOraXUiBuQSpBB-u2DGK1WgegvX45r76WVnEj2m9V3D9qO5GelY08XCUXEEJlx-Z-rP7iPit85HWbf1H3heVoG1cj91q8jEnlKWCKDNwmxgIcnuSw1V0NH_1HuUBd5BRIJdQC8O0BHTAcfkQykwkhfShB_XzEqiYcemH3G0',
    cta_button_text: 'Trở thành một phần của Hành trình',
    cta_button_link: '/contact',
  },

  '/journey': {
    badge: '✦ 1930 • 2030 — BÁCH NIÊN KHỞI SẮC ✦',
    subtitle: 'BẢN SẮC HỘI HỌA & DI SẢN NGHỆ THUẬT',
    headline: 'MỘT THẾ KỶ TÍCH TỤ\nMỘT TƯƠNG LAI ĐANG MỞ',
    description:
      'Mỗi lớp sơn là một lớp thời gian. Mỗi lần mài lộ là một lần lịch sử hiển hiện. Hành trình 1930 - 2023 nhìn lại quá khứ để hiểu đúng bản chất, kết nối hiện tại để mở rộng thành phần và kiến tạo tương lai để di sản đạt khả dụng.',
    hero_cta_text: 'KHÁM PHÁ HÀNH TRÌNH',
    hero_cta_link: '#dong-thoi-gian',
    bottom_quote: '“Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.”',
    hero_seal:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzWfwJEOsC61MhtEz7HuLQnuwRHqUTgeGCy8Rqbfy7Cp9sp3Hxfn-XRJBAhOBurqcWdfXXGxxq6IkaAFuyvVr16OuLqsT7i-_mZT9f01lzVv-Hnn2GgR63ns6M7gtuaz5rdWWYOM9cbVQqDoOQ1wkarnSAYS1fQsJhj7G_373C4LnvVu7ws4BvHxGMPut_aC1_W4EUqvFUg-F7qoBK2fIM1HUQOrdpiuZWOgrTFCp28rqI-AOL458ABeJlMAswNaqR-s',
    hero_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzWfwJEOsC61MhtEz7HuLQnuwRHqUTgeGCy8Rqbfy7Cp9sp3Hxfn-XRJBAhOBurqcWdfXXGxxq6IkaAFuyvVr16OuLqsT7i-_mZT9f01lzVv-Hnn2GgR63ns6M7gtuaz5rdWWYOM9cbVQqDoOQ1wkarnSAYS1fQsJhj7G_373C4LnvVu7ws4BvHxGMPut_aC1_W4EUqvFUg-F7qoBK2fIM1HUQOrdpiuZWOgrTFCp28rqI-AOL458ABeJlMAswNaqR-s',
    timeline_title: 'Dòng Thời Gian Lịch Sử & Tương Lai',
    timeline_nodes: [
      {
        tag: 'KHỞI SINH',
        era: '1930–1945',
        title: 'Khởi nguyên ngôn ngữ hiện đại',
        desc: 'Kỹ thuật sơn truyền thống bước vào không gian hội họa hiện đại. Sơn ta, son, vàng bạc, vỏ trứng và kỹ thuật mài trở thành phương tiện tạo hình mới, đặt nền móng cho bản sắc sơn mài hội họa Việt Nam.',
      },
      {
        tag: 'KHẲNG ĐỊNH BẢN SẮC',
        era: '1945–1975',
        title: 'Bản sắc trong biến động',
        desc: 'Qua những biến động lịch sử, sơn mài tiếp tục được thực hành, giảng dạy và sáng tác. Chất liệu không chỉ ghi lại hình ảnh đất nước, con người mà còn củng cố một ngôn ngữ mỹ thuật riêng.',
      },
      {
        tag: 'LAN TỎA ĐỜI SỐNG',
        era: '1975–2020',
        title: 'Truyền nghề và mở rộng ứng dụng',
        desc: 'Các thế hệ họa sĩ, nghệ nhân, cơ sở đào tạo và làng nghề tiếp tục bảo tồn kỹ thuật, đồng thời mở rộng sơn mài vào trang trí, thiết kế, nội thất và sản phẩm văn hóa.',
      },
      {
        tag: 'ĐANG TRIỂN KHAI',
        era: '2025–2026',
        title: 'Kích hoạt nền tảng',
        desc: 'Kết nối trường đại học, nghệ sĩ, nghệ nhân, doanh nghiệp và đơn vị nghiên cứu; khởi động Open Studio, tọa đàm, triển lãm, chuyên đề kỷ lục và thử nghiệm vật liệu.',
        is_live: true,
      },
      {
        tag: 'TƯƠNG LAI GẦN',
        era: '2026–2028',
        title: 'Lan tỏa liên ngành',
        desc: 'Phát triển triển lãm đa ngành, chương trình giáo dục, sản phẩm hợp tác, số hóa tư liệu và truyền thông rộng; hình thành các dự án có khả năng nhân rộng.',
      },
      {
        tag: 'TẦM NHÌN 2030',
        era: '2028–2030',
        title: 'Kết tinh hệ sinh thái',
        desc: 'Củng cố không gian thường trực, kho dữ liệu, cơ chế hợp tác, mô hình kinh tế và mạng lưới quốc tế; công bố thành quả hành trình 100 năm và mở ra chu kỳ mới.',
      },
    ],
    key_quote:
      '“Năm 2030 không khép lại hành trình; đó là lúc di sản được trao cho tương lai với một cấu trúc mạnh hơn.”',
    symposia_title: 'Chuỗi Chuyên Đề',
    symposia: [
      {
        code: 'CHUYÊN ĐỀ 01',
        title: 'Tỏa sáng bản sắc',
        desc: 'Nhận diện giá trị thẩm mỹ, lịch sử và ngôn ngữ tạo hình của sơn mài hội họa Việt Nam; từng bước hình thành hệ luận cứ cho định vị trong nước và quốc tế.',
      },
      {
        code: 'CHUYÊN ĐỀ 02',
        title: 'Đổi mới sáng tạo',
        desc: 'Đối thoại về vật liệu mới và hợp tác phát triển liên ngành; tìm kiếm giới hạn mới của sơn mài trong kiến trúc, thiết kế, truyền thông và công nghệ.',
      },
      {
        code: 'CHUYÊN ĐỀ 03',
        title: 'Ký ức làng nghề',
        desc: 'Kết nối lịch sử, con người, kỹ thuật và chuỗi cung ứng của các làng nghề; đặt câu hỏi về truyền nghề, sinh kế, thị trường và sức sống đương đại.',
      },
      {
        code: 'CHUYÊN ĐỀ 04',
        title: 'Điểm chạm tương lai',
        desc: 'Đối thoại bàn tròn giữa doanh nhân, nhà sưu tập, họa sĩ, nghệ nhân và nhà nghiên cứu để hình thành các mô hình hợp tác khả thi.',
        sub: 'Thị trường & Sưu tập',
      },
      {
        code: 'CHUYÊN ĐỀ MỞ RỘNG',
        title: 'Từ hội họa sơn mài đến sơn mài hội họa',
        desc: 'Làm rõ chuyển biến về tư duy tạo hình và vị thế của chất liệu; từ phương tiện trang trí đến một ngôn ngữ hội họa có chiều sâu bản sắc.',
      },
      {
        code: 'CHUYÊN ĐỀ CÔNG NGHỆ',
        title: 'Sơn mài 2.0 – Giao lộ thế kỷ',
        desc: 'Khi nghệ thuật độc bản gặp công nghệ, định danh số, vật liệu mới và kinh tế di sản; mở ra cơ chế để giá trị văn hóa được bảo chứng, lan tỏa và phát triển có trách nhiệm.',
      },
    ],
    featured_symposium_code: 'CHUYÊN ĐỀ ĐẶC BIỆT • LẦN 7',
    featured_symposium_title:
      'Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số',
    featured_symposium_desc:
      'Tập trung vào quan hệ giữa sáng tạo, dữ liệu, quyền sở hữu trí tuệ, thương mại hóa và nền tảng số; hướng tới hệ sinh thái vừa bảo tồn bản sắc vừa tạo ra năng lực cạnh tranh mới.',
    featured_symposium_btn1: 'Đăng ký tham dự diễn đàn',
    featured_symposium_btn2: 'Tải đề cương chuyên đề',
    cta_tag: '✦ THAM GIA KIẾN TẠO THẾ KỶ ✦',
    cta_headline: 'Cùng Viết Tiếp Hành Trình 100 Năm',
    cta_desc:
      'Di sản không phải là một pho tượng đóng băng trong bảo tàng. Đó là ngọn lửa được bồi đắp bởi trí tuệ của từng thế hệ hôm nay.',
    cta_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApFGeFDZy4dfLBm4OXT4EuyeZrfovN4PVE1xnM_O7cu9S_oM5DC8AcvhmDI0TGT6frmdN7wDGuDf1CvpJlhftV4yVAdCv5jYcK2AdNCEhzgWhstsCr3GKvewNzwAEqTM7pL8-JkX8WZkAj24Erb6KWbbEoWFTT9cme4JCKHj9ccAXKUV4Lg14w9Bct2hiEtqjwubI2-UIisQ3d9X1pAfyoGqLEJ2_G9cDWqK5X5eYpjyun7pUWiLAkbEVfT9NquT8njg0',
    cta_btn1_text: 'Trở thành một phần của hành trình',
    cta_btn1_link: '/contact',
    cta_btn2_text: 'Đề xuất hợp tác',
    cta_btn2_link: '/contact',
  },

  '/events': {
    hero_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCW2NGrEf3lfKTe7pxCmevWbwQ0drNpFQaZVy43uDF67MZdCLPfAhtv21Shw5iLaEqLx59sBzfChDSs94NDlOUrMUJPRM5Q3aT1E2n8H8JVJIhmGjrgjZQHMSGa38tuEocMJ0AkoKwSedVcJ6czgDFojWj2VrWGXAZuivXOY_msTjKc4RdDzNvMphFBEMPutqx7rc-7VV4i815sYYfRfu7Itz-O_koLFueJ_Xx4CHitwlZXEs6carZDwg',
    badge: 'SỰ KIỆN & HOẠT ĐỘNG DI SẢN • 1930–2030',
    headline: 'NƠI DI SẢN ĐƯỢC THỰC HÀNH',
    description:
      'Mỗi sự kiện là một điểm gặp giữa tri thức và hành động: người nghiên cứu gặp người làm nghề, nghệ sĩ gặp doanh nghiệp, chất liệu truyền thống gặp công nghệ mới và công chúng trở thành một phần của quá trình sáng tạo.',
    stat1_num: '07',
    stat1_label: 'Kỳ Hành Trình Di Sản',
    stat2_num: '100+',
    stat2_label: 'Nghệ Sĩ & Học Giả',
    stat3_num: '30+',
    stat3_label: 'Viện Đào Tạo & Doanh Nghiệp',
    stat4_num: '1930–2030',
    stat4_label: 'Kỷ Nguyên Bách Niên',
    counter_badge: 'ĐANG CẬP NHẬT 2 SỰ KIỆN QUAN TRỌNG',
    program_badge: 'Mở cổng đăng ký trực tuyến',
    program_title: 'Đại Hội Thảo & Giám Tuyển: Kỷ Nguyên Đương Đại Của Sơn Mài Việt Nam',
    program_desc:
      'Phiên chuyên môn cao cấp quy tụ các nghệ sĩ bậc thầy, chuyên gia phục chế vật liệu son tự nhiên Phú Thọ và các nhà đầu tư văn hóa tiên phong.',
    program_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk9UadPB6Ai1dAdE5R0qsQCARUuFoxFXYN5lYL6e7giPVY2rL4L2QIb44QNIzDGrUEI-Sh_TwXJsJW_9CP3KNnJMrfz0Nj5GOrzkbjGLU-KeG3vzzgpln6w3jlB_Rw02IeaF-Bc_o22kuepOM8h4sGLJHLOVeM1cSrduIChr772u0YXzIIyTdTXlp62DlBD6PdZaLfFWx2ELqdJ2HmEtuvZWmT3heQFFwc2n8LHxDI',
    program_time: '08:30 – 17:30',
    program_date: 'Thứ Bảy, 14 Tháng 11, 2026',
    program_location: 'Hội trường Di Sản SIHUB',
    program_address: '273 Điện Biên Phủ, Quận 3, TP.HCM',
    program_gps_title: '273 Điện Biên Phủ',
    program_gps_sub: 'Phường Võ Thị Sáu, Quận 3, TP.HCM',
    featured_event_ids: [1, 2, 3],
    highlighted_event_id: 1,
  },

  '/collection': {
    badge: 'KHO TÀNG KIỆT TÁC • ĐỘC BẢN DI SẢN',
    headline: 'Kho Tàng Kiệt Tác & Dòng Chảy Nghệ Thuật',
    subHeadline:
      'Những sáng tác độc bản kết hợp giữa kỹ nghệ truyền thống làng nghề Hạ Thái, nhựa sơn cội Phú Thọ và tư duy tạo hình hiện đại.',
    quote: '“Mỗi tác phẩm là một lớp thời gian, mỗi sắc độ là một tầng ký ức bừng sáng.”',
    featured_collection_ids: [1, 2, 3],
  },

  '/archive': {
    badge: 'HỒ SƠ KHẢO CỨU QUỐC GIA',
    headline: 'Kỷ Yếu Di Sản Bách Niên Sơn Mài Hội Họa',
    subHeadline: 'Kho tri thức mở của Hành trình 100 năm',
    description:
      'Công trình số hóa và khảo cứu toàn diện quy tụ tư liệu quý, bản thảo kỹ thuật và chân dung các bậc thầy.',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6q50uNbfjHPDj6-2aHqeSR8DW1g_492VREK_fAsMYMK3DQhFaFVLvrzrgBfkcJiOO2Tais7QvRuBF8ALjaz4nBsOtz2_OYNR9WdWGDVxkBf7NcORDAYbMcd2mrPyEmwkKfmDP20xLS_6bePaBtTvSZ-Ka5jNUCOMMIDzFfKoQnsM1b5MSjmOee7IfSPeNcTZstFNnDOBIGFaWlb4VwSZlLpre2zH2b53XVJdHercK7LRBB90ttJrMYIg2tBWbMCmHl44',
    vol1_title: 'Tập I: Vật liệu tự nhiên & Kỹ pháp Then cổ truyền',
    vol1_desc: 'Từ kỹ nghệ phủ bóng dân gian đến ngôn ngữ hội họa bác học độc bản tại trường Mỹ thuật Đông Dương.',
    vol2_title: 'Tập II: Các danh họa tiêu biểu và tác phẩm kinh điển',
    vol2_desc: 'Khảo sát điền dã vùng cây sơn ta Phú Thọ, kỹ thuật ủ then Hạ Thái, Tương Bình Hiệp và chuỗi cung ứng vật liệu.',
    vol3_title: 'Tập III: Kinh tế di sản & Thị trường nghệ thuật đương đại',
    vol3_desc: 'Hệ thống tác giả, trường phái sáng tác tiêu biểu: Nguyễn Gia Trí, Phạm Hậu, Nguyễn Tư Nghiêm, Trần Văn Cẩn...',
    vol4_title: 'Tập IV: Hồ sơ đề cử Di sản Văn hóa Thế giới',
    vol4_desc: 'Thực hành thử nghiệm, định danh số, bảo tồn tích hợp và chiến lược đưa sơn mài Việt Nam bước ra thế giới.',
  },

  '/leadership': {
    badge: 'HỘI ĐỒNG ĐIỀU HÀNH & BẢO CHỨNG HỌC THUẬT',
    headline: 'Ban Điều Hành & Hội Đồng Cố Vấn Chuyên Môn',
    description:
      'Quy tụ các nhà nghiên cứu mỹ thuật, nghệ nhân ưu tú, chuyên gia định giá và giám tuyển nghệ thuật hàng đầu cùng chung tay dẫn dắt Hành trình.',
    emblem_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA24EfoXZ-0BkTAtHr86R5VGrGCuTXxzBwWBzS6BW8ubJh3WRm5JLnWAsNYz24M--l0Syg2ccpf3_D4HwB1iJ28MuZ20kXwWQEszu9acBuTPnr9YSt4UIjhexbP9D6ngfVnhiLL5KLfhCvri5KxGGaVlSkgmNhA7NvFG2HBzEPoxjMXbrjfAwSFAPToizyXoP_KDUlAFU8mFRWqBKMUGElun99GkbN1VVDtASUHjdW1Zx9NSHjWRYrDUlYL4BYBXi95rV0',
    core_unit_title: 'Viện Kỷ Lục Việt Nam (VietKings) & SIHUB',
    advisory_title: 'Hội đồng Cố vấn Di sản & Mỹ thuật',
    network_title: 'Mạng Lưới Đối Tác & Liên Kết Hệ Sinh Thái',
  },

  '/news': {
    badge: 'BẢN TIN BÁCH NIÊN • KHO TƯ LIỆU NÓNG',
    headline: 'Tin Tức & Tư Liệu Nghiên Cứu',
    description:
      'Cập nhật liên tục các diễn biến, tọa đàm, nhật ký xưởng nghề và công bố nghiên cứu mới nhất từ Hành trình 100 năm.',
    featured_article_ids: [1, 2, 3],
    newsletter_headline: 'Đăng Ký Nhận Bản Tin Bách Niên',
  },

  '/contact': {
    badge: 'BÁCH NIÊN KẾT NỐI • ĐỒNG HÀNH & LAN TỎA DI SẢN',
    headline: 'MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP',
    description:
      'Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm, một ý tưởng nghiên cứu hoặc một đề xuất hợp tác, hãy kết nối với chúng tôi.',
    hotline: '(+84) 28 3822 8888',
    email: 'bandoehanh@sonmaivietnam100nam.vn',
    address: '273 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    officeHours: 'Thứ Hai - Thứ Bảy: 08:30 - 17:30',
  },
};

const PageManager = () => {
  // Lấy key trang từ URL: /admin/pages/:pageKey (mặc định 'home')
  const { pageKey = 'home' } = useParams();

  // Xác định trang hiện tại qua PAGE_CONFIG
  const activePageConfig = PAGE_CONFIG[pageKey] || PAGE_CONFIG.home;
  const activeSlug = activePageConfig.slug;

  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'json'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Form State
  const [pageId, setPageId] = useState(null);
  const [pageName, setPageName] = useState(activePageConfig.label);
  const [parsedProps, setParsedProps] = useState(DEFAULT_PAGE_PROPS[activeSlug] || {});
  const [jsonString, setJsonString] = useState('{}');
  const [jsonError, setJsonError] = useState(null);

  // Catalog items cho các bộ chọn (pickers)
  const [allEvents, setAllEvents] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [collectionSearch, setCollectionSearch] = useState('');
  const [newsSearch, setNewsSearch] = useState('');

  // 1. Tải danh mục dữ liệu sự kiện, bộ sưu tập, bài viết
  useEffect(() => {
    let isMounted = true;
    const fetchCatalogData = async () => {
      try {
        const [evtRes, colRes, newsRes] = await Promise.all([
          eventServices.getEvents().catch(() => null),
          collectionServices.getCollections().catch(() => null),
          newsServices.getNews().catch(() => null),
        ]);
        if (isMounted) {
          if (evtRes?.data?.success) setAllEvents(evtRes.data.data || []);
          if (colRes?.data?.success) setAllCollections(colRes.data.data || []);
          if (newsRes?.data?.success) setAllNews(newsRes.data.data || []);
        }
      } catch (err) {
        console.warn('Lỗi tải danh mục dữ liệu:', err);
      }
    };

    fetchCatalogData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Tải cấu hình trang mỗi khi pageKey / activeSlug thay đổi
  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      setLoading(true);
      setJsonError(null);
      setStatusMsg(null);

      const defaultProps = DEFAULT_PAGE_PROPS[activeSlug] || {};
      setPageName(activePageConfig.label);

      try {
        const res = await pageServices.getPageBySlug(activeSlug);
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const item = Array.isArray(raw)
            ? raw.find((p) => p.slug === activeSlug) || raw[0]
            : raw;

          setPageId(item?.id || null);
          if (item?.name) setPageName(item.name);

          const merged = {
            ...defaultProps,
            ...(item?.props || {}),
          };

          setParsedProps(merged);
          setJsonString(JSON.stringify(merged, null, 2));
        } else if (isMounted) {
          setParsedProps(defaultProps);
          setJsonString(JSON.stringify(defaultProps, null, 2));
        }
      } catch {
        if (isMounted) {
          setParsedProps(defaultProps);
          setJsonString(JSON.stringify(defaultProps, null, 2));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [activeSlug, activePageConfig]);

  // Cập nhật giá trị trường thuộc tính trong visual editor
  const handlePropChange = (field, value) => {
    const updated = { ...parsedProps, [field]: value };
    setParsedProps(updated);
    setJsonString(JSON.stringify(updated, null, 2));
    setJsonError(null);
  };

  // Toggle Sự kiện được tick chọn
  const handleToggleEvent = (id) => {
    const numId = Number(id);
    const currentList = Array.isArray(parsedProps.featured_event_ids)
      ? parsedProps.featured_event_ids.map(Number)
      : [];
    const updated = currentList.includes(numId)
      ? currentList.filter((item) => item !== numId)
      : [...currentList, numId];
    handlePropChange('featured_event_ids', updated);
  };

  // Toggle Bộ sưu tập được tick chọn
  const handleToggleCollection = (id) => {
    const numId = Number(id);
    const currentList = Array.isArray(parsedProps.featured_collection_ids)
      ? parsedProps.featured_collection_ids.map(Number)
      : [];
    const updated = currentList.includes(numId)
      ? currentList.filter((item) => item !== numId)
      : [...currentList, numId];
    handlePropChange('featured_collection_ids', updated);
  };

  // Toggle Bài viết tin tức được tick chọn
  const handleToggleNews = (id) => {
    const numId = Number(id);
    const currentList = Array.isArray(parsedProps.featured_article_ids)
      ? parsedProps.featured_article_ids.map(Number)
      : [];
    const updated = currentList.includes(numId)
      ? currentList.filter((item) => item !== numId)
      : [...currentList, numId];
    handlePropChange('featured_article_ids', updated);
  };

  // Xử lý khi sửa trực tiếp ô JSON Editor
  const handleJsonTextChange = (e) => {
    const text = e.target.value;
    setJsonString(text);
    try {
      const parsed = JSON.parse(text);
      setParsedProps(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError('Cú pháp JSON không hợp lệ: ' + err.message);
    }
  };

  // Format làm đẹp JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      setJsonString(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err) {
      setJsonError('Không thể định dạng: JSON lỗi ' + err.message);
    }
  };

  // Lưu trang vào Cơ sở dữ liệu
  const handleSavePage = async () => {
    try {
      let finalProps = parsedProps;
      if (editorMode === 'json') {
        try {
          finalProps = JSON.parse(jsonString);
        } catch {
          setStatusMsg({
            type: 'error',
            text: 'Không thể lưu: Vui lòng sửa lỗi cú pháp JSON trước.',
          });
          return;
        }
      }

      setSaving(true);
      setStatusMsg(null);

      const payload = {
        name: pageName || activePageConfig.label,
        slug: activeSlug,
        props: finalProps,
      };

      const res = pageId
        ? await pageServices.updatePage(pageId, payload)
        : await pageServices.savePageBySlug(activeSlug, payload);
      if (res.data && res.data.success) {
        if (res.data.data?.id) setPageId(res.data.data.id);
        setStatusMsg({
          type: 'success',
          text: `Đã lưu toàn bộ nội dung "${activePageConfig.name}" vào cơ sở dữ liệu thành công!`,
        });
      } else {
        setStatusMsg({
          type: 'success',
          text: `Đã lưu cấu hình "${activePageConfig.name}" thành công!`,
        });
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Lỗi khi lưu dữ liệu: ' + err.message,
      });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  // Render Subcomponent phù hợp dựa trên pageKey hiện tại
  const renderVisualEditor = () => {
    switch (activePageConfig.key) {
      case 'home':
        return (
          <HomePageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            allEvents={allEvents}
            allCollections={allCollections}
            eventSearch={eventSearch}
            setEventSearch={setEventSearch}
            collectionSearch={collectionSearch}
            setCollectionSearch={setCollectionSearch}
            handleToggleEvent={handleToggleEvent}
            handleToggleCollection={handleToggleCollection}
          />
        );

      case 'about':
        return (
          <AboutPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
          />
        );

      case 'journey':
        return (
          <JourneyPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
          />
        );

      case 'events':
        return (
          <EventsPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            allEvents={allEvents}
            eventSearch={eventSearch}
            setEventSearch={setEventSearch}
            handleToggleEvent={handleToggleEvent}
            handleSavePage={handleSavePage}
            saving={saving}
          />
        );

      case 'collection':
        return (
          <CollectionPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            allCollections={allCollections}
            collectionSearch={collectionSearch}
            setCollectionSearch={setCollectionSearch}
            handleToggleCollection={handleToggleCollection}
          />
        );

      case 'archive':
        return (
          <ArchivePageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
          />
        );

      case 'leadership':
        return (
          <LeadershipPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
          />
        );

      case 'news':
        return (
          <NewsPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            allNews={allNews}
            newsSearch={newsSearch}
            setNewsSearch={setNewsSearch}
            handleToggleNews={handleToggleNews}
          />
        );

      case 'contact':
        return (
          <ContactPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
          />
        );

      default:
        return (
          <div className="p-8 text-center text-[#EADBCE]/70">
            Không tìm thấy trình biên soạn cho trang này.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. TOP HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
            <Layers className="w-4 h-4 text-[#FFDF73]" />
            <span>CMS Quản Trị Nội Dung Toàn Diện</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFDF73] mt-1">
            Chỉnh Sửa Toàn Bộ Nội Dung: {activePageConfig.name}
          </h1>
          <p className="text-sm text-[#EADBCE]/80 mt-1">
            Cho phép chỉnh sửa toàn bộ nội dung tĩnh, hình ảnh và <strong className="text-[#FFDF73]">tick chọn danh mục dữ liệu</strong> (sự kiện, bộ sưu tập, bài viết) để hiển thị trên trang này.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <Link
            to={activePageConfig.publicPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37]/50 text-[#FFDF73] hover:bg-[#D4AF37]/15 text-sm font-semibold tracking-wider transition"
          >
            <Eye className="w-4 h-4" />
            <span>Xem Ngoài Web</span>
          </Link>

          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving || Boolean(jsonError)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu...' : `Lưu ${activePageConfig.name}`}</span>
          </button>
        </div>
      </div>

      {/* 2. STATUS BANNER */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === 'success'
              ? 'bg-[#1e3a1f]/90 border-emerald-500/60 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-[#3d1115]/90 border-red-500/60 text-red-100'
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

      {/* 3. EDITOR MODE SWITCH: TRỰC QUAN VS JSON */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditorMode('visual')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              editorMode === 'visual'
                ? 'bg-[#d49b1a] text-black shadow-[0_0_12px_rgba(212,155,26,0.35)]'
                : 'bg-[#180305] border border-[#D4AF37]/30 text-[#EADBCE] hover:text-[#FFDF73]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh Sửa Trực Quan Từng Phần</span>
          </button>

          <button
            type="button"
            onClick={() => setEditorMode('json')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              editorMode === 'json'
                ? 'bg-[#d49b1a] text-black shadow-[0_0_12px_rgba(212,155,26,0.35)]'
                : 'bg-[#180305] border border-[#D4AF37]/30 text-[#EADBCE] hover:text-[#FFDF73]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mã Nguồn JSON</span>
          </button>
        </div>

        {editorMode === 'json' && (
          <button
            type="button"
            onClick={handleFormatJson}
            className="text-xs font-mono text-[#FFDF73] hover:underline flex items-center gap-1"
          >
            <span>[Format JSON]</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#FFDF73] space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="font-serif tracking-widest text-sm uppercase">
            Đang tải dữ liệu {activePageConfig.name}...
          </span>
        </div>
      ) : editorMode === 'visual' ? (
        renderVisualEditor()
      ) : (
        /* JSON CODE EDITOR MODE */
        <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Mã Nguồn Cấu Hình Trang (JSON)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Toàn bộ dữ liệu hiển thị trên trang được lưu dưới định dạng JSON trong bảng `pages`.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FFDF73] bg-[#2e090e] px-2.5 py-1 rounded border border-[#D4AF37]/40">
              Slug: {activeSlug}
            </span>
          </div>

          {jsonError && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-mono">
              {jsonError}
            </div>
          )}

          <textarea
            rows={24}
            value={jsonString}
            onChange={handleJsonTextChange}
            spellCheck={false}
            className="w-full p-4 rounded-xl bg-[#0d0102] border border-[#D4AF37]/30 text-[#FFDF73] font-mono text-xs leading-relaxed focus:border-[#FFDF73] focus:outline-none scrollbar-thin"
          />
        </div>
      )}

      {/* BOTTOM STICKY SAVE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#140204]/95 backdrop-blur-md border-t border-[#D4AF37]/30 py-3 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#EADBCE]/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Đang chỉnh sửa: <strong className="text-[#FFDF73]">{activePageConfig.name}</strong> (Slug: {activeSlug})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving || Boolean(jsonError)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-xs tracking-wider uppercase transition shadow-[0_2px_12px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saving ? 'Đang lưu...' : `Lưu ${activePageConfig.name}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManager;
