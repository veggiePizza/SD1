const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// Use the API routes (All routes prefixed with /api)
router.use('/api', apiRouter);

// --- Static Routes for React App ---
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve the frontend's index.html file at the root route (/)
  router.get('/', (req, res) => {
    // Set XSRF-TOKEN cookie for CSRF protection
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')  // Path to React build's index.html
    );
  });

  // Serve static assets (JS, CSS, images) from React's build folder
  router.use(express.static(path.resolve(__dirname, '../../frontend/build')));

  // For any route that does not start with /api, send index.html (for React Router to handle)
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());  // Set XSRF-TOKEN cookie
    res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')  // Serve index.html for React to handle routing
    );
  });
}

// --- CSRF Token Handling in Development ---
// In development mode, provide a route to restore the CSRF token
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());  // Set the XSRF-TOKEN cookie
    res.status(201).json({});  // Respond with a success status
  });
}

module.exports = router;
