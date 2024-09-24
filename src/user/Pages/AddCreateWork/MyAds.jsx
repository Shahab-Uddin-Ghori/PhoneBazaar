import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../components/UserContextProvider"; // Importing UserContext for accessing user information
import { useNavigate } from "react-router"; // Importing useNavigate for navigation between routes
import { toast } from "react-toastify"; // Importing toast for displaying notifications
import { ThemeContext } from "../../../components/ModeThemeContext"; // Importing ThemeContext for managing theme styles
import { Link } from "react-router-dom"; // Importing Link for navigation without page refresh

function MyAds() {
  const { user } = useContext(UserContext); // Accessing the user data from UserContext
  const [theme] = useContext(ThemeContext); // Accessing the theme context to determine current theme
  const navigate = useNavigate(); // Initializing the navigate function for routing

  useEffect(() => {
    // Effect to check if the user is logged in
    if (!user?.isLogin) {
      navigate("/"); // Redirect to the home page if the user is not logged in
      toast.info("Please Login First"); // Displaying a notification to inform the user to log in
    }
  }, [user, navigate]); // Effect depends on user and navigate

  return (
    <div
      className={`MyAds ${
        theme === "light"
          ? "bg-zinc-50 text-zinc-800" // Light theme styles
          : "bg-zinc-800 text-zinc-300" // Dark theme styles
      } w-full min-h-screen py-10`}
    >
      {/* Page Header */}
      <h1
        className={`${
          theme === "light" ? "text-zinc-800" : "text-zinc-300"
        } text-2xl sm:text-4xl font-bold text-center mb-12`}
      >
        Manage Your Ads & Create New Ads
      </h1>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 px-5 sm:px-0">
        {/* Manage Ads Card */}
        <Link
          to="/ManageMyAds" // Navigation link to manage ads
          className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-500 ease-out"
        >
          <div className="p-6 sm:p-10 text-center text-white">
            <h2 className="text-xl sm:text-3xl font-bold mb-4">
              Manage My Ads
            </h2>
            <p className="text-sm sm:text-lg mb-6">
              Effortlessly manage, edit, update, or delete your listings at any
              time. Track ad performance and make adjustments to improve
              visibility.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              Go to Manage Ads
            </button>
          </div>
        </Link>

        {/* Create New Ad Card */}
        <Link
          to="/CreateNewAd" // Navigation link to create a new ad
          className="bg-gradient-to-r from-green-400 to-teal-500 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-500 ease-out"
        >
          <div className="p-6 sm:p-10 text-center text-white">
            <h2 className="text-xl sm:text-3xl font-bold mb-4">
              Create New Ad
            </h2>
            <p className="text-sm sm:text-lg mb-6">
              Quickly create a new ad, upload photos, set your price, and let
              the offers roll in. Boost your ad visibility with our premium
              options.
            </p>
            <button className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              Create Ad
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MyAds;
