// import firebase from "firebase/compat/app";
// import "firebase/auth";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

// export const auth = app.auth();
// export default app;

// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDbU72ngWnQBpmO8dKS2EMjnoPWCnHC20",
  authDomain: "karkade-development.firebaseapp.com",
  projectId: "karkade-development",
  storageBucket: "karkade-development.appspot.com",
  messagingSenderId: "221397868894",
  appId: "1:221397868894:web:74717d2e0a63983326efcf",
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export const storage = getStorage(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function getUserInfo() {
  const auth = getAuth();
  return auth.currentUser;
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  // const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      localStorage.setItem("userId", user)
    );
    return unsub;
  }, []);

  // return currentUser;
}

// -------------------------------------------users realtime dabase
export function writeUserData(username, email) {
  const reference = ref(db, "users/" + getUserInfo().uid);
  localStorage.setItem("userId", getUserInfo().uid);
  set(reference, {
    username: username,
    email: email,
    country: "",
    bio: "My funny collection",
    imageUrl: "",
    following: [],
    followers: [],
    posts: [],
    savedPosts: [],
  });
}

export function getProfileName(userId) {
  const profileNameRef = ref(db, `users/${userId}/username`);
  return profileNameRef;
}
