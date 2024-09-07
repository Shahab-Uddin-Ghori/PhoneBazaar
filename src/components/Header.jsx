import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ModeContex, { themeContext } from "./ModeContex";
import { getAuth, signOut, onAuthStateChanged } from "../firebase";
import { toast } from "react-toastify";

function Header() {
  const [theme, setTheme] = useContext(themeContext);
  const [user, setUser] = useState(null); // State to track if user is logged in

  const navigate = useNavigate();

  // Check user authentication status on component mount
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if they are logged in
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  return (
    <header
      className={` body-font shadow-md flex flex-wrap pl-10 pr-10 pt-5 pb-5 w-full items-center justify-between ${
        theme === "light" ? "text-gray-600 " : "text-white"
      }`}
    >
      {/* svg logo and brands links */}
      <div className="flex justify-center items-center gap-5">
        <Link
          to="/"
          className="flex title-font font-medium items-center mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-md">Phone Bazaar Wala</span>
        </Link>

        {/* links */}
        <div>
          <Link to="/Brands" className="mr-5 hover:text-gray-400">
            Brands
          </Link>
          <Link
            onClick={() =>
              user
                ? toast.success("Your Messages")
                : toast.error("Please Login first")
            }
            to={user ? "/Messages" : "/UserLogin"}
            className="mr-5 hover:text-gray-400"
          >
            Messages
          </Link>
          <Link
            onClick={() =>
              user
                ? toast.success("Create new ad")
                : toast.error("Please Login first")
            }
            to={user ? "/CreateAd" : "/UserLogin"}
            className="mr-5 hover:text-gray-400"
          >
            Create Ad
          </Link>
        </div>
      </div>

      {/* login/signup profile section */}
      <div className="flex flex-wrap items-center justify-center">
        {!user ? (
          // If user is not logged in, show SignUp and LogIn buttons

          <>
            <Link to="/UserSignup" className="mr-5 hover:text-gray-400">
              SignUp
            </Link>
            <Link to="/UserLogin" className="mr-5 hover:text-gray-400">
              LogIn
            </Link>
          </>
        ) : (
          // If user is logged in, show Logout and Profile button
          <>
            <button
              onClick={() => {
                const auth = getAuth();
                signOut(auth)
                  .then(() => {
                    console.log("User logged out");
                    navigate("/");
                  })
                  .catch((error) => {
                    console.log("Error logging out: ", error);
                  });
              }}
              className="mr-5 hover:text-gray-900"
            >
              Logout
            </button>
            <Link to="/Profile" className="mr-5 hover:text-gray-900">
              <FaUser size={24} />
            </Link>
          </>
        )}
      </div>

      {/* mode */}
      <div
        className={`${
          theme === "dark" ? "bg-white text-black " : "bg-black text-white"
        } w-10 flex justify-center pt-1 pb-1 pl-6 pr-6 shadow-md rounded`}
      >
        {/* sun */}
        <button
          className={` ${theme === "dark" ? "block" : "hidden"}`}
          onClick={() => {
            setTheme("light");
          }}
        >
          <BsSun size={24} />
        </button>

        {/* moon */}
        <button
          className={` ${theme === "light" ? "block" : "hidden"}`}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <BsMoon size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;
