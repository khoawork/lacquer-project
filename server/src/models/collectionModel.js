const { sequelize, DataTypes } = require('../config/db');

/**
 * Model Collection: Chỉ lưu thông tin của bộ sưu tập (không chứa slug)
 */
const Collection = sequelize.define(
  'Collection',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    tableName: 'collections',
    timestamps: true,
    underscored: true,
  }
);

/**
 * Model Artwork: Chỉ lưu thông tin của tác phẩm nghệ thuật (không chứa slug)
 */
const Artwork = sequelize.define(
  'Artwork',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    collection_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dimensions: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'artworks',
    timestamps: true,
    underscored: true,
  }
);

module.exports = {
  Collection,
  Artwork,
};
