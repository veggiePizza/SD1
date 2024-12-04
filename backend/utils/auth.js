const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Reservation, Tool, ReviewImage, Review, ToolImage } = require('../db/models');
const { admin } = require("../firebase/firebaseAdmin");
const { secret, expiresIn } = jwtConfig;

/**
 * Set a token cookie with user data
 * @param {Object} res - Response object
 * @param {Object} user - User data to include in the token
 * @returns {string} The JWT token
 */
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
      { data: user }, // User data to be stored in the token
      secret,
      { expiresIn: parseInt(expiresIn) } // Set the expiration time of the token (1 week)
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token as an HTTP-only cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,           // Cookie is not accessible via JavaScript
    secure: isProduction,     // Only set cookie over HTTPS in production
    sameSite: isProduction && "Lax" // CSRF protection for production
  });

  return token;
};

/**
 * Restore the user from the token cookie
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next(); // If token verification fails, proceed without setting user

    try {
      req.user = jwtPayload.data; // Attach user data to the request object
    } catch (e) {
      res.clearCookie('token'); // Clear invalid token from cookies
      return next();
    }

    if (!req.user) res.clearCookie('token'); // Clear invalid token if no user found
    return next();
  });
};

/**
 * Middleware to require authentication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const requireAuth = function (req, _res, next) {
  if (req.user) return next(); // Proceed if user is authenticated

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = ['Authentication required'];
  err.status = 401;
  return next(err); // Respond with 401 error if not authenticated
};

/**
 * Authenticate user via Firebase ID Token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer token
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' }); // Respond if no token
//   }
//
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token); // Verify Firebase token
//     req.user = decodedToken; // Attach decoded user info to request
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract the token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);  // Verify the ID token using Firebase Admin SDK
    console.log('Decoded token:', decodedToken);  // Log the decoded token for debugging
    req.user = { id: decodedToken.uid };  // Attach the user ID to the request object
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
/**
 * Authorization middleware to check if the reservation belongs to the current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authReservation = async function (req, res, next) {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    if (req.user.id == reservation.userId) return next(); // User is authorized for the reservation
    const err = new Error("Reservation must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if reservation doesn't belong to the user
  }

  const err = new Error("No Reservation");
  err.message = "Reservation couldn't be found";
  err.status = 404;
  return next(err); // Not found if reservation does not exist
};

/**
 * Authorization middleware to check if the reservation can be deleted
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authDeleteReservation = async function (req, res, next) {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    today = new Date();
    start = new Date(reservation.startDate);
    if (today > start)
      return res.status(403).json({ message: "Reservations that have been started can't be deleted", statusCode: 403 });

    const tool = await Tool.findByPk(reservation.toolId);
    if (req.user.id == reservation.userId || req.user.id == tool.ownerId) return next();
    const err = new Error("Reservation or Tool must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if user is not the owner or does not have permission to delete
  }

  const err = new Error("No Reservation");
  err.message = "Reservation couldn't be found";
  err.status = 404;
  return next(err); // Not found if reservation does not exist
};

/**
 * Authorization middleware to check if the review image belongs to the current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */

const authDeleteReviewImage = async function (req, res, next) {
  const reviewImage = await ReviewImage.findByPk(req.params.id);
  if (reviewImage) {
    const review = await Review.findByPk(reviewImage.reviewId);
    if (req.user.id == review.userId) return next(); // User is authorized to delete the review image
    const err = new Error("Review must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if review doesn't belong to the user
  }

  const err = new Error("No Image");
  err.message = "Review Image couldn't be found";
  err.status = 404;
  return next(err); // Not found if review image does not exist
};

// Repeating similar authorization middleware for reviews, tools, and other resources...
/**
 * Authorization middleware to check if the review belongs to the current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authReview = async function (req, res, next) {
  const review = await Review.findByPk(req.params.id);
  if (review) {
    if (req.user.id === review.userId) return next(); // User is authorized for the review
    const err = new Error("Review must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if review doesn't belong to the user
  }

  const err = new Error("No Review");
  err.message = "Review couldn't be found";
  err.status = 404;
  return next(err); // Not found if review does not exist
};

/**
 * Authorization middleware to check if the user can modify the tool image
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authModifyToolImage = async function (req, res, next) {
  const toolImage = await ToolImage.findByPk(req.params.id);
  if (toolImage) {
    const tool = await Tool.findByPk(toolImage.toolId);
    if (req.user.id === tool.ownerId) return next(); // User is the owner of the tool
    const err = new Error("Tool must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if the tool doesn't belong to the user
  }

  const err = new Error("No Tool Image");
  err.message = "Tool Image couldn't be found";
  err.status = 404;
  return next(err); // Not found if tool image does not exist
};

/**
 * Authorization middleware to check if the user is the owner of the tool
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authIsTool = async function (req, res, next) {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id === tool.ownerId) return next(); // User is the owner of the tool
    const err = new Error("Tool must belong to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if the tool doesn't belong to the user
  }

  const err = new Error("No Tool");
  err.message = "Tool couldn't be found";
  err.status = 404;
  return next(err); // Not found if tool does not exist
};

/**
 * Authorization middleware to check if the user is not the owner of the tool
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authIsToolNot = async function (req, res, next) {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id !== tool.ownerId) return next(); // User is not the owner of the tool
    const err = new Error("Tool already belongs to the current user");
    err.message = 'Forbidden';
    err.status = 403;
    return next(err); // Forbidden if the tool already belongs to the user
  }

  const err = new Error("No Tool");
  err.message = "Tool couldn't be found";
  err.status = 404;
  return next(err); // Not found if tool does not exist
};

/**
 * Middleware to check if the user is already existing
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const authExistingUser = async function (req, res, next) {
  const user = await User.findByPk(req.user.id);
  if (user) {
    return next(); // Proceed if user exists
  }
  const err = new Error("User not found");
  err.message = "User couldn't be found";
  err.status = 404;
  return next(err); // Not found if user does not exist
};

/**
 * Middleware to check for reservation conflicts
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const reservationConflict = async function (req, res, next) {
  const existingReservation = await Reservation.findOne({
    where: {
      toolId: req.body.toolId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }
  });

  if (existingReservation) {
    const err = new Error("Reservation conflict detected");
    err.message = "The selected tool is already reserved for the specified dates";
    err.status = 409;
    return next(err); // Conflict if reservation already exists
  }

  return next(); // Proceed if no conflict
};

/**
 * Middleware to check for reservation conflicts (another variant)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
const reservationConflict2 = async function (req, res, next) {
  const existingReservation = await Reservation.findOne({
    where: {
      toolId: req.body.toolId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }
  });

  if (existingReservation) {
    return res.status(409).json({
      message: "Conflict detected with existing reservation for the tool"
    });
  }

  return next(); // Proceed if no conflict
};

// Export all middleware functions
module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  authenticateUser,
  authReservation,
  authDeleteReservation,
  authDeleteReviewImage,
  authReview,
  authModifyToolImage,
  authIsTool,
  authIsToolNot,
  authExistingUser,
  reservationConflict,
  reservationConflict2,
};
