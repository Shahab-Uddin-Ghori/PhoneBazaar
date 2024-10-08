import React, { useContext, useEffect, useState } from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import ModeThemeContext, {
  ThemeContext,
} from "../../components/ModeThemeContext";
import { FaGoogle } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase imports for authentication and database
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { UserContext } from "../../components/UserContextProvider";
import { doc, setDoc } from "firebase/firestore";
import SpinnerLoader from "../../components/SpinnerLoader";

function UserSignup() {
  // Using ThemeContext to manage the theme state
  const [theme, setTheme] = useContext(ThemeContext);

  // State to manage loading status during signup
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user.isLogin === true) {
      navigate("/");
    }
  }, [user]);

  // Hook for navigation
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isLogin == true) {
      navigate("/");
    }
  }, []);

  // State variables for storing user input in the signup form
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handleSignUpForm function for handling signup form submission
  const handleSignUpForm = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Log the email and password for debugging
      console.log(email, password);
      setLoading(true); // Set loading state to true while processing

      // Firebase function to create a new user
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Create a document in Firestore for the new user with their username and email
      const docRef = doc(db, "users", user.user.uid);
      const docAdded = await setDoc(docRef, {
        username,
        email,
        uid: user.user.uid,
      });

      setLoading(false); // Set loading state to false after processing

      // Notify the user of a successful signup
      toast.success("Sign up successful");
      console.log("User signed up and document added:", user);
      navigate("/"); // Navigate to the homepage after signup
    } catch (error) {
      // Notify the user of an error during signup
      toast.error(error.message);
      setLoading(false); // Ensure loading state is reset on error
    }
  };

  // Initialize Tw-elements for styling effects on input components
  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  return (
    <>
      {loading ? (
        // Show a loading spinner while processing the signup
        <SpinnerLoader />
      ) : (
        <section
          className={`${
            theme === "light" ? "bg-zinc-50" : "bg-zinc-800"
          } min-h-[calc(100vh-6rem)] py-5 mt-24`}
        >
          <div
            className={`${
              theme === "light" ? "text-zinc-800" : "text-zinc-300"
            } container px-6 pt-40`}
          >
            <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
              {/* Left side image for signup */}
              <div className="mb-12 md:mb-8 md:w-8/12 lg:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>

              {/* Right side signup form */}
              <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
                <form onSubmit={handleSignUpForm}>
                  {/* Username input field */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-[0.02rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary border-zinc-300 border-b-2"
                      id="username"
                      required
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-3 -top-5 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary hover:cursor-pointer"
                    >
                      Username
                    </label>
                  </div>

                  {/* Email input field */}
                  <div className="relative mb-6 pt-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 pt-[0.3rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary border-zinc-300 border-b-2"
                      id="emailInput"
                      required
                    />
                    <label
                      htmlFor="emailInput"
                      className="absolute left-3 -top-2 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary hover:cursor-pointer"
                    >
                      Email address
                    </label>
                  </div>

                  {/* Password input field */}
                  <div className="relative mb-6 pt-1">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none border-zinc-300 border-b-2 transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary"
                      id="passwordInput"
                      required
                    />
                    <label
                      htmlFor="passwordInput"
                      className="absolute left-3 -top-1 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary hover:cursor-pointer"
                    >
                      Password
                    </label>
                  </div>

                  {/* Terms and conditions checkbox */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="block">
                      <input
                        type="checkbox"
                        id="termsCheck"
                        className="h-[1.125rem] w-[1.125rem] rounded border-secondary-500 checked:bg-orange-700"
                        defaultChecked
                      />
                      <label htmlFor="termsCheck" className="ms-2">
                        I agree to the terms
                      </label>
                    </div>
                    <Link to="/" className="text-primary dark:text-primary-400">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Link to login page for existing users */}
                  <div
                    to="/"
                    className="text-primary dark:text-primary-400 block mb-5"
                  >
                    <span>Already have an account? &nbsp;</span>
                    <Link
                      to="/UserLogin"
                      className="text-orange-600 font-semibold"
                    >
                      Click Here to Login
                    </Link>
                  </div>

                  {/* Submit button for registration */}
                  <button
                    type="submit"
                    className={` ${
                      theme === "light" ? "bg-zinc-900" : "bg-orange-700"
                    } w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-orange-700 focus:outline-none`}
                  >
                    Register
                  </button>

                  {/* Divider for social login options */}
                  <div className="my-4 flex items-center">
                    <div className="flex-1 border-t border-neutral-300"></div>
                    <p className="mx-4 text-center font-semibold">OR</p>
                    <div className="flex-1 border-t border-neutral-300"></div>
                  </div>

                  {/* Button for Google sign-in */}
                  <button
                    className={`${
                      theme === "light" ? "bg-zinc-900" : "bg-orange-700"
                    } mb-3 flex w-full items-center justify-center rounded px-7 pb-2.5 pt-3 text-sm font-medium text-white hover:bg-orange-700`}
                    href="#!"
                    role="button"
                  >
                    <FaGoogle size={20} />
                    &nbsp; Continue with Google
                  </button>

                  {/* Button for Phone sign-in */}
                  <button
                    className={`${
                      theme === "light" ? "bg-zinc-900" : "bg-orange-700"
                    } hover:bg-orange-700 mb-3 flex w-full items-center justify-center rounded px-7 pb-2.5 pt-3 text-sm font-medium text-white`}
                    href="#!"
                    role="button"
                  >
                    <BiPhone size={20} />
                    &nbsp; Continue with Phone
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

export default UserSignup;
