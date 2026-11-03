import React from 'react';

const LeadershipProjectTeamsSection = () => {
  const teams = [
    {
      num: '01',
      icon: 'menu_book',
      title: '01. Nội dung – học thuật',
      desc: 'Nghiên cứu, biên tập, diễn giả, kỷ yếu và hồ sơ chuyên đề.',
      tag: 'Học thuật & Xuất bản',
    },
    {
      num: '02',
      icon: 'museum',
      title: '02. Sáng tạo – triển lãm',
      desc: 'Tác phẩm, không gian, nghệ sĩ, nghệ nhân và trải nghiệm công chúng.',
      tag: 'Không gian & Trưng bày',
    },
    {
      num: '03',
      icon: 'handshake',
      title: '03. Đối ngoại – đối tác',
      desc: 'Trường, viện, doanh nghiệp, nhà tài trợ và mạng lưới quốc tế.',
      tag: 'Liên kết & Mạng lưới',
    },
    {
      num: '04',
      icon: 'campaign',
      title: '04. Truyền thông – cộng đồng',
      desc: 'Nhận diện, báo chí, mạng xã hội, giáo dục và open call.',
      tag: 'Truyền thông di sản',
    },
    {
      num: '05',
      icon: 'database',
      title: '05. Công nghệ – dữ liệu',
      desc: 'Website, kho tư liệu, mã định danh, bản quyền và lưu trữ số.',
      tag: 'Hạ tầng số & Kho lưu trữ',
    },
    {
      num: '06',
      icon: 'account_balance_wallet',
      title: '06. Vận hành – tài chính',
      desc: 'Kế hoạch, ngân sách, hậu cần, pháp lý và đánh giá hiệu quả.',
      tag: 'Quản trị & Pháp lý',
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 select-none">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] uppercase text-gold-gradient font-bold mb-2">
          Ban Dự Án
        </h2>
        <p className="font-serif text-[20px] md:text-[22px] italic text-[#FFE599] font-medium">
          “Biến định hướng thành hoạt động”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, idx) => (
          <div
            key={idx}
            className="card-lacquer rounded-xl p-7 flex flex-col justify-between group"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'rgba(82, 21, 21, 0.8)', border: '1px solid rgba(212, 175, 55, 0.4)' }}
            >
              <span className="material-symbols-outlined text-[24px] text-[#FFDF73]">
                {team.icon}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-[22px] font-bold text-[#FFDF73] mb-2 leading-snug">
                {team.title}
              </h3>
              <p className="font-body text-[15px] text-[#FAF7F2]/90 leading-relaxed">
                {team.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 text-[12px] uppercase tracking-wider text-[#EADBCE]/70 font-sans font-medium">
              {team.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipProjectTeamsSection;
export { LeadershipProjectTeamsSection };

