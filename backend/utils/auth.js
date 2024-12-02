const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Reservation, Tool, ReviewImage, Review, ToolImage } = require('../db/models');
const {admin} = require("../firebase/firebaseAdmin");
const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  console.log("10");
  console.log(user);
  console.log("12");

  const token = jwt.sign(
      { data: user },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Lax" : "Strict",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  if (!token) return next();

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = (req, _res, next) => {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = ['Authentication required'];
  err.status = 401;
  return next(err);
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded user info to the request
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateUser;


const authReservation = async (req, res, next) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    if (req.user.id == reservation.userId) return next();
    const err = new Error("Reservation must belong to the current user");
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Reservation");
  err.status = 404;
  return next(err);
};

const authDeleteReservation = async (req, res, next) => {
  const reservation = await Reservation.findByPk(req.params.id);

  if (reservation) {
    const today = new Date();
    const start = new Date(reservation.startDate);
    if (today > start)
      return res.status(403).json({ message: "Reservations that have started can't be deleted", statusCode: 403 });

    const tool = await Tool.findByPk(reservation.toolId);
    if (req.user.id == reservation.userId || req.user.id == tool.ownerId) return next();

    const err = new Error("Reservation or Tool must belong to the current user");
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Reservation");
  err.status = 404;
  return next(err);
};

const authDeleteReviewImage = async (req, res, next) => {
  const reviewImage = await ReviewImage.findByPk(req.params.id);
  if (reviewImage) {
    const review = await Review.findByPk(reviewImage.reviewId);
    if (req.user.id == review.userId) return next();

    const err = new Error("Review must belong to the current user");
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Image");
  err.status = 404;
  return next(err);
};

const authReview = async (req, _res, next) => {
  const review = await Review.findByPk(req.params.id);
  if (review) {
    if (req.user.id == review.userId) return next();

    const err = new Error('Review must belong to the current user');
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Review");
  err.status = 404;
  return next(err);
};

const authModifyToolImage = async (req, res, next) => {
  const toolImage = await ToolImage.findByPk(req.params.id);
  if (toolImage) {
    const tool = await Tool.findByPk(toolImage.toolId);
    if (req.user.id == tool.ownerId) return next();

    const err = new Error("Tool must belong to the current user");
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Tool Image");
  err.status = 404;
  return next(err);
};

const authIsTool = async (req, _res, next) => {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id == tool.ownerId) return next();

    const err = new Error('Tool must belong to the current user');
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Tool");
  err.status = 404;
  return next(err);
};

const authIsToolNot = async (req, _res, next) => {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id != tool.ownerId) return next();

    const err = new Error('Tool must not belong to the current user');
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Tool");
  err.status = 404;
  return next(err);
};

const authUser = async (req, res, next) => {
  const { email, username } = req.body;
  const checkUsername = await User.findOne({ where: { username } });
  const checkEmail = await User.findOne({ where: { email } });

  if (!(checkUsername || checkEmail)) { return next(); }

  const errors = {};
  if (checkEmail) errors["email"] = "User with that email already exists";
  if (checkUsername) errors["username"] = "User with that username already exists";

  return res.status(403).json({ message: "User already exists", statusCode: 403, errors });
};

const reservationConflict = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const reservations = await Reservation.findAll({ where: { toolId: req.params.id } });
  const start = new Date(startDate);
  const end = new Date(endDate);
  const errors = {};

  reservations.forEach(el => {
    const bookedStart = new Date(el.startDate);
    const bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd) errors["startDate"] = "Start date conflicts with an existing reservation";
    if (end >= bookedStart && end <= bookedEnd) errors["endDate"] = "End date conflicts with an existing reservation";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this tool is already booked for the specified dates", statusCode: 403, errors });
};

const reservationConflict2 = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const reservation = await Reservation.findByPk(req.params.id);
  const reservations = await Reservation.findAll({ where: { toolId: reservation.toolId } });
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  if (start > today) return res.status(403).json({ message: "Past reservations can't be modified", statusCode: 403 });

  const errors = {};

  reservations.forEach(el => {
    const bookedStart = new Date(el.startDate);
    const bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd) errors["startDate"] = "Start date conflicts with an existing reservation";
    if (end >= bookedStart && end <= bookedEnd) errors["endDate"] = "End date conflicts with an existing reservation";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this tool is already booked for the specified dates", statusCode: 403, errors });
};

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
  authUser,
  reservationConflict,
  reservationConflict2,
};
