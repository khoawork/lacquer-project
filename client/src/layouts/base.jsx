import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const BaseLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#28090d] text-stone-100 selection:bg-[#521515] selection:text-[#FFDF73]">
      <Header />
      <main className="flex-1 w-full">
        {/* Nơi nội dung các trang con hiển thị */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
