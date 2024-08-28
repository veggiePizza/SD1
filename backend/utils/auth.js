const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Reservation, Tool, ReviewImage, Review, ToolImage } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

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

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = ['Authentication required'];
  err.status = 401;
  return next(err);
}

const authReservation = async function (req, res, next) {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    if (req.user.id == reservation.userId) return next();
    const err = new Error("Reservation must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Reservation")
  err.message = "Reservation couldn't be found";
  err.status = 404;
  return next(err);
}

const authDeleteReservation = async function (req, res, next) {
  const reservation = await Reservation.findByPk(req.params.id);
 
  if (reservation) {
    today = new Date()
    start = new Date(reservation.startDate)
    if (today > start) 
      return res.status(403).json({ message: "Reservations that have been started can't be deleted", statusCode: 403 })
    
    const tool = await Tool.findByPk(reservation.toolId);
    if (req.user.id == reservation.userId || req.user.id == tool.ownerId) return next();
    const err = new Error("Reservation or Tool must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Reservation")
  err.message = "Reservation couldn't be found";
  err.status = 404;
  return next(err);
}

const authDeleteReviewImage = async function (req, res, next) {//fix?
  const reviewImage = await ReviewImage.findByPk(req.params.id);
  if (reviewImage) {
    const review = await Review.findByPk(reviewImage.reviewId);
    if (req.user.id == review.userId)
     return next();
    const err = new Error("Review must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Image")
  err.message = "Review Image couldn't be found";
  err.status = 404;
  return next(err);
}

const authReview = async function (req, _res, next) {
  const review = await Review.findByPk(req.params.id);
  if (review) {
    if (req.user.id == review.userId) return next();
    const err = new Error('Review must belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Review")
  err.message = "Review couldn't be found";
  err.status = 404;
  return next(err);
}

const authModifyToolImage = async function (req, res, next) {
  const toolImage = await ToolImage.findByPk(req.params.id);
  if (toolImage) {
    const tool = await Tool.findByPk(toolImage.toolId);
    if (req.user.id == tool.ownerId) return next();
    const err = new Error("Tool must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  
  const err = new Error("No Tool Image")
  err.message = "Tool Image couldn't be found";
  err.status = 404;
  return next(err);
}

const authIsTool = async function (req, _res, next) {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id == tool.ownerId) return next();
    const err = new Error('Tool must belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Tool")
  err.message = "Tool couldn't be found";
  err.status = 404;
  return next(err);
}

const authIsToolNot = async function (req, _res, next) {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    if (req.user.id != tool.ownerId) return next();
    const err = new Error('Tool must not belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Tool")
  err.message = "Tool couldn't be found";
  err.status = 404;
  return next(err);
}

const authUser = async function (req, res, next) {////check my errors
  const { email, username } = req.body;
  checkUsername = await User.findOne({ where: { username } })
  checkEmail = await User.findOne({ where: { email } })
  if (!(checkUsername || checkEmail)) { return next(); }
  else {
    const errors = {};
    if (checkEmail) errors["email"] = "User with that email already exists";
    if (checkUsername) errors["username"] = "User with that username already exists";
    return res.status(403).json({ message: "User already exists", statusCode: 403, errors: errors })
  }
}

const reservationConflict = async function (req, res, next) {
  const { startDate, endDate } = req.body;
  reservations = await Reservation.findAll({ where: { toolId: req.params.id } });
  start = new Date(startDate);
  end = new Date(endDate);
  const errors = {};

  reservations.forEach(el => {
    bookedStart = new Date(el.startDate);
    bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd)
      errors["startDate"] = "Start date conflicts with an existing reservation";
    if (end >= bookedStart && end <= bookedEnd)
      errors["endDate"] = "End date conflicts with an existing reservation";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this tool is already booked for the specified dates", statusCode: 403, errors: errors })
}

const reservationConflict2 = async function (req, res, next) {
  const { startDate, endDate } = req.body;
  reservation = await Reservation.findByPk(req.params.id);
  reservations = await Reservation.findAll({ where: { toolId: reservation.toolId } });
  start = new Date(startDate);
  end = new Date(endDate);
  today = new Date();
  if (start > today)
    return res.status(403).json({ message: "Past reservations can't be modified", statusCode: 403 })
  
  const errors = {};

  reservations.forEach(el => {
    bookedStart = new Date(el.startDate);
    bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd)
      errors["startDate"] = "Start date conflicts with an existing reservation";
    if (end >= bookedStart && end <= bookedEnd)
      errors["endDate"] = "End date conflicts with an existing reservation";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this tool is already booked for the specified dates", statusCode: 403, errors: errors })
}

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  authReservation,
  authDeleteReservation,
  authDeleteReviewImage,
  authReview,
  authModifyToolImage,
  authIsTool,
  authIsToolNot,
  authUser,
  reservationConflict,
  reservationConflict2
};