require('dotenv').config(); // Load .env file

const admin = require('firebase-admin');
const path = require('path');

// Get the absolute path to the service account key from the environment variable
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

try {
    if (admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
        databaseURL: 'https://lendit-23cf0.firebaseio.com',
        projectId: 'lendditt',
    })){
        console.log("intialized")
    }
} catch (error) {
    console.error('Error initializing Firebase Admin:', error);
}


const db = admin.firestore();

module.exports = { admin, db };
