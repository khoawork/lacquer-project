const productModel = require('../models/productModel');

// Service: Xử lý logic nghiệp vụ
const getAllProducts = async () => {
  const products = await productModel.findAllProducts();
  return products;
};

module.exports = {
  getAllProducts,
};

