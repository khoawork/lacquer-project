const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const { syncDatabase } = require('./models/baseModel');

const PORT = process.env.PORT || 5000;

// Initialize Database & Start Server
async function startServer() {
  try {
    // Tự động kiểm tra và đồng bộ bảng Sequelize
    await syncDatabase();
  } catch (err) {
    console.warn('⚠️ Cảnh báo kết nối Database:', err.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Lacquer Backend Server running on http://127.0.0.1:${PORT}`);
    console.log(`📡 Health check: http://127.0.0.1:${PORT}/api/health`);
  });
}

startServer();
