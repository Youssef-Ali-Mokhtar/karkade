import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

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
export const auth = getAuth(app);
export const db = getDatabase();

export const storage = getStorage(app);


// export function getProfileName(userId) {
//   const profileNameRef = ref(db, `users/${userId}/username`);
//   return profileNameRef;
// }
