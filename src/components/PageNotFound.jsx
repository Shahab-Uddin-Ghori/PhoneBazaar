import React, { useContext } from "react";
import { ThemeContext } from "./ModeThemeContext";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const [theme, setTheme] = useContext(ThemeContext); // Fetch the current theme
  const navigate = useNavigate(); // For navigation

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div
      className={`h-screen w-screen flex items-center ${
        theme === "light"
          ? "bg-zinc-50 text-gray-700"
          : "bg-zinc-800 text-zinc-300"
      }`}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between px-5">
        {/* 404 Text and Message */}
        <div className="w-full lg:w-1/2 mx-8">
          <h3 className="text-3xl sm:text-7xl mt-16">404</h3>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          {/* Back to Homepage Button */}
          <button
            onClick={handleBackToHome}
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-zinc-50 bg-orange-600 hover:bg-orange-700 transition-all duration-400 border border-transparent rounded-lg focus:outline-none "
          >
            Back to Homepage
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
