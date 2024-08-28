// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU2rXKrKi9KF6mCxncuuHJPdJHoWj6qds",
    authDomain: "lendit-23cf0.firebaseapp.com",
    projectId: "lendit-23cf0",
    storageBucket: "lendit-23cf0.appspot.com",
    messagingSenderId: "366908559660",
    appId: "1:366908559660:web:98924e03169f5948ab9c89",
    measurementId: "G-MYY8MD1YNN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;