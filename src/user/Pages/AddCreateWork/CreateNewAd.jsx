import React, { useContext, useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { ThemeContext } from "../../../components/ModeThemeContext";
import { AdContext } from "../../../components/Adprovider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { tr } from "date-fns/locale";
import { UserContext } from "../../../components/UserContextProvider";
import SpinnerLoader from "../../../components/SpinnerLoader";
import dayjs from "dayjs"; // Import dayjs
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
dayjs.extend(relativeTime);
// dayjs().to(dayjs("1990-01-01")); // "31 years ago"

function CreateNewAd() {
  const navigate = useNavigate();
  const [theme] = useContext(ThemeContext);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [repaired, setRepaired] = useState("");
  const [description, setDescription] = useState("");
  const { setAdData } = useContext(AdContext); // Use AdContext to save ad data
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // console.log(user.email);

  useEffect(() => {
    if (user.isLogin == false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user]);

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
      await setAdData({
        email: user.email,
        imageFile,
        title,
        price,
        brand,
        condition,
        repaired,
        location,
        contact,
        description,
        // timestamp: new Date(Date.now()).toLocaleString(),
        timestamp: dayjs().toISOString(),
      });
      setLoading(false);
      toast.success("Ad Under Preview");
      setShowConfirmation(true);
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading == false ? (
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
                  Submit Ad
                </button>
              </div>
            </form>
          </div>

          {/* ad underView */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Ad Submitted Successfully
                </h2>
                <p>Your ad has been submitted and is now under review.</p>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate("/ManageMyAds");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <SpinnerLoader />
      )}
    </>
  );
}

export default CreateNewAd;
