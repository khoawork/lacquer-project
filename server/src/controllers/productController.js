const productService = require('../services/productService');

// Controller: Tiếp nhận HTTP request và gửi về HTTP response
const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
};

