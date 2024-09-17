import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../components/UserContextProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../components/ModeThemeContext";
import { Link } from "react-router-dom";

function MyAds() {
  const { user } = useContext(UserContext);
  const [theme] = useContext(ThemeContext);
  const [bgImg, setBgImg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogin === false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg}) `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`MyAds ${
        theme === "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } w-full min-h-screen `}
    >
      {/* Create New Ad Header */}
      <h1
        className={`${
          theme === "light" ? "text-zinc-800" : "text-zinc-300"
        } text-2xl font-bold mt-36 ml-5 md: sm:text-4xl ${
          !bgImg ? "text-white" : "text-sky-100"
        }`}
      >
        Manage your Ads
      </h1>

      {/* Animated Ad Section */}
      <div
        className={`${
          theme === "light"
            ? "bg-zinc-800 text-zinc-300"
            : "bg-zinc-50 text-zinc-800"
        } max-w-ful h-12 mx-auto mt-10 flex justify-center items-center relative overflow-hidden`}
      >
        {/* Manage Your Ads */}
        <Link
          onMouseOver={() => {
            setBgImg(
              `https://supplyant.com/wp-content/uploads/2020/09/mobile-advertising.png`
            );
          }}
          onMouseOut={() => {
            setBgImg(false);
          }}
          to="/ManageMyAds"
          className={`${
            theme == "light"
              ? "bg-zinc-800 text-zinc-300 hover:text-orange-600"
              : "bg-zinc-50 text-zinc-700 hover:text-zinc-900"
          } text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl   w-40 sm:w-48 md:w-56 lg:w-64 text-center absolute z-10 rounded-lg box-shad`}
          style={{
            opacity: 0.95,
            filter: "blur(0.05px)", // Slight blur effect
          }}
        >
          My Ads
        </Link>

        {/* manage ad para */}
        <div className="flex absolute w-full h-full justify-start items-center animate-marquee">
          <p className="whitespace-nowrap px-4" style={{ marginRight: "50px" }}>
            Manage your ads effortlessly with Phone Bazaar! Easily edit, update,
            or delete your listings at any time. Track ad performance with
            real-time views and interaction metrics, and make adjustments to
            improve visibility. Our simple dashboard allows you to boost your
            ad, change prices, and update details, ensuring your phone gets sold
            faster. Stay in control of your ads and manage everything from one
            place for a smooth selling experience!
          </p>
          <p className="whitespace-nowrap px-4" style={{ marginRight: "50px" }}>
            Manage your ads effortlessly with Phone Bazaar! Easily edit, update,
            or delete your listings at any time. Track ad performance with
            real-time views and interaction metrics, and make adjustments to
            improve visibility. Our simple dashboard allows you to boost your
            ad, change prices, and update details, ensuring your phone gets sold
            faster. Stay in control of your ads and manage everything from one
            place for a smooth selling experience!
          </p>
        </div>
      </div>

      {/* Create New Ad Header */}
      <h1
        className={`${
          theme === "light" ? "text-zinc-800" : "text-zinc-300"
        } text-2xl font-bold mt-36 ml-5 md: sm:text-4xl ${
          !bgImg ? "text-white" : "text-sky-100"
        }`}
      >
        Create New Ad
      </h1>

      {/* Animated Ad Section */}
      <div
        className={`${
          theme === "light"
            ? "bg-zinc-800 text-zinc-300"
            : "bg-zinc-50 text-zinc-800"
        } max-w-ful h-12 mx-auto mt-10 flex justify-center items-center relative overflow-hidden`}
      >
        {/* Heading on Top */}
        <Link
          onMouseOver={() => {
            setBgImg(
              `https://techreport.com/wp-content/uploads/2023/10/Google-Display-Network.webp`
            );
          }}
          onMouseOut={() => {
            setBgImg(false);
          }}
          to="/CreateNewAd"
          className={`${
            theme == "light"
              ? "bg-zinc-800 text-zinc-300 hover:text-orange-600"
              : "bg-zinc-50 text-zinc-700 hover:text-zinc-900"
          } text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl w-40 sm:w-48 md:w-56 lg:w-64 text-center absolute z-10 rounded-lg box-shad `}
          style={{
            opacity: 0.95,
            filter: "blur(0.05px)", // Slight blur effect
          }}
        >
          Create Ad
        </Link>

        {/* Wrapper for Continuous Scrolling */}
        <div className="flex absolute w-full h-full justify-start items-center animate-marquee">
          <p className="whitespace-nowrap px-4" style={{ marginRight: "50px" }}>
            Selling your phone? Phone Bazaar makes it faster and easier! Create
            a new ad in just minutes, upload photos, set your price, and let the
            offers roll in. With our premium ad boosting and brand filtering,
            your phone gets seen by serious buyers—ensuring a quick sale!
          </p>
          <p className="whitespace-nowrap px-4" style={{ marginRight: "50px" }}>
            Selling your phone? Phone Bazaar makes it faster and easier! Create
            a new ad in just minutes, upload photos, set your price, and let the
            offers roll in. With our premium ad boosting and brand filtering,
            your phone gets seen by serious buyers—ensuring a quick sale!
          </p>
        </div>

        {/* Animation Styles */}
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default MyAds;
