import React, { useContext, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { ThemeContext } from "../../../components/ModeThemeContext";

function CreateNewAd() {
  const [theme, setTheme] = useContext(ThemeContext);
  console.log(theme);

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${
        theme == "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } flex flex-col w-full min-h-[calc(100vh-6rem)] p-5 mt-20`}
    >
      {/* Heading should now be visible */}
      <h1 className="text-3xl font-bold mb-8 mt-5">Create Your Ad</h1>

      <div className={` container w-full flex justify-center items-center`}>
        <form
          className={`flex flex-col sm:w-[50%] w-[100%]  shadow-lg rounded-lg p-5 ${
            theme == "light"
              ? "bg-zinc-50 text-zinc-900"
              : "bg-zinc-900 shadow-xl"
          }`}
          onSubmit={handleSubmit}
        >
          {/* Image Upload */}
          <div className="w-full h-64  rounded-lg overflow-hidden mb-5">
            <label
              htmlFor="fileInput"
              className="w-full h-full flex justify-center items-center hover:cursor-pointer"
            >
              {imageUrl ? (
                <img
                  className="object-cover w-full h-full"
                  src={
                    typeof imageUrl === "string"
                      ? imageUrl
                      : URL.createObjectURL(imageUrl)
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
              onChange={(e) => setImageUrl(e.target.files[0])}
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
              />
            </div>
          </div>

          {/* Brand and Condition */}
          <div className="flex flex-col sm:flex-row justify-between mb-5">
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
                } rounded-lg bg-transparent outline-none border-none`}
                defaultValue="" // Correct way to set default
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
            <div className="w-full sm:w-[48%]">
              <label htmlFor="condition" className="block mb-1 font-medium">
                Condition
              </label>
              <input
                type="text"
                id="condition"
                className={`w-full p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-zinc-600"
                } rounded-lg bg-transparent`}
                placeholder="New or Used"
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
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="repaired"
                    value="no"
                    className="form-radio"
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
    </div>
  );
}

export default CreateNewAd;
