const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { admin, db } = require('../../config/firebase')
const { doc, setDoc } = require('firebase/firestore');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .notEmpty()
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email'),
  check('firstName')
    .notEmpty()
    .withMessage('First Name is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await admin.auth().createUser({ email, password });
    const user = { firstName, lastName, email, photo: "" }
    const userRef = db.collection('Users').doc(newUser.uid);
    await userRef.set(user);
    setTokenCookie(res, user);
    return res.json(user);
  }
  catch (error) {
    
    if (error.code === 'auth/email-already-exists') {
      console.log("#$!$@$!@4999")
    console.log(error.code)
      const err = new Error('Email Already Exists');
      err.message = "The email address is already in use by another account."
      err.status = 409;
      next(err);
    }
  }
});

module.exports = router;