import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, ArrowRight, Sparkles, HeartHandshake, Star } from 'lucide-react';

const PROJECT_ICONS = [Users, Award, Sparkles, HeartHandshake, Star];

const CollectionCommunitySection = ({ pageProps = null }) => {
  const badge = pageProps?.community_badge || 'Đồng kiến tạo mở';
  const title = pageProps?.community_title || 'DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC';
  const desc =
    pageProps?.community_desc ||
    'Mở rộng biên độ nghệ thuật sơn mài: từ xưởng họa cá nhân đến dấu ấn bàn tay của muôn người.';

  // Đọc danh sách dự án động từ community_projects
  const rawProjects = pageProps?.community_projects;
  const projects = Array.isArray(rawProjects) ? rawProjects : [];

  const renderActionButton = (text, link, icon) => {
    const isExternal =
      link?.startsWith('http://') || link?.startsWith('https://') || link?.startsWith('mailto:');
    const className =
      'btn-gold-outline w-full py-3 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all';

    if (isExternal) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
          <span>{text}</span>
          {icon}
        </a>
      );
    }

    return (
      <Link to={link || '/'} className={className}>
        <span>{text}</span>
        {icon}
      </Link>
    );
  };

  const gridClass =
    projects.length === 1
      ? 'grid-cols-1 max-w-2xl mx-auto'
      : projects.length === 3
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-24 select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #28080c 0%, #1a0507 55%, #120304 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {title && (
            <h2 className="font-sans text-[30px] sm:text-[36px] md:text-[42px] text-gold-gradient uppercase font-bold mb-4">
              {title}
            </h2>
          )}

          {desc && (
            <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90">
              {desc}
            </p>
          )}
        </div>

        {/* Dynamic Project Grid */}
        {projects.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : (
          <div className={`grid ${gridClass} gap-8 md:gap-10`}>
            {projects.map((proj, idx) => {
              const IconComp = PROJECT_ICONS[idx % PROJECT_ICONS.length] || Users;
              return (
                <div
                  key={proj.id || idx}
                  className="p-8 md:p-10 rounded-2xl relative flex flex-col justify-between card-lacquer group transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(26, 5, 7, 0.88)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                  }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3.5 py-1 rounded font-sans text-[#FFDF73] uppercase text-[12px] font-bold"
                        style={{
                          background: 'rgb(61, 12, 15)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        {proj.tag}
                      </span>
                      <IconComp className="w-7 h-7 text-[#FFDF73] shrink-0" />
                    </div>

                    <h3 className="font-sans text-[22px] sm:text-[26px] text-gold-gradient uppercase tracking-wide font-bold leading-snug">
                      {proj.title}
                    </h3>

                    <p className="font-body text-[17px] sm:text-[18px] text-[#FAF7F2]/95 leading-relaxed text-justify">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-8">
                    {renderActionButton(
                      proj.btn_text || 'Xem chi tiết',
                      proj.link || '/contact',
                      <ArrowRight className="w-4 h-4 font-bold" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionCommunitySection;
