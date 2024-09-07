import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Icons for Google and Facebook
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../../firebase";
import GoogleSingInLogin from "../../components/GoogleSingInLogin";
import { useNavigate } from "react-router";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //////////////////////////////

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Successfully logged in!");
        console.log("🚀 ~ .then ~ user:", user);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Incorrect email or password.");
      });
  };

  //   onAuthchange

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const uid = user.uid;
        console.clear();
        console.log(user);
        navigate("/");
        console.log("user is loged in");
      } else {
        console.clear();
        console.log("user is logout");
        // toast.success("Logout successfull")
      }
    } catch (error) {
      console.clear();
      console.log(error.message);
    }
  });

  //   signout

  return (
    <div className="flex justify-center items-center min-h-screen  p-2">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Log In</h2>

        {/* Form submit */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter your email..."
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter your password..."
            />
          </div>

          {/* Forgot Password */}
          <div className="mb-6">
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>

        {/* HR */}
        <div className="flex items-center justify-between mt-6">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Login with Google and Facebook */}
        <div className="flex justify-around mt-6">
          <GoogleSingInLogin toasttext={"Login successful!"} />
          <button className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md hover:bg-gray-300">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
