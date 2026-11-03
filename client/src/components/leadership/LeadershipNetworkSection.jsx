import React from 'react';

const LeadershipNetworkSection = () => {
  const partners = [
    {
      icon: 'hub',
      title: 'Không Gian Đổi Mới Sáng Tạo & Viện Nghiên Cứu',
      status: 'Đang cập nhật',
    },
    {
      icon: 'school',
      title: 'Cơ Sở Đào Tạo Mỹ Thuật & Thiết Kế',
      status: 'Đang cập nhật',
    },
    {
      icon: 'storefront',
      title: 'Hiệp Hội Làng Nghề & Doanh Nghiệp Vật Liệu',
      status: 'Đang cập nhật',
    },
    {
      icon: 'gallery_thumbnail',
      title: 'Bảo Tàng, Không Gian Trưng Bày & Truyền Thông',
      status: 'Đang cập nhật',
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 text-center select-none">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] uppercase text-gold-gradient font-bold mb-2">
          Mạng lưới phối hợp
        </h2>
        <p className="font-serif text-[20px] md:text-[22px] italic text-[#FFE599] font-medium mb-3">
          “Cùng tạo nên hệ sinh thái”
        </p>
        <p className="font-body text-[16px] text-[#FAF7F2]/85 leading-[1.85] text-balance">
          Các đối tác có thể bao gồm không gian đổi mới sáng tạo, cơ sở đào tạo mỹ thuật, doanh nghiệp vật liệu, làng nghề, bảo tàng, phòng trưng bày, hiệp hội, cơ quan truyền thông và cộng đồng sáng tạo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="card-dashed-gold rounded-xl p-7 flex flex-col items-center justify-center min-h-[190px] group"
          >
            <span className="material-symbols-outlined text-[32px] text-[#FFDF73] mb-3 transition-transform duration-300 group-hover:scale-110">
              {partner.icon}
            </span>
            <h3 className="font-serif text-[18px] text-[#FAF7F2] font-semibold mb-2">
              {partner.title}
            </h3>
            <span className="font-serif text-[14px] italic text-[#FFDF73]/75 font-medium">
              {partner.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded text-[15px] uppercase tracking-[0.18em] font-bold cursor-pointer"
          href="mailto:info@sonmaihoihoavietnam.com"
        >
          <span>TRỞ THÀNH ĐỐI TÁC</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </a>
      </div>
    </section>
  );
};

export default LeadershipNetworkSection;
export { LeadershipNetworkSection };

