import React from 'react';
import { BookMarked, Download, Eye, FileText, Sparkles, ExternalLink } from 'lucide-react';

const ArchiveVolumesSection = ({ pageProps }) => {
  const volumes = Array.isArray(pageProps?.volumes) && pageProps.volumes.length > 0
    ? pageProps.volumes
    : [
        {
          vol: 'TẬP I',
          era: '1930 — 1954',
          title: pageProps?.vol1_title || '',
          focus: pageProps?.vol1_desc || '',
          pages: '380 trang',
          papers: '24 Chuyên luận khoa học',
          status: 'Đã hoàn tất bản thảo',
        },
        {
          vol: 'TẬP II',
          era: '1954 — 1986',
          title: pageProps?.vol2_title || '',
          focus: pageProps?.vol2_desc || '',
          pages: '420 trang',
          papers: '32 Hồ sơ điền dã',
          status: 'Đang biên tập phản biện',
        },
        {
          vol: 'TẬP III',
          era: '1986 — 2010',
          title: pageProps?.vol3_title || '',
          focus: pageProps?.vol3_desc || '',
          pages: '510 trang',
          papers: '45 Hồ sơ tác phẩm bảo vật',
          status: 'Đang thẩm định tư liệu',
        },
        {
          vol: 'TẬP IV',
          era: '2010 — 2030',
          title: pageProps?.vol4_title || '',
          focus: pageProps?.vol4_desc || '',
          pages: '460 trang',
          papers: '38 Đề xuất mô hình kinh tế số',
          status: 'Đang tiếp nhận bản thảo',
        },
      ].filter((v) => v.title || v.focus);

  if (volumes.length === 0) return null;

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 bg-[#3d0c0f] border border-[#D4AF37]/35 text-[#FFDF73] text-[12px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bộ Tác Phẩm Bách Niên Kỷ Yếu</span>
            </div>
            <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] text-gold-gradient uppercase font-bold leading-tight">
              Bốn Tập Chuyên Khảo Thế Kỷ (1930–2030)
            </h2>
            <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90 mt-2">
              Công trình xuất bản quy mô quốc gia quy tụ các nhà nghiên cứu mỹ thuật, nghệ nhân làng nghề và học giả uy tín trong và ngoài nước.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              type="button"
              className="btn-gold-outline px-5 py-2.5 rounded text-[13px] md:text-[14px] uppercase font-bold tracking-wider inline-flex items-center gap-2 cursor-pointer"
              onClick={() => alert('Mục lục tổng quan 4 tập kỷ yếu đang được cập nhật!')}
            >
              <BookMarked className="w-4 h-4" />
              <span>Xem mục lục tổng quát</span>
            </button>
          </div>
        </div>

        {/* 4 Volumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volumes.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl flex flex-col justify-between card-lacquer relative overflow-hidden group"
              style={{
                background: 'rgba(38, 10, 14, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-[#200508] border border-[#D4AF37]/40 font-serif text-[12px] text-[#FFDF73] font-bold">
                    {v.vol}
                  </span>
                  <span className="font-serif text-[12px] text-[#EADBCE]/80 tracking-wider">
                    {v.era}
                  </span>
                </div>

                <h3 className="font-serif text-[20px] font-bold text-gold-gradient leading-snug group-hover:brightness-110 transition-all">
                  {v.title}
                </h3>

                <p className="font-body text-[14px] text-[#FAF7F2]/85 leading-relaxed">
                  {v.focus}
                </p>

                <div className="pt-2 flex flex-col gap-1.5 font-serif text-[12px] text-[#EADBCE]/80 border-t border-[#D4AF37]/15">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#FFDF73]" />
                    {v.papers} • {v.pages}
                  </span>
                  <span className="text-[#FFDF73] font-semibold">{v.status}</span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <button
                  type="button"
                  className="font-serif text-[13px] text-[#FFDF73] hover:text-[#FFF3CC] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  onClick={() => alert(`Xem tóm tắt ${v.vol}: ${v.title}`)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem tóm lược</span>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#240608] border border-[#D4AF37]/30 flex items-center justify-center text-[#FFDF73] hover:bg-[#450e14] transition-colors cursor-pointer"
                  onClick={() => alert(`Tải đề cương tóm tắt ${v.vol} (PDF)`)}
                  title="Tải đề cương"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ArchiveVolumesSection };
export default ArchiveVolumesSection;

