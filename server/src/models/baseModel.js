const { sequelize, DataTypes } = require('../config/db');

// Import all models
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

// Sync function helper
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize: Database tables synchronized successfully.');
  } catch (error) {
    console.error('❌ Sequelize: Table sync failed:', error.message);
  }
};

module.exports = {
  sequelize,
  DataTypes,
  syncDatabase,

  // Models
  Page,
  Event,
  Collection,
  Artwork,
  NewsArticle,
  SiteSetting,
  Menu,
  FormSubmission,
};
