import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "../../firebase";
import { useNavigate } from "react-router";

function Messages() {
  const [user, setUser] = useState(null); // State to track logged-in user
  const [loading, setLoading] = useState(true); // Loading state to handle auth check
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if logged in
      setLoading(false); // Once auth is checked, stop loading
      if (!currentUser) {
        navigate("/"); // If no user is logged in, redirect to home
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [navigate]);

  // While loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div className="bg-red-500">Message page</div>;
}

export default Messages;
