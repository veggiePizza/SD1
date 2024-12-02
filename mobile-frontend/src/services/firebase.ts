// import { initializeApp } from 'firebase/app';
// import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAni2T_y8FAgvcdrew7xFzhhL9SlwV1xUo",
//     authDomain: "lendditt.firebaseapp.com",
//     projectId: "lendditt",
//     storageBucket: "lendditt.firebasestorage.app",
//     messagingSenderId: "741023243822",
//     appId: "1:741023243822:web:7daa77f5861889d12449bf",
//     measurementId: "G-EDZ89HMDRZ"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//
// // Initialize Auth with persistence
// const authInstance = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage) // Using AsyncStorage for auth persistence
// });
//
// // Initialize Firestore
// const db = getFirestore(app);
//
// export { authInstance, db };


import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAni2T_y8FAgvcdrew7xFzhhL9SlwV1xUo",
    authDomain: "lendditt.firebaseapp.com",
    projectId: "lendditt",
    storageBucket: "lendditt.firebasestorage.app",
    messagingSenderId: "741023243822",
    appId: "1:741023243822:web:7daa77f5861889d12449bf",
    measurementId: "G-EDZ89HMDRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Using AsyncStorage for auth persistence
});

// Initialize Firestore
const db = getFirestore(app);

export { authInstance, db };
