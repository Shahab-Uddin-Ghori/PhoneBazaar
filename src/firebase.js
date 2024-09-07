import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword, //for singup
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNXVDDQUynRno4srT08PIwDZEWZ9RyJKI",
  authDomain: "phonebazaarwala.firebaseapp.com",
  projectId: "phonebazaarwala",
  storageBucket: "phonebazaarwala.appspot.com",
  messagingSenderId: "159955818428",
  appId: "1:159955818428:web:9658fa7239cfb278a57db9",
  measurementId: "G-PJWT5E9KHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  onAuthStateChanged,
  signOut,
};
