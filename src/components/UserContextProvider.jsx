import { onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication function to track auth state changes
import { createContext, useEffect, useState } from "react"; // Import necessary hooks and functions
import { auth, db } from "../firebase"; // Import Firebase authentication and Firestore database instances
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions to access documents

// Create a UserContext to share user data across the application
export const UserContext = createContext();

function UserContextProvider({ children }) {
  // Initialize user state to track login status and email
  const [user, setUser] = useState({
    isLogin: false, // Default is not logged in
    email: "", // Default email is an empty string
  });

  // useEffect hook to set up an auth state listener
  useEffect(() => {
    // Subscribe to authentication state changes
    const subscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🚀 ~ subscribe ~ user:", user); // Log user information for debugging

      try {
        // If a user is logged in
        if (user) {
          // Create a reference to the user's document in Firestore
          const docRef = doc(db, "users", user.uid);
          // Fetch the user's information from Firestore
          const userInfo = await getDoc(docRef);
          console.log("🚀 ~ subscribe ~ userInfo:", userInfo.data()); // Log user information fetched from Firestore

          // Update user state with the fetched information and set isLogin to true
          setUser({
            isLogin: true,
            ...userInfo.data(), // Spread user data from Firestore into state
          });
        } else {
          // If no user is logged in, reset user state
          setUser({
            isLogin: false, // User is not logged in
            email: "", // Reset email to an empty string
          });
          console.log("User Login nahn he"); // Log message indicating no user is logged in
        }
      } catch (error) {
        // Catch and log any errors that occur during the fetching of user info
        console.log("🚀 ~ subscribe ~ error:", error);
      }
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts
    return subscribe;
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    // Provide the user state and setter function to the rest of the app
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
}

export default UserContextProvider; // Export the UserContextProvider for use in other parts of the application
