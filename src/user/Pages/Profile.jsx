import React, { useContext, useEffect, useState } from "react"; // Import necessary libraries and hooks
import { UserContext } from "../../components/UserContextProvider"; // Import UserContext to manage user data
import { useNavigate } from "react-router"; // Import useNavigate for page redirection
import { FaUserEdit } from "react-icons/fa"; // Import icon for user edit
import { ThemeContext } from "../../components/ModeThemeContext"; // Import ThemeContext for theming
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions for document operations
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Import Storage functions for file handling
import { db, storage } from "../../firebase"; // Import Firebase configurations for Firestore and Storage
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast notifications
import SpinnerLoader from "../../components/SpinnerLoader"; // Import SpinnerLoader component for loading state

function Profile() {
  const [theme] = useContext(ThemeContext); // Get current theme from ThemeContext
  const { user, setUser } = useContext(UserContext); // Get user data and setUser function from UserContext
  const navigate = useNavigate(); // Initialize navigation for page redirection

  // State variables for managing form inputs
  const [ProfileImg, SetProfileImg] = useState(user?.ProfileImg); // State for profile image
  const [username, setUsername] = useState(user?.username || ""); // State for username
  const [email, setEmail] = useState(user?.email || ""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [contact, setContact] = useState(user?.contact || ""); // State for contact
  const [description, setDescription] = useState(user?.description || ""); // State for user description
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Effect to redirect to home if user is not logged in
  useEffect(() => {
    if (!user?.isLogin) {
      navigate("/"); // Redirect to home page
    }
  }, [user]); // Dependency array: run effect when user changes

  // Handle form submission for profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true); // Set loading state to true
      const obj = {
        username,
        email,
        contact,
        description,
      };
      const docRef = doc(db, "users", user.uid); // Reference to user's document in Firestore
      await updateDoc(docRef, obj); // Update the user's document with new values
      setUser({ ...user, ...obj }); // Update the user context with new values
      setLoading(false); // Reset loading state
      toast.success("Profile Updated Successfully"); // Show success notification
    } catch (error) {
      setLoading(false); // Reset loading state on error
      console.log("🚀 ~ handleProfileUpdate ~ error:", error); // Log error for debugging
      toast.error(error.message); // Show error notification
    }
  };

  // Handle user image upload
  const handeUpdateUserImage = async (e) => {
    console.log("e=>", e.target.files[0]); // Log selected file for debugging
    try {
      setLoading(true); // Set loading state to true
      const storageRef = ref(storage, `users/${user.uid}`); // Reference to storage location for user image
      // Upload image to storage
      const uploadImg = await uploadBytes(storageRef, e.target.files[0]);
      // Get download URL of the uploaded image
      const url = await getDownloadURL(storageRef);
      SetProfileImg(url); // Update local profile image state
      const docRef = doc(db, "users", user.uid); // Reference to user's document in Firestore
      await updateDoc(docRef, { ProfileImg: url }); // Update user's document with new image URL
      setUser({ ...user, ProfileImg: url }); // Update user context with new profile image
      toast.success("Profile Updated Successfully"); // Show success notification
      setLoading(false); // Reset loading state
    } catch (error) {
      setLoading(false); // Reset loading state on error
      console.log(error); // Log error for debugging
      toast.error(error.message); // Show error notification
    }
  };

  return (
    <>
      {loading == true ? (
        <SpinnerLoader /> // Show loading spinner if loading
      ) : (
        <section
          className={`${
            theme === "light"
              ? "bg-zinc-100 h-screen text-zinc-800" // Light theme styles
              : "bg-gray-800 h-screen text-zinc-500" // Dark theme styles
          }`}
        >
          <div className="container h-full px-6 py-24 mx-auto ">
            <div className="flex h-full flex-wrap items-center justify-center ">
              <div className="md:w-8/12 lg:w-5/12">
                {/* Profile Form */}
                <form onSubmit={handleProfileUpdate}>
                  {/* Profile Image Upload */}
                  <div className="relative mb-8 flex justify-center ">
                    <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-orange-600 absolute"></div>
                    <label
                      htmlFor="fileInput"
                      className="rounded-full cursor-pointer overflow-hidden z-10 bg-zinc-900 dark:bg-gray-600 w-36 h-36 flex items-center justify-center"
                    >
                      {ProfileImg ? (
                        <img
                          src={
                            typeof ProfileImg === "string"
                              ? ProfileImg
                              : URL.createObjectURL(ProfileImg) // Create a local URL for image preview
                          }
                          className="cursor-pointer h-34 w-34 bg-blue-200 rounded-full border z-10"
                          alt="Profile"
                        />
                      ) : (
                        <FaUserEdit size={30} className="text-gray-500" /> // Show edit icon if no image
                      )}
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*" // Accept only image files
                      hidden
                      onChange={handeUpdateUserImage} // Handle image upload
                    />
                  </div>

                  {/* Username */}
                  <div className="relative mb-8">
                    <input
                      type="text"
                      value={username} // Bind value to state
                      onChange={(e) => setUsername(e.target.value)} // Update state on change
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="usernameInput"
                      required // Make field required
                    />
                    <label
                      htmlFor="usernameInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Username
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative mb-8">
                    <input
                      type="email"
                      value={email} // Bind value to state
                      onChange={(e) => setEmail(e.target.value)} // Update state on change
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="emailInput"
                      required // Make field required
                      disabled // Disable editing for email
                    />
                    <label
                      htmlFor="emailInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Email address
                    </label>
                  </div>

                  {/* Password */}
                  <div className="relative mb-8">
                    <input
                      type="password"
                      value={password} // Bind value to state
                      onChange={(e) => setPassword(e.target.value)} // Update state on change
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="passwordInput"
                    />
                    <label
                      htmlFor="passwordInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Password
                    </label>
                  </div>

                  {/* Contact */}
                  <div className="relative mb-8">
                    <input
                      type="text"
                      value={contact} // Bind value to state
                      onChange={(e) => setContact(e.target.value)} // Update state on change
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="contactInput"
                    />
                    <label
                      htmlFor="contactInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Contact
                    </label>
                  </div>

                  {/* Description */}
                  <div className="relative mb-8">
                    <textarea
                      value={description} // Bind value to state
                      onChange={(e) => setDescription(e.target.value)} // Update state on change
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="descriptionInput"
                      rows={5} // Set rows for textarea
                    />
                    <label
                      htmlFor="descriptionInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Description
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded bg-orange-600 py-3 font-semibold text-white hover:bg-orange-500 transition duration-200 ease-in-out"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile; // Export Profile component for use in other parts of the application
