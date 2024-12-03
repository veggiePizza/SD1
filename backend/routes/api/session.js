const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authExistingUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { admin, db } = require('../../firebase/firebaseAdmin');

const router = express.Router();

// Validation middleware for login
const validateLogin = [
  check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required'),
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
  handleValidationErrors
];

// Log in route
router.post('/', async (req, res, next) => {
  console.log("Login attempt: ");
  const { idToken } = req.body;

  try {
    // Verify the Firebase ID token to authenticate the user
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = (await db.collection('Users').doc(decodedToken.uid).get()).data();

    // Attach the Firebase UID to the user data for further use
    user.uid = decodedToken.uid;

    // Uncomment the following line if you wish to set a token cookie for the user session
    // setTokenCookie(res, user);

    console.log(`User authenticated: ${decodedToken.uid}`);
    return res.json({ ...user });
  } catch (error) {
    console.error('Error during login:', error);
    return next(new Error('Authentication failed'));
  }
});

// Log out route
router.delete('/', (_req, res) => {
  // Clear the authentication token cookie
  res.clearCookie('token');
  return res.json({ message: 'Successfully logged out' });
});

// Get current session route
router.get('/', restoreUser, (req, res) => {
  const { user } = req;

  if (user) {
    // Return the authenticated user object if a user is found
    return res.json({
      user: user.toSafeObject()
    });
  } else {
    // If no user is found, return an empty object
    return res.json({});
  }
});

module.exports = router;
