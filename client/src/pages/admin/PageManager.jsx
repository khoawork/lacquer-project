import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Code,
  Sparkles,
  ExternalLink,
  Layers,
  FileText,
  RefreshCw,
  Sliders,
  Edit3,
  Calendar,
  Palette,
  Newspaper,
  BookOpen,
  Handshake,
  Check,
  Search,
} from 'lucide-react';
import pageServices from '../../services/pageServices';
import eventServices from '../../services/eventServices';
import collectionServices from '../../services/collectionServices';
import { getImageUrl } from '../../configs/Apis';

// Cấu trúc dữ liệu đầy đủ của Trang Chủ khớp 100% với giao diện ngoài web
const DEFAULT_HOME_PROPS = {
  // 1. Hero Section
  badge: '1930 • 2030 • BÁCH NIÊN KHỞI SẮC',
  headline: 'HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM',
  subtitle: 'Bản Sắc Hội Họa & Di Sản Nghệ Thuật',
  quote: 'Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo.',
  hero_cta1_text: 'KHÁM PHÁ HÀNH TRÌNH',
  hero_cta1_link: '/journey',
  hero_cta2_text: 'THAM GIA ĐỒNG KIẾN TẠO',
  hero_cta2_link: '/contact',
  bottom_quote: '“Một thế kỷ mở đường — Một hành trình kế tục và bừng sáng.”',

  // 2. Heritage Story Section
  story_headline: 'Một thế kỷ — Một hành trình đang tiếp diễn',
  story_p1:
    'Sơn mài hội họa Việt Nam là kết quả diệu kỳ của sự gặp gỡ giữa nguồn nhựa sơn ta Phú Thọ huyền thoại, đôi bàn tay tài hoa của nghệ nhân cổ truyền và tư duy tạo hình hàn lâm hiện đại khởi nguồn từ Trường Mỹ thuật Đông Dương thập niên 1930.',
  story_p2:
    'Qua lớp lớp thời gian tôi luyện trong khói lửa kháng chiến, độc lập và đổi mới, sơn mài đã thoát thai khỏi một chất liệu trang trí mỹ nghệ đơn thuần để trở thành đỉnh cao ngôn ngữ tạo hình hội họa dân tộc. Năm 2030 không phải điểm kết thúc, mà là dấu mốc hoàn tất một thế kỷ để bước sang một chu kỳ kiến tạo tầm vóc mới.',
  story_callout: '“Không chỉ để xã hội xem. Để xã hội cùng làm.”',
  story_callout_desc:
    'Hành trình được kiến tạo như một hệ sinh thái mở, nơi người nghệ sĩ, nghệ nhân làng nghề, giới học giả, trường viện nghiên cứu, doanh nghiệp và công chúng yêu nghệ thuật cùng tương tác, kiến tạo và làm giàu sinh khí cho di sản.',

  // 3. Pillars Section (Bốn hướng mở)
  pillars_headline: 'Bốn hướng mở của hành trình',
  pillars_desc:
    'Một mô hình đa chiều kết nối truyền thống nghìn năm cùng nhịp đập kinh tế sáng tạo toàn cầu hóa.',
  pillar1_title: 'Cộng đồng sáng tạo',
  pillar1_desc:
    'Mở rộng Open Studio, bảo trợ chương trình lưu trú nghệ sĩ trẻ, workshop thể nghiệm đa chất liệu và truyền cảm hứng hội họa sơn mài đến công chúng đa thế hệ.',
  pillar1_cta_text: 'Khám phá hoạt động',
  pillar1_cta_link: '/journey',
  pillar2_title: 'Công nghiệp văn hóa',
  pillar2_desc:
    'Định hình tiêu chuẩn sản phẩm mỹ thuật cao cấp, kết nối chuỗi cung ứng vật liệu truyền thống với các nhà thiết kế công nghiệp và nội thất đương đại.',
  pillar2_cta_text: 'Khám phá sản phẩm',
  pillar2_cta_link: '/collections',
  pillar3_title: 'Kinh tế di sản',
  pillar3_desc:
    'Xây dựng hạ tầng định giá, bảo chứng bản quyền và xác lập giá trị đầu tư cho các tác phẩm kiệt tác trên thị trường nghệ thuật quốc tế.',
  pillar3_cta_text: 'Khám phá dự án',
  pillar3_cta_link: '/events',
  pillar4_title: 'Đổi mới vật liệu',
  pillar4_desc:
    'Nghiên cứu khoa học về tính chất hóa sinh của cây sơn ta, quy chuẩn kỹ thuật mài then và phát triển các chế phẩm hỗ trợ sinh thái bền vững.',
  pillar4_cta_text: 'Khám phá thể nghiệm',
  pillar4_cta_link: '/archive',
  pillars_bottom_cta_text: 'XEM CHI TIẾT HỆ SINH THÁI',
  pillars_bottom_cta_link: '#mo-hinh',

  // 4. Operational Pipeline Section (Mô hình vận hành)
  pipeline_headline: 'Từ ý tưởng đến giá trị',
  pipeline_desc:
    'Chu trình liên tục chuyển hóa chất xám nghiên cứu, năng lượng sáng tạo nghệ thuật thành các giá trị văn hóa và kinh tế bền vững cho đất nước.',
  step1_title: 'LAB',
  step1_sub: 'Nghiên cứu & Thể nghiệm',
  step1_desc: 'Nghiên cứu lịch sử, lý luận, chất liệu và công nghệ.',
  step2_title: 'STUDIO',
  step2_sub: 'Sáng tạo & Chế tác',
  step2_desc: 'Đồng hành cùng nghệ sĩ, nghệ nhân và xưởng nghề thực hành sáng tạo.',
  step3_title: 'SHOWCASE',
  step3_sub: 'Trưng bày & Lan tỏa',
  step3_desc: 'Đại triển lãm, tọa đàm chuyên sâu, ấn bản kỷ yếu và truyền thông số.',
  step4_title: 'MARKET',
  step4_sub: 'Thương mại hóa di sản',
  step4_desc: 'Đưa tác phẩm sơn mài vào chuỗi giá trị kinh tế sáng tạo toàn cầu.',

  // 5. Featured Events Section
  events_headline: 'Chuỗi hoạt động đưa di sản vào đời sống',
  events_desc:
    'Hành trình được hiện thực hóa qua các kỳ tọa đàm, triển lãm, trình diễn sáng tác, chương trình kỷ lục, hoạt động giáo dục và kết nối liên ngành Mỗi kỳ là một lát cắt chuyên sâu, đồng thời bổ sung dữ liệu cho hồ sơ 100 năm.',
  featured_event_ids: [1, 2, 3],

  // 6. Featured Artworks / Collections Section
  collections_headline: 'Những tác phẩm viết tiếp mạch di sản',
  collections_desc:
    'Từ "Cửu Cửu - Mạch Ngầm Tinh Hoa", "Bách Thụ Đồng Tam Viên" đến "Du Lãm", các bộ sưu tập không chỉ trưng bày kỹ thuật, mà kể câu chuyện về ký ức, cộng đồng, chuyển động và khả năng ứng dụng mới của sơn mài Việt Nam.',
  featured_collection_ids: [1, 2, 3],

  // 7. Monograph Archive Section
  archive_tag: 'ẤN PHẨM KHẢO CỨU • TẬP I–IV',
  archive_headline: 'KỶ YẾU BÁCH NIÊN SƠN MÀI (1930 — 2030)',
  archive_desc:
    'Công trình khảo cứu đồ sộ quy tụ hơn 500 trang tư liệu, bản vẽ kỹ thuật, bài phê bình nghệ thuật và hình ảnh độ phân giải cao của các kiệt tác quốc gia.',

  // 8. Co-creation CTA Section
  cta_tag: 'ĐỒNG KIẾN TẠO VĂN HÓA',
  cta_headline: 'Cùng viết tiếp hành trình 100 năm',
  cta_desc:
    'Dù bạn là nghệ sĩ, nghệ nhân, nhà nghiên cứu, doanh nghiệp, sinh viên hay người yêu nghệ thuật, luôn có một cách để bạn góp mặt trong hành trình này.',
};

