import React from 'react';
import {
  Sparkles,
  FileText,
  Award,
  Send,
  Calendar,
  CheckCircle,
  Plus,
  Trash2,
  ShieldCheck,
  Layers,
  Users,
} from 'lucide-react';
import ImageUploader from '../../common/ImageUploader';

const AboutPageEditor = ({ parsedProps, handlePropChange }) => {
  // 1. Mission Points (Thêm / Giảm / Sửa)
  const currentMissionPoints = Array.isArray(parsedProps.mission_points)
    ? parsedProps.mission_points
    : [];

  const handleUpdateMissionPoint = (index, field, value) => {
    const updated = [...currentMissionPoints];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('mission_points', updated);
  };

  const handleAddMissionPoint = () => {
    const updated = [
      ...currentMissionPoints,
      { bold: 'Tiêu đề trọng tâm:', text: 'Nội dung chi tiết điểm sứ mệnh mới...' },
    ];
    handlePropChange('mission_points', updated);
  };

  const handleRemoveMissionPoint = (index) => {
    const updated = currentMissionPoints.filter((_, i) => i !== index);
    handlePropChange('mission_points', updated);
  };

  // 2. Milestones (Thêm / Giảm / Sửa)
  const currentMilestones = Array.isArray(parsedProps.milestones)
    ? parsedProps.milestones
    : [];

  const handleUpdateMilestone = (index, field, value) => {
    const updated = [...currentMilestones];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('milestones', updated);
  };

  const handleAddMilestone = () => {
    const updated = [
      ...currentMilestones,
      { year: '2032', desc: 'Sự kiện hoặc hoạt động trọng điểm tiếp theo...' },
    ];
    handlePropChange('milestones', updated);
  };

  const handleRemoveMilestone = (index) => {
    const updated = currentMilestones.filter((_, i) => i !== index);
    handlePropChange('milestones', updated);
  };

  // 3. Principles (Thêm / Giảm / Sửa)
  const currentPrinciples = Array.isArray(parsedProps.principles)
    ? parsedProps.principles
    : [];

  const handleUpdatePrinciple = (index, field, value) => {
    const updated = [...currentPrinciples];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('principles', updated);
  };

  const handleAddPrinciple = () => {
    const nextNum = String(currentPrinciples.length + 1).padStart(2, '0');
    const updated = [
      ...currentPrinciples,
      {
        num: nextNum,
        title: 'Nguyên tắc mới',
        desc: 'Mô tả diễn giải nguyên tắc mới...',
        tag: 'Định hướng',
      },
    ];
    handlePropChange('principles', updated);
  };

  const handleRemovePrinciple = (index) => {
    const updated = currentPrinciples.filter((_, i) => i !== index);
    handlePropChange('principles', updated);
  };

  // 4. Architecture Tiers (Thêm / Giảm / Sửa)
  const currentArchTiers = Array.isArray(parsedProps.arch_tiers)
    ? parsedProps.arch_tiers
    : [];

  const handleUpdateArchTier = (index, field, value) => {
    const updated = [...currentArchTiers];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('arch_tiers', updated);
  };

  const handleAddArchTier = () => {
    const nextNum = String(currentArchTiers.length + 1).padStart(2, '0');
    const updated = [
      ...currentArchTiers,
      {
        tier_badge: `Tầng ${nextNum} • Mở Rộng`,
        title: 'Tầng kiến trúc mới',
        desc: 'Mô tả cơ chế hoạt động và vai trò của tầng kiến trúc này...',
        icon: 'layers',
      },
    ];
    handlePropChange('arch_tiers', updated);
  };

  const handleRemoveArchTier = (index) => {
    const updated = currentArchTiers.filter((_, i) => i !== index);
    handlePropChange('arch_tiers', updated);
  };

  // 5. Communities (Thêm / Giảm / Sửa)
  const currentCommunities = Array.isArray(parsedProps.communities)
    ? parsedProps.communities
    : [];

  const handleUpdateCommunity = (index, field, value) => {
    const updated = [...currentCommunities];
    updated[index] = { ...updated[index], [field]: value };
    handlePropChange('communities', updated);
  };

  const handleAddCommunity = () => {
    const updated = [
      ...currentCommunities,
      {
        icon: 'groups',
        title: 'Nhóm cộng đồng mới',
        desc: 'Mô tả vai trò và sứ mệnh đồng hành của nhóm cộng đồng này...',
      },
    ];
    handlePropChange('communities', updated);
  };

  const handleRemoveCommunity = (index) => {
    const updated = currentCommunities.filter((_, i) => i !== index);
    handlePropChange('communities', updated);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 1: Khung Đầu Trang Giới Thiệu (Hero Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Vùng mở đầu giới thiệu thông điệp và sứ mệnh chung của hành trình.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Huy hiệu (badge)
            </label>
            <input
              type="text"
              value={parsedProps.badge || ''}
              onChange={(e) => handlePropChange('badge', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề lớn (headline)
            </label>
            <input
              type="text"
              value={parsedProps.headline || ''}
              onChange={(e) => handlePropChange('headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả dẫn nhập (description)
            </label>
            <textarea
              rows={3}
              value={parsedProps.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <ImageUploader
              label="Biểu Trưng Tròn / Dấu Ấn Đầu Trang (hero_seal / hero_image)"
              value={parsedProps.hero_seal || parsedProps.hero_image || ''}
              onChange={(val) => {
                handlePropChange('hero_seal', val);
                handlePropChange('hero_image', val);
              }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: CÂU CHUYỆN KHỞI NGUỒN */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 2: Câu Chuyện Khởi Nguồn &amp; Ý Niệm
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Diễn giải sâu sắc về lý do hành trình được khởi tạo và triết lý tích tụ di sản.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ phụ đề (story_tag)
            </label>
            <input
              type="text"
              value={parsedProps.story_tag || ''}
              onChange={(e) => handlePropChange('story_tag', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính câu chuyện (story_headline)
            </label>
            <input
              type="text"
              value={parsedProps.story_headline || ''}
              onChange={(e) => handlePropChange('story_headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Câu nói triết lý nổi bật (story_quote)
            </label>
            <input
              type="text"
              value={parsedProps.story_quote || ''}
              onChange={(e) => handlePropChange('story_quote', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn văn 1 (story_p1)
            </label>
            <textarea
              rows={5}
              value={parsedProps.story_p1 || ''}
              onChange={(e) => handlePropChange('story_p1', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đoạn văn 2 (story_p2)
            </label>
            <textarea
              rows={5}
              value={parsedProps.story_p2 || ''}
              onChange={(e) => handlePropChange('story_p2', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ ảnh minh họa (story_image_tag)
            </label>
            <input
              type="text"
              value={parsedProps.story_image_tag || ''}
              onChange={(e) => handlePropChange('story_image_tag', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề ảnh minh họa (story_image_title)
            </label>
            <input
              type="text"
              value={parsedProps.story_image_title || ''}
              onChange={(e) => handlePropChange('story_image_title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Hình Ảnh Minh Họa Tích Tụ Di Sản (story_image)"
              value={parsedProps.story_image || ''}
              onChange={(val) => handlePropChange('story_image', val)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MỤC TIÊU CHIẾN LƯỢC - SỨ MỆNH & TẦM NHÌN 2030 (CÓ THÊM / GIẢM DYNAMIC) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 3: Sứ Mệnh Di Sản &amp; Tầm Nhìn 2030 (Chiến Lược)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Chỉnh sửa, thêm/giảm các điểm trọng tâm sứ mệnh và các mốc son thời gian tầm nhìn 2030.
            </p>
          </div>
        </div>

        {/* Tiêu đề chung Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#120204] border border-[#D4AF37]/25">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ mục tiêu (mv_tag)
            </label>
            <input
              type="text"
              value={parsedProps.mv_tag || ''}
              onChange={(e) => handlePropChange('mv_tag', e.target.value)}
              placeholder="MỤC TIÊU CHIẾN LƯỢC"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0406] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề khối chiến lược (mv_title)
            </label>
            <input
              type="text"
              value={parsedProps.mv_title || ''}
              onChange={(e) => handlePropChange('mv_title', e.target.value)}
              placeholder="Sứ mệnh Di sản & Tầm nhìn 2030"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0406] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* KHỐI 1: SỨ MỆNH (MISSION) CÓ THÊM / GIẢM */}
        <div className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#FFDF73]" />
              <h4 className="font-serif text-sm font-bold text-[#FFDF73] uppercase tracking-wider">
                Khối 1: Sứ Mệnh Di Sản (Mission) — ({currentMissionPoints.length} điểm)
              </h4>
            </div>
            <button
              type="button"
              onClick={handleAddMissionPoint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Điểm Sứ Mệnh</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#EADBCE]/80 mb-1">
                Nhãn huy hiệu (mission_badge)
              </label>
              <input
                type="text"
                value={parsedProps.mission_badge || ''}
                onChange={(e) => handlePropChange('mission_badge', e.target.value)}
                placeholder="SỨ MỆNH"
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-[#EADBCE]/80 mb-1">
                Tiêu đề sứ mệnh (mission_title)
              </label>
              <input
                type="text"
                value={parsedProps.mission_title || parsedProps.mission || ''}
                onChange={(e) => {
                  handlePropChange('mission_title', e.target.value);
                  handlePropChange('mission', e.target.value);
                }}
                placeholder="Kích hoạt giá trị sống của sơn mài hội họa Việt Nam"
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
              />
            </div>
          </div>

          {/* Danh sách điểm sứ mệnh */}
          <div className="space-y-3 pt-2">
            {currentMissionPoints.map((point, index) => (
              <div
                key={index}
                className="p-3.5 rounded-lg bg-[#1c0507] border border-[#D4AF37]/20 flex flex-col md:flex-row items-start md:items-center gap-3"
              >
                <div className="w-full md:w-1/3">
                  <label className="block text-[11px] font-bold text-[#FFDF73] mb-1">
                    Điểm #{index + 1} - Từ khóa in đậm
                  </label>
                  <input
                    type="text"
                    value={point.bold || ''}
                    onChange={(e) => handleUpdateMissionPoint(index, 'bold', e.target.value)}
                    placeholder="VD: Hệ thống hóa và lan tỏa:"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nội dung diễn giải chi tiết
                  </label>
                  <input
                    type="text"
                    value={point.text || ''}
                    onChange={(e) => handleUpdateMissionPoint(index, 'text', e.target.value)}
                    placeholder="Nội dung diễn giải..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMissionPoint(index)}
                  title="Xóa điểm này"
                  className="p-2 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition cursor-pointer self-end md:self-auto shrink-0 mt-2 md:mt-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* KHỐI 2: TẦM NHÌN 2030 (VISION) CÓ THÊM / GIẢM MỐC SON */}
        <div className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFDF73]" />
              <h4 className="font-serif text-sm font-bold text-[#FFDF73] uppercase tracking-wider">
                Khối 2: Tầm Nhìn 2030 (Vision 2030) — ({currentMilestones.length} mốc son)
              </h4>
            </div>
            <button
              type="button"
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Mốc Son Thời Gian</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#EADBCE]/80 mb-1">
                Nhãn huy hiệu (vision_badge)
              </label>
              <input
                type="text"
                value={parsedProps.vision_badge || ''}
                onChange={(e) => handlePropChange('vision_badge', e.target.value)}
                placeholder="TẦM NHÌN 2030"
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-[#EADBCE]/80 mb-1">
                Tiêu đề tầm nhìn (vision_title)
              </label>
              <input
                type="text"
                value={parsedProps.vision_title || ''}
                onChange={(e) => handlePropChange('vision_title', e.target.value)}
                placeholder="Một hệ sinh thái có khả năng tự vận hành và lan tỏa"
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase font-bold text-[#EADBCE]/80 mb-1">
                Đoạn văn diễn giải tầm nhìn (vision_desc / vision)
              </label>
              <textarea
                rows={3}
                value={parsedProps.vision_desc || parsedProps.vision || ''}
                onChange={(e) => {
                  handlePropChange('vision_desc', e.target.value);
                  handlePropChange('vision', e.target.value);
                }}
                placeholder="Đến năm 2030, Hành trình hướng tới một mạng lưới bền vững..."
                className="w-full px-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Danh sách mốc son thời gian */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold text-[#FFDF73] block">
              Dòng Thời Gian Các Mốc Son:
            </span>
            {currentMilestones.map((m, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-[#1c0507] border border-[#D4AF37]/20 flex flex-col md:flex-row items-start md:items-center gap-3"
              >
                <div className="w-full md:w-36">
                  <label className="block text-[11px] font-bold text-[#FFDF73] mb-1">
                    Năm mốc son
                  </label>
                  <input
                    type="text"
                    value={m.year || ''}
                    onChange={(e) => handleUpdateMilestone(index, 'year', e.target.value)}
                    placeholder="2026..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] font-serif font-bold text-xs"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nội dung diễn giải mốc son
                  </label>
                  <input
                    type="text"
                    value={m.desc || ''}
                    onChange={(e) => handleUpdateMilestone(index, 'desc', e.target.value)}
                    placeholder="Nội dung diễn giải..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(index)}
                  title="Xóa mốc son này"
                  className="p-2 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition cursor-pointer self-end md:self-auto shrink-0 mt-2 md:mt-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: BA NGUYÊN TẮC CỐT LÕI (CÓ THÊM / GIẢM / SỬA) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 4: Ba Nguyên Tắc Cốt Lõi — ({currentPrinciples.length} nguyên tắc)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Những nguyên tắc chỉ đạo bất biến định hướng mọi hoạt động trong hành trình.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddPrinciple}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Nguyên Tắc</span>
          </button>
        </div>

        {/* Tiêu đề mục */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ tiêu đề (principles_tag)
            </label>
            <input
              type="text"
              value={parsedProps.principles_tag || ''}
              onChange={(e) => handlePropChange('principles_tag', e.target.value)}
              placeholder="BA NGUYÊN TẮC CỐT LÕI"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính (principles_title)
            </label>
            <input
              type="text"
              value={parsedProps.principles_title || ''}
              onChange={(e) => handlePropChange('principles_title', e.target.value)}
              placeholder="Điều không thay đổi trong mọi hoạt động"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả ngắn (principles_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.principles_desc || ''}
              onChange={(e) => handlePropChange('principles_desc', e.target.value)}
              placeholder="Bộ ba nguyên tắc chỉ đạo bất biến định hướng mọi sáng kiến..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các nguyên tắc */}
        <div className="space-y-3 pt-2">
          {currentPrinciples.map((p, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/30 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-xs font-mono font-bold text-[#FFDF73]">
                  NGUYÊN TẮC #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePrinciple(index)}
                  title="Xóa nguyên tắc này"
                  className="p-1.5 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Số thứ tự hiển thị
                  </label>
                  <input
                    type="text"
                    value={p.num || ''}
                    onChange={(e) => handleUpdatePrinciple(index, 'num', e.target.value)}
                    placeholder="01"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Tiêu đề nguyên tắc
                  </label>
                  <input
                    type="text"
                    value={p.title || ''}
                    onChange={(e) => handleUpdatePrinciple(index, 'title', e.target.value)}
                    placeholder="Tiêu đề nguyên tắc..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Thẻ nhãn tóm tắt
                  </label>
                  <input
                    type="text"
                    value={p.tag || ''}
                    onChange={(e) => handleUpdatePrinciple(index, 'tag', e.target.value)}
                    placeholder="VD: Tôn trọng cốt lõi"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-xs"
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nội dung diễn giải chi tiết
                  </label>
                  <textarea
                    rows={2}
                    value={p.desc || ''}
                    onChange={(e) => handleUpdatePrinciple(index, 'desc', e.target.value)}
                    placeholder="Nội dung diễn giải nguyên tắc..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: KIẾN TRÚC NỀN TẢNG (CÓ THÊM / GIẢM / SỬA) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 5: Kiến Trúc Nền Tảng (Mô Hình Hệ Thống) — ({currentArchTiers.length} tầng)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Mô hình đồng tâm: Lõi bất biến – Vòng mở – Lớp vận hành.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddArchTier}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Tầng Kiến Trúc</span>
          </button>
        </div>

        {/* Tiêu đề mục */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ mô hình (arch_tag)
            </label>
            <input
              type="text"
              value={parsedProps.arch_tag || ''}
              onChange={(e) => handlePropChange('arch_tag', e.target.value)}
              placeholder="MÔ HÌNH HỆ THỐNG"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính (arch_title)
            </label>
            <input
              type="text"
              value={parsedProps.arch_title || ''}
              onChange={(e) => handlePropChange('arch_title', e.target.value)}
              placeholder="Kiến trúc nền tảng"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Phụ đề triết lý (arch_subtitle)
            </label>
            <input
              type="text"
              value={parsedProps.arch_subtitle || ''}
              onChange={(e) => handlePropChange('arch_subtitle', e.target.value)}
              placeholder="Lõi bất biến – Vòng mở – Lớp vận hành"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm italic focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các tầng kiến trúc */}
        <div className="space-y-3 pt-2">
          {currentArchTiers.map((tier, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/30 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-xs font-mono font-bold text-[#FFDF73]">
                  TẦNG KIẾN TRÚC #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveArchTier(index)}
                  title="Xóa tầng này"
                  className="p-1.5 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nhãn tầng (tier_badge)
                  </label>
                  <input
                    type="text"
                    value={tier.tier_badge || ''}
                    onChange={(e) => handleUpdateArchTier(index, 'tier_badge', e.target.value)}
                    placeholder="Tầng 01 • Tâm Lõi"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-xs font-bold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Tiêu đề tầng kiến trúc
                  </label>
                  <input
                    type="text"
                    value={tier.title || ''}
                    onChange={(e) => handleUpdateArchTier(index, 'title', e.target.value)}
                    placeholder="Tiêu đề tầng..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nội dung diễn giải vai trò của tầng
                  </label>
                  <textarea
                    rows={2}
                    value={tier.desc || ''}
                    onChange={(e) => handleUpdateArchTier(index, 'desc', e.target.value)}
                    placeholder="Nội dung diễn giải..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: CỘNG ĐỒNG ĐỒNG HÀNH (MỘT HÀNH TRÌNH CHO NHIỀU CỘNG ĐỒNG) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                Phần 6: Cộng Đồng Đồng Hành (Một Hành Trình Cho Nhiều Cộng Đồng) — ({currentCommunities.length} nhóm)
              </h3>
              <p className="text-xs text-[#EADBCE]/70">
                Di sản chỉ tồn tại bền vững khi thuộc về tất cả những ai cùng trân quý và kiến tạo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddCommunity}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b080c] hover:bg-[#3d0b11] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Nhóm Cộng Đồng</span>
          </button>
        </div>

        {/* Tiêu đề mục */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Thẻ tiêu đề (comm_tag)
            </label>
            <input
              type="text"
              value={parsedProps.comm_tag || ''}
              onChange={(e) => handlePropChange('comm_tag', e.target.value)}
              placeholder="CỘNG ĐỒNG ĐỒNG HÀNH"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề chính (comm_title)
            </label>
            <input
              type="text"
              value={parsedProps.comm_title || ''}
              onChange={(e) => handlePropChange('comm_title', e.target.value)}
              placeholder="Một hành trình dành cho nhiều cộng đồng"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả dẫn nhập (comm_desc)
            </label>
            <textarea
              rows={2}
              value={parsedProps.comm_desc || ''}
              onChange={(e) => handlePropChange('comm_desc', e.target.value)}
              placeholder="Di sản chỉ tồn tại bền vững khi thuộc về tất cả những ai cùng trân quý và kiến tạo..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
        </div>

        {/* Danh sách các nhóm cộng đồng */}
        <div className="space-y-3 pt-2">
          {currentCommunities.map((comm, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#140305] border border-[#D4AF37]/30 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-xs font-mono font-bold text-[#FFDF73]">
                  NHÓM CỘNG ĐỒNG #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveCommunity(index)}
                  title="Xóa nhóm này"
                  className="p-1.5 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Tên nhóm đối tượng / cộng đồng
                  </label>
                  <input
                    type="text"
                    value={comm.title || ''}
                    onChange={(e) => handleUpdateCommunity(index, 'title', e.target.value)}
                    placeholder="VD: Nghệ sĩ, nghệ nhân, làng nghề & nhà sưu tập"
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-white text-xs font-bold"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-[#EADBCE]/80 mb-1">
                    Nội dung mô tả vai trò đồng hành
                  </label>
                  <textarea
                    rows={2}
                    value={comm.desc || ''}
                    onChange={(e) => handleUpdateCommunity(index, 'desc', e.target.value)}
                    placeholder="Mô tả chi tiết..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FAF7F2] text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: KÊU GỌI HÀNH ĐỘNG (CTA) */}
      <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
              Phần 7: Lời Kêu Gọi Đồng Kiến Tạo (CTA Banner)
            </h3>
            <p className="text-xs text-[#EADBCE]/70">
              Vùng chân trang kêu gọi đối tác, nghệ sĩ và cộng đồng chung tay.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Tiêu đề kêu gọi (cta_headline)
            </label>
            <input
              type="text"
              value={parsedProps.cta_headline || ''}
              onChange={(e) => handlePropChange('cta_headline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Mô tả chi tiết kêu gọi (cta_desc)
            </label>
            <textarea
              rows={3}
              value={parsedProps.cta_desc || ''}
              onChange={(e) => handlePropChange('cta_desc', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Chữ nút bấm (cta_button_text)
            </label>
            <input
              type="text"
              value={parsedProps.cta_button_text || ''}
              onChange={(e) => handlePropChange('cta_button_text', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
              Đường dẫn liên kết nút (cta_button_link)
            </label>
            <input
              type="text"
              value={parsedProps.cta_button_link || ''}
              onChange={(e) => handlePropChange('cta_button_link', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 pt-2 border-t border-[#D4AF37]/20">
            <ImageUploader
              label="Ảnh Nền / Ảnh Minh Họa Banner Kêu Gọi (cta_image)"
              value={parsedProps.cta_image || ''}
              onChange={(val) => handlePropChange('cta_image', val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageEditor;
