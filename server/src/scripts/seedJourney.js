/**
 * Script seed dữ liệu chuẩn cho trang Hành Trình (/journey)
 * Dựa trên cấu trúc thiết kế mỹ thuật & nội dung bách niên khởi sắc
 */
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { sequelize, Page } = require('../models/baseModel');

const JOURNEY_PAGE_DATA = {
  name: 'Hành trình',
  slug: '/journey',
  props: {
    // PHẦN 1: HERO BANNER
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

    // PHẦN 2: DÒNG THỜI GIAN LỊCH SỬ & TƯƠNG LAI (TIMELINE)
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

    // PHẦN 3: TRÍCH DẪN TRỌNG TÂM (KEY QUOTE BANNER)
    key_quote:
      '“Năm 2030 không khép lại hành trình; đó là lúc di sản được trao cho tương lai với một cấu trúc mạnh hơn.”',

    // PHẦN 4: CHUỖI CHUYÊN ĐỀ & CHUYÊN ĐỀ ĐẶC BIỆT LẦN 7
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

    // PHẦN 5: KHUNG KÊU GỌI ĐỒNG HÀNH (CTA BANNER)
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
};

async function seedJourney() {
  try {
    await sequelize.authenticate();
    console.log('✓ Kết nối cơ sở dữ liệu MySQL thành công.');

    let page = await Page.findOne({ where: { slug: '/journey' } });
    if (!page) {
      page = await Page.create(JOURNEY_PAGE_DATA);
      console.log('✓ Đã tạo mới trang /journey trong bảng pages.');
    } else {
      page.name = JOURNEY_PAGE_DATA.name;
      page.props = JOURNEY_PAGE_DATA.props;
      await page.save();
      console.log('✓ Đã cập nhật thành công dữ liệu mẫu cho trang /journey trong bảng pages.');
    }

    console.log('Hoàn tất khởi tạo dữ liệu cho trang Hành trình!');
    process.exit(0);
  } catch (err) {
    console.error('Lỗi khởi tạo dữ liệu trang hành trình:', err.message);
    process.exit(1);
  }
}

seedJourney();