const PageManager = () => {
  const { pageKey = 'home' } = useParams();

  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'json'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Form State
  const [pageId, setPageId] = useState(null);
  const [pageName, setPageName] = useState('Trang chủ');
  const [pageSlug, setPageSlug] = useState('/');
  const [parsedProps, setParsedProps] = useState(DEFAULT_HOME_PROPS);
  const [jsonString, setJsonString] = useState('{}');
  const [jsonError, setJsonError] = useState(null);

  // Catalog items for Home pickers
  const [allEvents, setAllEvents] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [collectionSearch, setCollectionSearch] = useState('');

  // 1. Tải dữ liệu trang chủ từ DB
  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      setLoading(true);
      setJsonError(null);
      setStatusMsg(null);

      try {
        const res = await pageServices.getPageBySlug('/');
        if (res.data && res.data.success && isMounted) {
          const raw = res.data.data;
          const item = Array.isArray(raw)
            ? raw.find((p) => p.slug === '/' || p.slug === 'home' || p.id === 1) || raw[0]
            : raw;

          setPageId(item?.id || 1);
          setPageName(item?.name || 'Trang chủ');
          setPageSlug(item?.slug || '/');

          const propsData = {
            ...DEFAULT_HOME_PROPS,
            ...(item?.props || {}),
          };

          setParsedProps(propsData);
          setJsonString(JSON.stringify(propsData, null, 2));
        } else if (isMounted) {
          setParsedProps(DEFAULT_HOME_PROPS);
          setJsonString(JSON.stringify(DEFAULT_HOME_PROPS, null, 2));
        }
      } catch {
        if (isMounted) {
          setParsedProps(DEFAULT_HOME_PROPS);
          setJsonString(JSON.stringify(DEFAULT_HOME_PROPS, null, 2));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPage();
    return () => { isMounted = false; };
  }, [pageKey]);

  // 2. Tải toàn bộ sự kiện và bộ sưu tập để Admin lựa chọn hiển thị trên Trang Chủ
  useEffect(() => {
    let isMounted = true;
    const fetchCatalogData = async () => {
      try {
        const [evtRes, colRes] = await Promise.all([
          eventServices.getEvents(),
          collectionServices.getCollections(),
        ]);
        if (isMounted) {
          if (evtRes?.data?.success) setAllEvents(evtRes.data.data || []);
          if (colRes?.data?.success) setAllCollections(colRes.data.data || []);
        }
      } catch (err) {
        console.warn('Lỗi tải danh mục sự kiện & bộ sưu tập:', err);
      }
    };

    fetchCatalogData();
    return () => { isMounted = false; };
  }, []);

  // Update a visual field
  const handlePropChange = (field, value) => {
    const updated = { ...parsedProps, [field]: value };
    setParsedProps(updated);
    setJsonString(JSON.stringify(updated, null, 2));
    setJsonError(null);
  };

  // Toggle Sự kiện được hiển thị ngoài trang chủ
  const handleToggleEvent = (id) => {
    const numId = Number(id);
    const currentList = Array.isArray(parsedProps.featured_event_ids)
      ? parsedProps.featured_event_ids.map(Number)
      : [];
    let updated;
    if (currentList.includes(numId)) {
      updated = currentList.filter((item) => item !== numId);
    } else {
      updated = [...currentList, numId];
    }
    handlePropChange('featured_event_ids', updated);
  };

  // Toggle Bộ sưu tập được hiển thị ngoài trang chủ
  const handleToggleCollection = (id) => {
    const numId = Number(id);
    const currentList = Array.isArray(parsedProps.featured_collection_ids)
      ? parsedProps.featured_collection_ids.map(Number)
      : [];
    let updated;
    if (currentList.includes(numId)) {
      updated = currentList.filter((item) => item !== numId);
    } else {
      updated = [...currentList, numId];
    }
    handlePropChange('featured_collection_ids', updated);
  };

  // Select all / deselect all helpers
  const handleSelectAllEvents = () => {
    handlePropChange('featured_event_ids', allEvents.map((e) => Number(e.id)));
  };
  const handleDeselectAllEvents = () => {
    handlePropChange('featured_event_ids', []);
  };
  const handleSelectAllCollections = () => {
    handlePropChange('featured_collection_ids', allCollections.map((c) => Number(c.id)));
  };
  const handleDeselectAllCollections = () => {
    handlePropChange('featured_collection_ids', []);
  };

  // JSON editor handlers
  const handleJsonChange = (e) => {
    const val = e.target.value;
    setJsonString(val);
    try {
      const parsed = JSON.parse(val);
      setParsedProps(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      setJsonString(JSON.stringify(parsed, null, 2));
      setParsedProps(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError('Không thể format: ' + err.message);
    }
  };

  // Lưu cấu hình trang chủ vào DB
  const handleSavePage = async () => {
    let payloadProps = parsedProps;
    if (editorMode === 'json') {
      try {
        payloadProps = JSON.parse(jsonString);
      } catch (err) {
        setJsonError('Cú pháp JSON không hợp lệ: ' + err.message);
        return;
      }
    }

    setSaving(true);
    setStatusMsg(null);

    const payload = {
      name: pageName || 'Trang chủ',
      slug: pageSlug || '/',
      props: payloadProps,
    };

    try {
      const res = await pageServices.savePageBySlug('/', payload);
      if (res.data && res.data.success) {
        if (res.data.data?.id) setPageId(res.data.data.id);
        setStatusMsg({
          type: 'success',
          text: 'Đã lưu toàn bộ nội dung Trang Chủ vào cơ sở dữ liệu thành công! Mọi thay đổi đã hiển thị ngoài trang web.',
        });
      } else {
        setStatusMsg({
          type: 'success',
          text: 'Đã lưu cấu hình Trang Chủ thành công!',
        });
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Lỗi khi lưu dữ liệu: ' + err.message,
      });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  const selectedEventIds = (parsedProps.featured_event_ids || []).map(Number);
  const selectedColIds = (parsedProps.featured_collection_ids || []).map(Number);

  const filteredEvents = allEvents.filter((evt) => {
    const q = eventSearch.toLowerCase();
    return (
      String(evt.id).includes(q) ||
      (evt.name || '').toLowerCase().includes(q) ||
      (evt.category || '').toLowerCase().includes(q)
    );
  });

  const filteredCollections = allCollections.filter((col) => {
    const q = collectionSearch.toLowerCase();
    return (
      String(col.id).includes(q) ||
      (col.name || col.title || '').toLowerCase().includes(q) ||
      (col.code || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-20">
      {/* 1. TOP HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
            <Layers className="w-4 h-4 text-[#FFDF73]" />
            <span>CMS Quản Trị Toàn Diện &bull; Trang Chủ</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFDF73] mt-1">
            Chỉnh Sửa Toàn Bộ Nội Dung: Trang Chủ
          </h1>
          <p className="text-sm text-[#EADBCE]/80 mt-1">
            Điều chỉnh trực tiếp nội dung 8 phần của Trang Chủ. Các mục Sự Kiện và Bộ Sưu Tập hiển thị toàn bộ để bạn tick chọn hiển thị.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37]/50 text-[#FFDF73] hover:bg-[#D4AF37]/15 text-sm font-semibold tracking-wider transition"
          >
            <Eye className="w-4 h-4" />
            <span>Xem Ngoài Trang Chủ</span>
            <ExternalLink className="w-3 h-3 text-[#FFDF73]/70" />
          </Link>

          <button
            type="button"
            onClick={handleSavePage}
            disabled={saving || Boolean(jsonError)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-[#1a0406] font-bold text-sm tracking-wider uppercase transition shadow-[0_4px_16px_rgba(212,155,26,0.35)] cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu...' : 'Lưu Trang Chủ'}</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === 'success'
              ? 'bg-[#1e3a1f]/90 border-emerald-500/60 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-[#3d1115]/90 border-red-500/60 text-red-100'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Editor Mode Switch: Trực quan vs JSON */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditorMode('visual')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              editorMode === 'visual'
                ? 'bg-[#d49b1a] text-black shadow-[0_0_12px_rgba(212,155,26,0.35)]'
                : 'bg-[#180305] border border-[#D4AF37]/30 text-[#EADBCE] hover:text-[#FFDF73]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh Sửa Trực Quan Từng Phần</span>
          </button>

          <button
            type="button"
            onClick={() => setEditorMode('json')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              editorMode === 'json'
                ? 'bg-[#d49b1a] text-black shadow-[0_0_12px_rgba(212,155,26,0.35)]'
                : 'bg-[#180305] border border-[#D4AF37]/30 text-[#EADBCE] hover:text-[#FFDF73]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mã Nguồn JSON</span>
          </button>
        </div>

        {editorMode === 'json' && (
          <button
            type="button"
            onClick={handleFormatJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#48050b] hover:bg-[#5a0910] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold uppercase tracking-wider cursor-pointer transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Định dạng JSON</span>
          </button>
        )}
      </div>

      {/* ================= MODE 1: CHỈNH SỬA TRỰC QUAN ================= */}
      {editorMode === 'visual' && (
        <div className="space-y-8">
          {/* ---------------- SECTION 1: HERO (BANNER ĐẦU TRANG) ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                    Phần 1: Khung Đầu Trang (Hero Banner 100vh)
                  </h3>
                  <p className="text-xs text-[#EADBCE]/70">
                    Vùng xuất hiện đầu tiên khi khách truy cập vào trang chủ.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Huy Hiệu Đầu Trang (badge)
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
                  Phụ Đề / Dòng Dẫn (subtitle)
                </label>
                <input
                  type="text"
                  value={parsedProps.subtitle || ''}
                  onChange={(e) => handlePropChange('subtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Lớn Trung Tâm (headline) *
                </label>
                <input
                  type="text"
                  value={parsedProps.headline || ''}
                  onChange={(e) => handlePropChange('headline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-base font-serif font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Thông Điệp / Câu Triết Lý (quote)
                </label>
                <textarea
                  rows={3}
                  value={parsedProps.quote || ''}
                  onChange={(e) => handlePropChange('quote', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Câu Trích Dẫn Dưới Đáy Banner (bottom_quote)
                </label>
                <input
                  type="text"
                  value={parsedProps.bottom_quote || ''}
                  onChange={(e) => handlePropChange('bottom_quote', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm italic focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 2: CÂU CHUYỆN DI SẢN (HERITAGE STORY) ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                  Phần 2: Câu Chuyện Di Sản (Heritage Story)
                </h3>
                <p className="text-xs text-[#EADBCE]/70">
                  Phần giới thiệu dòng chảy 100 năm và triết lý đồng kiến tạo.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Lớn (story_headline)
                </label>
                <input
                  type="text"
                  value={parsedProps.story_headline || ''}
                  onChange={(e) => handlePropChange('story_headline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-serif font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Đoạn Văn Giới Thiệu 1 (story_p1)
                  </label>
                  <textarea
                    rows={5}
                    value={parsedProps.story_p1 || ''}
                    onChange={(e) => handlePropChange('story_p1', e.target.value)}
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[115px]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Đoạn Văn Giới Thiệu 2 (story_p2)
                  </label>
                  <textarea
                    rows={6}
                    value={parsedProps.story_p2 || ''}
                    onChange={(e) => handlePropChange('story_p2', e.target.value)}
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[135px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#D4AF37]/20">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Câu Khẩu Hiệu Nổi Bật (Callout Headline)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.story_callout || ''}
                    onChange={(e) => handlePropChange('story_callout', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                    Nội Dung Diễn Giải Khẩu Hiệu
                  </label>
                  <textarea
                    rows={4}
                    value={parsedProps.story_callout_desc || ''}
                    onChange={(e) => handlePropChange('story_callout_desc', e.target.value)}
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[90px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 3: BỐN HƯỚNG MỞ (PILLARS) ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                  Phần 3: Bốn Hướng Mở Của Hành Trình (4 Pillars)
                </h3>
                <p className="text-xs text-[#EADBCE]/70">
                  Chỉnh sửa tiêu đề, mô tả và toàn bộ nút khám phá của 4 trụ cột.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Section (pillars_headline)
                </label>
                <input
                  type="text"
                  value={parsedProps.pillars_headline || ''}
                  onChange={(e) => handlePropChange('pillars_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Mô Tả Chung (pillars_desc)
                </label>
                <textarea
                  rows={3}
                  value={parsedProps.pillars_desc || ''}
                  onChange={(e) => handlePropChange('pillars_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              {/* Trụ 1 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73]">TRỤ CỘT 01</span>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Tên trụ cột</label>
                  <input
                    type="text"
                    value={parsedProps.pillar1_title || ''}
                    onChange={(e) => handlePropChange('pillar1_title', e.target.value)}
                    placeholder="Tên trụ cột 1..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Mô tả chi tiết</label>
                  <textarea
                    rows={6}
                    value={parsedProps.pillar1_desc || ''}
                    onChange={(e) => handlePropChange('pillar1_desc', e.target.value)}
                    placeholder="Mô tả trụ cột 1..."
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-2.5 py-2 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[130px]"
                  />
                </div>
                <div className="pt-2 border-t border-[#D4AF37]/20 space-y-1.5 bg-[#180306]/70 p-2 rounded-lg">
                  <label className="block text-[10px] uppercase font-bold text-[#FFDF73]">
                    Nút Khám Phá (CTA)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.pillar1_cta_text ?? 'Khám phá hoạt động'}
                    onChange={(e) => handlePropChange('pillar1_cta_text', e.target.value)}
                    placeholder="Khám phá hoạt động"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={parsedProps.pillar1_cta_link ?? '/journey'}
                    onChange={(e) => handlePropChange('pillar1_cta_link', e.target.value)}
                    placeholder="Link (vd: /journey)"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Trụ 2 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73]">TRỤ CỘT 02</span>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Tên trụ cột</label>
                  <input
                    type="text"
                    value={parsedProps.pillar2_title || ''}
                    onChange={(e) => handlePropChange('pillar2_title', e.target.value)}
                    placeholder="Tên trụ cột 2..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Mô tả chi tiết</label>
                  <textarea
                    rows={6}
                    value={parsedProps.pillar2_desc || ''}
                    onChange={(e) => handlePropChange('pillar2_desc', e.target.value)}
                    placeholder="Mô tả trụ cột 2..."
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-2.5 py-2 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[130px]"
                  />
                </div>
                <div className="pt-2 border-t border-[#D4AF37]/20 space-y-1.5 bg-[#180306]/70 p-2 rounded-lg">
                  <label className="block text-[10px] uppercase font-bold text-[#FFDF73]">
                    Nút Khám Phá (CTA)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.pillar2_cta_text ?? 'Khám phá sản phẩm'}
                    onChange={(e) => handlePropChange('pillar2_cta_text', e.target.value)}
                    placeholder="Khám phá sản phẩm"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={parsedProps.pillar2_cta_link ?? '/collections'}
                    onChange={(e) => handlePropChange('pillar2_cta_link', e.target.value)}
                    placeholder="Link (vd: /collections)"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Trụ 3 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73]">TRỤ CỘT 03</span>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Tên trụ cột</label>
                  <input
                    type="text"
                    value={parsedProps.pillar3_title || ''}
                    onChange={(e) => handlePropChange('pillar3_title', e.target.value)}
                    placeholder="Tên trụ cột 3..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Mô tả chi tiết</label>
                  <textarea
                    rows={6}
                    value={parsedProps.pillar3_desc || ''}
                    onChange={(e) => handlePropChange('pillar3_desc', e.target.value)}
                    placeholder="Mô tả trụ cột 3..."
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-2.5 py-2 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[130px]"
                  />
                </div>
                <div className="pt-2 border-t border-[#D4AF37]/20 space-y-1.5 bg-[#180306]/70 p-2 rounded-lg">
                  <label className="block text-[10px] uppercase font-bold text-[#FFDF73]">
                    Nút Khám Phá (CTA)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.pillar3_cta_text ?? 'Khám phá dự án'}
                    onChange={(e) => handlePropChange('pillar3_cta_text', e.target.value)}
                    placeholder="Khám phá dự án"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={parsedProps.pillar3_cta_link ?? '/events'}
                    onChange={(e) => handlePropChange('pillar3_cta_link', e.target.value)}
                    placeholder="Link (vd: /events)"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>

              {/* Trụ 4 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-[#FFDF73]">TRỤ CỘT 04</span>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Tên trụ cột</label>
                  <input
                    type="text"
                    value={parsedProps.pillar4_title || ''}
                    onChange={(e) => handlePropChange('pillar4_title', e.target.value)}
                    placeholder="Tên trụ cột 4..."
                    className="w-full px-2.5 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#EADBCE]/80 mb-0.5">Mô tả chi tiết</label>
                  <textarea
                    rows={6}
                    value={parsedProps.pillar4_desc || ''}
                    onChange={(e) => handlePropChange('pillar4_desc', e.target.value)}
                    placeholder="Mô tả trụ cột 4..."
                    style={{ fieldSizing: 'content' }}
                    className="w-full px-2.5 py-2 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-xs focus:border-[#FFDF73] focus:outline-none min-h-[130px]"
                  />
                </div>
                <div className="pt-2 border-t border-[#D4AF37]/20 space-y-1.5 bg-[#180306]/70 p-2 rounded-lg">
                  <label className="block text-[10px] uppercase font-bold text-[#FFDF73]">
                    Nút Khám Phá (CTA)
                  </label>
                  <input
                    type="text"
                    value={parsedProps.pillar4_cta_text ?? 'Khám phá thể nghiệm'}
                    onChange={(e) => handlePropChange('pillar4_cta_text', e.target.value)}
                    placeholder="Khám phá thể nghiệm"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-semibold focus:border-[#FFDF73] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={parsedProps.pillar4_cta_link ?? '/archive'}
                    onChange={(e) => handlePropChange('pillar4_cta_link', e.target.value)}
                    placeholder="Link (vd: /archive)"
                    className="w-full px-2.5 py-1 rounded bg-[#100203] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px] focus:border-[#FFDF73] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Nút lớn dưới đáy Section 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#D4AF37]/25">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Chữ Nút Cuối Section 3 (pillars_bottom_cta_text)
                </label>
                <input
                  type="text"
                  value={parsedProps.pillars_bottom_cta_text ?? 'XEM CHI TIẾT HỆ SINH THÁI'}
                  onChange={(e) => handlePropChange('pillars_bottom_cta_text', e.target.value)}
                  placeholder="XEM CHI TIẾT HỆ SINH THÁI"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-xs font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Đường Dẫn Nút Cuối Section 3 (pillars_bottom_cta_link)
                </label>
                <input
                  type="text"
                  value={parsedProps.pillars_bottom_cta_link ?? '#mo-hinh'}
                  onChange={(e) => handlePropChange('pillars_bottom_cta_link', e.target.value)}
                  placeholder="#mo-hinh hoặc /journey"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FFDF73] text-xs focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 4: MÔ HÌNH VẬN HÀNH (PIPELINE) ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                  Phần 4: Mô Hình Vận Hành (LAB, STUDIO, SHOWCASE, MARKET)
                </h3>
                <p className="text-xs text-[#EADBCE]/70">
                  Chu trình từ ý tưởng nghiên cứu đến giá trị thương mại hóa di sản.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Section
                </label>
                <input
                  type="text"
                  value={parsedProps.pipeline_headline || ''}
                  onChange={(e) => handlePropChange('pipeline_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Mô Tả Chung
                </label>
                <textarea
                  rows={3}
                  value={parsedProps.pipeline_desc || ''}
                  onChange={(e) => handlePropChange('pipeline_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-1.5">
                <span className="text-[10px] font-mono text-[#FFDF73] font-bold">BƯỚC 01 &bull; KHỞI ĐỘNG</span>
                <input
                  type="text"
                  value={parsedProps.step1_title || 'LAB'}
                  onChange={(e) => handlePropChange('step1_title', e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  value={parsedProps.step1_sub || ''}
                  onChange={(e) => handlePropChange('step1_sub', e.target.value)}
                  placeholder="Phụ đề..."
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px]"
                />
                <textarea
                  rows={4}
                  value={parsedProps.step1_desc || ''}
                  onChange={(e) => handlePropChange('step1_desc', e.target.value)}
                  placeholder="Mô tả..."
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-2 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-[11px] min-h-[85px] focus:outline-none focus:border-[#FFDF73]"
                />
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-1.5">
                <span className="text-[10px] font-mono text-[#FFDF73] font-bold">BƯỚC 02 &bull; SÁNG TẠO</span>
                <input
                  type="text"
                  value={parsedProps.step2_title || 'STUDIO'}
                  onChange={(e) => handlePropChange('step2_title', e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  value={parsedProps.step2_sub || ''}
                  onChange={(e) => handlePropChange('step2_sub', e.target.value)}
                  placeholder="Phụ đề..."
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px]"
                />
                <textarea
                  rows={4}
                  value={parsedProps.step2_desc || ''}
                  onChange={(e) => handlePropChange('step2_desc', e.target.value)}
                  placeholder="Mô tả..."
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-2 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-[11px] min-h-[85px] focus:outline-none focus:border-[#FFDF73]"
                />
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-1.5">
                <span className="text-[10px] font-mono text-[#FFDF73] font-bold">BƯỚC 03 &bull; TRƯNG BÀY</span>
                <input
                  type="text"
                  value={parsedProps.step3_title || 'SHOWCASE'}
                  onChange={(e) => handlePropChange('step3_title', e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  value={parsedProps.step3_sub || ''}
                  onChange={(e) => handlePropChange('step3_sub', e.target.value)}
                  placeholder="Phụ đề..."
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px]"
                />
                <textarea
                  rows={4}
                  value={parsedProps.step3_desc || ''}
                  onChange={(e) => handlePropChange('step3_desc', e.target.value)}
                  placeholder="Mô tả..."
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-2 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-[11px] min-h-[85px] focus:outline-none focus:border-[#FFDF73]"
                />
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#D4AF37]/25 space-y-1.5">
                <span className="text-[10px] font-mono text-[#FFDF73] font-bold">BƯỚC 04 &bull; THƯƠNG MẠI</span>
                <input
                  type="text"
                  value={parsedProps.step4_title || 'MARKET'}
                  onChange={(e) => handlePropChange('step4_title', e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  value={parsedProps.step4_sub || ''}
                  onChange={(e) => handlePropChange('step4_sub', e.target.value)}
                  placeholder="Phụ đề..."
                  className="w-full px-2 py-1 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#FFDF73] text-[11px]"
                />
                <textarea
                  rows={4}
                  value={parsedProps.step4_desc || ''}
                  onChange={(e) => handlePropChange('step4_desc', e.target.value)}
                  placeholder="Mô tả..."
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-2 py-1.5 rounded bg-[#1e0407] border border-[#D4AF37]/30 text-[#EADBCE] text-[11px] min-h-[85px] focus:outline-none focus:border-[#FFDF73]"
                />
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 5: SỰ KIỆN NỔI BẬT & LỰA CHỌN SỰ KIỆN HIỂN THỊ ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/45 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                  <Calendar className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                    Phần 5: Sự Kiện Nổi Bật Ngoài Trang Chủ
                  </h3>
                  <p className="text-xs text-[#EADBCE]/80">
                    Toàn bộ sự kiện trong bảng Sự Kiện hiển thị dưới đây. Hãy tick chọn những sự kiện bạn muốn xuất hiện ngoài trang chủ.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="px-3 py-1 rounded bg-[#2a060a] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73]">
                  Đã chọn: <strong className="text-white">{selectedEventIds.length}</strong> / {allEvents.length} sự kiện
                </span>
                <button
                  type="button"
                  onClick={handleSelectAllEvents}
                  className="text-xs text-[#EADBCE] hover:text-[#FFDF73] underline px-1 cursor-pointer"
                >
                  Chọn hết
                </button>
                <span className="text-[#D4AF37]/40">&bull;</span>
                <button
                  type="button"
                  onClick={handleDeselectAllEvents}
                  className="text-xs text-[#EADBCE] hover:text-red-400 underline px-1 cursor-pointer"
                >
                  Bỏ chọn
                </button>
              </div>
            </div>

            {/* Văn bản của Section Sự kiện */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Section Sự Kiện
                </label>
                <input
                  type="text"
                  value={parsedProps.events_headline || ''}
                  onChange={(e) => handlePropChange('events_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Mô Tả Section Sự Kiện
                </label>
                <textarea
                  rows={3}
                  value={parsedProps.events_desc || ''}
                  onChange={(e) => handlePropChange('events_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[75px]"
                />
              </div>
            </div>

            {/* Thanh tìm kiếm sự kiện */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Tìm kiếm sự kiện theo tên, thể loại, mã ID..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/25 text-xs text-white focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            {/* Danh sách toàn bộ sự kiện để Admin tick chọn */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {filteredEvents.map((evt) => {
                const isSelected = selectedEventIds.includes(Number(evt.id));
                const rawImg = evt.thumbnail_url || evt.cover_image || evt.image;
                const eventDate =
                  evt.date_display || (evt.event_date ? new Date(evt.event_date).toLocaleDateString('vi-VN') : '2026');

                return (
                  <div
                    key={evt.id}
                    onClick={() => handleToggleEvent(evt.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      isSelected
                        ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-[#FFDF73]'
                        : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1a0407]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#d49b1a] text-black font-bold'
                          : 'border border-[#D4AF37]/50 bg-[#0a0102]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="w-16 h-14 rounded-lg bg-[#0e0203] border border-[#D4AF37]/30 overflow-hidden shrink-0 flex items-center justify-center">
                      {rawImg ? (
                        <img
                          src={getImageUrl(rawImg)}
                          alt={evt.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <Calendar className="w-5 h-5 text-[#D4AF37]/40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#FFDF73] font-bold">#{evt.id}</span>
                        {evt.category && (
                          <span className="text-[10px] uppercase tracking-wider text-[#FFDF73]/80 truncate">
                            {evt.category}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-xs font-bold text-white truncate mt-0.5">
                        {evt.name || evt.title}
                      </h4>
                      <p className="text-[10px] text-[#EADBCE]/70 truncate mt-0.5">
                        {evt.location ? `${evt.location} • ` : ''}{eventDate}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- SECTION 6: BỘ SƯU TẬP & LỰA CHỌN BỘ SƯU TẬP HIỂN THỊ ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/45 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                  <Palette className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                    Phần 6: Bộ Sưu Tập Nổi Bật Ngoài Trang Chủ
                  </h3>
                  <p className="text-xs text-[#EADBCE]/80">
                    Toàn bộ bộ sưu tập trong bảng Bộ Sưu Tập hiển thị dưới đây. Hãy tick chọn những bộ sưu tập bạn muốn xuất hiện ngoài trang chủ.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="px-3 py-1 rounded bg-[#2a060a] border border-[#D4AF37]/40 text-xs font-bold text-[#FFDF73]">
                  Đã chọn: <strong className="text-white">{selectedColIds.length}</strong> / {allCollections.length} bộ sưu tập
                </span>
                <button
                  type="button"
                  onClick={handleSelectAllCollections}
                  className="text-xs text-[#EADBCE] hover:text-[#FFDF73] underline px-1 cursor-pointer"
                >
                  Chọn hết
                </button>
                <span className="text-[#D4AF37]/40">&bull;</span>
                <button
                  type="button"
                  onClick={handleDeselectAllCollections}
                  className="text-xs text-[#EADBCE] hover:text-red-400 underline px-1 cursor-pointer"
                >
                  Bỏ chọn
                </button>
              </div>
            </div>

            {/* Văn bản của Section Bộ sưu tập */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Section Bộ Sưu Tập
                </label>
                <input
                  type="text"
                  value={parsedProps.collections_headline || ''}
                  onChange={(e) => handlePropChange('collections_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Mô Tả Section Bộ Sưu Tập
                </label>
                <textarea
                  rows={4}
                  value={parsedProps.collections_desc || ''}
                  onChange={(e) => handlePropChange('collections_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[90px]"
                />
              </div>
            </div>

            {/* Thanh tìm kiếm bộ sưu tập */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={collectionSearch}
                onChange={(e) => setCollectionSearch(e.target.value)}
                placeholder="Tìm kiếm bộ sưu tập theo tên, mã code, thời kỳ..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/25 text-xs text-white focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            {/* Danh sách toàn bộ bộ sưu tập để Admin tick chọn */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {filteredCollections.map((col) => {
                const isSelected = selectedColIds.includes(Number(col.id));
                const rawImg = col.cover_image || col.thumbnail_url || col.image;

                return (
                  <div
                    key={col.id}
                    onClick={() => handleToggleCollection(col.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      isSelected
                        ? 'bg-[#3d090f] border-[#FFDF73] shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-[#FFDF73]'
                        : 'bg-[#100203]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1a0407]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#d49b1a] text-black font-bold'
                          : 'border border-[#D4AF37]/50 bg-[#0a0102]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="w-16 h-14 rounded-lg bg-[#0e0203] border border-[#D4AF37]/30 overflow-hidden shrink-0 flex items-center justify-center">
                      {rawImg ? (
                        <img
                          src={getImageUrl(rawImg)}
                          alt={col.name || col.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <Palette className="w-5 h-5 text-[#D4AF37]/40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#FFDF73] font-bold">#{col.id}</span>
                        {col.code && (
                          <span className="text-[10px] uppercase tracking-wider text-[#FFDF73]/80 truncate">
                            {col.code}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-xs font-bold text-white truncate mt-0.5">
                        {col.name || col.title}
                      </h4>
                      <p className="text-[10px] text-[#EADBCE]/70 truncate mt-0.5">
                        {col.subtitle || col.description || 'Bộ sưu tập sơn mài hội họa'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- SECTION 7: KỶ YẾU ARCHIVE ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                <BookOpen className="w-4 h-4 text-[#FFDF73]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                  Phần 7: Kỷ Yếu &amp; Kho Lưu Trữ (Monograph Archive)
                </h3>
                <p className="text-xs text-[#EADBCE]/70">
                  Thông tin ấn phẩm nghiên cứu 100 năm sơn mài trên trang chủ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Nhãn Ấn Phẩm (archive_tag)
                </label>
                <input
                  type="text"
                  value={parsedProps.archive_tag || ''}
                  onChange={(e) => handlePropChange('archive_tag', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Kỷ Yếu (archive_headline)
                </label>
                <input
                  type="text"
                  value={parsedProps.archive_headline || ''}
                  onChange={(e) => handlePropChange('archive_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Mô Tả Kỷ Yếu (archive_desc)
                </label>
                <textarea
                  rows={4}
                  value={parsedProps.archive_desc || ''}
                  onChange={(e) => handlePropChange('archive_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[90px]"
                />
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 8: ĐỒNG KIẾN TẠO VĂN HÓA (CTA) ---------------- */}
          <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#D4AF37]/25 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3a080c] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                <Handshake className="w-4 h-4 text-[#FFDF73]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FFDF73]">
                  Phần 8: Kêu Gọi Đồng Kiến Tạo (Co-Creation CTA)
                </h3>
                <p className="text-xs text-[#EADBCE]/70">
                  Phần chân trang kêu gọi đối tác, nghệ nhân và công chúng tham gia hành trình.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Nhãn Kêu Gọi (cta_tag)
                </label>
                <input
                  type="text"
                  value={parsedProps.cta_tag || ''}
                  onChange={(e) => handlePropChange('cta_tag', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Tiêu Đề Kêu Gọi (cta_headline)
                </label>
                <input
                  type="text"
                  value={parsedProps.cta_headline || ''}
                  onChange={(e) => handlePropChange('cta_headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-white text-sm font-bold focus:border-[#FFDF73] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#FFDF73] mb-1">
                  Thông Điệp Kêu Gọi (cta_desc)
                </label>
                <textarea
                  rows={4}
                  value={parsedProps.cta_desc || ''}
                  onChange={(e) => handlePropChange('cta_desc', e.target.value)}
                  style={{ fieldSizing: 'content' }}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#100203] border border-[#D4AF37]/35 text-[#FAF7F2] text-sm focus:border-[#FFDF73] focus:outline-none min-h-[90px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: MÃ NGUỒN JSON ================= */}
      {editorMode === 'json' && (
        <div className="p-6 rounded-2xl bg-[#1e0508] border border-[#D4AF37]/35 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-[#EADBCE]/80 border-b border-[#D4AF37]/20 pb-2">
            <span>Mã nguồn JSON trường <code>props</code> của Trang Chủ trong MySQL</span>
            <span className="text-[#FFDF73] font-mono">pages.props</span>
          </div>

          {jsonError && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono">
              Lỗi cú pháp JSON: {jsonError}
            </div>
          )}

          <textarea
            rows={24}
            value={jsonString}
            onChange={handleJsonChange}
            spellCheck={false}
            className="w-full p-4 rounded-xl font-mono text-[13px] leading-relaxed bg-[#0d0203] border border-[#D4AF37]/40 text-[#FAF7F2] focus:outline-none focus:border-[#FFDF73] shadow-inner"
          />
        </div>
      )}

      {/* Fixed Save Bar at bottom */}
      <div className="sticky bottom-4 z-30 p-4 rounded-xl bg-[#1a0407]/95 border border-[#D4AF37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#EADBCE]">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Sẵn sàng lưu cấu hình Trang Chủ vào cơ sở dữ liệu</span>
        </div>
        <button
          type="button"
          onClick={handleSavePage}
          disabled={saving || Boolean(jsonError)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d49b1a] hover:bg-[#e9c349] text-black font-bold text-sm tracking-wider uppercase transition shadow cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
        </button>
      </div>
    </div>
  );
};

export default PageManager;
