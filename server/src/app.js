const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Gắn route sản phẩm
app.use('/api/products', productRoutes);

module.exports = app;
