import React, { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../Images/Logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ModeThemeContext";
import { UserContext } from "./UserContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  // console.log(theme);

  // mode of toggle theme
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // toggle profile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // check user state to navigate user Acc..
  useEffect(() => {
    if (user.isLogin == true) {
      setIsLoggedIn(true);
    } else if (user.isLogin == false) {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <nav
      className={`${
        theme == "light"
          ? "bg-gray-200 text-zinc-800"
          : "bg-zinc-900 text-zinc-200"
      }  shadow-md`}
    >
      <div className="flex justify-between items-center ml-10">
        {/* Left Side: Logo and Links */}
        <div className="flex items-center space-x-5">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={`${Logo}`} alt="Logo" className="w-24" />
          </Link>

          {/* Links */}

          {/* explore */}
          <ul className={` flex space-x-4`}>
            <li
              className={`${
                theme == "light"
                  ? "text-zinc-700 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-orange-600"
              }`}
            >
              <Link to="./Explore">Explore</Link>
            </li>
            {/* brands */}
            <li
              className={`${
                theme == "light"
                  ? "text-zinc-700 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-orange-600"
              }`}
            >
              <Link to="./Brands">Brands</Link>
            </li>
            {/* My Ads */}
            <li
              className={`${
                theme == "light"
                  ? "text-zinc-700 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-orange-600"
              }`}
            >
              <Link to="./MyAds">My Ads</Link>
            </li>
            {/* messages */}
            <li
              className={`${
                theme == "light"
                  ? "text-zinc-700 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-orange-600"
              }`}
            >
              <Link to="./Messages">Messages</Link>
            </li>
            {/* contact us */}
            <li
              className={`${
                theme == "light"
                  ? "text-zinc-700 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-orange-600"
              }`}
            >
              <Link to="./ContactUs">Contact us</Link>
            </li>
          </ul>
        </div>

        {/* Center: Empty */}

        {/* Right Side: Search, Profile, and Theme Toggle */}
        <div className="flex items-center space-x-4 mr-10">
          {/* Search Input */}
          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className={`${
                theme == "light"
                  ? "bg-zinc-50 text-zinc-700"
                  : "bg-zinc-800 text-zinc-100 "
              } px-4 py-2 rounded-full border-none focus:outline-none shadow-sm`}
            />
            <FiSearch className="absolute top-3 right-3 text-orange-700 dark:text-gray-400" />
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className={`${
                theme == " light" ? "text-zinc-800" : "text-zinc-100"
              }" focus:outline-none"`}
            >
              <FaUserCircle size={25} className="mt-2" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg py-2 rounded-lg">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="./UserLogin"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="./UserSignUp"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="./Profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300"
                    >
                      Profile
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300"
                      onClick={() => {
                        const auth = getAuth();
                        signOut(auth)
                          .then(() => {
                            // Sign-out successful.
                            toast.success("User Logout Successfully");
                          })
                          .catch((error) => {
                            // An error happened.
                          });
                      }}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div
            className={`w-12 h-6 bg-gray-300  rounded-full p-1 cursor-pointer relative shadow-sm`}
            onClick={() => {
              toggleDarkMode();
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <div
              className={` ${
                theme === "light" ? "bg-zinc-100" : " bg-zinc-800"
              } w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
            {isDarkMode ? (
              <FiMoon className="absolute top-1 left-1 text-zinc-800 dark:text-gray-200" />
            ) : (
              <FiSun className="absolute top-1 right-1 text-orange-700" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <div className="lg:hidden block">
        <button
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>
        {isMenuOpen && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="./Explore"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="Brands"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="./MyAds"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900"
                >
                  My Ads
                </Link>
              </li>
              <li>
                <Link
                  to="./Messages"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="./ContactUS"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div> */}
    </nav>
  );
}

export default Header;
