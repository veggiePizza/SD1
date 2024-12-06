import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import your Firebase configuration
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
  const { firstName, lastName, email, password } = user;
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const newUser = result.user;

  if (newUser) {
    await setDoc(doc(db, "Users", newUser.uid), {
      email,
      firstName,
      lastName,
    });

    const idToken = await newUser.getIdToken();
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
  
  if (result.user) {
    const userDocRef = doc(db, "Users", result.user.uid);
    const user = await getDoc(userDocRef);

    if (!user) {
      await setDoc(doc(db, "Users", result.user.uid), {
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
        lastName: "",
      });

      user = await getDoc(userDocRef);
    }
    const idToken = await result.user.getIdToken();
    const response = await csrfFetch('/api/firebase', {
      method: 'POST',
      body: JSON.stringify({
        idToken
      })
    });

    const data = await response.json();
    dispatch(setUser(data));
    return response;
  }
}









export const login = (user) => async (dispatch) => {
  const { email, password } = user;

  const result = await signInWithEmailAndPassword(auth, email, password)
  const idToken = await result.user.getIdToken();

  const response = await csrfFetch('/api/firebase', {
    method: 'POST',
    body: JSON.stringify({
      idToken
    })
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