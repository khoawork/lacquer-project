import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Layers,
  RefreshCw,
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
    hero_video_url:
      'https://res.cloudinary.com/ds11ggie4/video/upload/v1794319913/sonmai_uccrps.mp4',
    top_tagline: 'NƠI HỘI TỤ',
    cursive_title: 'Tinh hoa nghệ thuật',
    hero_image: '',
    badge: 'NƠI HỘI TỤ',
    headline: 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM',
    subtitle: 'Tinh hoa nghệ thuật',
    quote: 'Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.',
    hero_cta1_text: 'KHÁM PHÁ HÀNH TRÌNH',
    hero_cta1_link: '/journey',
    hero_cta2_text: 'THAM GIA ĐỒNG KIẾN TẠO',
    hero_cta2_link: '/contact',
    bottom_quote: '“Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.”',

    story_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUOowWq2-6yYBMnhlPakXy635SgnT6bWlRWvwNB1UVulyrbseIHbaOXgguNg7nh3lcMgUa-pvq8bBhYTzxFH2oC3t94vfeIIvVkf8_EjNo7MCYAVq030xWTgSQ0Byy3-DQVM0RutjVNBNGjT6b59Efk8bteqtEVz2k8PMTJjiN0oXe7gHfL_bNMpRxr6hE4walNjk5MugHU4qn8YFH8DPea3lNksCS_LSBmMEa5Mmi6lTXckCeijVQ',
    story_image_tag: 'Kỹ thuật truyền thống',
    story_image_title: 'Mài Dưới Dòng Nước Lộ Sắc',
    story_image_desc:
      'Sự kiên nhẫn bóc tách từng tầng sơn then, son cánh gián để vàng son ngọc diệp hiển lộ quang minh.',
    story_stamp_line1: 'DI SẢN',
    story_stamp_line2: '1930–2030',
    story_stamp_line3: 'VIỆT NAM',
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

    cta_tag: 'ĐỒNG KIẾN TẠO VĂN HÓA',
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
    hero_seal: '',
    hero_image: '',
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
    hero_seal: '',
    hero_image: '',
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
    cta_tag: '',
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
    counter_badge: '',
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
    badge: 'DI SẢN HỘI HỌA & MỸ THUẬT BÁCH NIÊN (1930–2030)',
    headline: 'MỖI TÁC PHẨM LÀ MỘT LỚP THỜI GIAN',
    description:
      'Sơn mài không phô bày tất cả ngay từ đầu. Giá trị được tạo nên qua tích tụ, chờ đợi và mài lộ. Bộ sưu tập của Hành trình ghi nhận cả tác phẩm độc bản, dự án cộng đồng và thử nghiệm liên ngành – như những chứng tích sống của một thế kỷ đang tiếp diễn.',
    hero_seal: '',
    hero_image: '',
    stat1_num: '99',
    stat1_label: 'Tác Phẩm Độc Bản Cửu Cửu',
    stat2_num: '100',
    stat2_label: 'Mô-đun Đồng Kiến Tạo',
    stat3_num: '01',
    stat3_label: 'Tuyệt Phẩm Du Lãm Vespa',
    stat4_num: 'VIETKINGS',
    stat4_label: 'Hồ Sơ Đang Giám Định Di Sản',
    featured_collection_ids: [1, 2, 3],
    community_badge: '',
    community_title: 'DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC',
    community_desc:
      'Mở rộng biên độ nghệ thuật sơn mài: từ xưởng họa cá nhân đến dấu ấn bàn tay của muôn người.',
    community_projects: [
      {
        id: 1,
        tag: 'DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC',
        title: 'BÁCH HỌA LIÊN HOA',
        desc:
          'Không gian đồng sáng tác nơi nhiều bàn tay cùng tạo nên một tác phẩm lớn. Chương trình đề cao trải nghiệm thực hành, tính cộng đồng và khả năng biến người xem thành người tham gia trực tiếp vào tiến trình bồi đắp bề mặt sơn mài.',
        btn_text: 'Xem hành trình đồng sáng tác',
        link: '/contact',
      },
      {
        id: 2,
        tag: 'XÁC LẬP KỶ LỤC • ĐỀ CỬ CHÍNH THỨC',
        title:
          'TÁC PHẨM NHIỀU NGƯỜI CÙNG SÁNG TẠO BẰNG “THỦ CHỈ ĐẦU” TRÊN VẬT LIỆU SƠN MÀI CÔNG NGHỆ',
        desc:
          'Một thử nghiệm giao thoa giữa hành vi tạo dấu, chất liệu mới và tinh thần cộng đồng; được tổ chức theo quy trình kiểm chứng khoa học, tư liệu hóa và xác lập dữ liệu kỷ lục rõ ràng cùng Tổ chức Kỷ lục Việt Nam (VietKings).',
        btn_text: 'Xem hồ sơ kiểm chứng kỷ lục',
        link: '/contact',
      },
    ],
    project1_tag: 'DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC',
    project1_title: 'BÁCH HỌA LIÊN HOA',
    project1_desc:
      'Không gian đồng sáng tác nơi nhiều bàn tay cùng tạo nên một tác phẩm lớn. Chương trình đề cao trải nghiệm thực hành, tính cộng đồng và khả năng biến người xem thành người tham gia trực tiếp vào tiến trình bồi đắp bề mặt sơn mài.',
    project1_btn: 'Xem hành trình đồng sáng tác',
    project1_link: '/contact',
    project2_tag: 'XÁC LẬP KỶ LỤC • ĐỀ CỬ CHÍNH THỨC',
    project2_title:
      'TÁC PHẨM NHIỀU NGƯỜI CÙNG SÁNG TẠO BẰNG “THỦ CHỈ ĐẦU” TRÊN VẬT LIỆU SƠN MÀI CÔNG NGHỆ',
    project2_desc:
      'Một thử nghiệm giao thoa giữa hành vi tạo dấu, chất liệu mới và tinh thần cộng đồng; được tổ chức theo quy trình kiểm chứng khoa học, tư liệu hóa và xác lập dữ liệu kỷ lục rõ ràng cùng Tổ chức Kỷ lục Việt Nam (VietKings).',
    project2_btn: 'Xem hồ sơ kiểm chứng kỷ lục',
    project2_link: '/contact',
    cta_tag: 'KẾT NỐI DI SẢN BÁCH NIÊN',
    cta_headline: 'BẠN MUỐN ĐỒNG KIẾN TẠO CÙNG CHÚNG TÔI?',
    cta_desc:
      'Mỗi nghệ sĩ, nhà nghiên cứu, hay người yêu mỹ thuật đều có thể đóng góp một nét son trong trang sử mới của nghệ thuật sơn mài Việt Nam.',
    cta_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRIW42qxKqqO8mE8JBoRSPJw3dMADLcoV4pAVEUfHycZibaoqtZV1AUf1mJilGhMmjBGbcD73MJB2WdRtCa9h1FcmnPFm76WT1z3DRpoQr0M598MUhsR8BknD2KLsg8wJRh5uyP0WO63s97mInG9wSUzszrjWNr_ZVj2QJExjYeykmXsAZL6Cngd7iEQeTDcXfu4oxzwVf6uJHxcWPVHAPn8JG814YEu9ZrGFyp2mny4_5TjVV_GdWWAqNCgj-mENrpz0',
    cta_button_text: 'Đăng ký tham gia kiến tạo',
    cta_button_link: '/contact',
    cta_secondary_button_text: 'Liên hệ ban điều phối',
    cta_secondary_button_link: 'mailto:info@sonmaihoihoavietnam.com',
  },

  '/archive': {
    badge: 'HỒ SƠ KHẢO CỨU QUỐC GIA',
    headline: 'KHO TRI THỨC CỦA MỘT DI SẢN ĐANG SỐNG',
    description:
      'Kỷ yếu không chỉ ghi lại những gì đã xảy ra. Đây là không gian tập hợp, kiểm chứng và kết nối tri thức để mỗi thế hệ có thể tiếp tục nghiên cứu, thực hành và viết thêm chương mới cho sơn mài hội họa Việt Nam.',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6q50uNbfjHPDj6-2aHqeSR8DW1g_492VREK_fAsMYMK3DQhFaFVLvrzrgBfkcJiOO2Tais7QvRuBF8ALjaz4nBsOtz2_OYNR9WdWGDVxkBf7NcORDAYbMcd2mrPyEmwkKfmDP20xLS_6bePaBtTvSZ-Ka5jNUCOMMIDzFfKoQnsM1b5MSjmOee7IfSPeNcTZstFNnDOBIGFaWlb4VwSZlLpre2zH2b53XVJdHercK7LRBB90ttJrMYIg2tBWbMCmHl44',
    stat1_num: '05',
    stat1_label: 'Phân Hệ Tri Thức Cốt Lõi',
    stat1_sub: 'Tiêu chuẩn viện bảo tàng',
    stat2_num: '100+',
    stat2_label: 'Chuyên Khảo & Nghiên Cứu',
    stat2_sub: 'Học giả & Nghệ nhân kỳ cựu',
    stat3_num: '07',
    stat3_label: 'Kỳ Hành Trình Lưu Trữ Số',
    stat3_sub: 'Hồ sơ đa phương tiện 4K',
    stat4_num: 'VIETKINGS',
    stat4_label: 'Chuẩn Hóa Kiểm Chứng',
    stat4_sub: 'Xác thực kỷ lục di sản',

    categories_badge: '',
    categories_title: '5 Phân Hệ Tri Thức Cốt Lõi',
    categories_desc:
      'Khung cấu trúc học thuật bao quát toàn bộ tiến trình lịch sử, kỹ nghệ truyền thống và phương hướng phát triển của nghệ thuật sơn mài Việt Nam.',
    categories: [
      {
        id: 'history',
        title: 'Lịch sử và mỹ học',
        desc: 'Các bài nghiên cứu về tiến trình hình thành, ngôn ngữ tạo hình, hệ màu, không gian, ánh sáng và vị trí của sơn mài trong mỹ thuật Việt Nam hiện đại.',
        btnLabel: 'Tra cứu chuyên đề',
        link: '/archive',
      },
      {
        id: 'masters',
        title: 'Con người và truyền thừa',
        desc: 'Chân dung họa sĩ, nghệ nhân, nhà giáo, nhà nghiên cứu, nhà sưu tập và những người góp phần duy trì mạch nghề qua các thế hệ di sản.',
        btnLabel: 'Danh họa & Nghệ nhân',
        link: '/archive',
      },
      {
        id: 'materials',
        title: 'Làng nghề và vật liệu',
        desc: 'Tư liệu về vùng nguyên liệu, vóc, sơn ta, son trát, vàng quỳ, vỏ trứng, kỹ thuật ủ – mài – đánh bóng, cùng thách thức của chuỗi cung ứng bản địa.',
        btnLabel: 'Hồ sơ làng nghề',
        link: '/archive',
      },
      {
        id: 'creativity',
        title: 'Sáng tạo và ứng dụng',
        desc: 'Nghiên cứu, thử nghiệm và trường hợp thực tế về sơn mài trong thiết kế nội thất, kiến trúc cảnh quan, thời trang xa xỉ, điện ảnh, truyền thông số, giáo dục mỹ cảm và sản phẩm văn hóa đương thời.',
        btnLabel: 'Khảo sát ứng dụng đương đại',
        link: '/archive',
      },
      {
        id: 'economy',
        title: 'Kinh tế di sản và nền tảng số',
        desc: 'Các mô hình định danh, giám định, bản quyền sở hữu trí tuệ, lưu trữ phi tập trung, thương mại hóa có trách nhiệm và xây dựng thị trường sơn mài minh bạch.',
        btnLabel: 'Khung pháp lý & Số hóa',
        link: '/archive',
      },
    ],

    volumes_badge: '',
    volumes_title: 'Bốn Tập Chuyên Khảo Thế Kỷ (1930–2030)',
    volumes_desc:
      'Công trình xuất bản quy mô quốc gia quy tụ các nhà nghiên cứu mỹ thuật, nghệ nhân làng nghề và học giả uy tín trong và ngoài nước.',
    volumes_index_btn: 'Xem mục lục tổng quát',
    volumes: [
      {
        vol: 'TẬP I',
        era: '1930 — 1954',
        title: 'Vật liệu tự nhiên & Kỹ pháp Then cổ truyền',
        focus: 'Từ kỹ nghệ phủ bóng dân gian đến ngôn ngữ hội họa bác học độc bản tại trường Mỹ thuật Đông Dương.',
        pages: '380 trang',
        papers: '24 Chuyên luận khoa học',
        status: 'Đã hoàn tất bản thảo',
      },
      {
        vol: 'TẬP II',
        era: '1954 — 1986',
        title: 'Các danh họa tiêu biểu và tác phẩm kinh điển',
        focus: 'Khảo sát điền dã vùng cây sơn ta Phú Thọ, kỹ thuật ủ then Hạ Thái, Tương Bình Hiệp và chuỗi cung ứng vật liệu.',
        pages: '420 trang',
        papers: '32 Hồ sơ điền dã',
        status: 'Đang biên tập phản biện',
      },
      {
        vol: 'TẬP III',
        era: '1986 — 2010',
        title: 'Kinh tế di sản & Thị trường nghệ thuật đương đại',
        focus: 'Hệ thống tác giả, trường phái sáng tác tiêu biểu: Nguyễn Gia Trí, Phạm Hậu, Nguyễn Tư Nghiêm, Trần Văn Cẩn...',
        pages: '510 trang',
        papers: '45 Hồ sơ tác phẩm bảo vật',
        status: 'Đang thẩm định tư liệu',
      },
      {
        vol: 'TẬP IV',
        era: '2010 — 2030',
        title: 'Hồ sơ đề cử Di sản Văn hóa Thế giới',
        focus: 'Thực hành thử nghiệm, định danh số, bảo tồn tích hợp và chiến lược đưa sơn mài Việt Nam bước ra thế giới.',
        pages: '460 trang',
        papers: '38 Đề xuất mô hình kinh tế số',
        status: 'Đang tiếp nhận bản thảo',
      },
    ],

    vol1_title: 'Tập I: Vật liệu tự nhiên & Kỹ pháp Then cổ truyền',
    vol1_desc: 'Từ kỹ nghệ phủ bóng dân gian đến ngôn ngữ hội họa bác học độc bản tại trường Mỹ thuật Đông Dương.',
    vol2_title: 'Tập II: Các danh họa tiêu biểu và tác phẩm kinh điển',
    vol2_desc: 'Khảo sát điền dã vùng cây sơn ta Phú Thọ, kỹ thuật ủ then Hạ Thái, Tương Bình Hiệp và chuỗi cung ứng vật liệu.',
    vol3_title: 'Tập III: Kinh tế di sản & Thị trường nghệ thuật đương đại',
    vol3_desc: 'Hệ thống tác giả, trường phái sáng tác tiêu biểu: Nguyễn Gia Trí, Phạm Hậu, Nguyễn Tư Nghiêm, Trần Văn Cẩn...',
    vol4_title: 'Tập IV: Hồ sơ đề cử Di sản Văn hóa Thế giới',
    vol4_desc: 'Thực hành thử nghiệm, định danh số, bảo tồn tích hợp và chiến lược đưa sơn mài Việt Nam bước ra thế giới.',

    schema_badge: '',
    schema_title: 'Khung Chuẩn Dữ Liệu Lưu Trữ Quốc Gia',
    schema_desc:
      'Hệ thống chuẩn hóa thông tin đầu vào phục vụ kiểm định, tra cứu liên viện bảo tàng và bảo tồn di sản hội họa sơn mài vĩnh cửu.',
    schema_rows: [
      {
        id: 1,
        type: 'Bài nghiên cứu',
        fields:
          'Tiêu đề; tóm tắt; tác giả; đơn vị; từ khóa; tài liệu tham khảo; tệp tải về (PDF chuẩn OCR)',
        status: 'Chuẩn học thuật • Đã xác thực',
      },
      {
        id: 2,
        type: 'Nhân vật',
        fields:
          'Họ tên; vai trò; giai đoạn hoạt động; địa phương; câu chuyện nghề; tư liệu kiểm chứng; hình ảnh lưu trữ',
        status: 'Hồ sơ tiểu sử bảo chứng',
      },
      {
        id: 3,
        type: 'Làng nghề',
        fields:
          'Tên làng nghề; địa bàn tọa lạc; lịch sử sơ khởi; kỹ thuật đặc thù; quy mô nhân lực; thách thức nguyên liệu',
        status: 'Dữ liệu điền dã xác minh',
      },
      {
        id: 4,
        type: 'Tác phẩm',
        fields:
          'Mã định danh độc bản; tác giả; năm sáng tác; chất liệu (sơn then, cánh gián, son trầm, vàng quỳ); kích thước; lịch sử lưu lạc',
        status: 'Định danh số & Chip NFC',
      },
      {
        id: 5,
        type: 'Sự kiện',
        fields:
          'Thời gian; địa điểm; đơn vị đồng tổ chức; chương trình chi tiết; diễn giả; kết quả học thuật; tài liệu và video lưu trữ',
        status: 'Lưu trữ đa phương tiện số',
      },
    ],

    call_tag: 'KÊU GỌI ĐÓNG GÓP TƯ LIỆU VĂN HÓA',
    call_headline: 'Gửi tư liệu cho Kỷ yếu 100 năm',
    call_desc:
      'Hành trình tiếp nhận bài nghiên cứu, hồi ức nghề, hồ sơ tác phẩm, ảnh tư liệu, video, tài liệu làng nghề và đề xuất chuyên đề. Mọi tư liệu được rà soát nguồn gốc, quyền sử dụng và giá trị học thuật trước khi chính thức lưu trữ và công bố.',
    call_btn1_text: 'Gửi tư liệu',
    call_btn1_link: '/contact',
    call_btn2_text: 'Đề xuất bài viết',
    call_btn2_link: '/contact',
    call_btn3_text: 'Tải thể lệ (PDF)',
    call_btn3_link: '/contact',
    call_guarantee:
      'Bản quyền tác giả và quyền sở hữu trí tuệ được bảo hộ theo pháp luật hiện hành',
  },

  '/leadership': {
    badge: '✦ BÁCH NIÊN TRỌNG TRÁCH • MINH BẠCH & LIÊN NGÀNH ✦',
    headline: 'NHỮNG NGƯỜI GIỮ NHỊP CHO HÀNH TRÌNH',
    description:
      'Một hành trình liên ngành chỉ bền vững khi mỗi chủ thể hiểu rõ vai trò của mình. Ban điều hành kết nối học thuật, sáng tạo, sản xuất, truyền thông, dữ liệu và nguồn lực để mọi hoạt động cùng hướng về một mục tiêu chung.',
    core_unit_title: 'Viện Kỷ Lục Việt Nam (VietKings) & SIHUB',
    core_units: [
      {
        id: 1,
        role: 'CƠ QUAN ĐIỀU PHỐI NỀN TẢNG',
        name: 'VIỆN KỶ LỤC VIỆT NAM (VIETKINGS)',
        desc: 'Điều phối chiến lược nền tảng; kết nối mạng lưới chuyên gia; tổ chức nghiên cứu, tư liệu hóa, đề cử và xác lập các chuyên đề kỷ lục phù hợp; góp phần lan tỏa giá trị sơn mài Việt Nam trong nước và quốc tế.',
        tags: 'Xác thực kỷ lục, Bảo trợ dữ liệu di sản, Mạng lưới quốc tế',
        icon: 'ShieldCheck',
      },
      {
        id: 2,
        role: 'ĐƠN VỊ CHỦ TRÌ NỘI DUNG',
        name: 'TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO',
        desc: 'Xây dựng cấu trúc nội dung, phát triển chương trình liên ngành, kết nối công nghiệp văn hóa và triển khai các mô hình hợp tác sáng tạo.',
        tags: 'Phát triển nội dung, Liên kết công nghiệp văn hóa, Đổi mới sáng tạo',
        icon: 'Palette',
      },
    ],
    advisory_title: 'Hội đồng chuyên môn',
    advisory_subtitle: '“Bảo chứng chiều sâu học thuật và nghề nghiệp”',
    advisory_desc:
      'Hội đồng gồm đại diện mỹ thuật, lịch sử nghệ thuật, làng nghề, vật liệu, thiết kế, kiến trúc, công nghệ, kinh tế di sản và truyền thông. Nhiệm vụ chính là thẩm định nội dung, tư vấn chuyên đề, phản biện hồ sơ và đề xuất hướng phát triển.',
    advisory_panels: [
      {
        id: 1,
        icon: 'Paintbrush',
        title: 'Mỹ Thuật & Lịch Sử Nghệ Thuật',
        desc: 'Thẩm định giá trị học thuật, niên đại trường phái và ngôn ngữ tạo hình.',
        status: 'Đang cập nhật',
      },
      {
        id: 2,
        icon: 'Hammer',
        title: 'Làng Nghề & Kỹ Thuật Sơn Mài',
        desc: 'Bảo tồn bí quyết thủ công, quy chuẩn vật liệu sơn ta và kỹ thuật cổ truyền.',
        status: 'Đang cập nhật',
      },
      {
        id: 3,
        icon: 'Compass',
        title: 'Thiết Kế & Kiến Trúc Ứng Dụng',
        desc: 'Định hình không gian đương đại, ngôn ngữ tạo dáng và sản phẩm di sản.',
        status: 'Đang cập nhật',
      },
      {
        id: 4,
        icon: 'Cpu',
        title: 'Kinh Tế Di Sản & Công Nghệ Số',
        desc: 'Số hóa lưu trữ, định danh số bản quyền và chuyển giao thương mại bền vững.',
        status: 'Đang cập nhật',
      },
    ],
    teams_title: 'Ban Dự Án',
    teams_subtitle: '“Biến định hướng thành hoạt động”',
    project_teams: [
      {
        id: 1,
        num: '01',
        icon: 'BookOpen',
        title: '01. Nội dung – học thuật',
        desc: 'Nghiên cứu, biên tập, diễn giả, kỷ yếu và hồ sơ chuyên đề.',
        tag: 'Học thuật & Xuất bản',
      },
      {
        id: 2,
        num: '02',
        icon: 'Landmark',
        title: '02. Sáng tạo – triển lãm',
        desc: 'Tác phẩm, không gian, nghệ sĩ, nghệ nhân và trải nghiệm công chúng.',
        tag: 'Không gian & Trưng bày',
      },
      {
        id: 3,
        num: '03',
        icon: 'Handshake',
        title: '03. Đối ngoại – đối tác',
        desc: 'Trường, viện, doanh nghiệp, nhà tài trợ và mạng lưới quốc tế.',
        tag: 'Liên kết & Mạng lưới',
      },
      {
        id: 4,
        num: '04',
        icon: 'Megaphone',
        title: '04. Truyền thông – cộng đồng',
        desc: 'Nhận diện, báo chí, mạng xã hội, giáo dục và open call.',
        tag: 'Truyền thông di sản',
      },
      {
        id: 5,
        num: '05',
        icon: 'Database',
        title: '05. Công nghệ – dữ liệu',
        desc: 'Website, kho tư liệu, mã định danh, bản quyền và lưu trữ số.',
        tag: 'Hạ tầng số & Kho lưu trữ',
      },
      {
        id: 6,
        num: '06',
        icon: 'Wallet',
        title: '06. Vận hành – tài chính',
        desc: 'Kế hoạch, ngân sách, hậu cần, pháp lý và đánh giá hiệu quả.',
        tag: 'Quản trị & Pháp lý',
      },
    ],
    network_title: 'Mạng lưới phối hợp',
    network_subtitle: '“Cùng tạo nên hệ sinh thái”',
    network_desc:
      'Các đối tác có thể bao gồm không gian đổi mới sáng tạo, cơ sở đào tạo mỹ thuật, doanh nghiệp vật liệu, làng nghề, bảo tàng, phòng trưng bày, hiệp hội, cơ quan truyền thông và cộng đồng sáng tạo.',
    network_btn_text: 'TRỞ THÀNH ĐỐI TÁC',
    network_btn_link: 'mailto:info@sonmaihoihoavietnam.com',
    network_partners: [
      {
        id: 1,
        icon: 'Share2',
        title: 'Không Gian Đổi Mới Sáng Tạo & Viện Nghiên Cứu',
        status: 'Đang cập nhật',
      },
      {
        id: 2,
        icon: 'GraduationCap',
        title: 'Cơ Sở Đào Tạo Mỹ Thuật & Thiết Kế',
        status: 'Đang cập nhật',
      },
      {
        id: 3,
        icon: 'Store',
        title: 'Hiệp Hội Làng Nghề & Doanh Nghiệp Vật Liệu',
        status: 'Đang cập nhật',
      },
      {
        id: 4,
        icon: 'Image',
        title: 'Bảo Tàng, Không Gian Trưng Bày & Truyền Thông',
        status: 'Đang cập nhật',
      },
    ],
  },

  '/news': {
    badge: '✦ BÁCH NIÊN KHỞI SẮC • GÓC NHÌN & TIẾNG NÓI DI SẢN ✦',
    headline: 'NHỮNG CÂU CHUYỆN ĐANG ĐƯỢC VIẾT TIẾP',
    description:
      'Tin tức của Hành trình không chỉ đưa tin sự kiện. Đây là nơi lịch sử được kể lại bằng ngôn ngữ gần gũi, người làm nghề được nhìn thấy và các ý tưởng mới được đưa vào đối thoại công chúng.',
    featured_article_ids: [1, 2, 3],
  },

  '/contact': {
    badge: '✦ BÁCH NIÊN KẾT NỐI • ĐỒNG HÀNH & LAN TỎA ✦',
    headline: 'MỌI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT CUỘC GẶP',
    description:
      'Nếu bạn có một câu chuyện, một tư liệu, một tác phẩm, một ý tưởng nghiên cứu hoặc một đề xuất hợp tác, hãy kết nối với chúng tôi. Không có đóng góp nào là nhỏ khi cùng hướng đến việc viết tiếp một di sản chung của nền nghệ thuật Việt Nam.',
    routes_badge: 'PHƯƠNG THỨC KẾT NỐI',
    routes_title: 'CÁC TUYẾN THAM GIA ĐỒNG HÀNH',
    routes: [
      {
        id: 1,
        key: 'artist',
        icon: 'Palette',
        badge: 'TUYẾN 01 • SÁNG TÁC',
        title: 'Tham gia với tư cách nghệ sĩ / nghệ nhân',
        desc: 'Đăng ký Open Studio, triển lãm, trình diễn sáng tác, workshop, chương trình lưu trú nghệ thuật hoặc đề xuất bộ sưu tập độc bản vinh danh bách niên.',
        buttonText: 'GỬI HỒ SƠ SÁNG TẠO',
      },
      {
        id: 2,
        key: 'academic',
        icon: 'BookOpen',
        badge: 'TUYẾN 02 • HỌC THUẬT',
        title: 'Tham gia với tư cách chuyên gia / nhà nghiên cứu',
        desc: 'Đề xuất tham luận, phản biện học thuật, gửi bài viết cho Kỷ yếu bách niên, cố vấn chuyên đề di sản hoặc đóng góp tư liệu lịch sử quý giá.',
        buttonText: 'ĐỀ XUẤT CHUYÊN MÔN',
      },
      {
        id: 3,
        key: 'business',
        icon: 'Building2',
        badge: 'TUYẾN 03 • ĐỒNG HÀNH DOANH NGHIỆP',
        title: 'Hợp tác doanh nghiệp và thương hiệu',
        desc: 'Đồng sáng tạo sản phẩm, ứng dụng sơn mài trong kiến trúc - nội thất đương đại, tài trợ di sản, licensing bản quyền hoặc bảo trợ không gian văn hóa.',
        buttonText: 'ĐỀ XUẤT HỢP TÁC',
      },
      {
        id: 4,
        key: 'education',
        icon: 'GraduationCap',
        badge: 'TUYẾN 04 • GIÁO DỤC DI SẢN',
        title: 'Trường học và cộng đồng',
        desc: 'Tổ chức tham quan bảo tàng xưởng, lớp học chuyên đề nghệ thuật, hoạt động trải nghiệm thực hành, dự án sinh viên hoặc mạng lưới tình nguyện viên văn hóa.',
        buttonText: 'ĐĂNG KÝ CHƯƠNG TRÌNH',
      },
      {
        id: 5,
        key: 'press',
        icon: 'Megaphone',
        badge: 'TUYẾN 05 • TRUYỀN THÔNG ĐẠI CHÚNG',
        title: 'Báo chí và truyền thông',
        desc: 'Nhận bộ tài liệu báo chí chính thức (Press Kit), hình ảnh tư liệu độ phân giải cao được cấp quyền sử dụng, đặt lịch phỏng vấn Ban cố vấn và đầu mối phát ngôn.',
        buttonText: 'LIÊN HỆ TRUYỀN THÔNG',
      },
    ],
    direct_badge: 'KÊNH CHÍNH THỨC',
    direct_title: 'KẾT NỐI TRỰC TIẾP',
    email: 'info@sonmaihoihoavietnam.com',
    hotline: 'Ms. Khánh — 090 900 2207',
    hotline_sub: 'Hỗ trợ đối tác, nghệ sĩ và tiếp nhận thông tin 24/7',
    address: 'Hà Nội • TP. Hồ Chí Minh • Phú Thọ',
    address_sub:
      'Trụ sở điều phối trung tâm đang trong giai đoạn hoàn thiện chuẩn bị cho chuỗi sự kiện Khởi Sắc 2026.',
    officeHours: 'Trong vòng 02 ngày làm việc chính thức',
    officeHours_sub: 'Phân loại và chuyển đến Tiểu ban chuyên môn tương ứng.',
    security_note:
      'Mọi thông tin, hồ sơ tác phẩm và đề xuất nghiên cứu đều được bảo mật, mã hóa định danh và quản lý theo chuẩn lưu trữ của Viện Kỷ Lục Việt Nam (VietKings).',
    // Cấu hình Form kết nối
    form_portal_badge: 'CỔNG TIẾP NHẬN TRỰC TUYẾN',
    form_title: 'GỬI PHẢN HỒI HOẶC YÊU CẦU TƯ VẤN',
    form_description:
      'Quý vị vui lòng để lại thông tin và nội dung cần tư vấn để Ban Thư ký Trung tâm hỗ trợ.',
    form_note: 'Các trường có dấu * là bắt buộc.',
    form_submit_text: 'GỬI THÔNG TIN',
    form_fields: [
      {
        id: 'f_1',
        label: 'Họ và tên',
        placeholder: 'Ví dụ: Nguyễn Văn An',
        type: 'text',
        icon: 'User',
        gridWidth: '6/12',
        key: 'ho_va_ten',
        required: true,
      },
      {
        id: 'f_2',
        label: 'Địa chỉ Email',
        placeholder: 'name@domain.com',
        type: 'email',
        icon: 'Mail',
        gridWidth: '6/12',
        key: 'email',
        required: true,
      },
      {
        id: 'f_3',
        label: 'Số điện thoại liên hệ',
        placeholder: 'Ví dụ: 0912 345 678',
        type: 'tel',
        icon: 'Phone',
        gridWidth: '6/12',
        key: 'so_dien_thoai',
        required: false,
      },
      {
        id: 'f_4',
        label: 'Lĩnh vực quan tâm',
        placeholder: 'Vui lòng chọn lĩnh vực',
        type: 'select',
        icon: 'LayoutGrid',
        gridWidth: '6/12',
        key: 'linh_vuc',
        required: false,
        options: [
          'Tư vấn tham gia Tuyến sáng tác',
          'Đóng góp tư liệu Kỷ yếu',
          'Hợp tác doanh nghiệp & tài trợ',
          'Đăng ký chương trình giáo dục',
          'Liên hệ báo chí & truyền thông',
          'Đóng góp ý kiến khác',
        ],
      },
      {
        id: 'f_5',
        label: 'Nội dung lời nhắn / Đề xuất chi tiết',
        placeholder:
          'Quý vị vui lòng mô tả chi tiết nội dung cần tư vấn hoặc đề xuất hợp tác...',
        type: 'textarea',
        icon: 'MessageSquare',
        gridWidth: '12/12',
        key: 'noi_dung',
        required: true,
      },
    ],
    form_terms_text:
      'Tôi xác nhận thông tin cung cấp là chính xác và đồng ý cho phép Ban Điều Hành lưu trữ, xử lý thông tin để phối hợp triển khai theo quy định bảo mật của dự án.',
    form_upload_label: 'TỆP ĐÍNH KÈM HOẶC LIÊN KẾT HỒ SƠ',
    form_upload_hint: 'Đính kèm Portfolio, Hồ sơ năng lực hoặc Tác phẩm',
    form_upload_subhint:
      'Hỗ trợ PDF, DOCX, ZIP tối đa 25MB hoặc dán URL Drive',
    form_link_placeholder:
      'Hoặc dán liên kết Google Drive / Dropbox / Behance tại đây...',
    form_message_label: 'NỘI DUNG MUỐN KẾT NỐI',
    form_message_placeholder:
      'Mô tả ngắn gọn nội dung ý tưởng, tác phẩm, tư liệu hoặc phương thức hợp tác bạn mong muốn đề xuất cùng dự án Bách niên...',
    modal_badge: 'MÃ HỒ SƠ LƯU TRỮ',
    modal_title: 'TIẾP NHẬN THÀNH CÔNG',
    modal_message:
      'Cảm ơn bạn đã kết nối. Ban Điều Hành Dự Án 100 Năm Sơn Mài Hội Họa Việt Nam đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất. Mỗi đóng góp của bạn đều là một viên gạch quý báu đắp xây di sản chung.',
    modal_btn_text: 'GỬI THÊM YÊU CẦU KHÁC',
  },
};

