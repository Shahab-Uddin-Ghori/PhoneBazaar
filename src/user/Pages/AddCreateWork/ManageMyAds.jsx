import React, { useContext, useEffect, useState } from "react"; // Import React and necessary hooks
import { AdContext } from "../../../components/Adprovider"; // Import AdContext to access ads data
import { ThemeContext } from "../../../components/ModeThemeContext"; // Import ThemeContext for theme management
import { useLocation, useNavigate } from "react-router"; // Import hooks for navigation and location handling
import { UserContext } from "../../../components/UserContextProvider"; // Import UserContext to access user data
import { toast } from "react-toastify"; // Import toast for notifications
import SpinnerLoader from "../../../components/SpinnerLoader"; // Import SpinnerLoader component for loading state
import dayjs from "dayjs"; // Import dayjs
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import { FaUserEdit } from "react-icons/fa";

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

  // page handle myads and EditMyAd ///////////////////

  //
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [contact, setContact] = useState("");
  const [repaired, setRepaired] = useState("");
  const [description, setDescription] = useState("");
  const { setAdData } = useContext(AdContext); // Use AdContext to save ad data
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  //
  const [adID, setAdID] = useState("");
  const [editAd, SetEditAd] = useState(false);

  useEffect(() => {
    if (adID.trim() !== "") {
      SetEditAd(true);
    }
    console.log("🚀 ~ useEffect ~ adID:", adID);
  }, [adID]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!imageFile) {
        toast.error("Please select an image file.");
        return;
      }

      // Save ad data
      // await setAdData({
      //   email: user.email,
      //   imageFile,
      //   title,
      //   price,
      //   brand,
      //   condition,
      //   repaired,
      //   location,
      //   contact,
      //   description,
      //   // timestamp: new Date(Date.now()).toLocaleString(),
      //   timestamp: dayjs().toISOString(),
      // });
      setLoading(false);
      toast.success("Ad Under Preview");
      setShowConfirmation(true);
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //////////////////////////////////////////////////////////

  // Effect to check user authentication status
  useEffect(() => {
    // If user email is not present, navigate to home and show error message
    if (!user.email) {
      navigate("/"); // Redirect to home page
      toast.error("Please login first"); // Show error toast notification
    }
  }, [user.email, navigate]); // Dependency array includes user email and navigate function

  return (
    <>
      {editAd == false ? (
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
                      <strong>Brand:</strong> {ad.brand}{" "}
                      {/* Brand of the item */}
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
                          onClick={() => {
                            setAdID(ad.id);
                            SetEditAd(true);
                          }}
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
      ) : (
        <div
          className={`${
            theme === "light"
              ? "bg-zinc-50 text-zinc-800"
              : "bg-zinc-800 text-zinc-300"
          } flex flex-col w-full min-h-[calc(100vh-6rem)] p-5 mt-20`}
        >
          <h1 className="text-3xl font-bold mb-8 mt-5">Create Your Ad</h1>

          <div className={` container w-full flex justify-center items-center`}>
            <form
              className={`flex flex-col sm:w-[50%] w-[100%] shadow-lg rounded-lg p-5 ${
                theme === "light"
                  ? "bg-zinc-50 text-zinc-900"
                  : "bg-zinc-900 shadow-xl"
              }`}
              onSubmit={handleSubmit}
            >
              <div className="w-full h-64 rounded-lg overflow-hidden mb-5">
                <label
                  htmlFor="fileInput"
                  className="w-full h-full flex justify-center items-center hover:cursor-pointer"
                >
                  {imageFile ? (
                    <img
                      className="object-cover w-full h-full"
                      src={
                        typeof imageFile === "string"
                          ? imageFile
                          : URL.createObjectURL(imageFile)
                      }
                      alt="Ad Image"
                    />
                  ) : (
                    <FaUserEdit size={50} className="text-gray-500" />
                  )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Title and Price */}
              <div className="flex flex-col sm:flex-row justify-between mb-5">
                <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
                  <label htmlFor="title" className="block mb-1 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`w-full p-2 border ${
                      theme === "light" ? "border-gray-300" : "border-zinc-600"
                    } rounded-lg bg-transparent`}
                    placeholder="Ad title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-[48%]">
                  <label htmlFor="price" className="block mb-1 font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className={`w-full p-2 border ${
                      theme === "light" ? "border-gray-300" : "border-zinc-600"
                    } rounded-lg bg-transparent`}
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Brand and Condition */}
              <div className="flex flex-col sm:flex-row justify-between mb-5">
                {/* brands */}
                <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
                  <label htmlFor="brands" className="block mb-1 font-medium">
                    Brand
                  </label>
                  <select
                    id="brands"
                    className={`w-full p-2 border ${
                      theme === "light"
                        ? "border-gray-50 text-zinc-700"
                        : "border-zinc-800 text-zinc-700"
                    } rounded-lg bg-transparent`}
                    defaultValue="" // Correct way to set default
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Brand
                    </option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Huawei">Huawei</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="GooglePixel">Google Pixel</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Realme">Realme</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Motorola">Motorola</option>
                  </select>
                </div>

                {/* condition */}
                <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
                  <label htmlFor="condition" className="block mb-1 font-medium">
                    Condition
                  </label>
                  <select
                    id="condition"
                    className={`w-full p-2 border ${
                      theme === "light"
                        ? "border-gray-50 text-zinc-700"
                        : "border-zinc-800 text-zinc-700"
                    } rounded-lg bg-transparent`}
                    defaultValue="" // Correct way to set default
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="" disabled>
                      Phone condition
                    </option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
              </div>
              {/*  */}

              {/* location and contact */}
              <div className="flex flex-col sm:flex-row justify-between mb-5">
                {/* Location */}
                <div className="w-full sm:w-[48%]">
                  <label htmlFor="location" className="block mb-1 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className={`w-full p-2 border ${
                      theme === "light" ? "border-gray-300" : "border-zinc-600"
                    } rounded-lg bg-transparent`}
                    placeholder="Set your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                {/* contact */}
                <div className="w-full sm:w-[48%]">
                  <label htmlFor="contact" className="block mb-1 font-medium">
                    Contact Num
                  </label>
                  <input
                    type="text"
                    id="contact"
                    className={`w-full p-2 border ${
                      theme === "light" ? "border-gray-300" : "border-zinc-600"
                    } rounded-lg bg-transparent`}
                    placeholder="Contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              {/* Repaired Radio Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mb-5">
                <div className="w-full">
                  <label htmlFor="repaired" className="block mb-1 font-medium">
                    Repaired?
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="repaired"
                        value="yes"
                        className="form-radio"
                        checked={repaired === "yes"}
                        onChange={() => setRepaired("yes")}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="repaired"
                        value="no"
                        className="form-radio"
                        checked={repaired === "no"}
                        onChange={() => setRepaired("no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="w-full mb-5">
                <label htmlFor="description" className="block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  className={`w-full p-2 border ${
                    theme === "light" ? "border-gray-300" : "border-zinc-600"
                  } rounded-lg bg-transparent`}
                  placeholder="Add details about your phone"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className={`w-full p-3 rounded-lg font-semibold ${
                    theme === "light"
                      ? "bg-zinc-900 text-zinc-50"
                      : "bg-orange-600 text-zinc-50"
                  } hover:opacity-90`}
                >
                  Update Ad
                </button>
              </div>
            </form>
          </div>

          {/* ad underView */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Ad Updated Successfully
                </h2>
                <p>Your ad has been submitted and is now under review.</p>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate("/ManageMyAds");
                    SetEditAd(false);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ManageMyAds; // Export the ManageMyAds component for use in other parts of the application
