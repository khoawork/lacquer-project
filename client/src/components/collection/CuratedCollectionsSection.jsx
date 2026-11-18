import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Palette,
  Grid,
  Layers,
  RefreshCw,
  Eye,
  FolderKanban,
  Filter,
  ChevronDown,
  Check,
} from 'lucide-react';
import collectionServices from '../../services/collectionServices';

const CuratedCollectionsSection = ({ pageProps = null }) => {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const selectedColIds = (
    pageProps?.featured_collection_ids ||
    pageProps?.selected_collection_ids ||
    []
  ).map(Number);

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tải danh sách thể loại bộ sưu tập (id, name) từ DB
  useEffect(() => {
    let isMounted = true;
    collectionServices
      .getCategories()
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data) && isMounted) {
          setCategories(res.data.data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Đọc danh sách bộ sưu tập theo category_id từ cơ sở dữ liệu qua API
  useEffect(() => {
    let isMounted = true;
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const params =
          activeCategoryId && activeCategoryId !== 'all'
            ? { category_id: Number(activeCategoryId) }
            : {};
        const res = await collectionServices.getCollections(params);
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          if (selectedColIds.length > 0) {
            const picked = list.filter((col) => selectedColIds.includes(Number(col.id)));
            setCollections(
              picked.length > 0 || (activeCategoryId && activeCategoryId !== 'all')
                ? picked
                : list
            );
          } else {
            setCollections(list);
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải bộ sưu tập từ database:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCollections();
    return () => {
      isMounted = false;
    };
  }, [activeCategoryId, JSON.stringify(selectedColIds)]);

  const categoryOptions = useMemo(() => {
    const base = [{ id: 'all', name: 'Tất cả' }];
    categories.forEach((cat) => {
      if (cat && cat.id !== undefined && cat.name) {
        base.push({ id: Number(cat.id), name: cat.name });
      }
    });
    return base;
  }, [categories]);

  const selectedOption =
    categoryOptions.find(
      (c) =>
        (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all')) ||
        (c.id !== 'all' && Number(c.id) === Number(activeCategoryId))
    ) || categoryOptions[0];

  const filteredCollections = useMemo(() => {
    if (!activeCategoryId || activeCategoryId === 'all') return collections;
    return collections.filter((col) => Number(col.category_id) === Number(activeCategoryId));
  }, [collections, activeCategoryId]);

  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 space-y-20 md:space-y-28"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #26080b 0%, #1a0507 45%, #120304 90%)',
      }}
      id="bo-suu-tap"
    >
      {/* Thanh bộ lọc Bộ sưu tập theo Category ID */}
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4 border-b border-[#D4AF37]/20 pb-4 relative z-30">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rotate-45 bg-[#FFDF73] shadow-[0_0_8px_rgba(255,223,115,0.7)]" />
          <span className="font-sans text-base md:text-lg font-bold text-gold-gradient uppercase tracking-wide">
            {selectedOption.id === 'all' ? 'Tất cả bộ sưu tập' : selectedOption.name}
          </span>
        </div>

        <div className="relative ml-auto" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1c0508]/90 hover:bg-[#2c080d] border border-[#D4AF37]/40 hover:border-[#E6CA65] text-[#FAF7F2] text-xs md:text-sm font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Filter className="w-4 h-4 text-[#E6CA65]" />
            <span className="text-[#EADBCE]/75 normal-case font-sans font-medium text-xs md:text-sm">
              Phân loại:
            </span>
            <span className="text-[#E6CA65] font-bold max-w-[160px] sm:max-w-none truncate">
              {selectedOption.name}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#E6CA65] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl bg-[#180406]/98 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]/80 border-b border-[#D4AF37]/20 mb-1 flex items-center justify-between">
                <span>Chọn phân loại bộ sưu tập</span>
                <span className="text-[10px] text-[#EADBCE]/50">
                  {categoryOptions.length} danh mục
                </span>
              </div>
              <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar">
                {categoryOptions.map((cat) => {
                  const isSelected = cat.id === selectedOption.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategoryId(cat.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans uppercase tracking-wider text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#1a0507] font-bold shadow-md'
                          : 'text-[#FAF7F2]/85 hover:bg-[#2b080d] hover:text-[#E6CA65]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3] shrink-0 text-[#1a0507]" />
                        ) : (
                          <span className="w-4 shrink-0" />
                        )}
                        <span className="truncate">{cat.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-[#FFDF73] gap-3 font-sans">
          <RefreshCw className="w-6 h-6 animate-spin text-[#FFDF73]" />
          <p className="text-sm tracking-wider">Đang nạp các bộ sưu tập di sản từ cơ sở dữ liệu...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && filteredCollections.length === 0 && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-red-500/40 bg-red-950/30 text-red-200 text-center font-sans">
          <p className="font-bold text-base mb-1">Không thể tải dữ liệu bộ sưu tập.</p>
          <p className="text-xs text-red-300/80">Chi tiết: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCollections.length === 0 && (
        <div className="max-w-2xl mx-auto p-12 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 space-y-2">
          <FolderKanban className="w-8 h-8 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-lg font-bold text-[#FFDF73]">
            Chưa có bộ sưu tập nào trong danh mục “{selectedOption.name}”
          </h4>
          <p className="text-xs text-[#FAF7F2]/60">
            Dữ liệu sẽ hiển thị ngay khi Ban Giám Tuyển nạp bộ sưu tập qua trang Quản Trị.
          </p>
        </div>
      )}

      {/* Dynamic Collections Loop */}
      {!loading &&
        filteredCollections.map((col, idx) => {
          const isEven = idx % 2 === 1;
          const firstArtwork = col.artworks && col.artworks.length > 0 ? col.artworks[0] : null;

          return (
            <div
              key={col.id}
              className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10"
            >
              {/* Visual Card Column */}
              <div className={`lg:col-span-6 relative group ${isEven ? 'lg:order-2' : ''}`}>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/35 to-[#521515]/45 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                <div className="relative rounded-2xl p-3 md:p-4 overflow-hidden card-lacquer">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-[#0d0203]">
                    {col.cover_image ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={col.name}
                        src={col.cover_image}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#FFDF73] font-sans">
                        <span>Hình ảnh bộ sưu tập</span>
                      </div>
                    )}
                    {/* Archival Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#100203]/90 backdrop-blur-md flex items-center justify-between text-[#EADBCE] border border-[#D4AF37]/35 shadow-lg">
                      <span className="font-sans tracking-wider uppercase text-[#FFDF73] font-bold text-[12px] sm:text-[13px]">
                        Mã định danh: #{col.id}
                      </span>
                      {firstArtwork?.dimensions && (
                        <span className="font-sans tracking-wider text-[#FAF7F2]/90 text-[12px] sm:text-[13px]">
                          {firstArtwork.dimensions}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative & Concept Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded"
                    style={{
                      background: 'rgba(82, 21, 21, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                    }}
                  >
                    <span className="font-sans text-[#FFDF73] uppercase tracking-[0.2em] text-[12px] font-bold">
                      BỘ SƯU TẬP 0{idx + 1}
                    </span>
                  </div>
                  {(col.category_name || col.category) && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#2a070c] border border-[#D4AF37]/30">
                      <span className="font-sans text-[#EADBCE] uppercase tracking-wider text-[11px] font-semibold">
                        {col.category_name || col.category}
                      </span>
                    </div>
                  )}
                </div>

                <h2 className="font-sans text-[30px] sm:text-[36px] md:text-[42px] leading-tight font-bold text-gold-gradient uppercase">
                  {col.name}
                </h2>

                <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 leading-[1.85] text-justify">
                  {col.description}
                </p>

                {/* Details list from first artwork if available */}
                <div className="space-y-3.5 pt-2 font-body text-[15px] md:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
                  {firstArtwork?.material && (
                    <div className="flex items-start gap-3">
                      <Palette className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-sans text-[#FFDF73] tracking-wide uppercase text-[15px]">
                          Chất liệu:
                        </strong>{' '}
                        {firstArtwork.material}
                      </div>
                    </div>
                  )}

                  {firstArtwork?.artist && (
                    <div className="flex items-start gap-3">
                      <Grid className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-sans text-[#FFDF73] tracking-wide uppercase text-[15px]">
                          Tác giả / Nghệ nhân:
                        </strong>{' '}
                        {firstArtwork.artist}
                      </div>
                    </div>
                  )}

                  {col.artworks && col.artworks.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-sans text-[#FFDF73] tracking-wide uppercase text-[15px]">
                          Quy mô tác phẩm:
                        </strong>{' '}
                        {col.artworks.length} tác phẩm đã được định danh số lưu trữ trong cơ sở dữ liệu.
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <a
                    href="/contact"
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-[13px] md:text-[14px] uppercase tracking-wider font-bold shadow-lg"
                  >
                    <span>Khám phá bộ sưu tập</span>
                    <Eye className="w-4 h-4 font-bold" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default CuratedCollectionsSection;
