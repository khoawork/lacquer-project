const mysql = require('mysql2/promise');
const { sequelize, DataTypes } = require('../config/db');

// Import all models
const { User } = require('./userModel');
const { Page } = require('./pageModel');
const { EventCategory, Event } = require('./eventModel');
const { CollectionCategory, Collection, Artwork } = require('./collectionModel');
const { NewsCategory, NewsArticle } = require('./newsModel');
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

// Category Relationships (1 - N)
NewsCategory.hasMany(NewsArticle, {
  foreignKey: 'category_id',
  as: 'articles',
  onDelete: 'SET NULL',
});
NewsArticle.belongsTo(NewsCategory, {
  foreignKey: 'category_id',
  as: 'categoryDetail',
});

EventCategory.hasMany(Event, {
  foreignKey: 'category_id',
  as: 'events',
  onDelete: 'SET NULL',
});
Event.belongsTo(EventCategory, {
  foreignKey: 'category_id',
  as: 'categoryDetail',
});

CollectionCategory.hasMany(Collection, {
  foreignKey: 'category_id',
  as: 'collections',
  onDelete: 'SET NULL',
});
Collection.belongsTo(CollectionCategory, {
  foreignKey: 'category_id',
  as: 'categoryDetail',
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

    // Đọc trước dữ liệu cột category chuỗi cũ (nếu còn tồn tại) trước khi sync({ alter: true })
    let legacyNewsCats = [];
    let legacyEventCats = [];
    try {
      const [nRows] = await sequelize.query('SELECT id, category FROM news_articles WHERE category IS NOT NULL');
      if (Array.isArray(nRows)) legacyNewsCats = nRows;
    } catch {}
    try {
      const [eRows] = await sequelize.query('SELECT id, category FROM events WHERE category IS NOT NULL');
      if (Array.isArray(eRows)) legacyEventCats = eRows;
    } catch {}

    await sequelize.sync({ alter: true });

    // Khởi tạo danh mục mặc định và ánh xạ dữ liệu cũ sang category_id
    const defaultNewsCats = [
      'Dòng chảy 100 năm',
      'Nghiên cứu & Học thuật',
      'Từ xưởng đến đời sống',
      'Người giữ lửa',
      'Sơn mài 2.0',
      'Nhật ký Hành trình',
      'Góc nhìn quốc tế',
      'Sự kiện & Tọa đàm',
      'Chân dung nghệ sĩ',
    ];
    for (const row of legacyNewsCats) {
      const cName = String(row.category || '').trim();
      if (cName && !defaultNewsCats.includes(cName)) defaultNewsCats.push(cName);
    }
    const newsCatCount = await NewsCategory.count();
    if (newsCatCount === 0 || legacyNewsCats.length > 0) {
      for (const name of defaultNewsCats) {
        await NewsCategory.findOrCreate({ where: { name }, defaults: { name } });
      }
    }
    for (const row of legacyNewsCats) {
      const cName = String(row.category || '').trim();
      if (cName) {
        const catRecord = await NewsCategory.findOne({ where: { name: cName } });
        if (catRecord) {
          await NewsArticle.update({ category_id: catRecord.id }, { where: { id: row.id } });
        }
      }
    }
    // Gán category_id cho các bài viết chưa có category_id
    const unlinkedNews = await NewsArticle.findAll({ where: { category_id: null }, order: [['id', 'ASC']] });
    if (unlinkedNews.length > 0) {
      const newsCatByIdMap = {
        1: 'Dòng chảy 100 năm',
        2: 'Từ xưởng đến đời sống',
        3: 'Người giữ lửa',
        4: 'Sơn mài 2.0',
        5: 'Nhật ký Hành trình',
        6: 'Góc nhìn quốc tế',
      };
      for (const art of unlinkedNews) {
        const targetName = newsCatByIdMap[art.id] || 'Dòng chảy 100 năm';
        const [catRecord] = await NewsCategory.findOrCreate({
          where: { name: targetName },
          defaults: { name: targetName },
        });
        await art.update({ category_id: catRecord.id });
      }
    }

    const defaultEventCats = [
      'Tọa đàm chuyên sâu',
      'Tọa đàm – Hội thảo',
      'Đại triển lãm',
      'Triển lãm',
      'Workshop – Open Studio',
      'Kỷ lục – Vinh danh',
      'Giáo dục – Cộng đồng',
    ];
    for (const row of legacyEventCats) {
      const cName = String(row.category || '').trim();
      if (cName && !defaultEventCats.includes(cName)) defaultEventCats.push(cName);
    }
    const eventCatCount = await EventCategory.count();
    if (eventCatCount === 0 || legacyEventCats.length > 0) {
      for (const name of defaultEventCats) {
        await EventCategory.findOrCreate({ where: { name }, defaults: { name } });
      }
    }
    for (const row of legacyEventCats) {
      const cName = String(row.category || '').trim();
      if (cName) {
        const catRecord = await EventCategory.findOne({ where: { name: cName } });
        if (catRecord) {
          await Event.update({ category_id: catRecord.id }, { where: { id: row.id } });
        }
      }
    }
    // Gán category_id cho các sự kiện chưa có category_id
    const unlinkedEvents = await Event.findAll({ where: { category_id: null }, order: [['id', 'ASC']] });
    if (unlinkedEvents.length > 0) {
      const eventCatByIdMap = {
        1: 'Tọa đàm chuyên sâu',
        2: 'Workshop – Open Studio',
        3: 'Đại triển lãm',
      };
      for (const evt of unlinkedEvents) {
        const targetName = eventCatByIdMap[evt.id] || 'Tọa đàm chuyên sâu';
        const [catRecord] = await EventCategory.findOrCreate({
          where: { name: targetName },
          defaults: { name: targetName },
        });
        await evt.update({ category_id: catRecord.id });
      }
    }

    const defaultColCats = [
      'Di sản Bách niên',
      'Thể nghiệm Đương đại',
      'Đồng sáng tác Cộng đồng',
    ];
    const colCatCount = await CollectionCategory.count();
    if (colCatCount === 0) {
      for (const name of defaultColCats) {
        await CollectionCategory.findOrCreate({ where: { name }, defaults: { name } });
      }
    }
    // Gán category_id mặc định cho các bộ sưu tập chưa có category_id
    const unlinkedCols = await Collection.findAll({ where: { category_id: null } });
    if (unlinkedCols.length > 0) {
      const allColCats = await CollectionCategory.findAll({ order: [['id', 'ASC']] });
      if (allColCats.length > 0) {
        for (let i = 0; i < unlinkedCols.length; i++) {
          const targetCat = allColCats[i % allColCats.length];
          await unlinkedCols[i].update({ category_id: targetCat.id });
        }
      }
    }

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
  EventCategory,
  Event,
  CollectionCategory,
  Collection,
  Artwork,
  NewsCategory,
  NewsArticle,
  SiteSetting,
  Menu,
  FormSubmission,
};
