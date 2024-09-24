import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../../../components/Adprovider";
import { ThemeContext } from "../../../components/ModeThemeContext";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../../../components/UserContextProvider";
import { toast } from "react-toastify";
import SpinnerLoader from "../../../components/SpinnerLoader";

function ManageMyAds() {
  const { ads } = useContext(AdContext);
  const [theme, setTheme] = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.email) {
      navigate("/");
      toast.error("Please login first");
    }
  }, []);

  return (
    <>
      {ads ? (
        <div
          className={`${
            theme == "light"
              ? "bg-zinc-50 text-zinc-800"
              : "bg-zinc-800 text-zinc-300"
          } min-h-[calc(100vh-6rem)] p-5 mt-24  `}
        >
          <h1 className="text-2xl font-bold mb-6 ">My Ads</h1>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}
          >
            {ads
              .filter((ad) => user.email === ad.email) // Filter ads based on user email
              .map((ad, index) => (
                <div
                  key={index} // Use key in the outermost element of map
                  className={`${
                    theme === "light"
                      ? "bg-zinc-50 text-zinc-800 shadow-sm shadow-zinc-400"
                      : "bg-zinc-900 text-zinc-300 shadow-sm shadow-zinc-950"
                  } border-none outline-none rounded-lg shadow-md overflow-hidden w-full max-w-md`}
                >
                  {/* Image Section */}
                  <div className="h-48 overflow-hidden flex flex-col justify-between ">
                    <img
                      src={ad.imageFile}
                      alt={ad.title}
                      className="w-full h-56 object-contain"
                    />
                  </div>

                  {/* Ad Details */}
                  <div
                    className={`${
                      theme === "light" ? "text-zinc-800" : "text-zinc-300"
                    } p-3`}
                  >
                    <div className="titleAndTime flex justify-between items-center">
                      <h2 className="text-lg font-semibold mb-2">{ad.title}</h2>
                      <h2 className="text-lg font-semibold mb-2">
                        {ad.timestamp}
                      </h2>
                    </div>
                    <p className="text-md font-bold text-orange-600 mb-1">
                      ${ad.price}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Brand:</strong> {ad.brand}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Condition:</strong> {ad.condition}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Location:</strong> {ad.location}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Contact Num:</strong> {ad.contact}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Repaired:</strong>{" "}
                      {ad.repaired === "yes" ? "Yes" : "No"}
                    </p>

                    {/* Larger Description with Title */}
                    <p className="text-sm mb-1">
                      <strong>Description:</strong>
                    </p>
                    <p className="text-sm mb-4 h-16 overflow-auto">
                      {ad.description}
                    </p>

                    {/* Message and Edit Ad.. */}
                    <div className="flex flex-col gap-5">
                      {/* Action Button */}
                      {location.pathname === "/ManageMyAds" && (
                        <button
                          onClick={() => navigate("/CreateNewAd")}
                          className={`${
                            theme === "light"
                              ? "bg-zinc-900 text-zinc-300"
                              : "bg-orange-600 text-zinc-300"
                          } w-full py-2 rounded-md font-semibold hover:opacity-95 transition`}
                        >
                          Edit Ad
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <SpinnerLoader />
      )}
    </>
  );
}

export default ManageMyAds;
