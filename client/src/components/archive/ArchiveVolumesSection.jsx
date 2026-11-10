import React from 'react';
import { BookMarked, Download, Eye, FileText, Sparkles } from 'lucide-react';

const ArchiveVolumesSection = ({ pageProps = null }) => {
  const badge = pageProps?.volumes_badge || 'Bộ Tác Phẩm Bách Niên Kỷ Yếu';
  const title = pageProps?.volumes_title || 'Bốn Tập Chuyên Khảo Thế Kỷ (1930–2030)';
  const desc =
    pageProps?.volumes_desc ||
    'Công trình xuất bản quy mô quốc gia quy tụ các nhà nghiên cứu mỹ thuật, nghệ nhân làng nghề và học giả uy tín trong và ngoài nước.';
  const indexBtn = pageProps?.volumes_index_btn || 'Xem mục lục tổng quát';

  const rawVols = pageProps?.volumes;
  let volumes = [];
  if (Array.isArray(rawVols) && rawVols.length > 0) {
    volumes = rawVols;
  } else if (pageProps?.vol1_title) {
    volumes = [
      {
        vol: 'TẬP I',
        era: '1930 — 1954',
        title: pageProps.vol1_title,
        focus: pageProps.vol1_desc || '',
        pages: '380 trang',
        papers: '24 Chuyên luận khoa học',
        status: 'Đã hoàn tất bản thảo',
      },
      pageProps.vol2_title && {
        vol: 'TẬP II',
        era: '1954 — 1986',
        title: pageProps.vol2_title,
        focus: pageProps.vol2_desc || '',
        pages: '420 trang',
        papers: '32 Hồ sơ điền dã',
        status: 'Đang biên tập phản biện',
      },
      pageProps.vol3_title && {
        vol: 'TẬP III',
        era: '1986 — 2010',
        title: pageProps.vol3_title,
        focus: pageProps.vol3_desc || '',
        pages: '510 trang',
        papers: '45 Hồ sơ tác phẩm bảo vật',
        status: 'Đang thẩm định tư liệu',
      },
      pageProps.vol4_title && {
        vol: 'TẬP IV',
        era: '2010 — 2030',
        title: pageProps.vol4_title,
        focus: pageProps.vol4_desc || '',
        pages: '460 trang',
        papers: '38 Đề xuất mô hình kinh tế số',
        status: 'Đang tiếp nhận bản thảo',
      },
    ].filter(Boolean);
  }

  return (
    <section
      className="relative w-full py-20 md:py-28 text-stone-100 overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #1c0508 0%, #27090d 50%, #190407 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Lacquer backdrop accents */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#521515]/30 blur-[100px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            {title && (
              <h2 className="font-sans text-[32px] sm:text-[38px] md:text-[44px] text-gold-gradient uppercase font-bold leading-tight">
                {title}
              </h2>
            )}
            {desc && (
              <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90 mt-2">
                {desc}
              </p>
            )}
          </div>

          <div className="flex-shrink-0">
            <button
              type="button"
              className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider inline-flex items-center gap-2 cursor-pointer"
              onClick={() => alert('Mục lục tổng quan các tập kỷ yếu đang được cập nhật!')}
            >
              <BookMarked className="w-4 h-4" />
              <span>{indexBtn}</span>
            </button>
          </div>
        </div>

        {/* Volumes Grid */}
        {volumes.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volumes.map((v, i) => (
              <div
                key={v.id || i}
                className="p-6 rounded-2xl flex flex-col justify-between card-lacquer relative overflow-hidden group"
                style={{
                  background: 'rgba(38, 10, 14, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded bg-[#200508] border border-[#D4AF37]/40 font-sans text-[12px] text-[#FFDF73] font-bold">
                      {v.vol || `TẬP ${i + 1}`}
                    </span>
                    <span className="font-sans text-[12px] text-[#EADBCE]/80 tracking-wider">
                      {v.era || ''}
                    </span>
                  </div>

                  <h3 className="font-sans text-[20px] font-bold text-gold-gradient leading-snug group-hover:brightness-110 transition-all">
                    {v.title}
                  </h3>

                  <p className="font-body text-[15px] text-[#FAF7F2]/90 leading-relaxed text-justify">
                    {v.focus}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 space-y-3">
                  <div className="flex items-center justify-between text-[13px] font-sans text-[#EADBCE]/70">
                    <span>{v.pages}</span>
                    <span className="text-[#FFDF73] font-semibold">{v.papers}</span>
                  </div>

                  <div className="flex items-center justify-between text-[12px] font-sans">
                    <span className="text-[#D4AF37] font-medium">{v.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { ArchiveVolumesSection };
export default ArchiveVolumesSection;
