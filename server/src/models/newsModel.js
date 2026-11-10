const { sequelize, DataTypes } = require('../config/db');

/**
 * Model NewsArticle: Chỉ lưu các thông tin của bài viết/tin tức (không chứa slug)
 */
const NewsArticle = sequelize.define(
  'NewsArticle',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Dòng chảy 100 năm',
    },
    author: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    published_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    thumbnail_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    lead_quote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    read_time: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '5 phút đọc',
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('published', 'draft', 'archived'),
      defaultValue: 'published',
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    views_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'news_articles',
    timestamps: true,
    underscored: true,
  }
);

module.exports = {
  NewsArticle,
};
