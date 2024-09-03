//const admin = require('firebase-admin');
//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authExistingUser } = require('../../utils/auth');
const { admin, db } = require('../../config/firebase')

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { idToken } = req.body;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  //const user = await admin.auth().getUser(decodedToken.uid);
  const user = (await db.collection('Users').doc(decodedToken.uid).get()).data();
  //console.log(decodedToken.exp)
  //console.log("15")
  setTokenCookie(res, user);

  return res.json({ user });
});


router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user
    });
  } else return res.json({});
}
);


module.exports = router;