//const admin = require('firebase-admin');
//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const express = require('express');
const { restoreUser, requireAuth } = require('../../utils/auth');


const router = express.Router();
/*
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const verifyToken = async (idToken) => {



    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Decoded token:', decodedToken);
        // The decodedToken will contain the user’s UID and other information
        return decodedToken;
    } catch (error) {
        console.error('Error verifying ID token:', error);
        throw new Error('Unauthorized');
    }
};

router.post('/', async (req, res) => {
    console.log('here27');







    try {

        const decodedToken = await verifyToken(idToken);
        // Process the userInfo and decodedToken as needed
        res.json({ success: true, user: decodedToken });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
    }

        return res.json({user: {
            id: "lol"
          }});
});
*/


// Log in
router.post('/', async (req, res, next) => {
    /*const { credential, password } = req.body;
    const user = await User.login({ credential, password });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.message = 'Invalid credentials';
      err.status = 401;
  
      return next(err);
    }
  
    await setTokenCookie(res, user);
  
    console.log("*******",req);*/




    
    console.log('here66');
    return res.json({user: {
      id: "user.id",
      firstName: "user.firstName",
      lastName: "user.lastName",
      email: "user.email",
      username: "user.username"
    }});
  }
  );

  router.get('/',restoreUser,(req, res) => {
    console.log('here85');
    //const { user } = req;
    const user  = {user: {
        id: "user.id",
        firstName: "user.firstName",
        lastName: "user.lastName",
        email: "user.email",
        username: "user.username"
      }}
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({  });
  }
);


module.exports = router;

/*


export const googleLogin = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/firebase', {
        method: 'POST'
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};*/