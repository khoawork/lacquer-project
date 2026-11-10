import React from 'react';
import { resolveTypeIcon, resolveStatusIcon } from './archiveIconRegistry';

const ArchiveSchemaSection = ({ pageProps = null }) => {
  const badge = pageProps?.schema_badge || 'Tiêu chuẩn dữ liệu học thuật';
  const title = pageProps?.schema_title || 'Khung Chuẩn Dữ Liệu Lưu Trữ Quốc Gia';
  const desc =
    pageProps?.schema_desc ||
    'Hệ thống chuẩn hóa thông tin đầu vào phục vụ kiểm định, tra cứu liên viện bảo tàng và bảo tồn di sản hội họa sơn mài vĩnh cửu.';

  const rawRows = pageProps?.schema_rows;
  const schemaRows =
    Array.isArray(rawRows) && rawRows.length > 0 ? rawRows : [];

  return (
    <section
      className="relative w-full py-20 md:py-28 text-stone-100 select-none"
      style={{
        background:
          'linear-gradient(180deg, #1a0507 0%, #24080b 50%, #1a0507 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {title && (
            <h2 className="font-sans text-[32px] sm:text-[38px] md:text-[44px] text-gold-gradient font-bold uppercase leading-tight mb-3">
              {title}
            </h2>
          )}
          {desc && (
            <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90">
              {desc}
            </p>
          )}
        </div>

        {/* Museum Archival Data Table Component */}
        {schemaRows.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : (
          <div
            className="w-full overflow-x-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#D4AF37]/35"
            style={{
              background: 'rgba(35, 9, 12, 0.88)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <table className="w-full text-left font-body text-[15px] min-w-[760px]">
              <thead>
                <tr
                  style={{
                    background: 'rgba(55, 14, 19, 0.95)',
                    borderBottom: '2px solid rgba(212, 175, 55, 0.35)',
                    color: '#FFDF73',
                  }}
                >
                  <th
                    className="py-4 px-6 font-sans uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/4"
                    scope="col"
                  >
                    Loại Tư Liệu
                  </th>
                  <th
                    className="py-4 px-6 font-sans uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/2"
                    scope="col"
                  >
                    Trường Thông Tin Bắt Buộc
                  </th>
                  <th
                    className="py-4 px-6 font-sans uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/4 text-right"
                    scope="col"
                  >
                    Trạng Thái Kiểm Định
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/15">
                {schemaRows.map((row, idx) => {
                  const TypeIcon = resolveTypeIcon(row.icon, row.type, idx);
                  const StatusIcon = resolveStatusIcon(row.status_icon, row.status);
                  return (
                    <tr
                      key={row.id || idx}
                      className="hover:bg-[#451016]/40 transition-colors"
                    >
                      <td className="py-5 px-6 font-sans text-[17px] md:text-[18px] font-bold text-[#FFDF73] align-top">
                        <div className="flex items-center gap-2.5">
                          <TypeIcon className="w-5 h-5 text-[#FFDF73] flex-shrink-0" />
                          <span>{row.type}</span>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-[#FAF7F2]/95 leading-relaxed align-top font-body text-[15px]">
                        {row.fields}
                      </td>

                      <td className="py-5 px-6 text-right align-top">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#2b070b] border border-[#D4AF37]/30 text-[#FFDF73] font-sans text-[12px] md:text-[13px] font-bold tracking-wide whitespace-nowrap">
                          <StatusIcon className="w-3.5 h-3.5 text-[#FFDF73]" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export { ArchiveSchemaSection };
export default ArchiveSchemaSection;
