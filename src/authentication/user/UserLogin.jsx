import React, { useContext, useEffect, useState } from "react"; // Import React and necessary hooks from React
import { ThemeContext } from "../../components/ModeThemeContext"; // Import theme context for managing light/dark mode
import { BiLogoGoogle, BiPhone } from "react-icons/bi"; // Import Google and Phone icons from react-icons
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication method for email/password login
import { auth } from "../../firebase"; // Import the Firebase authentication instance
import { toast } from "react-toastify"; // Import toast for displaying notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS for styling
import { useNavigate } from "react-router"; // Import hook for navigation
import { UserContext } from "../../components/UserContextProvider"; // Import user context for user authentication state
import SpinnerLoader from "../../components/SpinnerLoader"; // Import spinner loader component for loading state

const UserLogin = () => {
  const [theme] = useContext(ThemeContext); // Get the current theme from context
  const [loading, setLoading] = useState(false); // State to manage loading state during login
  const navigate = useNavigate(); // Initialize navigate function for routing
  const [email, setEmail] = useState(""); // State to manage email input
  const [password, setPassword] = useState(""); // State to manage password input
  const { user } = useContext(UserContext); // Get user data from context

  // Function to handle form submission for login
  const handleLoginForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true); // Set loading state to true while processing login
      console.log(email, password); // Log email and password for debugging
      const user = await signInWithEmailAndPassword(auth, email, password); // Authenticate user with Firebase
      console.log("user==>", user); // Log user information for debugging
      toast.success("User Login Successfully"); // Show success notification

      // Check if the user is logged in and navigate to home
      if (user.isLogin == true) {
        navigate("/"); // Redirect to the home page
        console.log(user); // Log user information for debugging
        setLoading(false); // Set loading state to false after successful login
      }
    } catch (error) {
      toast.error(error); // Show error notification if login fails
      toast.error(error.message); // Show specific error message
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  // Effect to redirect logged-in users to the home page
  useEffect(() => {
    if (user.isLogin == true) {
      navigate("/"); // Redirect to home page if user is logged in
    }
  }, [user]); // Dependency on user state

  return (
    <>
      {loading ? ( // Conditional rendering based on loading state
        <SpinnerLoader /> // Show spinner loader while loading
      ) : (
        <section className="min-h-[calc(100vh-6rem)]">
          {" "}
          {/* Main section with full height */}
          <div
            className={`${
              theme === "light" // Check the current theme for styling
                ? "bg-zinc-50 text-zinc-700" // Light theme styles
                : "bg-zinc-800 text-zinc-300" // Dark theme styles
            } min-h-screen p-5`} // Full height with padding
          >
            <div className="flex h-full flex-wrap items-center justify-center lg:justify-between mt-24">
              {" "}
              {/* Flex container for layout */}
              {/* Left column with image */}
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" // Sample image for login
                  className="w-full" // Full width
                  alt="Sample image" // Image alt text
                />
              </div>
              {/* Right column for login form */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form onSubmit={handleLoginForm}>
                  {" "}
                  {/* Form for login */}
                  <div className="flex flex-row items-center justify-center lg:justify-start relative">
                    <p className="mb-0 text-center">Login with</p>{" "}
                    {/* Text for login options */}
                    {/* Google login button */}
                    <button
                      type="button"
                      className={`${
                        theme == "light" // Check the current theme for styling
                          ? "bg-zinc-900 hover:bg-zinc-950" // Light theme styles
                          : "bg-orange-600 hover:bg-orange-700" // Dark theme styles
                      } mx-1 inline-block h-9 w-9 rounded-full p-2 shadow-primary-3 transition duration-150 ease-in-out absolute left-0 lg:left-28`} // Button styles
                    >
                      <BiLogoGoogle size={21} className={`text-zinc-100`} />{" "}
                      {/* Google icon */}
                    </button>
                    {/* Phone login button */}
                    <button
                      type="button"
                      className={`${
                        theme == "light" // Check the current theme for styling
                          ? "bg-zinc-900 hover:bg-zinc-950" // Light theme styles
                          : "bg-orange-600 hover:bg-orange-700" // Dark theme styles
                      } mx-1 inline-block h-9 w-9 rounded-full p-2 shadow-primary-3 transition duration-150 ease-in-out absolute right-0 lg:right-28`} // Button styles
                    >
                      <BiPhone size={20} className="text-zinc-100" />{" "}
                      {/* Phone icon */}
                    </button>
                  </div>
                  {/* Separator line with text */}
                  <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold">Or</p>{" "}
                    {/* Text for separator */}
                  </div>
                  {/* Email input field */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={email} // Bind email state
                      onChange={(e) => setEmail(e.target.value)} // Update email state on change
                      id="email"
                      className="peer block w-full rounded border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-500 transition-all " // Input styles
                      placeholder=" " // Placeholder for accessibility
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3 top-1 -translate-y-4 scale-75 transform text-gray-500 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600" // Label styles with transitions
                    >
                      Email address {/* Label for email input */}
                    </label>
                  </div>
                  {/* Password input field */}
                  <div className="relative mb-6">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)} // Update password state on change
                      id="password"
                      className="peer block w-full rounded border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-500 transition-all " // Input styles
                      placeholder=" " // Placeholder for accessibility
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-3 top-1 -translate-y-4 scale-75 transform text-gray-500 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600" // Label styles with transitions
                    >
                      Password {/* Label for password input */}
                    </label>
                  </div>
                  {/* Submit button */}
                  <button
                    className={` ${
                      theme == "light" // Check the current theme for styling
                        ? "bg-zinc-900 hover:bg-zinc-950" // Light theme styles
                        : "bg-orange-600 hover:bg-orange-700" // Dark theme styles
                    } inline-block w-full text-white py-2 rounded transition duration-200 ease-in-out`} // Button styles
                  >
                    Log In {/* Text for submit button */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserLogin; // Export the UserLogin component
