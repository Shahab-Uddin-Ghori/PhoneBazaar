import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { useNavigate } from "react-router";
import { FaUserEdit } from "react-icons/fa";
import { ThemeContext } from "../../components/ModeThemeContext";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerLoader from "../../components/SpinnerLoader";

function Profile() {
  const [theme] = useContext(ThemeContext);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State for form inputs
  const [ProfileImg, SetProfileImg] = useState(user?.ProfileImg);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState(user?.contact || "");
  const [description, setDescription] = useState(user?.description || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.isLogin) {
      navigate("/");
    }
  }, [user]);

  // Handle form submission
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const obj = {
        username,
        email,
        contact,
        description,
      };
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, obj);
      setUser({ ...user, ...obj });
      setLoading(false);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ handleProfileUpdate ~ error:", error);
      toast.error(error.message);
    }
  };

  const handeUpdateUserImage = async (e) => {
    console.log("e=>", e.target.files[0]);
    try {
      setLoading(true);
      const storageRef = ref(storage, `users/${user.uid}`);
      // image upload krne ke lye
      const uploadImg = await uploadBytes(storageRef, e.target.files[0]);
      // image lena parhta he url
      const url = await getDownloadURL(storageRef);
      SetProfileImg(url);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { ProfileImg: url });
      setUser({ ...user, ProfileImg: url });
      toast.success("Profile Updated Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading == true ? (
        <SpinnerLoader />
      ) : (
        <section
          className={`${
            theme === "light"
              ? "bg-zinc-100 h-screen text-zinc-800"
              : "bg-gray-800 h-screen text-zinc-500"
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
                      className="rounded-full cursor-pointer overflow-hidden bg-zinc-900 dark:bg-gray-600 w-36 h-36 flex items-center justify-center"
                    >
                      {ProfileImg ? (
                        <img
                          src={
                            typeof ProfileImg === "string"
                              ? ProfileImg
                              : URL.createObjectURL(ProfileImg)
                          }
                          className="cursor-pointer h-34 w-34 bg-blue-200 rounded-full border z-10"
                          alt="Profile"
                        />
                      ) : (
                        <FaUserEdit size={30} className="text-gray-500" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      hidden
                      onChange={handeUpdateUserImage}
                    />
                  </div>

                  {/* Username */}
                  <div className="relative mb-8">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="usernameInput"
                      required
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="emailInput"
                      required
                      disabled
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                      id="descriptionInput"
                    />
                    <label
                      htmlFor="descriptionInput"
                      className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                    >
                      Description
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`${
                      theme === "light" ? "bg-zinc-900" : "bg-orange-700"
                    } w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-orange-700 focus:outline-none`}
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

export default Profile;
