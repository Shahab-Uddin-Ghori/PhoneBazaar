import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "../../firebase";
import { useNavigate } from "react-router";

function CreateAd() {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state to check if auth is still being checked
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if logged in
      setLoading(false); // Set loading to false after auth check
      if (!currentUser) {
        navigate("/"); // If no user, redirect to home
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [navigate]);

  // Show loading or actual content based on state
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Create Ad</div>;
}

export default CreateAd;
