import React from 'react';
import { FileText, UserCheck, Warehouse, Palette, Calendar, CheckCircle2, Shield, SearchCheck, Cpu, Video } from 'lucide-react';

const ArchiveSchemaSection = () => {
  const schemaRows = [
    {
      type: 'Bài nghiên cứu',
      icon: FileText,
      fields:
        'Tiêu đề; tóm tắt; tác giả; đơn vị; từ khóa; tài liệu tham khảo; tệp tải về (PDF chuẩn OCR)',
      status: 'Chuẩn học thuật • Đã xác thực',
      statusIcon: CheckCircle2,
    },
    {
      type: 'Nhân vật',
      icon: UserCheck,
      fields:
        'Họ tên; vai trò; giai đoạn hoạt động; địa phương; câu chuyện nghề; tư liệu kiểm chứng; hình ảnh lưu trữ',
      status: 'Hồ sơ tiểu sử bảo chứng',
      statusIcon: Shield,
    },
    {
      type: 'Làng nghề',
      icon: Warehouse,
      fields:
        'Tên làng nghề; địa bàn tọa lạc; lịch sử sơ khởi; kỹ thuật đặc thù; quy mô nhân lực; thách thức nguyên liệu',
      status: 'Dữ liệu điền dã xác minh',
      statusIcon: SearchCheck,
    },
    {
      type: 'Tác phẩm',
      icon: Palette,
      fields:
        'Mã định danh độc bản; tác giả; năm sáng tác; chất liệu (sơn then, cánh gián, son trầm, vàng quỳ); kích thước; lịch sử lưu lạc',
      status: 'Định danh số & Chip NFC',
      statusIcon: Cpu,
    },
    {
      type: 'Sự kiện',
      icon: Calendar,
      fields:
        'Thời gian; địa điểm; đơn vị đồng tổ chức; chương trình chi tiết; diễn giả; kết quả học thuật; tài liệu và video lưu trữ',
      status: 'Lưu trữ đa phương tiện số',
      statusIcon: Video,
    },
  ];

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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 bg-[#3d0c0f] border border-[#D4AF37]/35 text-[#FFDF73] text-[12px] uppercase tracking-widest font-bold">
            <span>Tiêu chuẩn dữ liệu học thuật</span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] text-gold-gradient font-bold uppercase leading-tight mb-3">
            Khung Chuẩn Dữ Liệu Lưu Trữ Quốc Gia
          </h2>
          <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/90">
            Hệ thống chuẩn hóa thông tin đầu vào phục vụ kiểm định, tra cứu liên viện bảo tàng và bảo tồn di sản hội họa sơn mài vĩnh cửu.
          </p>
        </div>

        {/* Museum Archival Data Table Component */}
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
                  className="py-4 px-6 font-serif uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/4"
                  scope="col"
                >
                  Loại Tư Liệu
                </th>
                <th
                  className="py-4 px-6 font-serif uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/2"
                  scope="col"
                >
                  Trường Thông Tin Bắt Buộc
                </th>
                <th
                  className="py-4 px-6 font-serif uppercase tracking-[0.16em] font-bold text-[13px] md:text-[14px] w-1/4 text-right"
                  scope="col"
                >
                  Trạng Thái Kiểm Định
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/15">
              {schemaRows.map((row, idx) => {
                const TypeIcon = row.icon;
                const StatusIcon = row.statusIcon;
                return (
                  <tr
                    key={idx}
                    className="hover:bg-[#451016]/40 transition-colors"
                  >
                    <td className="py-5 px-6 font-serif text-[17px] md:text-[18px] font-bold text-[#FFDF73] align-top">
                      <div className="flex items-center gap-2.5">
                        <TypeIcon className="w-5 h-5 text-[#FFDF73] flex-shrink-0" />
                        <span>{row.type}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-[#FAF7F2]/95 leading-relaxed align-top font-body text-[15px]">
                      {row.fields}
                    </td>

                    <td className="py-5 px-6 text-right align-top">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#2b070b] border border-[#D4AF37]/30 text-[#FFDF73] font-serif text-[12px] md:text-[13px] font-bold tracking-wide whitespace-nowrap">
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
      </div>
    </section>
  );
};

export { ArchiveSchemaSection };
export default ArchiveSchemaSection;

