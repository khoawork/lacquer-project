import React from 'react';
import { resolveLeadershipIcon } from './leadershipIconRegistry';
import { Paintbrush } from 'lucide-react';

const DEFAULT_ADVISORY_PANELS = [
  {
    icon: 'Paintbrush',
    title: 'Mỹ Thuật & Lịch Sử Nghệ Thuật',
    desc: 'Thẩm định giá trị học thuật, niên đại trường phái và ngôn ngữ tạo hình.',
    status: 'Đang cập nhật',
  },
  {
    icon: 'Hammer',
    title: 'Làng Nghề & Kỹ Thuật Sơn Mài',
    desc: 'Bảo tồn bí quyết thủ công, quy chuẩn vật liệu sơn ta và kỹ thuật cổ truyền.',
    status: 'Đang cập nhật',
  },
  {
    icon: 'Compass',
    title: 'Thiết Kế & Kiến Trúc Ứng Dụng',
    desc: 'Định hình không gian đương đại, ngôn ngữ tạo dáng và sản phẩm di sản.',
    status: 'Đang cập nhật',
  },
  {
    icon: 'Cpu',
    title: 'Kinh Tế Di Sản & Công Nghệ Số',
    desc: 'Số hóa lưu trữ, định danh số bản quyền và chuyển giao thương mại bền vững.',
    status: 'Đang cập nhật',
  },
];

const LeadershipAdvisorySection = ({ pageProps }) => {
  const title = pageProps?.advisory_title || 'Hội đồng chuyên môn';
  const subtitle = pageProps?.advisory_subtitle || '“Bảo chứng chiều sâu học thuật và nghề nghiệp”';
  const desc =
    pageProps?.advisory_desc ||
    'Hội đồng gồm đại diện mỹ thuật, lịch sử nghệ thuật, làng nghề, vật liệu, thiết kế, kiến trúc, công nghệ, kinh tế di sản và truyền thông. Nhiệm vụ chính là thẩm định nội dung, tư vấn chuyên đề, phản biện hồ sơ và đề xuất hướng phát triển.';
  const panels =
    Array.isArray(pageProps?.advisory_panels) && pageProps.advisory_panels.length > 0
      ? pageProps.advisory_panels
      : DEFAULT_ADVISORY_PANELS;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 text-center select-none">
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] uppercase text-gold-gradient font-bold mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="font-serif text-[20px] md:text-[22px] italic text-[#FFE599] font-medium mb-3">
            {subtitle}
          </p>
        )}
        {desc && (
          <p className="font-body text-[16px] text-[#FAF7F2]/85 leading-[1.85] text-balance max-w-3xl mx-auto">
            {desc}
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${panels.length >= 4 ? 'lg:grid-cols-4' : panels.length === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
        {panels.map((panel, idx) => {
          const PanelIcon = resolveLeadershipIcon(panel.icon, Paintbrush);

          return (
            <div
              key={panel.id || idx}
              className="card-lacquer rounded-xl p-7 flex flex-col items-center justify-between text-center min-h-[320px] group"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-5 text-[#FFDF73] transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: 'radial-gradient(circle, rgba(82, 21, 21, 0.7) 0%, rgba(20, 5, 8, 0.95) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.8), inset 0 0 16px rgba(212,175,55,0.2)',
                }}
              >
                <PanelIcon className="w-10 h-10 text-[#FFDF73]" />
              </div>

              <div className="my-auto">
                <h3 className="font-serif text-[21px] text-[#FFDF73] mb-2 font-bold leading-snug">
                  {panel.title}
                </h3>
                <p className="font-body text-[14px] text-[#EADBCE]/80 leading-relaxed">
                  {panel.desc}
                </p>
              </div>

              <div className="pt-5 w-full border-t border-[#D4AF37]/15">
                <span className="font-serif text-[15px] italic tracking-wider block text-[#FFDF73]/75 font-semibold">
                  {panel.status || 'Đang cập nhật'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeadershipAdvisorySection;
export { LeadershipAdvisorySection };

