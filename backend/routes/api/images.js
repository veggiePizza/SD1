const express = require('express');
const path = require('path');
const router = express.Router();

/**
 * Serve static files (images) from the 'images' directory.
 * The images will be accessible through the base URL of the server.
 */
router.use('/', express.static(path.join(__dirname, '../../db/images')));

module.exports = router;
