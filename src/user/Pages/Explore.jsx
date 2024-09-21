// import React from "react";
// import ManageMyAds from "./AddCreateWork/ManageMyAds";

// function Explore() {
//   return (
//     <div>
//       <ManageMyAds text="Explore the best phone for yourself" />
//     </div>
//   );
// }

// export default Explore;
import React, { useContext } from "react";
import { AdContext } from "../../components/Adprovider";
import { ThemeContext } from "../../components/ModeThemeContext";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../../components/UserContextProvider";

function Explore() {
  const { ads } = useContext(AdContext);
  const [theme, setTheme] = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`${
        theme == "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } min-h-[calc(100vh-6rem)] p-5 mt-24  `}
    >
      <h1 className="text-2xl font-bold mb-6 ">Explore the World of Phone</h1>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {ads.length > 0 ? (
          ads.map((ad, index) => (
            <div
              key={index}
              className={`${
                theme == "light"
                  ? "bg-zinc-50 text-zinc-800"
                  : "bg-zinc-900 text-zinc-300"
              }  border-none outline-none rounded-lg shadow-md overflow-hidden w-full max-w-md`}
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden object-contain object-center">
                <img
                  src={ad.imageFile}
                  alt={ad.title}
                  className="w-full h-56 object-cover "
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
                  <h2 className="text-lg font-semibold mb-2">{ad.timestamp}</h2>
                </div>
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
                  <strong>Location:</strong> {ad.location}
                </p>
                <p className="text-sm  mb-1">
                  <strong>Contact Num:</strong> {ad.contact}
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

                {/* Message and Edit Ad.. */}
                <div className="flex flex-col gap-5">
                  {/* Message */}
                  <button
                    onClick={() => navigate("/Messages")}
                    className={`${
                      theme === "light"
                        ? "bg-zinc-900 text-zinc-300"
                        : "bg-orange-600 text-zinc-300"
                    } w-full py-2 rounded-md font-semibold hover:opacity-95 transition`}
                  >
                    Message
                  </button>
                </div>
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

export default Explore;
