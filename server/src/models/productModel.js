const db = require('../config/db');

// Model: Trực tiếp thao tác với cơ sở dữ liệu MySQL
const findAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
  return rows;
};

module.exports = {
  findAllProducts,
};

