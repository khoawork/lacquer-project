const mysql = require('mysql2/promise');
const { sequelize, DataTypes } = require('../config/db');

// Import all models
const { User } = require('./userModel');
const { Page } = require('./pageModel');
const { Event } = require('./eventModel');
const { Collection, Artwork } = require('./collectionModel');
const { NewsArticle } = require('./newsModel');
const { SiteSetting, Menu, FormSubmission } = require('./siteModel');

// Define Relationships
Collection.hasMany(Artwork, {
  foreignKey: 'collection_id',
  as: 'artworks',
  onDelete: 'SET NULL',
});

Artwork.belongsTo(Collection, {
  foreignKey: 'collection_id',
  as: 'collection',
});

// Helper tự động kiểm tra và tạo database lacquer_db nếu chưa tồn tại
const ensureDatabaseExists = async () => {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbUser = process.env.DB_USER || 'root';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'lacquer_db';
  const dbPort = Number(process.env.DB_PORT) || 3306;

  try {
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.end();
    return true;
  } catch (err) {
    const code = err.code || err.original?.code;
    if (code === 'ECONNREFUSED') {
      console.error(`\n❌ [LỖI KẾT NỐI DB] Không thể kết nối tới MySQL tại ${dbHost}:${dbPort}`);
      console.error('👉 Nguyên nhân: Dịch vụ MySQL chưa được khởi động.');
      console.error('👉 Khắc phục: Mở Laragon (hoặc XAMPP) và nhấn nút [Start All] để bật MySQL.\n');
    } else if (code === 'ER_ACCESS_DENIED_ERROR') {
      console.error(`\n❌ [LỖI TÀI KHOẢN DB] Sai tài khoản hoặc mật khẩu MySQL (user: "${dbUser}", password: "${dbPassword}")`);
      console.error('👉 Khắc phục: Nếu dùng Laragon mặc định, mật khẩu root thường để trống (DB_PASSWORD= trong file server/.env).\n');
    } else {
      console.error('\n❌ [LỖI DATABASE]:', err.message || err, '\n');
    }
    return false;
  }
};

// Sync function helper
const syncDatabase = async (force = false) => {
  try {
    const dbReady = await ensureDatabaseExists();
    if (!dbReady) return false;

    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize: Database tables synchronized successfully.');
    return true;
  } catch (error) {
    const detail = error.original?.message || error.parent?.message || error.message || error;
    console.error('❌ Sequelize: Table sync failed:', detail);
    return false;
  }
};

module.exports = {
  sequelize,
  DataTypes,
  syncDatabase,

  // Models
  User,
  Page,
  Event,
  Collection,
  Artwork,
  NewsArticle,
  SiteSetting,
  Menu,
  FormSubmission,
};
