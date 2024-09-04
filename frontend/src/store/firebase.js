import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import your Firebase configuration
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { csrfFetch } from './csrf';
import Cookies from 'js-cookie';


// Action Types
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

// Action Creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const clearUser = () => ({
  type: CLEAR_USER,
});
/*
export const googleLogin = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
        lastName: "",
      });
      dispatch(setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      
    }
  } catch (error) {
    toast.error("Error during sign-in", { position: "top-center" });
  }
};
*/
/*

export const googleLogin = () => async (dispatch) => {
 
  const response = await csrfFetch('/api/firebase', {
      method: 'GET'
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
*/

export const signup = (user) => async (dispatch) => {
  //const user = await createUserWithEmailAndPassword(auth, email, password);
  const { firstName, lastName, email, password } = user;
  
  console.log("71")
  console.log(user)
  console.log("73")
  
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  console.log("XxXxxXXX")

  const newUser = await response.json();
  dispatch(setUser(newUser.user));
  return newUser;
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  const response = await csrfFetch('/api/firebase', {
    method: 'DELETE',
  });
  dispatch(clearUser());
  return response;
};



export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/firebase');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const googleLogin = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  if (user) {
    const idToken = await user.getIdToken();
    const response = await csrfFetch('/api/firebase', {
      method: 'POST',
      body: JSON.stringify({
        idToken
      })
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  }

};

const initialState = { user: null };

const firebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default firebaseReducer;