import React from 'react';
import { ArrowRight, Palette } from 'lucide-react';
import { resolveLeadershipIcon } from '../leadership/leadershipIconRegistry';

export default function ContactRoutesSection({ onSelectRoute, pageProps }) {
  const routesBadge = pageProps?.routes_badge || 'PHƯƠNG THỨC KẾT NỐI';
  const routesTitle = pageProps?.routes_title || 'CÁC TUYẾN THAM GIA ĐỒNG HÀNH';
  const routes =
    Array.isArray(pageProps?.routes) && pageProps.routes.length > 0
      ? pageProps.routes
      : [];

  const renderRouteCard = (route) => {
    const IconComponent = resolveLeadershipIcon(route.icon, Palette);

    return (
      <div
        key={route.key || route.id || route.title}
        className="p-6 md:p-8 rounded-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, rgba(42, 12, 16, 0.75) 0%, rgba(20, 5, 8, 0.9) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="space-y-4">
          <div
            className="w-12 h-12 rounded-lg bg-[#521515]/80 flex items-center justify-center text-[#FFDF73] shadow-[0_0_12px_rgba(255,223,115,0.2)]"
            style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
          >
            <IconComponent className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            {route.badge && (
              <span className="font-sans text-[11px] md:text-xs uppercase tracking-widest block mb-1 font-semibold text-[#FFDF73]">
                {route.badge}
              </span>
            )}
            <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-snug">
              {route.title}
            </h3>
          </div>
          <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#FAF7F2]/90">
            {route.desc}
          </p>
        </div>

        <div
          className="pt-4 mt-6 rounded p-3 flex items-center justify-between"
          style={{
            background: 'rgba(26, 6, 10, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <button
            type="button"
            onClick={() => onSelectRoute && onSelectRoute(route.key || 'contact')}
            className="inline-flex items-center gap-2 font-sans text-xs md:text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded transition-all duration-200 text-[#FFDF73] hover:bg-[#E9C349] hover:text-[#241a00] cursor-pointer"
            style={{ border: '1px solid rgba(212, 175, 55, 0.45)' }}
          >
            <span>{route.buttonText || 'GỬI ĐỀ XUẤT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Bố cục linh hoạt theo số lượng tuyến
  const isFiveRoutes = routes.length === 5;

  return (
    <section
      className="relative w-full py-16 sm:py-20 my-10"
      style={{
        background: 'linear-gradient(rgba(16, 3, 5, 0.4) 0%, rgba(32, 7, 11, 0.65) 50%, rgba(14, 2, 4, 0.5) 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-12">
          {routesBadge && (
            <span className="font-sans text-xs md:text-sm text-[#FFDF73] tracking-[0.25em] uppercase mb-1 font-semibold">
              {routesBadge}
            </span>
          )}
          <h2
            className="font-sans text-3xl sm:text-4xl md:text-5xl text-[#FFDF73] tracking-wide font-bold"
            style={{ textShadow: '0 0 20px rgba(233, 195, 73, 0.3)' }}
          >
            {routesTitle}
          </h2>
        </div>

        {routes.length === 0 ? (
          <div className="p-10 rounded-2xl border border-[#D4AF37]/25 text-center text-[#EADBCE]/80 font-sans bg-[#180406]/70 max-w-xl mx-auto my-8">
            Chưa có dữ liệu
          </div>
        ) : isFiveRoutes ? (
          <>
            {/* Top 3 Routes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.slice(0, 3).map(renderRouteCard)}
            </div>

            {/* Bottom 2 Routes Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-5xl mx-auto">
              {routes.slice(3, 5).map(renderRouteCard)}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map(renderRouteCard)}
          </div>
        )}
      </div>
    </section>
  );
}
