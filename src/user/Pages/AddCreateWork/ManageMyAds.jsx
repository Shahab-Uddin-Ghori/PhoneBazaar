import React, { useContext } from "react";
import { AdContext } from "../../../components/Adprovider";
import { ThemeContext } from "../../../components/ModeThemeContext";

function ManageMyAds() {
  const { ads } = useContext(AdContext);
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme == "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } min-h-screen p-5  mt-24`}
    >
      <h1 className="text-2xl font-bold mb-6 ">My Ads</h1>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {ads.length > 0 ? (
          ads.map((ad, index) => (
            <div
              key={index}
              className={`${
                theme == "light"
                  ? "bg-zinc-50 text-zinc-800"
                  : "bg-zinc-900 text-zinc-300"
              }  border-none outline-none rounded-lg shadow-md overflow-hidden w-full max-w-xs`}
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden">
                <img
                  src={ad.imageFile}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Ad Details */}
              <div
                className={`${
                  theme === "light" ? "text-zinc-800" : "text-zinc-300"
                } p-3`}
              >
                <h2 className="text-lg font-semibold mb-2">{ad.title}</h2>
                <p className="text-md font-bold text-orange-600 mb-1">
                  ${ad.price}
                </p>
                <p className="text-sm  mb-1">
                  <strong>Brand:</strong> {ad.brand}
                </p>
                <p className="text-sm  mb-1">
                  <strong>Condition:</strong> {ad.condition}
                </p>
                <p className="text-sm  mb-1">
                  <strong>Repaired:</strong>{" "}
                  {ad.repaired === "yes" ? "Yes" : "No"}
                </p>

                {/* Larger Description with Title */}
                <p className="text-sm  mb-1">
                  <strong>Description:</strong>
                </p>
                <p className="text-sm  mb-4 h-16 overflow-auto">
                  {ad.description}
                </p>

                {/* Action Button */}
                <button
                  className={`${
                    theme === "light"
                      ? "bg-zinc-900 text-zinc-300"
                      : "bg-orange-600 text-zinc-300"
                  } w-full  py-2 rounded-md font-semibold hover:opacity-95 transition`}
                >
                  Edit Ad
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No ads yet.</p>
        )}
      </div>
    </div>
  );
}

export default ManageMyAds;
