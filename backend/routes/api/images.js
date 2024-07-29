const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files from the 'images' directory
router.use('/', express.static(path.join(__dirname, '../../db/images')));

module.exports = router;
