// Import necessary functions from Firebase SDK
// Initialize the Firebase app
import { initializeApp } from "firebase/app";
// Import for Firebase analytics functionality
import { getAnalytics } from "firebase/analytics";
// Import for Firebase authentication services
import { getAuth } from "firebase/auth";
// Import for Firestore database services
import { getFirestore } from "firebase/firestore";
// Import for Firebase storage services (for storing files like images)
import { getStorage } from "firebase/storage";

// Firebase configuration object containing API keys and identifiers
const firebaseConfig = {
  apiKey: "AIzaSyDNXVDDQUynRno4srT08PIwDZEWZ9RyJKI", // API key for authentication
  authDomain: "phonebazaarwala.firebaseapp.com", // Auth domain for Firebase Authentication
  projectId: "phonebazaarwala", // Project ID for Firestore
  storageBucket: "phonebazaarwala.appspot.com", // Storage bucket for file uploads
  messagingSenderId: "159955818428", // Sender ID for Firebase Cloud Messaging
  appId: "1:159955818428:web:9658fa7239cfb278a57db9", // Unique identifier for the app
  measurementId: "G-PJWT5E9KHZ", // Measurement ID for Google Analytics
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig); // Create a Firebase app instance
const auth = getAuth(app); // Get the authentication instance
const db = getFirestore(app); // Get the Firestore database instance
const storage = getStorage(app); // Get the storage instance for file handling
const analytics = getAnalytics(app); // Initialize analytics for tracking app usage

// Export the initialized Firebase services for use in other parts of the app
export { app, auth, db, storage, analytics };
