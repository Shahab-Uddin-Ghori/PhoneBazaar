import React, { useContext, useEffect, useState } from "react"; // Import React and necessary hooks
import { AdContext } from "../../../components/Adprovider"; // Import AdContext to access ads data
import { ThemeContext } from "../../../components/ModeThemeContext"; // Import ThemeContext for theme management
import { useLocation, useNavigate } from "react-router"; // Import hooks for navigation and location handling
import { UserContext } from "../../../components/UserContextProvider"; // Import UserContext to access user data
import { toast } from "react-toastify"; // Import toast for notifications
import SpinnerLoader from "../../../components/SpinnerLoader"; // Import SpinnerLoader component for loading state
import dayjs from "dayjs"; // Import dayjs
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
dayjs.extend(relativeTime);

function ManageMyAds() {
  // Get ads data from AdContext
  const { ads } = useContext(AdContext);
  ads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  // Get theme state from ThemeContext
  const [theme] = useContext(ThemeContext);
  // Get user data from UserContext
  const { user } = useContext(UserContext);
  // is user posted ad
  // Initialize navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to check user authentication status
  useEffect(() => {
    // If user email is not present, navigate to home and show error message
    if (!user.email) {
      navigate("/"); // Redirect to home page
      toast.error("Please login first"); // Show error toast notification
    }
  }, [user.email, navigate]); // Dependency array includes user email and navigate function

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-zinc-50 text-zinc-800" // Light theme styles
          : "bg-zinc-800 text-zinc-300" // Dark theme styles
      } min-h-[calc(100vh-6rem)] p-5 mt-24`} // Container styles
    >
      <h1 className="text-2xl font-bold mb-6">My Ads</h1>{" "}
      {/* Heading for the ads section */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`} // Responsive grid for ads
      >
        {ads
          .filter((ad) => user.email === ad.email) // Filter ads to show only those created by the logged-in user
          .map((ad, index) => (
            <div
              key={index} // Use index as a key for each ad item (better approach is to use a unique ID if available)
              className={`${
                theme === "light"
                  ? "bg-zinc-50 text-zinc-800 shadow-sm shadow-zinc-400"
                  : "bg-zinc-900 text-zinc-300 shadow-sm shadow-zinc-950"
              } border-none outline-none rounded-lg shadow-md overflow-hidden w-full max-w-md`} // Ad card styling
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden flex flex-col justify-between ">
                <img
                  src={ad.imageFile} // Display the ad's image
                  alt={ad.title} // Alternative text for accessibility
                  className="w-full h-56 object-contain" // Image styling
                />
              </div>

              {/* Ad Details */}
              <div
                className={`${
                  theme === "light" ? "text-zinc-800" : "text-zinc-300"
                } p-3`} // Details section styling based on theme
              >
                <div className="titleAndTime flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-2">{ad.title}</h2>{" "}
                  {/* Ad title */}
                  <h2 className="text-lg font-semibold mb-2">
                    {dayjs(ad.timestamp).fromNow()}{" "}
                  </h2>{" "}
                  {/* Timestamp of the ad */}
                </div>
                <p className="text-md font-bold text-orange-600 mb-1">
                  Rs: {ad.price} {/* Price of the ad */}
                </p>
                <p className="text-sm mb-1">
                  <strong>Brand:</strong> {ad.brand} {/* Brand of the item */}
                </p>
                <p className="text-sm mb-1">
                  <strong>Condition:</strong> {ad.condition}{" "}
                  {/* Condition of the item (new/used) */}
                </p>
                <p className="text-sm mb-1">
                  <strong>Location:</strong> {ad.location}{" "}
                  {/* Location of the item */}
                </p>
                <p className="text-sm mb-1">
                  <strong>Contact Num:</strong> {ad.contact}{" "}
                  {/* Contact number for inquiries */}
                </p>
                <p className="text-sm mb-1">
                  <strong>Repaired:</strong>{" "}
                  {ad.repaired === "yes" ? "Yes" : "No"}{" "}
                  {/* Indicate if the item has been repaired */}
                </p>

                {/* Larger Description with Title */}
                <p className="text-sm mb-1">
                  <strong>Description:</strong>
                </p>
                <p className="text-sm mb-4 h-16 overflow-auto">
                  {ad.description} {/* Description of the ad */}
                </p>

                {/* Message and Edit Ad */}
                <div className="flex flex-col gap-5">
                  {/* Action Button */}
                  {location.pathname === "/ManageMyAds" && ( // Check if the current route is ManageMyAds
                    <button
                      onClick={() => navigate("/CreateNewAd")} // Navigate to CreateNewAd on click
                      className={`${
                        theme === "light"
                          ? "bg-zinc-900 text-zinc-300"
                          : "bg-orange-600 text-zinc-300"
                      } w-full py-2 rounded-md font-semibold hover:opacity-95 transition`} // Button styling
                    >
                      Edit Ad {/* Button text */}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ManageMyAds; // Export the ManageMyAds component for use in other parts of the application
