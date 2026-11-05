import React, { useState, useEffect } from 'react';
import { Palette, Grid, Sparkles, Layers, RefreshCw, Eye, FolderKanban } from 'lucide-react';
import collectionServices from '../../services/collectionServices';

const CuratedCollectionsSection = ({ pageProps = null }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedColIds = (pageProps?.featured_collection_ids || pageProps?.selected_collection_ids || []).map(Number);

  // Đọc danh sách bộ sưu tập và tác phẩm trực tiếp từ cơ sở dữ liệu qua API (không hardcode)
  useEffect(() => {
    let isMounted = true;
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await collectionServices.getCollections();
        if (res.data && res.data.success && isMounted) {
          const list = res.data.data || [];
          if (selectedColIds.length > 0) {
            const picked = list.filter((col) => selectedColIds.includes(Number(col.id)));
            setCollections(picked.length > 0 ? picked : list);
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
  }, [JSON.stringify(selectedColIds)]);

  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 space-y-28 md:space-y-36"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #26080b 0%, #1a0507 45%, #120304 90%)',
      }}
      id="bo-suu-tap"
    >
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-[#FFDF73] gap-3 font-serif">
          <RefreshCw className="w-6 h-6 animate-spin text-[#FFDF73]" />
          <p className="text-sm tracking-wider">Đang nạp các bộ sưu tập di sản từ cơ sở dữ liệu...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && collections.length === 0 && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-red-500/40 bg-red-950/30 text-red-200 text-center font-serif">
          <p className="font-bold text-base mb-1">Không thể tải dữ liệu bộ sưu tập.</p>
          <p className="text-xs text-red-300/80">Chi tiết: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && collections.length === 0 && (
        <div className="max-w-2xl mx-auto p-12 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-serif bg-[#180406]/70 space-y-2">
          <FolderKanban className="w-8 h-8 text-[#FFDF73] mx-auto opacity-70 mb-2" />
          <h4 className="text-lg font-bold text-[#FFDF73]">Chưa có bộ sưu tập nào được công bố</h4>
          <p className="text-xs text-[#FAF7F2]/60">
            Dữ liệu sẽ hiển thị ngay khi Ban Giám Tuyển nạp bộ sưu tập qua trang Quản Trị.
          </p>
        </div>
      )}

      {/* Dynamic Collections Loop */}
      {!loading &&
        collections.map((col, idx) => {
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
                      <div className="w-full h-full flex items-center justify-center text-[#FFDF73] font-serif">
                        <span>Hình ảnh bộ sưu tập</span>
                      </div>
                    )}
                    {/* Archival Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#100203]/90 backdrop-blur-md flex items-center justify-between text-[#EADBCE] border border-[#D4AF37]/35 shadow-lg">
                      <span className="font-serif tracking-wider uppercase text-[#FFDF73] font-bold text-[12px] sm:text-[13px]">
                        Mã định danh: {col.code || `#COL-${col.id}`}
                      </span>
                      {firstArtwork?.dimensions && (
                        <span className="font-serif tracking-wider text-[#FAF7F2]/90 text-[12px] sm:text-[13px]">
                          {firstArtwork.dimensions}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative & Concept Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded"
                  style={{
                    background: 'rgba(82, 21, 21, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                  }}
                >
                  <span className="font-serif text-[#FFDF73] uppercase tracking-[0.2em] text-[12px] font-bold">
                    BỘ SƯU TẬP 0{idx + 1} &bull; {col.code || 'ĐỘC BẢN DI SẢN'}
                  </span>
                </div>

                <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] leading-tight font-bold text-gold-gradient uppercase">
                  {col.name}
                </h2>

                <p className="font-body text-[16px] md:text-[18px] text-[#FAF7F2]/95 leading-[1.85]">
                  {col.description}
                </p>

                {/* Details list from first artwork if available */}
                <div className="space-y-3.5 pt-2 font-body text-[15px] md:text-[16px] text-[#FAF7F2]/90 leading-relaxed">
                  {firstArtwork?.material && (
                    <div className="flex items-start gap-3">
                      <Palette className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
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
                        <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
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
                        <strong className="font-serif text-[#FFDF73] tracking-wide uppercase text-[15px]">
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
