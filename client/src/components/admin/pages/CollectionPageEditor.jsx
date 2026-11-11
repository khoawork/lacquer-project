import React from 'react';
import {
  Palette,
  Search,
  Check,
  Layers,
  Sparkles,
  Users,
  Award,
  Save,
  RefreshCw,
  Send,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';
import { getImageUrl } from '../../../configs/Apis';

const CollectionPageEditor = ({
  parsedProps,
  handlePropChange,
  allCollections = [],
  collectionSearch = '',
  setCollectionSearch,
  handleToggleCollection,
  handleSavePage,
  saving = false,
}) => {
  const selectedColIds = (parsedProps.featured_collection_ids || []).map(Number);

  const filteredCollections = allCollections.filter((col) => {
    const q = (collectionSearch || '').toLowerCase();
    return (
      String(col.id).includes(q) ||
      (col.name || col.title || '').toLowerCase().includes(q) ||
      (col.code || '').toLowerCase().includes(q) ||
      (col.technique || '').toLowerCase().includes(q)
    );
  });

  // Lấy danh sách dự án cộng đồng động từ community_projects (fallback về project1 / project2)
  const rawProjects = parsedProps.community_projects;
  const projectsList = Array.isArray(rawProjects)
    ? rawProjects
    : [
        {
          id: 1,
          tag: parsedProps.project1_tag || 'DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC',
          title: parsedProps.project1_title || 'BÁCH HỌA LIÊN HOA',
          desc:
            parsedProps.project1_desc ||
            'Không gian đồng sáng tác nơi nhiều bàn tay cùng tạo nên một tác phẩm lớn. Chương trình đề cao trải nghiệm thực hành, tính cộng đồng và khả năng biến người xem thành người tham gia trực tiếp vào tiến trình bồi đắp bề mặt sơn mài.',
          btn_text: parsedProps.project1_btn || 'Xem hành trình đồng sáng tác',
          link: parsedProps.project1_link || '/contact',
        },
        {
          id: 2,
          tag: parsedProps.project2_tag || 'XÁC LẬP KỶ LỤC • ĐỀ CỬ CHÍNH THỨC',
          title:
            parsedProps.project2_title ||
            'TÁC PHẨM NHIỀU NGƯỜI CÙNG SÁNG TẠO BẰNG “THỦ CHỈ ĐẦU” TRÊN VẬT LIỆU SƠN MÀI CÔNG NGHỆ',
          desc:
            parsedProps.project2_desc ||
            'Một thử nghiệm giao thoa giữa hành vi tạo dấu, chất liệu mới và tinh thần cộng đồng; được tổ chức theo quy trình kiểm chứng khoa học, tư liệu hóa và xác lập dữ liệu kỷ lục rõ ràng cùng Tổ chức Kỷ lục Việt Nam (VietKings).',
          btn_text: parsedProps.project2_btn || 'Xem hồ sơ kiểm chứng kỷ lục',
          link: parsedProps.project2_link || '/contact',
        },
      ];

  const handleUpdateProjects = (newList) => {
    handlePropChange('community_projects', newList);
    // Đồng bộ ngược lại 2 dự án đầu cho tương thích ngược hoàn toàn
    if (newList[0]) {
      handlePropChange('project1_tag', newList[0].tag || '');
      handlePropChange('project1_title', newList[0].title || '');
      handlePropChange('project1_desc', newList[0].desc || '');
      handlePropChange('project1_btn', newList[0].btn_text || '');
      handlePropChange('project1_link', newList[0].link || '');
    }
    if (newList[1]) {
      handlePropChange('project2_tag', newList[1].tag || '');
      handlePropChange('project2_title', newList[1].title || '');
      handlePropChange('project2_desc', newList[1].desc || '');
      handlePropChange('project2_btn', newList[1].btn_text || '');
      handlePropChange('project2_link', newList[1].link || '');
    }
  };

  const handleAddProject = () => {
    const newProj = {
      id: Date.now(),
      tag: 'DỰ ÁN CỘNG ĐỒNG',
      title: 'DỰ ÁN ĐỒNG KIẾN TẠO MỚI',
      desc: 'Mô tả chi tiết nội dung, ý nghĩa và phương thức tham gia dự án cộng đồng...',
      btn_text: 'Xem chi tiết dự án',
      link: '/contact',
    };
    handleUpdateProjects([...projectsList, newProj]);
  };

  const handleRemoveProject = (indexToRemove) => {
    const updated = projectsList.filter((_, idx) => idx !== indexToRemove);
    handleUpdateProjects(updated);
  };

  const handleProjectFieldChange = (index, field, value) => {
    const updated = projectsList.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    handleUpdateProjects(updated);
  };

  const handleMoveProject = (index, delta) => {
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= projectsList.length) return;
    const updated = [...projectsList];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleUpdateProjects(updated);
  };

  return (
    <div className="space-y-8">
      {/* ================= PHẦN 1: HERO & 4 CHỈ SỐ DI SẢN ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang &amp; 4 Chỉ Số Di Sản (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Biểu tượng con dấu, huy hiệu, tiêu đề lớn và thanh 4 chỉ số di sản bách niên.
            </p>
          </div>
        </div>

        {/* Hero Seal Image */}
        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Hình ảnh con dấu / Huy hiệu nghệ thuật chìm (hero_seal)
          </label>
          <ImageUploader
            value={parsedProps.hero_seal || parsedProps.hero_image || ''}
            onChange={(url) => {
              handlePropChange('hero_seal', url);
              handlePropChange('hero_image', url);
            }}
            placeholder="Tải lên hoặc dán URL con dấu di sản"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn trung tâm (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: MỖI TÁC PHẨM LÀ MỘT LỚP THỜI GIAN"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Đoạn văn mô tả dẫn nhập (description)
          </label>
          <textarea
            rows={3}
            value={parsedProps.description || ''}
            onChange={(e) => handlePropChange('description', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none leading-relaxed"
            placeholder="Nhập nội dung dẫn nhập triết lý nghệ thuật..."
          />
        </div>

        {/* 4 Chỉ số di sản */}
        <div className="pt-2 border-t border-[#D4AF37]/20">
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-3">
            Thanh 4 Chỉ Số Di Sản (Heritage Metrics)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 1</span>
              <input
                type="text"
                value={parsedProps.stat1_num ?? '99'}
                onChange={(e) => handlePropChange('stat1_num', e.target.value)}
                placeholder="VD: 99"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat1_label ?? 'Tác Phẩm Độc Bản Cửu Cửu'}
                onChange={(e) => handlePropChange('stat1_label', e.target.value)}
                placeholder="VD: Tác Phẩm Độc Bản Cửu Cửu"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 2</span>
              <input
                type="text"
                value={parsedProps.stat2_num ?? '100'}
                onChange={(e) => handlePropChange('stat2_num', e.target.value)}
                placeholder="VD: 100"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat2_label ?? 'Mô-đun Đồng Kiến Tạo'}
                onChange={(e) => handlePropChange('stat2_label', e.target.value)}
                placeholder="VD: Mô-đun Đồng Kiến Tạo"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 3</span>
              <input
                type="text"
                value={parsedProps.stat3_num ?? '01'}
                onChange={(e) => handlePropChange('stat3_num', e.target.value)}
                placeholder="VD: 01"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat3_label ?? 'Tuyệt Phẩm Du Lãm Vespa'}
                onChange={(e) => handlePropChange('stat3_label', e.target.value)}
                placeholder="VD: Tuyệt Phẩm Du Lãm Vespa"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
              <span className="text-[11px] font-mono text-[#FFDF73]">Chỉ số 4</span>
              <input
                type="text"
                value={parsedProps.stat4_num ?? 'VIETKINGS'}
                onChange={(e) => handlePropChange('stat4_num', e.target.value)}
                placeholder="VD: VIETKINGS"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white font-bold text-sm focus:border-[#FFDF73] focus:outline-none"
              />
              <input
                type="text"
                value={parsedProps.stat4_label ?? 'Hồ Sơ Đang Giám Định Di Sản'}
                onChange={(e) => handlePropChange('stat4_label', e.target.value)}
                placeholder="VD: Hồ Sơ Đang Giám Định Di Sản"
                className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= PHẦN 2: CHỌN BỘ SƯU TẬP TỪ DATABASE ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 2: Chọn Danh Sách Bộ Sưu Tập Hiển Thị
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Tick chọn các bộ sưu tập từ cơ sở dữ liệu để hiển thị trên trang này. Đang chọn:{' '}
                <strong className="text-[#FFDF73] font-bold">{selectedColIds.length}</strong> / {allCollections.length} bộ sưu tập.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', allCollections.map((c) => Number(c.id)))}
              className="px-3 py-1.5 rounded-lg bg-[#2b080c] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] hover:bg-[#3d0b11] transition cursor-pointer"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => handlePropChange('featured_collection_ids', [])}
              className="px-3 py-1.5 rounded-lg bg-[#140204] border border-[#D4AF37]/25 text-xs font-semibold text-[#EADBCE]/80 hover:text-white transition cursor-pointer"
            >
              Bỏ chọn tất cả
            </button>
            {handleSavePage && (
              <button
                type="button"
                onClick={handleSavePage}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-xs uppercase tracking-wider transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50 shrink-0"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>{saving ? 'Đang lưu...' : 'Lưu Danh Sách'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#D4AF37]/60" />
          <input
            type="text"
            value={collectionSearch}
            onChange={(e) => setCollectionSearch(e.target.value)}
            placeholder="Tìm kiếm bộ sưu tập theo tên, mã số, kỹ thuật..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
          />
        </div>

        {allCollections.length === 0 ? (
          <p className="text-xs text-[#EADBCE]/60 italic py-4">Chưa có bộ sưu tập nào trong hệ thống.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredCollections.map((col) => {
              const isSelected = selectedColIds.includes(Number(col.id));
              const coverImg = col.featured_image || col.image_url || col.cover_image || col.thumbnail_url;
              return (
                <div
                  key={col.id}
                  onClick={() => handleToggleCollection(col.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition ${
                    isSelected
                      ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(255,223,115,0.25)]'
                      : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition ${
                      isSelected ? 'bg-[#d49b1a] text-black font-bold' : 'border border-[#D4AF37]/50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {coverImg && (
                    <img
                      src={getImageUrl(coverImg)}
                      alt=""
                      className="w-12 h-12 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#FFDF73]">#{col.id}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{col.name || col.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= PHẦN 3: DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
                Phần 3: Dự Án Cộng Đồng &amp; Xác Lập Kỷ Lục
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Cho phép thêm, bớt, sắp xếp và tùy biến nội dung các dự án đồng sáng tác &amp; xác lập kỷ lục. Đang có:{' '}
                <strong className="text-[#FFDF73] font-bold">{projectsList.length}</strong> dự án.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/50 text-xs font-bold text-[#FFDF73] hover:text-white transition shadow cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Dự Án Mới</span>
          </button>
        </div>

        {/* Header thông tin khối */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề phần (community_title)
            </label>
            <input
              type="text"
              value={parsedProps.community_title || ''}
              onChange={(e) => handlePropChange('community_title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: DỰ ÁN CỘNG ĐỒNG & XÁC LẬP KỶ LỤC"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn văn mô tả (community_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.community_desc || ''}
              onChange={(e) => handlePropChange('community_desc', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: Mở rộng biên độ nghệ thuật sơn mài: từ xưởng họa cá nhân đến dấu ấn bàn tay của muôn người."
            />
          </div>
        </div>

        {/* Danh sách các dự án động */}
        <div className="space-y-4 pt-3 border-t border-[#D4AF37]/20">
          {projectsList.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-[#D4AF37]/30 bg-[#120204]">
              <p className="text-sm text-[#EADBCE]/70 mb-3">Hiện chưa có dự án cộng đồng nào.</p>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d49b1a] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e9c349] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo Dự Án Đầu Tiên</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {projectsList.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="p-4 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#3d090f] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="font-sans text-sm font-bold text-[#FFDF73] uppercase tracking-wide truncate max-w-[200px]">
                        {project.title || `Dự án #${idx + 1}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveProject(idx, -1)}
                        disabled={idx === 0}
                        title="Di chuyển lên trên"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveProject(idx, 1)}
                        disabled={idx === projectsList.length - 1}
                        title="Di chuyển xuống dưới"
                        className="p-1 rounded hover:bg-[#2b080c] text-[#EADBCE]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        title="Xóa dự án này"
                        className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      Thẻ danh mục (tag)
                    </label>
                    <input
                      type="text"
                      value={project.tag || ''}
                      onChange={(e) => handleProjectFieldChange(idx, 'tag', e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: DỰ ÁN CỘNG ĐỒNG • ĐỒNG SÁNG TÁC"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      Tên dự án (title)
                    </label>
                    <input
                      type="text"
                      value={project.title || ''}
                      onChange={(e) => handleProjectFieldChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                      placeholder="VD: BÁCH HỌA LIÊN HOA"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                      Nội dung mô tả (desc)
                    </label>
                    <textarea
                      rows={3}
                      value={project.desc || ''}
                      onChange={(e) => handleProjectFieldChange(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none leading-relaxed"
                      placeholder="Mô tả ý nghĩa, quy trình hoặc mục tiêu dự án..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                        Nhãn nút (btn_text)
                      </label>
                      <input
                        type="text"
                        value={project.btn_text || ''}
                        onChange={(e) => handleProjectFieldChange(idx, 'btn_text', e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                        placeholder="VD: Xem hành trình đồng sáng tác"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-[#EADBCE]/80 mb-1">
                        Đường dẫn liên kết (link)
                      </label>
                      <input
                        type="text"
                        value={project.link || ''}
                        onChange={(e) => handleProjectFieldChange(idx, 'link', e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
                        placeholder="VD: /contact hoặc /journey"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {projectsList.length > 0 && (
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-dashed border-[#D4AF37]/60 text-xs font-bold text-[#FFDF73] hover:text-white transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm Một Dự Án Khác</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= PHẦN 4: KẾT NỐI DI SẢN BÁCH NIÊN (CTA) ================= */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[#FFDF73]">
              Phần 4: Kết Nối Di Sản Bách Niên (Khung Kêu Gọi Đồng Kiến Tạo)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Biểu tượng huy hiệu, thông điệp kêu gọi nghệ sĩ &amp; nhà đầu tư đồng hành cùng Hành trình 100 năm.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Hình ảnh huy hiệu trung tâm (cta_image)
          </label>
          <ImageUploader
            value={parsedProps.cta_image || ''}
            onChange={(url) => handlePropChange('cta_image', url)}
            placeholder="Tải lên hoặc dán URL huy hiệu bách niên"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Huy hiệu CTA (cta_tag)
            </label>
            <input
              type="text"
              value={parsedProps.cta_tag || ''}
              onChange={(e) => handlePropChange('cta_tag', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: KẾT NỐI DI SẢN BÁCH NIÊN"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn CTA (cta_headline)
            </label>
            <input
              type="text"
              value={parsedProps.cta_headline || ''}
              onChange={(e) => handlePropChange('cta_headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
              placeholder="VD: BẠN MUỐN ĐỒNG KIẾN TẠO CÙNG CHÚNG TÔI?"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
            Đoạn văn mô tả CTA (cta_desc)
          </label>
          <textarea
            rows={3}
            value={parsedProps.cta_desc || ''}
            onChange={(e) => handlePropChange('cta_desc', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none leading-relaxed"
            placeholder="VD: Mỗi nghệ sĩ, nhà nghiên cứu, hay người yêu mỹ thuật đều có thể đóng góp một nét son trong trang sử mới..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#D4AF37]/20">
          <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
            <span className="text-[11px] font-mono text-[#FFDF73] font-bold block">
              Nút hành động chính (Primary Button)
            </span>
            <input
              type="text"
              value={parsedProps.cta_button_text || ''}
              onChange={(e) => handlePropChange('cta_button_text', e.target.value)}
              placeholder="Tên nút (VD: Đăng ký tham gia kiến tạo)"
              className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
            <input
              type="text"
              value={parsedProps.cta_button_link || ''}
              onChange={(e) => handlePropChange('cta_button_link', e.target.value)}
              placeholder="Đường dẫn (VD: /contact)"
              className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#140204] border border-[#D4AF37]/30 space-y-2">
            <span className="text-[11px] font-mono text-[#FFDF73] font-bold block">
              Nút liên hệ phụ (Secondary Button)
            </span>
            <input
              type="text"
              value={parsedProps.cta_secondary_button_text || ''}
              onChange={(e) => handlePropChange('cta_secondary_button_text', e.target.value)}
              placeholder="Tên nút (VD: Liên hệ ban điều phối)"
              className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
            />
            <input
              type="text"
              value={parsedProps.cta_secondary_button_link || ''}
              onChange={(e) => handlePropChange('cta_secondary_button_link', e.target.value)}
              placeholder="Đường dẫn (VD: mailto:info@sonmaihoihoavietnam.com)"
              className="w-full px-3 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Nút lưu cuối cùng */}
        {handleSavePage && (
          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-xs uppercase tracking-wider transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Đang lưu trang...' : 'Lưu Tất Cả Cấu Hình Trang Bộ Sưu Tập'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPageEditor;
