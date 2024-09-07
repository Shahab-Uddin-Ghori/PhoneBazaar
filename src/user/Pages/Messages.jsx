import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "../../firebase";
import { useNavigate } from "react-router";

function Messages() {
  const [user, setUser] = useState(null); // State to track if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if they are logged in
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);
  return <div className="bg-red-500 ">Message page</div>;
}

export default Messages;
