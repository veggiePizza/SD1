const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const admin = require('firebase-admin'); // Ensure Firebase Admin SDK is initialized

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

// const admin = require('firebase-admin'); // Uncomment if needed
// const db = require('../utils/firestore'); // Uncomment if needed

router.post('/', async (req, res, next) => {
    const { firstName, lastName, username, email, password, firebaseUID } = req.body;
    try {
        console.log('Received data:', { firstName, lastName, username, email, password, firebaseUID });

        // Optional: Create the user in Firebase if not already handled on the frontend
        // const newUser = await admin.auth().createUser({ email, password });

        // Now create the user in your SQLite database using the Firebase UID
        const user = await User.signup({
            firstName,
            lastName,
            username,
            email,
            password,
            firebaseUID,  // Firebase UID is passed here
        });

        // Optional: Set user data in Firestore if needed
        // const userRef = db.collection('Users').doc(newUser.uid);
        // await userRef.set({
        //     firstName,
        //     lastName,
        //     email,
        //     photo: ""
        // });

        // Set the authentication token cookie for the user
        setTokenCookie(res, user);

        // Return the user data
        return res.json(user);
    } catch (error) {
        console.error('Error in user signup route:', error);
        if (error.code === 'auth/email-already-exists') {
            const err = new Error('Email Already Exists');
            err.message = "The email address is already in use by another account.";
            err.status = 409;
            next(err);
        } else {
            next(error); // Propagate other errors
        }
    }
});

module.exports = router;


module.exports = router;
