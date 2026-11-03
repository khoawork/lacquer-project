import React from 'react';

/**
 * FloatingSparkles - Các đốm sao vàng kim bay lơ lửng tự do
 * Chuẩn hóa đồng bộ tuyệt đối theo trang Hành trình (Image 1 làm chuẩn, size 4.5px)
 * - Màu sắc: #FFF2B2 với vầng hào quang vàng kim tinh tế, thanh thoát
 * - Quỹ đạo: translate3d thuần túy, tuyệt đối giữ nguyên kích thước khi bay (không dùng scale)
 */
const FloatingSparkles = ({ size = 4.5 }) => {
  const primarySize = `${size}px`;
  const secondarySize = `${Math.max(2, (size * 0.8).toFixed(1))}px`;

  const glowShadow = `0 0 2px 1px #FFFFFF, 0 0 ${Math.max(4, size * 1.5).toFixed(1)}px 1.5px #FFDF73, 0 0 ${Math.max(6, size * 2.2).toFixed(1)}px 1.5px rgba(255, 215, 100, 0.45)`;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes stardustGlide1 {
          0% { transform: translate3d(0, 0, 0); }
          25% { transform: translate3d(55px, -45px, 0); }
          50% { transform: translate3d(95px, -15px, 0); }
          75% { transform: translate3d(30px, 45px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes stardustGlide2 {
          0% { transform: translate3d(0, 0, 0); }
          25% { transform: translate3d(-60px, -35px, 0); }
          50% { transform: translate3d(-90px, 30px, 0); }
          75% { transform: translate3d(-30px, 50px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes stardustGlide3 {
          0% { transform: translate3d(0, 0, 0); }
          30% { transform: translate3d(-45px, 60px, 0); }
          60% { transform: translate3d(55px, 35px, 0); }
          85% { transform: translate3d(70px, -30px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes stardustGlide4 {
          0% { transform: translate3d(0, 0, 0); }
          30% { transform: translate3d(65px, -40px, 0); }
          60% { transform: translate3d(30px, -80px, 0); }
          85% { transform: translate3d(-40px, -30px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes stardustGlide5 {
          0% { transform: translate3d(0, 0, 0); }
          35% { transform: translate3d(-70px, -45px, 0); }
          70% { transform: translate3d(50px, -60px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .gold-stardust {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 15;
          background-color: #FFF2B2;
          will-change: transform;
        }

        .glide-1 { animation: stardustGlide1 10s ease-in-out infinite; }
        .glide-2 { animation: stardustGlide2 12s ease-in-out infinite; }
        .glide-3 { animation: stardustGlide3 11s ease-in-out infinite; }
        .glide-4 { animation: stardustGlide4 13s ease-in-out infinite; }
        .glide-5 { animation: stardustGlide5 14s ease-in-out infinite; }
      `}</style>

      {/* 10 Đốm sao vàng kim với kích thước kiểm soát chính xác */}
      {/* 1. Mạn trên trái */}
      <div
        className="gold-stardust glide-1"
        style={{ top: '18%', left: '17%', width: primarySize, height: primarySize, boxShadow: glowShadow }}
      />

      {/* 2. Mạn trên phải */}
      <div
        className="gold-stardust glide-2"
        style={{ top: '24%', right: '19%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 3. Mạn dưới phải */}
      <div
        className="gold-stardust glide-3"
        style={{ top: '68%', right: '18%', width: primarySize, height: primarySize, boxShadow: glowShadow }}
      />

      {/* 4. Mạn dưới trái */}
      <div
        className="gold-stardust glide-4"
        style={{ top: '65%', left: '20%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 5. Mạn sườn phải */}
      <div
        className="gold-stardust glide-5"
        style={{ top: '46%', right: '12%', width: primarySize, height: primarySize, boxShadow: glowShadow }}
      />

      {/* 6. Mạn sườn trái */}
      <div
        className="gold-stardust glide-2"
        style={{ top: '44%', left: '14%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 7. Mạn trung tâm trên */}
      <div
        className="gold-stardust glide-3"
        style={{ top: '32%', left: '33%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 8. Mạn trung tâm phải */}
      <div
        className="gold-stardust glide-1"
        style={{ top: '38%', right: '31%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 9. Mạn góc đáy trái */}
      <div
        className="gold-stardust glide-4"
        style={{ top: '78%', left: '28%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />

      {/* 10. Mạn góc đáy phải */}
      <div
        className="gold-stardust glide-5"
        style={{ top: '82%', right: '27%', width: secondarySize, height: secondarySize, boxShadow: glowShadow }}
      />
    </div>
  );
};

export default FloatingSparkles;
