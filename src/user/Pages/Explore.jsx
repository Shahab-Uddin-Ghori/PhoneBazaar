import React, { useContext, useEffect, useState } from "react"; // Import necessary React hooks and libraries
import { AdContext } from "../../components/Adprovider"; // Import context for managing ads
import { ThemeContext } from "../../components/ModeThemeContext"; // Import context for theme management
import { useLocation, useNavigate } from "react-router"; // Import hooks for routing
import { UserContext } from "../../components/UserContextProvider"; // Import user context for user data
import SpinnerLoader from "../../components/SpinnerLoader"; // Import spinner for loading state
import { SearchContextValue } from "./AddCreateWork/SearchContext"; // Import search context for managing search queries

function Explore() {
  const { ads } = useContext(AdContext); // Get ads from the AdContext
  const [theme, setTheme] = useContext(ThemeContext); // Get theme context for light/dark mode
  const { user } = useContext(UserContext); // Get user data from UserContext
  const navigate = useNavigate(); // Initialize navigation for routing
  const location = useLocation(); // Get the current location for routing context
  const [search, setSearch] = useContext(SearchContextValue); // Get search value from SearchContext
  const [searchedAd, setSearchedAd] = useState([]); // Initialize state for searched ads

  useEffect(() => {
    // Effect to filter ads based on the search query
    const filteredAds = ads.filter(
      (ad) => ad.title.toLowerCase().includes(search.trim().toLowerCase()) // Check if the ad title includes the search term (case-insensitive)
    );

    // Update state with the filtered ads
    setSearchedAd(filteredAds);

    // Log the filtered result for debugging
    console.log("🚀 ~ Final searched ads:", filteredAds);
  }, [search, ads]); // Re-run whenever `search` or `ads` change

  return (
    <>
      {ads ? ( // Check if ads are available
        <div
          className={`${
            theme === "light" // Conditional styling based on the current theme
              ? "bg-zinc-50 text-zinc-800" // Light theme styles
              : "bg-zinc-800 text-zinc-300" // Dark theme styles
          } min-h-[calc(100vh-6rem)] p-5 mt-24`}
        >
          <h1 className="text-2xl font-bold mb-6 ">
            Explore the World of Phone
          </h1>
          {/* Container div for the ads */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
          >
            {ads.length > 0 ? ( // Check if there are any ads to display
              ads.map(
                (
                  ad,
                  index // Map through ads and render each ad
                ) => (
                  <div
                    key={index} // Unique key for each ad
                    className={`${
                      theme === "light" // Conditional styling for ad container
                        ? "bg-zinc-50 text-zinc-800 shadow-sm shadow-zinc-400" // Light theme styles
                        : "bg-zinc-900 text-zinc-300 shadow-sm shadow-zinc-950" // Dark theme styles
                    } border-none outline-none rounded-lg overflow-hidden w-full max-w-md flex flex-col justify-between`}
                  >
                    {/* Image Section */}
                    <div className="h-48 overflow-hidden ">
                      <img
                        src={ad.imageFile} // Display ad image
                        alt={ad.title} // Alt text for the image
                        className="w-full h-56 object-contain" // Style for the image
                      />
                    </div>

                    {/* Ad Details Section */}
                    <div
                      className={`${
                        theme === "light" ? "text-zinc-800" : "text-zinc-300"
                      } p-3`}
                    >
                      <div className="titleAndTime flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">
                          {ad.title}
                        </h2>{" "}
                        {/* Ad title */}
                        <h2 className="text-lg font-semibold mb-2">
                          {ad.timestamp} {/* Ad timestamp */}
                        </h2>
                      </div>
                      <p className="text-md font-bold text-orange-600 mb-1">
                        Rs: {ad.price} {/* Ad price */}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Brand:</strong> {ad.brand} {/* Ad brand */}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Condition:</strong> {ad.condition}{" "}
                        {/* Ad condition */}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Location:</strong> {ad.location}{" "}
                        {/* Ad location */}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Contact Num:</strong> {ad.contact}{" "}
                        {/* Contact number for the ad */}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Repaired:</strong>{" "}
                        {ad.repaired === "yes" ? "Yes" : "No"}{" "}
                        {/* Indicate if the phone is repaired */}
                      </p>

                      {/* Larger Description with Title */}
                      <p className="text-sm mb-1">
                        <strong>Description:</strong>
                      </p>
                      <p className="text-sm mb-4 h-16 overflow-auto">
                        {ad.description} {/* Ad description */}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-5">
                        {/* Message Button */}
                        <button
                          onClick={() => navigate("/Messages")} // Navigate to Messages page on click
                          className={`${
                            theme === "light"
                              ? "bg-zinc-900 text-zinc-300" // Button styles for light theme
                              : "bg-orange-600 text-zinc-300" // Button styles for dark theme
                          } w-full py-2 rounded-md font-semibold hover:opacity-95 transition`}
                        >
                          Message {/* Button text */}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-center text-lg">No ads yet.</p> // Message if no ads are available
            )}
          </div>
        </div>
      ) : (
        <SpinnerLoader /> // Show loader while ads are being fetched
      )}
    </>
  );
}

export default Explore; // Export the Explore component
