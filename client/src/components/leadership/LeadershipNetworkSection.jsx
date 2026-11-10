import React from 'react';
import { resolveLeadershipIcon } from './leadershipIconRegistry';
import { Share2 } from 'lucide-react';

const LeadershipNetworkSection = ({ pageProps }) => {
  const title = pageProps?.network_title || 'Mạng lưới phối hợp';
  const subtitle = pageProps?.network_subtitle || '“Cùng tạo nên hệ sinh thái”';
  const desc =
    pageProps?.network_desc ||
    'Các đối tác có thể bao gồm không gian đổi mới sáng tạo, cơ sở đào tạo mỹ thuật, doanh nghiệp vật liệu, làng nghề, bảo tàng, phòng trưng bày, hiệp hội, cơ quan truyền thông và cộng đồng sáng tạo.';
  const btnText = pageProps?.network_btn_text || 'TRỞ THÀNH ĐỐI TÁC';
  const btnLink = pageProps?.network_btn_link || 'mailto:info@sonmaihoihoavietnam.com';
  const partners =
    Array.isArray(pageProps?.network_partners) && pageProps.network_partners.length > 0
      ? pageProps.network_partners
      : [];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 text-center select-none">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[48px] uppercase text-gold-gradient font-bold mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="font-sans text-[20px] md:text-[22px] italic text-[#FFE599] font-medium mb-3">
            {subtitle}
          </p>
        )}
        {desc && (
          <p className="font-body text-[16px] text-[#FAF7F2]/85 leading-[1.85] text-balance">
            {desc}
          </p>
        )}
      </div>

      {partners.length === 0 ? (
        <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${partners.length >= 4 ? 'lg:grid-cols-4' : partners.length === 3 ? 'lg:grid-cols-3' : ''} gap-6 mb-12`}>
          {partners.map((partner, idx) => {
            const PartnerIcon = resolveLeadershipIcon(partner.icon, Share2);

            return (
              <div
                key={partner.id || idx}
                className="card-dashed-gold rounded-xl p-7 flex flex-col items-center justify-center min-h-[190px] group"
              >
                <PartnerIcon className="w-8 h-8 text-[#FFDF73] mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-sans text-[18px] text-[#FAF7F2] font-semibold mb-2">
                  {partner.title}
                </h3>
                <span className="font-sans text-[14px] italic text-[#FFDF73]/75 font-medium">
                  {partner.status || 'Đang cập nhật'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {btnText && (
        <div className="flex justify-center">
          <a
            className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded text-[15px] uppercase tracking-[0.18em] font-bold cursor-pointer"
            href={btnLink}
          >
            <span>{btnText}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
        </div>
      )}
    </section>
  );
};

export default LeadershipNetworkSection;
export { LeadershipNetworkSection };

