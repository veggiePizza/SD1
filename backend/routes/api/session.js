const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authExistingUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { admin, db } = require('../../config/firebase')

const router = express.Router();

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
/*
// Log in
router.post('/', validateLogin, async (req, res, next) => {
  const { user, uid } = req.body;
  const user1 = await User.login({ uid });
  if (!user1) {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        uid,
      }),
    });
   
    user1 = await response.json();

    if (!user1) {
      const err = new Error('Error Creating User');
      err.message = 'Error Creating User';
      err.status = 401;//change error code?
  
      return next(err);
    }
  }
  setTokenCookie(res, user1);

  console.log("*******",req);

  return res.json({user: {
    id: user1.id,
    firstName: user1.firstName,
    lastName: user1.lastName,
    email: user1.email,
    username: user1.username
  }});
}
);*/


// Log in
router.post('/', async (req, res, next) => {
  console.log(`Line 60: `);
  const { idToken } = req.body;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  
  
  const user = (await db.collection('Users').doc(decodedToken.uid).get()).data();
  user.uid = decodedToken.uid
/*
  console.log(`Line 66: `);

  if (user.uid) {
    setTokenCookie(res, user);
  }
  */
  console.log(`Line 60: ${ decodedToken.uid}`);
  return res.json({ ...user });
}
);

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
}
);

module.exports = router;