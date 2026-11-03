import React from 'react';

const NewsGridSection = ({ activeCategory = 'Tất cả' }) => {
  const articles = [
    {
      id: 1,
      category: 'Dòng chảy 100 năm',
      badge: 'DÒNG CHẢY 100 NĂM',
      date: '15 Th10, 2025',
      author: 'Ban Học Thuật',
      readTime: '7 phút đọc',
      title: 'Từ hội họa sơn mài đến sơn mài hội họa: Vì sao một cách gọi có thể mở ra cả một hệ tư duy?',
      excerpt:
        'Giải thích sự chuyển dịch từ chất liệu và trường phái biểu đạt đơn thuần sang một ngôn ngữ hội họa độc lập có cấu trúc tư duy và bản sắc riêng biệt.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDLII_JrLQ84STKhOfcm5xHYeQLCT0so1Vr1C2TfO0Nwqx7aQDf2DecFBcc9EzEd0WUq_zvST_ULERllNAKbwqTpaKezvqA_CjZ3m1c2IPYVDFI1N_5C8k-XQfUTglcGdyg8C2c4c9oxgJ56TE41A_F-h-YIHJFmDmeMWh9tSgH1CU81Ax0a4km8mUiK-KNy_yShZXP4Dqa3h-fjP6L7sXw83yzGLhFIpAsucyRT7nL',
    },
    {
      id: 2,
      category: 'Từ xưởng đến đời sống',
      badge: 'TỪ XƯỞNG ĐẾN ĐỜI SỐNG',
      date: '18 Th10, 2025',
      author: 'Trần Nam Sơn',
      readTime: '5 phút đọc',
      title: 'Mài lộ: Khi hình ảnh không được vẽ lên mà được tìm thấy',
      excerpt:
        'Kể câu chuyện kỹ thuật bằng ngôn ngữ gần gũi, nhấn mạnh quá trình tích tụ các tầng màu, che phủ bí mật, mài nước kiên nhẫn và đánh thức ánh sáng nội tại.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDcovcYwvq9C1e3BgE4cKA2fpp9AtwdlQLkwQEBqDn4u1dKIm61r4phdqTx5D_rPKMBU5HCmYBA4uh0Og09gwTW0uk9gzyxJ3QJRMDWKQPKFA6vhMoDcHesPKZq-VkgSdSqp0gzyvsOz_YKBHxLL9CaUrsJl8dx_h9Tp4hIQR7FBuBVU3rzM-5nJjAErHhXmkHQjMmFCyXaEpfoxSsNEsDfVIAVDUZpERIKL85w2Dzu',
    },
    {
      id: 3,
      category: 'Người giữ lửa',
      badge: 'NGƯỜI GIỮ LỬA',
      date: '22 Th10, 2025',
      author: 'Nhóm Ký Sự Nghề',
      readTime: '9 phút đọc',
      title: 'Làng nghề trong kỷ nguyên mới: Giữ nghề bằng cách nào ngoài việc bán sản phẩm?',
      excerpt:
        'Đặt vấn đề cấp thiết về chuyển giao trải nghiệm, giáo dục di sản, xây dựng kho dữ liệu sống, bảo vệ chuỗi cung ứng vật liệu và hợp tác thiết kế liên ngành.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQjTdpWXG3-R6WU3I53zLPoqO2NVvc5uAgL2Bg6AB69tOFmr5YNY-6_TLetPGknw31B96z7T2PgeZCotZQhJ3G-W8zCfQGwJywNTBSq0mYWUCgBy_O3JWCEzZnXfQxK6RalmnZ5lXffwodwO6AU66VkuUBNOAGGuY6V2NnPKEzM4_aodDY8RfrasFgiOzsHV3cJEjS1Ji6AbCFRCc9xcjZH5NqTHi5HYEvBO-cDp6n',
    },
    {
      id: 4,
      category: 'Sơn mài 2.0',
      badge: 'SƠN MÀI 2.0',
      date: '02 Th11, 2025',
      author: 'KTS. Hoàng Lê',
      readTime: '6 phút đọc',
      title: 'Sơn mài 2.0 có làm mất đi bản chất truyền thống?',
      excerpt:
        'Đối thoại cân bằng và sâu sắc giữa lõi giá trị bất biến của kỹ thuật truyền thống với khả năng ứng dụng công nghệ số, vật liệu mới và tư duy đương đại.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBHOywacEpWcZwcKMV91dfhmPxOQ7n9pyOHMXyGZ03v67Y83LhsVF-XAZHPuq4gYihYktKMuYR_8inbqLq-j_W-G6xdXv5P1eVza9LNOtUIB7hEcLMqgc6yWCEJD20C03LttCx1raEF_JEG6yPye7ZSV5STuQVegSsz4_-bVySDJTCbkXe5MhoUsJZR0QdzjNEoE1e13bQHsx6nB2crQ-JfH1_OO22srm4DmBG0d6pw',
    },
    {
      id: 5,
      category: 'Nhật ký Hành trình',
      badge: 'NHẬT KÝ HÀNH TRÌNH',
      date: '10 Th11, 2025',
      author: 'Ban Sáng Tạo',
      readTime: '11 phút đọc',
      title: 'Cửu Cửu – Mạch Ngầm Tinh Hoa: 99 cách lắng nghe tiếng vọng trống đồng',
      excerpt:
        'Giới thiệu ý niệm sâu thẳm, hành trình sáng tạo công phu và cấu trúc 99 tác phẩm độc bản kết nối hào khí nghìn năm của tổ tiên vào hơi thở thế kỷ 21.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBArrmK-tVFPyuS0Csw0ePrIVnRVkojyV9uF9cFaPX21JxFl9bheGFts1t2OAOb2iJqcrm9lf5YCUzKeWKRq5hwZpiITveVdEygt9l0rM_SGg54TtJC-ye-vkEuxEZNXPexqBZrnZZLbNjlsunaelPMTwZKe2VaDVd8r3BHUqU9dulD_q4u6kNZlEqC9c2u4K-pf2j8ohSdBrlNSPlJqZrzx-bDIiUCUPTWiMwfjTC9',
    },
    {
      id: 6,
      category: 'Góc nhìn quốc tế',
      badge: 'GÓC NHÌN QUỐC TẾ',
      date: '15 Th11, 2025',
      author: 'VietKings & Ban Dữ Liệu',
      readTime: '8 phút đọc',
      title: 'Từ sự kiện đến hồ sơ di sản: Vì sao mỗi hoạt động cần để lại dữ liệu?',
      excerpt:
        'Giải thích tường minh vai trò của kỷ yếu chuẩn quốc tế, mã định danh số, bảo vệ quyền sở hữu trí tuệ và chuẩn mực lưu trữ lâu dài cho mỹ thuật nước nhà.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB62i3oV8Kp0OFr9QQqxPX0kCSbjdi2qEZ_7zxjUrRUMbOLbmDzON87obL-WlcxdXaWDkdTu0Mere1j5tvmLIwXAIsGE4_-1q2Bl-ImBDj7lHVub0UuexGs89aVeNNOdUlzQFkqJYr6efWUMLjdwJDrub06oPCoOwUAPXq_8awo0D2nkGAlQ9oIzg4jhVILx_DvnWDMWIg-PnTxx8DBrcJpoA9QrzqkzR6S5md5I7',
    },
  ];

  const filteredArticles =
    activeCategory === 'Tất cả'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-10 w-full mb-20 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 group"
            style={{
              background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.72) 0%, rgba(22, 6, 9, 0.9) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.32)',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 223, 115, 0.15)',
            }}
          >
            {/* Thumbnail Container */}
            <div className="relative w-full h-64 overflow-hidden bg-[#100203]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                src={article.image}
                alt={article.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160609] via-transparent to-transparent" />
              {/* Category Pill Badge */}
              <div className="absolute top-3.5 left-3.5">
                <span
                  className="px-3 py-1 rounded font-serif text-[12px] tracking-wider font-semibold shadow-md uppercase"
                  style={{
                    background: 'rgba(82, 21, 21, 0.85)',
                    color: '#FFDF73',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                  }}
                >
                  {article.badge}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6 gap-3.5 justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[12px] font-sans" style={{ color: 'rgba(232, 226, 216, 0.7)' }}>
                  <span className="material-symbols-outlined text-[15px]" style={{ color: '#D4AF37' }}>
                    calendar_today
                  </span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span style={{ color: '#d9c1bf' }}>{article.author}</span>
                </div>
                <h2
                  className="font-serif text-[22px] leading-snug font-bold transition-colors duration-300 group-hover:text-[#FFDF73]"
                  style={{ color: '#FAF7F2' }}
                >
                  {article.title}
                </h2>
                <p
                  className="font-body text-[15px] leading-[1.8] line-clamp-3 font-normal mt-1"
                  style={{ color: 'rgba(232, 226, 216, 0.85)' }}
                >
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[rgba(212,175,55,0.15)] mt-1">
                <a
                  className="inline-flex items-center gap-1.5 font-serif text-[13px] uppercase tracking-wider transition-colors font-bold hover:underline cursor-pointer"
                  href="#single-article-template"
                  style={{ color: '#FFDF73' }}
                >
                  <span>ĐỌC BÀI VIẾT</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
                <span className="text-[12px] font-sans" style={{ color: 'rgba(232, 226, 216, 0.6)' }}>
                  {article.readTime}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsGridSection;
export { NewsGridSection };

