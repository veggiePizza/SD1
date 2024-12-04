const { validationResult } = require('express-validator');

// Middleware for handling validation errors from express-validator
// Customizes the error format for easier usage on the client side
const handleValidationErrors = async (req, res, next) => {
  // Get validation errors from express-validator
  const validationErrors = validationResult(req);

  // If there are validation errors, format them into a custom structure
  if (!validationErrors.isEmpty()) {
    const errors = {};

    // Iterate over each error and map the parameter to its error message
    validationErrors
        .array()
        .forEach(error => {
          errors[error.param] = error.msg;
        });

    // Create a new error with a status code and the formatted errors
    const err = new Error("Validation error");
    err.status = 400;
    err.errors = errors;

    // Pass the error to the next error-handling middleware
    return next(err);
  }

  // If there are no validation errors, proceed to the next middleware
  next();
};

module.exports = {
  handleValidationErrors
};
