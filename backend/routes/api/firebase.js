//const admin = require('firebase-admin');
//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authExistingUser } = require('../../utils/auth');
const { admin, db } = require('../../config/firebase')
const { User} = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { idToken } = req.body;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const uid = decodedToken.uid;
  const user = (await db.collection('Users').doc(uid).get()).data();

  const dbUser = await User.findOne({
    where: { uid }
  });
  
  const id = dbUser.id;
  setTokenCookie(res, {id, uid, ...user});
  return res.json({uid, ...user});
});


router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);
//test

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