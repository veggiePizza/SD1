import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import your Firebase configuration
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
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
export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch(clearUser());
  window.location.href = "/";
}
/*
export const restoreUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));
    }
  });
};
*/
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/firebase');
  console.log("heree82")
  const data = await response.json();
  console.log(data)
  dispatch(setUser(data.user));
  return response;
};

export const googleLogin = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idToken = await user.getIdToken();
  console.log(Cookies.get('XSRF-TOKEN'))
  console.log('here85');
  console.log(idToken);
  console.log('here87');
 

  /*const response = await csrfFetch('/api/firebase', {
    method: 'POST',
    body: JSON.stringify({
      idToken
    }),
  });*/

  const response = await fetch('/api/firebase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'XSRF-Token': Cookies.get('XSRF-TOKEN') // Include the CSRF token here
    },
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;

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