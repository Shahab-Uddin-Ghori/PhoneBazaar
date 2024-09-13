// initilizing app
import { initializeApp } from "firebase/app";
// analytics of app
import { getAnalytics } from "firebase/analytics";
// for authentication
import { getAuth } from "firebase/auth";
// for firestore save data doc..
import { getFirestore } from "firebase/firestore";
// of storage saving data like img..
import { getStorage } from "firebase/storage";

// api config
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
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { app, auth, db, storage, analytics };
