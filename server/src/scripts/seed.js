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
          badge: '1930 • 2030 • BÁCH NIÊN KHỞI SẮC',
          headline: 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM',
          subtitle: 'Bản Sắc Hội Họa & Di Sản Nghệ Thuật',
          quote: 'Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.',
          heritage_story: {
            headline: 'Một thế kỷ — Một hành trình đang tiếp diễn',
            callout: 'Không chỉ để xã hội xem. Để xã hội cùng làm.',
          },
          pillars: [
            { id: 1, title: 'Cộng đồng sáng tạo', desc: 'Kết nối thế hệ nghệ sĩ trẻ cùng nghệ nhân lão thành.' },
            { id: 2, title: 'Công nghiệp văn hóa', desc: 'Chuyển hóa chất liệu truyền thống vào đời sống hiện đại.' },
            { id: 3, title: 'Kinh tế di sản', desc: 'Định vị giá trị tác phẩm sơn mài trên thị trường nghệ thuật quốc tế.' },
            { id: 4, title: 'Đổi mới vật liệu', desc: 'Nghiên cứu ứng dụng sơn then, vàng quỳ và vỏ trứng trên cấu trúc mới.' },
          ],
          pipeline: {
            step1: 'LAB (Nghiên cứu & Thể nghiệm)',
            step2: 'STUDIO (Đồng hành nghệ nhân & họa sĩ)',
            step3: 'SHOWCASE (Trưng bày & Giám tuyển)',
            step4: 'MARKET (Thương mại hóa di sản)',
          },
        },
      },
      {
        id: 2,
        name: 'Giới thiệu',
        slug: '/about',
        props: {
          badge: '1930 • 2030 — BÁCH NIÊN KHỞI SẮC',
          headline: 'TỪ DI SẢN ĐẾN HẠ TẦNG SÁNG TẠO',
          story_headline: 'Vì sao Hành trình được hình thành?',
          story_quote:
            'Nối liền đứt gãy giữa hàn lâm và làng nghề — Biến di sản tĩnh tại thành tài nguyên sống động.',
          mission: 'Kích hoạt giá trị sống của sơn mài hội họa Việt Nam trong thế kỷ mới',
          vision: 'Một hệ sinh thái có khả năng tự vận hành, bảo tồn và lan tỏa tầm vóc quốc tế',
          principles: [
            'Bản chất trước hình thức',
            'Đồng kiến tạo thay vì độc quyền diễn giải',
            'Giá trị dài hạn thay vì hiệu ứng sự kiện',
          ],
          communities: [
            'Nghệ sĩ & Làng nghề truyền thống',
            'Học giả, Nhà giám tuyển & Viện trường',
            'Doanh nghiệp sáng tạo & Kiến trúc sư',
            'Tổ chức văn hóa & Viện Kỷ Lục Việt Nam (VietKings)',
            'Công chúng & Thế hệ kế cận',
          ],
        },
      },
      {
        id: 3,
        name: 'Hành trình',
        slug: '/journey',
        props: {
          badge: 'DÒNG CHẢY BÁCH NIÊN (1930–2030)',
          headline: 'DÒNG CHẢY BÁCH NIÊN KHỞI SẮC',
          description:
            'Một thế kỷ chuyển mình của nghệ thuật sơn then truyền thống đến ngôn ngữ tạo hình bác học quốc tế.',
          milestones: [
            {
              era: '1930–1945',
              title: 'Khai sinh hội họa sơn mài',
              desc: 'Các danh họa Trường Mỹ thuật Đông Dương đưa chất liệu sơn ta thủ công lên tầm mỹ thuật hàn lâm.',
            },
            {
              era: '1945–1975',
              title: 'Sơn mài kháng chiến & Hiện thực',
              desc: 'Giai đoạn tôi luyện bút pháp hiện thực hào hùng gắn liền với vận mệnh lịch sử dân tộc.',
            },
            {
              era: '1975–2000',
              title: 'Đổi mới & Thể nghiệm ngôn ngữ',
              desc: 'Khai phá các biểu đạt trừu tượng, tìm tòi chất liệu mới và từng bước vươn ra các gallery quốc tế.',
            },
            {
              era: '2026–2030',
              title: 'Kỷ nguyên số & Kinh tế di sản',
              desc: 'Xác lập vị thế di sản quốc gia, bảo chứng số nguyên bản và tổ chức chuỗi Đại lễ Bách Niên toàn quốc.',
            },
          ],
        },
      },
      {
        id: 4,
        name: 'Sự kiện',
        slug: '/events',
        props: {
          headline: 'Nơi di sản được thực hành, đối thoại và tái tạo',
          stats: {
            eventsCount: '12+ Kỳ sự kiện',
            attendees: '3,500+ Khách mời',
            artisans: '50+ Nghệ nhân & Học giả',
          },
          highlight_theme:
            'Đại Hội Thảo & Giám Tuyển: Kỷ Nguyên Đương Đại Của Sơn Mài Việt Nam',
          location: 'Hội trường Di Sản SIHUB, 273 Điện Biên Phủ, Quận 3, TP.HCM',
        },
      },
      {
        id: 5,
        name: 'Bộ sưu tập',
        slug: '/collection',
        props: {
          headline: 'Kho Tàng Kiệt Tác & Dòng Chảy Nghệ Thuật',
          subHeadline:
            'Những sáng tác độc bản kết hợp giữa kỹ nghệ truyền thống làng nghề Hạ Thái, nhựa sơn cội Phú Thọ và tư duy tạo hình hiện đại.',
          curatedSeries: [
            'Cửu Cửu – Mạch Ngầm Tinh Hoa',
            'Bách Thụ Đồng Tâm Viên',
            'Du Lãm Cõi Vô Cùng',
          ],
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
        name: 'Hành trình lần 7: Chuyên đề Công nghiệp văn hóa mỹ thuật sơn mài',
        category: 'Tọa đàm chuyên sâu',
        event_date: new Date('2026-11-14T08:30:00'),
        location: 'Hội trường Di Sản SIHUB, 273 Điện Biên Phủ, Quận 3, TP.HCM',
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAk9UadPB6Ai1dAdE5R0qsQCARUuFoxFXYN5lYL6e7giPVY2rL4L2QIb44QNIzDGrUEI-Sh_TwXJsJW_9CP3KNnJMrfz0Nj5GOrzkbjGLU-KeG3vzzgpln6w3jlB_Rw02IeaF-Bc_o22kuepOM8h4sGLJHLOVeM1cSrduIChr772u0YXzIIyTdTXlp62DlBD6PdZaLfFWx2ELqdJ2HmEtuvZWmT3heQFFwc2n8LHxDI',
        description:
          'Chuyên đề: Công nghiệp văn hóa mỹ thuật và thủ công mỹ nghệ sơn mài hội họa Việt Nam trong tương quan phát triển đồng bộ với nền tảng kinh tế số.',
        content:
          'Tham luận chuyên đề, đối thoại liên ngành, giới thiệu tác phẩm/dự án, đề cử – vinh danh và kết nối hợp tác sáng tạo.',
        status: 'upcoming',
        is_featured: true,
        sort_order: 1,
      },
      {
        id: 2,
        name: 'Đại Triển Lãm Bách Niên: 100 Năm Dòng Chảy Sơn Mài Hội Họa',
        category: 'Đại triển lãm',
        event_date: new Date('2026-12-05T09:00:00'),
        location: 'Bảo tàng Mỹ thuật TP. Hồ Chí Minh',
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBzn3gGKOtd04V_bHywnZQHLzqggz0F4qIQUbpj0oRjQe467xTVyQ6US9jkaUkofml9Lpj2SvyifhAKBqvE0RluAfP0Ri5Z2m7zvGsJRAMDRli5Et9cab5FKpqmMFMwle2qEPmI0Vk3AX5UhEJcJGRzcKvhfnNabZ_yEVf3sjXBYosgNtPloQxmCslYNxYRQ6jNqDfWZh97n4hYktijxcPlNt6bElNGvnWBPHcz1FZH',
        description:
          'Không gian trưng bày hơn 100 tuyệt tác sơn mài qua các thời kỳ lịch sử từ Trường Mỹ thuật Đông Dương đến đương đại.',
        content:
          'Trưng bày các tác phẩm quý hiếm, ứng dụng công nghệ ánh sáng bảo tàng quốc tế và bảo chứng số NFT nguyên bản cho từng tác phẩm.',
        status: 'upcoming',
        is_featured: true,
        sort_order: 2,
      },
      {
        id: 3,
        name: 'Workshop Trải Nghiệm Mài Lộ: Đánh Thức Ánh Sáng Của Then Và Vàng',
        category: 'Workshop',
        event_date: new Date('2026-10-20T14:00:00'),
        location: 'Không Gian Sáng Tạo Hạ Thái Hub',
        thumbnail_url:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDcovcYwvq9C1e3BgE4cKA2fpp9AtwdlQLkwQEBqDn4u1dKIm61r4phdqTx5D_rPKMBU5HCmYBA4uh0Og09gwTW0uk9gzyxJ3QJRMDWKQPKFA6vhMoDcHesPKZq-VkgSdSqp0gzyvsOz_YKBHxLL9CaUrsJl8dx_h9Tp4hIQR7FBuBVU3rzM-5nJjAErHhXmkHQjMmFCyXaEpfoxSsNEsDfVIAVDUZpERIKL85w2Dzu',
        description:
          'Thao tác trực tiếp cùng các nghệ nhân lão thành với kỹ thuật ủ then, thếp vàng quỳ và mài nước truyền thống.',
        content:
          'Trải nghiệm văn hóa thực cảnh cho các nhà nghiên cứu, kiến trúc sư và sinh viên mỹ thuật.',
        status: 'completed',
        is_featured: false,
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
