const { sequelize, DataTypes } = require('../config/db');

/**
 * Model Page:
 * - id: Khóa chính tự tăng
 * - name: Tên trang (Trang chủ, Giới thiệu, Hành trình, v.v.)
 * - slug: Đường dẫn duy nhất của trang (chỉ nằm trong page)
 * - props: Dữ liệu cấu hình, nội dung các section dạng JSON
 */
const Page = sequelize.define(
  'Page',
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
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    props: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    tableName: 'pages',
    timestamps: true,
    underscored: true,
  }
);

module.exports = {
  Page,
};
