const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const pageRoutes = require('./routes/pageRoutes');
const eventRoutes = require('./routes/eventRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const siteRoutes = require('./routes/siteRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Phục vụ tệp tĩnh tải lên (/uploads/...)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Hành trình 100 năm Sơn mài Hội họa Việt Nam — CMS API',
  });
});

// CMS API Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/site', siteRoutes);

module.exports = app;
