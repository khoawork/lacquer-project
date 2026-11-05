/**
 * Seed script: Khởi tạo dữ liệu mẫu toàn diện dựa trên nội dung thực tế từ frontend
 * Tuân thủ cấu trúc database Sequelize hiện tại:
 * - Page (id, name, slug, props: JSON) — slug chỉ nằm trong Page
 * - Event (không chứa slug)
 * - Collection & Artwork (không chứa slug)
 * - NewsArticle (không chứa slug)
 * - SiteSetting & Menu & FormSubmission
 */
const dotenv = require('dotenv');
dotenv.config();

const {
  sequelize,
  syncDatabase,
  Page,
  Event,
  Collection,
  Artwork,
  NewsArticle,
  SiteSetting,
  Menu,
  FormSubmission,
} = require('../models/baseModel');

async function runSeed() {
  console.log('🚀 Đang chuẩn bị đồng bộ bảng cơ sở dữ liệu...');

  try {
    // 1. Đồng bộ bảng DB
    await syncDatabase(false);
    console.log('✅ Cấu trúc bảng đã sẵn sàng.');

    // 2. DỮ LIỆU MẪU: BẢNG PAGES (9 trang theo chuẩn frontend)
    console.log('\n📄 [1/7] Đang tạo dữ liệu mẫu cho bảng Pages...');
    const pagesData = [
      {
        id: 1,
        name: 'Trang chủ',
        slug: '/',
        props: {
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
          step4_desc: 'Đưa tác phẩm sơn mài vào chuỗi giá trị kinh tế sáng tạo toàn cầu.',
          events_headline: 'Chuỗi hoạt động đưa di sản vào đời sống',
          events_desc:
            'Hành trình được hiện thực hóa qua các kỳ tọa đàm, triển lãm, trình diễn sáng tác, chương trình kỷ lục, hoạt động giáo dục và kết nối liên ngành Mỗi kỳ là một lát cắt chuyên sâu, đồng thời bổ sung dữ liệu cho hồ sơ 100 năm.',
          featured_event_ids: [1, 2, 3],
          collections_headline: 'Những tác phẩm viết tiếp mạch di sản',
          collections_desc:
            'Từ "Cửu Cửu - Mạch Ngầm Tinh Hoa", "Bách Thụ Đồng Tam Viên" đến "Du Lãm", các bộ sưu tập không chỉ trưng bày kỹ thuật, mà kể câu chuyện về ký ức, cộng đồng, chuyển động và khả năng ứng dụng mới của sơn mài Việt Nam.',
          featured_collection_ids: [1, 2, 3],
          archive_tag: 'ẤN PHẨM KHẢO CỨU • TẬP I–IV',
          archive_headline: 'KỶ YẾU BÁCH NIÊN SƠN MÀI (1930 — 2030)',
          archive_desc:
            'Công trình khảo cứu đồ sộ quy tụ hơn 500 trang tư liệu, bản vẽ kỹ thuật, bài phê bình nghệ thuật và hình ảnh độ phân giải cao của các kiệt tác quốc gia.',
          cta_tag: 'ĐỒNG KIẾN TẠO VĂN HÓA',
          cta_headline: 'Cùng viết tiếp hành trình 100 năm',
          cta_desc:
            'Dù bạn là nghệ sĩ, nghệ nhân, nhà nghiên cứu, doanh nghiệp, sinh viên hay người yêu nghệ thuật, luôn có một cách để bạn góp mặt trong hành trình này.',
        },
      },
      {
        id: 2,
        name: 'Giới thiệu',
        slug: '/about',
        props: {
          hero_seal:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA24EfoXZ-0BkTAtHr86R5VGrGCuTXxzBwWBzS6BW8ubJh3WRm5JLnWAsNYz24M--l0Syg2ccpf3_D4HwB1iJ28MuZ20kXwWQEszu9acBuTPnr9YSt4UIjhexbP9D6ngfVnhiLL5KLfhCvri5KxGGaVlSkgmNhA7NvFG2HBzEPoxjMXbrjfAwSFAPToizyXoP_KDUlAFU8mFRWqBKMUGElun99GkbN1VVDtASUHjdW1Zx9NSHjWRYrDUlYL4BYBXi95rV0',
          badge: '1930 • 2030 — BÁCH NIÊN KHỞI SẮC | HỘI HỌA & DI SẢN',
          headline: 'TỪ DI SẢN ĐẾN HẠ TẦNG SÁNG TẠO',
          description:
            'Một thế kỷ sơn mài hội họa Việt Nam không chỉ được tạo nên bởi những tác phẩm. Đó là sự tích tụ của tri thức nghề, ký ức cộng đồng, thử nghiệm nghệ thuật, lao động vật chất và khát vọng định hình bản sắc Việt trong thế giới hiện đại.',
          story_tag: 'KHỞI NGUỒN Ý NIỆM',
          story_headline: 'Vì sao Hành trình được hình thành?',
          story_p1:
            'Trong nhiều năm, sơn mài thường được nhìn qua hai lăng kính tách rời: một bên là mỹ thuật hàn lâm, một bên là thủ công – làng nghề. Hành trình 100 năm được khởi tạo để nối lại toàn bộ hệ sinh thái: từ lịch sử hội họa, nghệ nhân, họa sĩ, chất liệu và kỹ thuật đến thiết kế, công nghệ, truyền thông, giáo dục và thị trường.',
          story_p2:
            'Mục tiêu không phải đóng khung di sản trong quá khứ, mà tạo điều kiện để di sản tiếp tục sản sinh giá trị trong hiện tại, trao truyền một sinh quyển sáng tạo tự chủ, đĩnh đạc bước vào bách niên kế tiếp.',
          story_quote: '“Nối liền đứt gãy giữa hàn lâm và làng nghề — Biến di sản tĩnh tại thành tài nguyên sống động.”',
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
          cta_image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpwqVIjojagpvlvPe0ivTpFXrw9nm4XweI5zUUEKSuj9OtFoea5AkYxnxeoNgfduQ7h6r7Kyfzr7RqXiLnjrg4VduONy_vOraXUiBuQSpBB-u2DGK1WgegvX45r76WVnEj2m9V3D9qO5GelY08XCUXEEJlx-Z-rP7iPit85HWbf1H3heVoG1cj91q8jEnlKWCKDNwmxgIcnuSw1V0NH_1HuUBd5BRIJdQC8O0BHTAcfkQykwkhfShB_XzEqiYcemH3G0',
          cta_headline: 'Cùng trở thành một phần của Hành trình di sản',
          cta_desc:
            'Mỗi bàn tay, mỗi góc nhìn và mỗi nguồn lực đều có thể góp phần thắp sáng tương lai của nghệ thuật sơn mài Việt Nam bước vào thế kỷ mới.',
          cta_button_text: 'Trở thành một phần của Hành trình',
          cta_button_link: '/contact',
        },
      },
      {
        id: 3,
        name: 'Hành trình',
        slug: '/journey',
        props: {
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
      },
      {
        id: 4,
        name: 'Sự kiện',
        slug: '/events',
        props: {
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
          featured_event_ids: [1, 2],
          spotlight_event_id: 1,
        },
      },
      {
        id: 5,
        name: 'Bộ sưu tập',
        slug: '/collection',
        props: {
          badge: 'DI SẢN HỘI HỌA & MỸ THUẬT BÁCH NIÊN (1930–2030)',
          headline: 'MỖI TÁC PHẨM LÀ MỘT LỚP THỜI GIAN',
          description:
            'Sơn mài không phô bày tất cả ngay từ đầu. Giá trị được tạo nên qua tích tụ, chờ đợi và mài lộ. Bộ sưu tập của Hành trình ghi nhận cả tác phẩm độc bản, dự án cộng đồng và thử nghiệm liên ngành – như những chứng tích sống của một thế kỷ đang tiếp diễn.',
          hero_seal:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAbx2zcEMt5QTXpYZ4vmxm9T3QK6QXfbGS31GYaycmOh0yKdDuKbXLrCd8jOekjZh0yRrUcG1Ach3DVtu4cJrwm9CqMdO0qkE9EMijUSxYvcI9F-i1XPm_j34ROMxlJJ6YQINYSQ3ZXdhzCmPxh9mn_ZAX193YRGA64fvuoaOJcaLmtQFm5g2f0GuT8VLii4tVPMsGA1sQn1srqxR_80HEyudzBxHHOpnljC5HpfKHyOK_K2hVKfueaKw',
          stat1_num: '99',
          stat1_label: 'Tác Phẩm Độc Bản Cửu Cửu',
          stat2_num: '100',
          stat2_label: 'Mô-đun Đồng Kiến Tạo',
          stat3_num: '01',
          stat3_label: 'Tuyệt Phẩm Du Lãm Vespa',
          stat4_num: 'VIETKINGS',
          stat4_label: 'Hồ Sơ Đang Giám Định Di Sản',
          featured_collection_ids: [1, 2, 3],
          community_badge: 'ĐỒNG KIẾN TẠO MỞ',
          community_title: 'DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC',
          community_desc:
            'Mở rộng biên độ nghệ thuật sơn mài: từ xưởng họa cá nhân đến dấu ấn bàn tay của muôn người.',
          project1_tag: 'DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC',
          project1_title: 'BÁCH HỌA LIÊN HOA',
          project1_desc:
            'Không gian đồng sáng tác nơi nhiều bàn tay cùng tạo nên một tác phẩm lớn. Chương trình đề cao trải nghiệm thực hành, tính cộng đồng và khả năng biến người xem thành người tham gia.',
          project1_btn: 'Xem hành trình đồng sáng tác',
          project2_tag: 'XÁC LẬP KỶ LỤC • ĐỀ CỬ CHÍNH THỨC',
          project2_title:
            'TÁC PHẨM NHIỀU NGƯỜI CÙNG SÁNG TẠO BẰNG “THỦ CHỈ ĐẦU” TRÊN VẬT LIỆU SƠN MÀI CÔNG NGHỆ',
          project2_desc:
            'Một thử nghiệm giao thoa giữa hành vi tạo dấu, chất liệu mới và tinh thần cộng đồng; được tổ chức theo quy trình kiểm chứng, tư liệu hóa và xác lập dữ liệu rõ ràng.',
          project2_btn: 'Xem hồ sơ kiểm chứng kỷ lục',
          cta_tag: 'KẾT NỐI DI SẢN BÁCH NIÊN',
          cta_headline: 'BẠN MUỐN ĐỒNG KIẾN TẠO CÙNG CHÚNG TÔI?',
          cta_desc:
            'Mỗi nghệ sĩ, nhà nghiên cứu, hay người yêu mỹ thuật đều có thể đóng góp một nét son trong trang sử mới của nghệ thuật sơn mài Việt Nam.',
          cta_button_text: 'Đăng ký tham gia kiến tạo',
          cta_button_link: '/contact',
        },
      },
      {
        id: 6,
        name: 'Kỷ yếu',
        slug: '/archive',
        props: {
          headline: 'Kỷ Yếu Di Sản Bách Niên Sơn Mài Hội Họa',
          subHeadline: 'Kho tri thức mở của Hành trình 100 năm',
          editions: [
            { volume: 'Tập I', title: 'Vật liệu tự nhiên & Kỹ pháp Then cổ truyền' },
            { volume: 'Tập II', title: 'Các danh họa tiêu biểu và tác phẩm kinh điển' },
            { volume: 'Tập III', title: 'Kinh tế di sản & Thị trường nghệ thuật đương đại' },
          ],
        },
      },
      {
        id: 7,
        name: 'Ban điều hành',
        slug: '/leadership',
        props: {
          headline: 'Ban Điều Hành & Hội Đồng Cố Vấn Chuyên Môn',
          description:
            'Quy tụ các nhà nghiên cứu mỹ thuật, nghệ nhân ưu tú, chuyên gia định giá và giám tuyển nghệ thuật hàng đầu.',
          committees: [
            'Hội đồng Cố vấn Di sản & Mỹ thuật',
            'Ban Vận hành & Phát triển Mạng lưới',
            'Ban Giám tuyển & Nghiên cứu Tài liệu',
          ],
        },
      },
      {
        id: 8,
        name: 'Tin tức',
        slug: '/news',
        props: {
          headline: 'Tin Tức & Tư Liệu Nghiên Cứu',
          categories: [
            'Dòng chảy 100 năm',
            'Từ xưởng đến đời sống',
            'Người giữ lửa',
            'Sơn mài 2.0',
            'Nhật ký Hành trình',
            'Góc nhìn quốc tế',
          ],
        },
      },
      {
        id: 9,
        name: 'Liên hệ',
        slug: '/contact',
        props: {
          headline: 'Kết Nối & Đồng Hành Cùng Hành Trình',
          hotline: '(+84) 28 3822 8888',
          email: 'bandoehanh@sonmaivietnam100nam.vn',
          address: '273 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
          officeHours: 'Thứ Hai - Thứ Bảy: 08:30 - 17:30',
        },
      },
    ];

    for (const page of pagesData) {
      const [p, created] = await Page.findOrCreate({
        where: { slug: page.slug },
        defaults: page,
      });
      if (!created) {
        await p.update({ name: page.name, props: page.props });
      }
    }
    console.log(`✅ Đã nạp thành công ${pagesData.length} trang vào bảng pages.`);

    // 3. DỮ LIỆU MẪU: BẢNG EVENTS (Sự kiện nổi bật, không có slug)
    console.log('\n📅 [2/7] Đang tạo dữ liệu mẫu cho bảng Events...');
    const eventsData = [
      {
        id: 1,
        name: 'Hành trình lần 7',
        category: 'Tọa đàm chuyên sâu',
        event_date: new Date('2026-11-14T08:30:00'),
        location: 'Hội trường Di Sản SIHUB, 273 Điện Biên Phủ, Quận 3, TP.HCM',
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAk9UadPB6Ai1dAdE5R0qsQCARUuFoxFXYN5lYL6e7giPVY2rL4L2QIb44QNIzDGrUEI-Sh_TwXJsJW_9CP3KNnJMrfz0Nj5GOrzkbjGLU-KeG3vzzgpln6w3jlB_Rw02IeaF-Bc_o22kuepOM8h4sGLJHLOVeM1cSrduIChr772u0YXzIIyTdTXlp62DlBD6PdZaLfFWx2ELqdJ2HmEtuvZWmT3heQFFwc2n8LHxDI',
        description:
          'Chuyên đề: Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số.',
        content:
          'Nội dung chính: Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.\n' +
          'Đối tượng: Nghệ sĩ, nghệ nhân, nhà nghiên cứu, trường đại học, doanh nghiệp sáng tạo, đơn vị công nghệ và công chúng yêu mỹ thuật.\n' +
          'Kết quả kỳ vọng: Tư liệu hóa tri thức, hình thành đề xuất hợp tác thực chất và bổ sung hệ dữ liệu cho Kỷ yếu 100 năm.',
        status: 'upcoming',
        is_featured: true,
        sort_order: 1,
      },
      {
        id: 2,
        name: 'Chuỗi hoạt động tại Saigon Innovation Hub',
        category: 'Workshop – Open Studio',
        event_date: new Date('2026-05-27T09:00:00'),
        location: 'Saigon Innovation Hub (SIHUB), TP.HCM',
        description:
          'Nền móng kết nối liên ngành: Lab – Studio – Showcase – Market.',
        content:
          'Nội dung chính: Kết nối triển lãm, tọa đàm, trình diễn sáng tác và đối thoại chuyên môn đa phương.\n' +
          'Đối tượng: Các nhà nghiên cứu, nghệ nhân di sản, kiến trúc sư, sinh viên và doanh nghiệp.\n' +
          'Kết quả kỳ vọng: Xây dựng không gian thử nghiệm sáng tạo và chuẩn hóa hồ sơ tư liệu lưu trữ.',
        status: 'completed',
        is_featured: false,
        sort_order: 2,
      },
      {
        id: 3,
        name: 'Đại Triển Lãm Bách Niên: 100 Năm Dòng Chảy Sơn Mài Hội Họa',
        category: 'Đại triển lãm',
        event_date: new Date('2026-12-05T09:00:00'),
        location: 'Bảo tàng Mỹ thuật TP. Hồ Chí Minh',
        description:
          'Không gian trưng bày tuyệt tác sơn mài qua các thời kỳ lịch sử từ Trường Mỹ thuật Đông Dương đến đương đại.',
        content:
          'Nội dung chính: Trưng bày các tác phẩm quý hiếm, ứng dụng công nghệ ánh sáng bảo tàng quốc tế và bảo chứng số NFT nguyên bản cho từng tác phẩm.\n' +
          'Đối tượng: Học giả, công chúng yêu nghệ thuật, các nhà sưu tập và du khách quốc tế.\n' +
          'Kết quả kỳ vọng: Xác lập vị thế di sản nghệ thuật đỉnh cao của sơn mài Việt Nam trên trường quốc tế.',
        status: 'upcoming',
        is_featured: true,
        sort_order: 3,
      },
    ];

    for (const evt of eventsData) {
      await Event.upsert(evt);
    }
    console.log(`✅ Đã nạp thành công ${eventsData.length} sự kiện vào bảng events.`);

    // 4. DỮ LIỆU MẪU: BẢNG COLLECTIONS & ARTWORKS (Không chứa slug)
    console.log('\n🎨 [3/7] Đang tạo dữ liệu mẫu cho Collections & Artworks...');
    const collectionsData = [
      {
        id: 1,
        name: 'Cửu Cửu – Mạch Ngầm Tinh Hoa',
        code: 'CUU-CUU',
        description:
          'Bộ sưu tập 99 đĩa sơn mài khai thác hệ hoa văn trống đồng như một mạch ký ức xuyên suốt. Mỗi tác phẩm là một cách diễn giải độc lập; khi đặt cạnh nhau, 99 bề mặt tạo thành trường đối thoại giữa biểu tượng cổ và ngôn ngữ đương đại.',
        cover_image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBzn3gGKOtd04V_bHywnZQHLzqggz0F4qIQUbpj0oRjQe467xTVyQ6US9jkaUkofml9Lpj2SvyifhAKBqvE0RluAfP0Ri5Z2m7zvGsJRAMDRli5Et9cab5FKpqmMFMwle2qEPmI0Vk3AX5UhEJcJGRzcKvhfnNabZ_yEVf3sjXBYosgNtPloQxmCslYNxYRQ6jNqDfWZh97n4hYktijxcPlNt6bElNGvnWBPHcz1FZH',
        sort_order: 1,
        status: 'active',
      },
      {
        id: 2,
        name: 'Bách Thụ Đồng Tâm Viên',
        code: 'BACH-THU',
        description:
          'Chuỗi tác phẩm biểu tượng cho sự trường tồn và gắn kết của các thế hệ nghệ sĩ và nghệ nhân di sản Việt Nam.',
        cover_image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD7kmynYQYLLAUi40X00ZQ3J562jqYN5vyRUwOBRM2DE7C0mL8Wqh6UvCblnl0HBlCclJ0Ndgu96idZa778gsEl4FIOHbS205rGPTZe-8OjvIpJCacEF5PrZuSckAFRl3qkLUBYfpiRztD-9w1Uy6mCwOCe1yGSMx_LxW7B0_d2C1sBrWI7rklcCcDtm1PLDgTAUthL25-veXMMkPriRW8rGlYbv5KW2IB1LiR8vXtp',
        sort_order: 2,
        status: 'active',
      },
      {
        id: 3,
        name: 'Du Lãm Cõi Vô Cùng',
        code: 'DU-LAM',
        description:
          'Hành trình thể nghiệm tư duy trừu tượng trên nền chất liệu then sâu thẳm kết hợp bạc rắc và vàng quỳ 9999.',
        cover_image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLZ-yMyYhURH2EX2BLjuyf8RhhHSV4qTr1uoCo4AUhd1kVIbQ1fGiCeeFEDjy57JKr4kWEtauoLhsYmwdkzHWhdKRn3IXCOOBkEFH-IVMBQ02kv9PahRMAUBszCUfmfy3UqahHgdFgRNoYKewKPAgNvzpq6ZjWk9HapDweqoh9i5XdcPy4IsXWqzq1-YrFEsmYix9RjA1yToex8gBaPGjFy4t_h4lhqOnjl9gYzWu',
        sort_order: 3,
        status: 'active',
      },
    ];

    for (const col of collectionsData) {
      await Collection.upsert(col);
    }

    const artworksData = [
      {
        id: 1,
        collection_id: 1,
        title: 'Đĩa Tròn Sơn Mài Cửu Cửu Họa Tiết Trống Đồng (CC-01)',
        artist: 'Nghệ nhân Tiêu biểu & Giám tuyển Di sản',
        year: '2026',
        dimensions: 'Đường kính Ø 45 cm',
        material:
          'Vóc truyền thống, sơn then, sơn cánh gián, vàng quỳ 9999, bạc thếp và vỏ trứng mài lộ',
        image_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBzn3gGKOtd04V_bHywnZQHLzqggz0F4qIQUbpj0oRjQe467xTVyQ6US9jkaUkofml9Lpj2SvyifhAKBqvE0RluAfP0Ri5Z2m7zvGsJRAMDRli5Et9cab5FKpqmMFMwle2qEPmI0Vk3AX5UhEJcJGRzcKvhfnNabZ_yEVf3sjXBYosgNtPloQxmCslYNxYRQ6jNqDfWZh97n4hYktijxcPlNt6bElNGvnWBPHcz1FZH',
        description:
          'Tác phẩm đại diện mở đầu bộ sưu tập 99 tác phẩm xác lập kỷ lục Việt Nam của Viện Kỷ Lục VietKings.',
        is_featured: true,
        sort_order: 1,
      },
      {
        id: 2,
        collection_id: 2,
        title: 'Bách Thụ Trường Xuân',
        artist: 'Nhóm Nghệ Sĩ Trẻ & Làng Nghề Hạ Thái',
        year: '2025',
        dimensions: '120 x 240 cm',
        material: 'Sơn ta tự nhiên Phú Thọ, vóc gỗ dổi, khảm vỏ trai',
        image_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD7kmynYQYLLAUi40X00ZQ3J562jqYN5vyRUwOBRM2DE7C0mL8Wqh6UvCblnl0HBlCclJ0Ndgu96idZa778gsEl4FIOHbS205rGPTZe-8OjvIpJCacEF5PrZuSckAFRl3qkLUBYfpiRztD-9w1Uy6mCwOCe1yGSMx_LxW7B0_d2C1sBrWI7rklcCcDtm1PLDgTAUthL25-veXMMkPriRW8rGlYbv5KW2IB1LiR8vXtp',
        description:
          'Hình tượng cổ thụ nghìn năm vững chãi biểu trưng cho tinh thần cội nguồn và lòng kiên định giữ nghề.',
        is_featured: true,
        sort_order: 2,
      },
      {
        id: 3,
        collection_id: 3,
        title: 'Vô Cực Dạ Hành',
        artist: 'Giám tuyển Độc Lập',
        year: '2026',
        dimensions: '100 x 100 cm',
        material: 'Then cội, bạc rắc đa tầng, bột chu sa tự nhiên',
        image_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLZ-yMyYhURH2EX2BLjuyf8RhhHSV4qTr1uoCo4AUhd1kVIbQ1fGiCeeFEDjy57JKr4kWEtauoLhsYmwdkzHWhdKRn3IXCOOBkEFH-IVMBQ02kv9PahRMAUBszCUfmfy3UqahHgdFgRNoYKewKPAgNvzpq6ZjWk9HapDweqoh9i5XdcPy4IsXWqzq1-YrFEsmYix9RjA1yToex8gBaPGjFy4t_h4lhqOnjl9gYzWu',
        description:
          'Chiều sâu huyền ảo của đêm tối mở ra qua hàng chục lớp mài nước miệt mài.',
        is_featured: true,
        sort_order: 3,
      },
    ];

    for (const art of artworksData) {
      await Artwork.upsert(art);
    }
    console.log(
      `✅ Đã nạp thành công ${collectionsData.length} bộ sưu tập và ${artworksData.length} tác phẩm mẫu.`
    );

    // 5. DỮ LIỆU MẪU: BẢNG NEWS ARTICLES (6 bài báo học thuật chuẩn từ frontend)
    console.log('\n📰 [4/7] Đang tạo dữ liệu mẫu cho News Articles...');
    const newsData = [
      {
        id: 1,
        title:
          'Từ hội họa sơn mài đến sơn mài hội họa: Vì sao một cách gọi có thể mở ra cả một hệ tư duy?',
        category: 'Dòng chảy 100 năm',
        author: 'Ban Học Thuật',
        published_date: new Date('2025-10-15'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDLII_JrLQ84STKhOfcm5xHYeQLCT0so1Vr1C2TfO0Nwqx7aQDf2DecFBcc9EzEd0WUq_zvST_ULERllNAKbwqTpaKezvqA_CjZ3m1c2IPYVDFI1N_5C8k-XQfUTglcGdyg8C2c4c9oxgJ56TE41A_F-h-YIHJFmDmeMWh9tSgH1CU81Ax0a4km8mUiK-KNy_yShZXP4Dqa3h-fjP6L7sXw83yzGLhFIpAsucyRT7nL',
        lead_quote:
          'Một chuyển dịch ngôn ngữ học thuật mang tầm vóc định hình bản sắc thế kỷ.',
        summary:
          'Giải thích sự chuyển dịch từ chất liệu và trường phái biểu đạt đơn thuần sang một ngôn ngữ hội họa độc lập có cấu trúc tư duy và bản sắc riêng biệt.',
        content:
          'Nghệ thuật sơn mài Việt Nam không đơn thuần là một kỹ thuật phủ chất liệu; nó là một triết lý thị giác mang tính bản thể. Trải qua một thế kỷ hình thành và thử thách, sự chuyển dịch cách gọi từ "hội họa sơn mài" sang "sơn mài hội họa" khẳng định vị thế bình đẳng của chất liệu phương Đông với sơn dầu phương Tây.',
        read_time: '7 phút đọc',
        tags: 'học thuật, lịch sử, mỹ thuật đông dương',
        status: 'published',
        is_featured: true,
        views_count: 1420,
      },
      {
        id: 2,
        title: 'Mài lộ: Khi hình ảnh không được vẽ lên mà được tìm thấy',
        category: 'Từ xưởng đến đời sống',
        author: 'Trần Nam Sơn',
        published_date: new Date('2025-10-18'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDcovcYwvq9C1e3BgE4cKA2fpp9AtwdlQLkwQEBqDn4u1dKIm61r4phdqTx5D_rPKMBU5HCmYBA4uh0Og09gwTW0uk9gzyxJ3QJRMDWKQPKFA6vhMoDcHesPKZq-VkgSdSqp0gzyvsOz_YKBHxLL9CaUrsJl8dx_h9Tp4hIQR7FBuBVU3rzM-5nJjAErHhXmkHQjMmFCyXaEpfoxSsNEsDfVIAVDUZpERIKL85w2Dzu',
        lead_quote: 'Bức tranh thực sự bắt đầu khi nghệ sĩ đặt giấy ráp xuống nước.',
        summary:
          'Kể câu chuyện kỹ thuật bằng ngôn ngữ gần gũi, nhấn mạnh quá trình tích tụ các tầng màu, che phủ bí mật, mài nước kiên nhẫn và đánh thức ánh sáng nội tại.',
        content:
          'Trong hội họa giá vẽ thông thường, người họa sĩ đưa thêm nét cọ lên toan. Nhưng trong nghệ thuật sơn mài, người nghệ sĩ lại mài đi để tìm kiếm hình hài bị che khuất dưới những tầng then và son. Đó là cuộc đối thoại kỳ diệu giữa ánh sáng và sự kiên nhẫn.',
        read_time: '5 phút đọc',
        tags: 'kỹ thuật mài, xưởng nghề, nghệ nhân',
        status: 'published',
        is_featured: false,
        views_count: 980,
      },
      {
        id: 3,
        title: 'Làng nghề trong kỷ nguyên mới: Giữ nghề bằng cách nào ngoài việc bán sản phẩm?',
        category: 'Người giữ lửa',
        author: 'Nhóm Ký Sự Nghề',
        published_date: new Date('2025-10-22'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDQjTdpWXG3-R6WU3I53zLPoqO2NVvc5uAgL2Bg6AB69tOFmr5YNY-6_TLetPGknw31B96z7T2PgeZCotZQhJ3G-W8zCfQGwJywNTBSq0mYWUCgBy_O3JWCEzZnXfQxK6RalmnZ5lXffwodwO6AU66VkuUBNOAGGuY6V2NnPKEzM4_aodDY8RfrasFgiOzsHV3cJEjS1Ji6AbCFRCc9xcjZH5NqTHi5HYEvBO-cDp6n',
        lead_quote: 'Bảo tồn làng nghề không chỉ là duy trì một xưởng sản xuất, mà là giữ gìn một hệ sinh thái tri thức.',
        summary:
          'Đặt vấn đề cấp thiết về chuyển giao trải nghiệm, giáo dục di sản, xây dựng kho dữ liệu sống, bảo vệ chuỗi cung ứng vật liệu và hợp tác thiết kế liên ngành.',
        content:
          'Khi làng nghề chỉ chạy theo số lượng, cái hồn cốt tinh hoa dễ bị hao mòn. Dự án đề xuất mô hình du lịch di sản, bảo tồn nguồn cây sơn cội Phú Thọ và đào tạo thế hệ truyền nhân am hiểu cả mỹ thuật lẫn thị trường.',
        read_time: '9 phút đọc',
        tags: 'làng nghề hạ thái, sơn ta phú thọ, bảo tồn di sản',
        status: 'published',
        is_featured: false,
        views_count: 1150,
      },
      {
        id: 4,
        title: 'Sơn mài 2.0 có làm mất đi bản chất truyền thống?',
        category: 'Sơn mài 2.0',
        author: 'KTS. Hoàng Lê',
        published_date: new Date('2025-11-02'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBHOywacEpWcZwcKMV91dfhmPxOQ7n9pyOHMXyGZ03v67Y83LhsVF-XAZHPuq4gYihYktKMuYR_8inbqLq-j_W-G6xdXv5P1eVza9LNOtUIB7hEcLMqgc6yWCEJD20C03LttCx1raEF_JEG6yPye7ZSV5STuQVegSsz4_-bVySDJTCbkXe5MhoUsJZR0QdzjNEoE1e13bQHsx6nB2crQ-JfH1_OO22srm4DmBG0d6pw',
        lead_quote: 'Công nghệ không thay thế bàn tay con người, mà trở thành chiếc cầu nối đưa nghệ thuật truyền thống ra thế giới.',
        summary:
          'Đối thoại cân bằng và sâu sắc giữa lõi giá trị bất biến của kỹ thuật truyền thống với khả năng ứng dụng công nghệ số, vật liệu mới và tư duy đương đại.',
        content:
          'Bảo tồn không đồng nghĩa với đóng băng trong quá khứ. Việc ứng dụng công nghệ số hóa 3D, định danh nguyên bản và vật liệu mới chính là cách tiếp sức cho ngọn lửa nghệ thuật bách niên.',
        read_time: '6 phút đọc',
        tags: 'sơn mài 2.0, công nghệ, sáng tạo số',
        status: 'published',
        is_featured: false,
        views_count: 870,
      },
      {
        id: 5,
        title: 'Cửu Cửu – Mạch Ngầm Tinh Hoa: 99 cách lắng nghe tiếng vọng trống đồng',
        category: 'Nhật ký Hành trình',
        author: 'Ban Sáng Tạo',
        published_date: new Date('2025-11-10'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBArrmK-tVFPyuS0Csw0ePrIVnRVkojyV9uF9cFaPX21JxFl9bheGFts1t2OAOb2iJqcrm9lf5YCUzKeWKRq5hwZpiITveVdEygt9l0rM_SGg54TtJC-ye-vkEuxEZNXPexqBZrnZZLbNjlsunaelPMTwZKe2VaDVd8r3BHUqU9dulD_q4u6kNZlEqC9c2u4K-pf2j8ohSdBrlNSPlJqZrzx-bDIiUCUPTWiMwfjTC9',
        lead_quote: 'Mỗi chiếc đĩa là một nốt nhạc trong bản giao hưởng bách niên của dân tộc.',
        summary:
          'Giới thiệu ý niệm sâu thẳm, hành trình sáng tạo công phu và cấu trúc 99 tác phẩm độc bản kết nối hào khí nghìn năm của tổ tiên vào hơi thở thế kỷ 21.',
        content:
          '99 chiếc đĩa sơn mài không chỉ là 99 hiện vật, mà là 99 cuộc đối thoại trực diện giữa nghệ thuật trống đồng Đông Sơn và thẩm mỹ tạo hình hôm nay.',
        read_time: '11 phút đọc',
        tags: 'cửu cửu, trống đồng, kỷ lục',
        status: 'published',
        is_featured: true,
        views_count: 2100,
      },
      {
        id: 6,
        title: 'Từ sự kiện đến hồ sơ di sản: Vì sao mỗi hoạt động cần để lại dữ liệu?',
        category: 'Góc nhìn quốc tế',
        author: 'VietKings & Ban Dữ Liệu',
        published_date: new Date('2025-11-15'),
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB62i3oV8Kp0OFr9QQqxPX0kCSbjdi2qEZ_7zxjUrRUMbOLbmDzON87obL-WlcxdXaWDkdTu0Mere1j5tvmLIwXAIsGE4_-1q2Bl-ImBDj7lHVub0UuexGs89aVeNNOdUlzQFkqJYr6efWUMLjdwJDrub06oPCoOwUAPXq_8awo0D2nkGAlQ9oIzg4jhVILx_DvnWDMWIg-PnTxx8DBrcJpoA9QrzqkzR6S5md5I7',
        lead_quote: 'Dữ liệu chuẩn hóa hôm nay là di sản được bảo tồn cho thế hệ trăm năm sau.',
        summary:
          'Giải thích tường minh vai trò của kỷ yếu chuẩn quốc tế, mã định danh số, bảo vệ quyền sở hữu trí tuệ và chuẩn mực lưu trữ lâu dài cho mỹ thuật nước nhà.',
        content:
          'Các cuộc triển lãm nếu chỉ kết thúc bằng những tràng vỗ tay thì sau vài năm sẽ chìm vào quên lãng. Hành trình 100 năm quyết tâm văn bản hóa và số hóa toàn bộ tư liệu thành Kỷ yếu Bách Niên lưu trữ vĩnh viễn.',
        read_time: '8 phút đọc',
        tags: 'hồ sơ di sản, kỷ yếu, dữ liệu số',
        status: 'published',
        is_featured: false,
        views_count: 1340,
      },
    ];

    for (const art of newsData) {
      await NewsArticle.upsert(art);
    }
    console.log(`✅ Đã nạp thành công ${newsData.length} bài viết vào bảng news_articles.`);

    // 6. DỮ LIỆU MẪU: BẢNG SITE_SETTINGS & MENUS
    console.log('\n⚙️ [5/7] Đang tạo dữ liệu mẫu cho Site Settings & Menus...');
    const brandData = {
      siteName: 'Hành Trình 100 Năm Sơn Mài Hội Họa Việt Nam',
      tagline: 'Tôn Vinh Di Sản — Kiến Tạo Kỷ Nguyên',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDRIW42qxKqqO8mE8JBoRSPJw3dMADLcoV4pAVEUfHycZibaoqtZV1AUf1mJilGhMmjBGbcD73MJB2WdRtCa9h1FcmnPFm76WT1z3DRpoQr0M598MUhsR8BknD2KLsg8wJRh5uyP0WO63s97mInG9wSUzszrjWNr_ZVj2QJExjYeykmXsAZL6Cngd7iEQeTDcXfu4oxzwVf6uJHxcWPVHAPn8JG814YEu9ZrGFyp2mny4_5TjVV_GdWWAqNCgj-mENrpz0',
      faviconUrl: '/favicon.ico',
      footerCopyright:
        '© 1930 - 2030 Hành Trình 100 Năm Sơn Mài Hội Họa Việt Nam. All Rights Reserved.',
      footerDescription:
        'Chương trình bảo tồn và vinh danh nghệ thuật sơn mài hội họa bác học Việt Nam, kết nối nghệ nhân, giới giám tuyển và các định chế nghệ thuật toàn cầu.',
    };

    const contactData = {
      hotline: '(+84) 28 3822 8888',
      email: 'bandoehanh@sonmaivietnam100nam.vn',
      address: '273 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
      officeHours: 'Thứ Hai - Thứ Bảy: 08:30 - 17:30',
    };

    const socialData = {
      facebook: 'https://facebook.com/sonmaivietnam100',
      youtube: 'https://youtube.com/@sonmaivietnam100',
      instagram: 'https://instagram.com/sonmai_vietnam_art',
      linkedin: 'https://linkedin.com/company/vietnam-lacquer-art',
    };

    await SiteSetting.upsert({
      setting_key: 'brand',
      setting_value: brandData,
      description: 'Thông tin thương hiệu, logo, chân trang',
    });

    await SiteSetting.upsert({
      setting_key: 'contact',
      setting_value: contactData,
      description: 'Đường dây nóng, email, địa chỉ',
    });

    await SiteSetting.upsert({
      setting_key: 'social',
      setting_value: socialData,
      description: 'Liên kết mạng xã hội chính thức',
    });

    await SiteSetting.upsert({
      setting_key: 'event_categories',
      setting_value: [
        'Tất cả',
        'Tọa đàm – Hội thảo',
        'Triển lãm',
        'Workshop – Open Studio',
        'Kỷ lục – Vinh danh',
        'Giáo dục – Cộng đồng',
        'Đã diễn ra',
      ],
      description: 'Danh sách các thể loại sự kiện hiển thị trên website',
    });

    // Menu chính điều hướng website
    const mainMenuNav = [
      { id: 'home', name: 'Trang chủ', slug: '/', is_visible: true },
      { id: 'about', name: 'Giới thiệu', slug: '/about', is_visible: true },
      { id: 'journey', name: 'Hành trình', slug: '/journey', is_visible: true },
      { id: 'events', name: 'Sự kiện', slug: '/events', is_visible: true },
      { id: 'collection', name: 'Bộ sưu tập', slug: '/collection', is_visible: true },
      { id: 'archive', name: 'Kỷ yếu', slug: '/archive', is_visible: true },
      { id: 'leadership', name: 'Ban điều hành', slug: '/leadership', is_visible: true },
      { id: 'news', name: 'Tin tức', slug: '/news', is_visible: true },
      { id: 'contact', name: 'Liên hệ', slug: '/contact', is_visible: true },
    ];

    await Menu.upsert({
      menu_key: 'main',
      name: 'Menu Chính Website',
      items_json: mainMenuNav,
    });
    console.log('✅ Đã nạp thành công Site Settings và Menu chính.');

    // 7. DỮ LIỆU MẪU: BẢNG FORM SUBMISSIONS
    console.log('\n📝 [6/7] Đang tạo dữ liệu mẫu cho Form Submissions...');
    const formsData = [
      {
        id: 1,
        form_type: 'nomination',
        full_name: 'Trần Đình Quang',
        email: 'quang.art@gmail.com',
        phone: '0912 345 678',
        organization: 'Hội Mỹ Thuật TP. Hồ Chí Minh',
        subject: 'Đề cử Tác phẩm Sơn Mài Khổ Lớn Bách Niên',
        message:
          'Kính gửi Ban Điều Hành Hành Trình 100 Năm, chúng tôi xin gửi hồ sơ đề cử bộ tranh sơn mài then cổ truyền xác lập kỷ lục Việt Nam theo chuẩn VietKings.',
        status: 'processing',
        reference_code: '#SMVN-2026-9021',
        admin_notes: 'Đã nhận hồ sơ bản thảo, đang chờ thẩm định Hội đồng cố vấn',
      },
      {
        id: 2,
        form_type: 'partnership',
        full_name: 'Nguyễn Thị Mai',
        email: 'mai.nguyen@sihub.vn',
        phone: '0988 776 543',
        organization: 'SIHUB Hub Khởi Nghiệp Đổi Mới Sáng Tạo',
        subject: 'Đề xuất phối hợp tổ chức Đại Hội Thảo & Không Gian Giám Tuyển',
        message:
          'SIHUB mong muốn đồng hành bảo trợ địa điểm và kết nối các doanh nghiệp công nghệ số hóa tác phẩm nghệ thuật.',
        status: 'completed',
        reference_code: '#SMVN-2026-4432',
        admin_notes: 'Đã duyệt biên bản ghi nhớ hợp tác địa điểm tổ chức',
      },
      {
        id: 3,
        form_type: 'contact',
        full_name: 'Lê Hoàng Nam',
        email: 'nam.lehoang@gmail.com',
        phone: '0903 112 233',
        organization: 'Nhà Sưu Tập Nghệ Thuật Độc Lập',
        subject: 'Đăng ký tham dự Đại Hội Thảo lần thứ 7',
        message:
          'Tôi xin đăng ký 02 vé đại biểu khách mời tham gia phiên chuyên đề đối thoại bàn tròn sáng tạo số.',
        status: 'new',
        reference_code: '#SMVN-2026-1188',
        admin_notes: 'Chờ gửi thư mời qua email',
      },
    ];

    for (const form of formsData) {
      await FormSubmission.upsert(form);
    }
    console.log(`✅ Đã nạp thành công ${formsData.length} biểu mẫu vào bảng form_submissions.`);

    console.log('\n======================================================');
    console.log('✨ [HOÀN TẤT] Seed dữ liệu mẫu vào cơ sở dữ liệu thành công 100%!');
    console.log('======================================================\n');
  } catch (error) {
    console.error('❌ Lỗi khi thực hiện seed dữ liệu mẫu:', error);
  } finally {
    process.exit(0);
  }
}

// Thực thi seed script
runSeed();
