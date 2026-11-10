import React from 'react';
import { resolveLeadershipIcon } from './leadershipIconRegistry';
import { BookOpen } from 'lucide-react';

const LeadershipProjectTeamsSection = ({ pageProps }) => {
  const title = pageProps?.teams_title || 'Ban Dự Án';
  const subtitle = pageProps?.teams_subtitle || '“Biến định hướng thành hoạt động”';
  const teams =
    Array.isArray(pageProps?.project_teams) && pageProps.project_teams.length > 0
      ? pageProps.project_teams
      : [];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 select-none">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[48px] uppercase text-gold-gradient font-bold mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="font-sans text-[20px] md:text-[22px] italic text-[#FFE599] font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {teams.length === 0 ? (
        <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, idx) => {
            const TeamIcon = resolveLeadershipIcon(team.icon, BookOpen);

            return (
              <div
                key={team.id || idx}
                className="card-lacquer rounded-xl p-7 flex flex-col justify-between group"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(82, 21, 21, 0.8)', border: '1px solid rgba(212, 175, 55, 0.4)' }}
                >
                  <TeamIcon className="w-5 h-5 text-[#FFDF73]" />
                </div>

                <div>
                  <h3 className="font-sans text-[22px] font-bold text-[#FFDF73] mb-2 leading-snug">
                    {team.title}
                  </h3>
                  <p className="font-body text-[15px] text-[#FAF7F2]/90 leading-relaxed">
                    {team.desc}
                  </p>
                </div>

                {team.tag && (
                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 text-[12px] uppercase tracking-wider text-[#EADBCE]/70 font-sans font-medium">
                    {team.tag}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LeadershipProjectTeamsSection;
export { LeadershipProjectTeamsSection };