const PageManager = () => {
  // Lấy key trang từ URL: /admin/pages/:pageKey (mặc định 'home')
  const { pageKey = 'home' } = useParams();

  // Xác định trang hiện tại qua PAGE_CONFIG
  const activePageConfig = PAGE_CONFIG[pageKey] || PAGE_CONFIG.home;
  const activeSlug = activePageConfig.slug;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Form State
  const [pageId, setPageId] = useState(null);
  const [pageName, setPageName] = useState(activePageConfig.label);
  const [parsedProps, setParsedProps] = useState({});

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
      setStatusMsg(null);

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

          setParsedProps(item?.props || {});
        } else if (isMounted) {
          setParsedProps({});
        }
      } catch {
        if (isMounted) {
          setParsedProps({});
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

  // Lưu trang vào Cơ sở dữ liệu
  const handleSavePage = async () => {
    try {
      setSaving(true);
      setStatusMsg(null);

      const payload = {
        name: pageName || activePageConfig.label,
        slug: activeSlug,
        props: parsedProps,
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
            handleSavePage={handleSavePage}
            saving={saving}
          />
        );

      case 'archive':
        return (
          <ArchivePageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            handleSavePage={handleSavePage}
            saving={saving}
          />
        );

      case 'leadership':
        return (
          <LeadershipPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            handleSavePage={handleSavePage}
            saving={saving}
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
            handleSavePage={handleSavePage}
            saving={saving}
          />
        );

      case 'contact':
        return (
          <ContactPageEditor
            parsedProps={parsedProps}
            handlePropChange={handlePropChange}
            handleSavePage={handleSavePage}
            saving={saving}
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
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#FFDF73] mt-1">
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
            disabled={saving}
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

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#FFDF73] space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="font-sans tracking-widest text-sm uppercase">
            Đang tải dữ liệu {activePageConfig.name}...
          </span>
        </div>
      ) : (
        renderVisualEditor()
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
              disabled={saving}
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
