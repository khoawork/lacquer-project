const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

// Settings
router.get('/settings', siteController.getSettings);
router.put('/settings/:key', siteController.updateSetting);

// Menus
router.get('/menus', siteController.getMenus);
router.get('/menus/:menuKey', siteController.getMenuByKey);
router.post('/menus/:menuKey', siteController.saveMenu);

// Forms
router.get('/submissions', siteController.getSubmissions);
router.get('/submissions/:id', siteController.getSubmissionById);
router.post('/submissions', siteController.createSubmission);
router.put('/submissions/:id/status', siteController.updateSubmissionStatus);
router.delete('/submissions/:id', siteController.deleteSubmission);

module.exports = router;

