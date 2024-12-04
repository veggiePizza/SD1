const router = require('express').Router();

// Importing the various routers for different API endpoints
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const toolsRouter = require('./tools.js');
const reservationsRouter = require('./reservations.js');
const reviewsRouter = require('./reviews.js');
const toolImagesRouter = require('./tool-images.js');
const reviewImagesRouter = require('./review-images.js');
const staticImagesRouter = require('./images.js');
const messagesRouter = require('./messages.js');
const firebaseRouter = require('./firebase');

// Import the middleware for restoring user session
const { restoreUser } = require("../../utils/auth.js");

// Middleware to restore the user before processing any route
router.use(restoreUser);

// Setting up individual route handlers for the API
router.use('/session', sessionRouter);  // Session management routes
router.use('/users', usersRouter);  // User-related routes (authentication, profiles, etc.)
router.use('/tools', toolsRouter);  // Tool management routes (add, edit, view, etc.)
router.use('/images', staticImagesRouter);  // Serve static images
router.use('/reservations', reservationsRouter);  // Reservation-related routes
router.use('/reviews', reviewsRouter);  // Reviews management routes
router.use('/tool-images', toolImagesRouter);  // Tool image management routes
router.use('/review-images', reviewImagesRouter);  // Review image management routes
router.use('/messages', messagesRouter);  // Messaging routes
router.use('/firebase', firebaseRouter);  // Firebase-related routes

/**
 * Error handling middleware.
 * This will catch any errors thrown in the route handlers
 * and send a structured error response with status and message.
 */
router.use((err, req, res, next) => {
  // Ensure the status code is valid (fallback to 500 for unknown errors)
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message, status: statusCode });
});

module.exports = router;
