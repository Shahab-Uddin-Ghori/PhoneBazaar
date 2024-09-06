import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Icons for Google and Facebook
import { auth, createUserWithEmailAndPassword } from "../../firebase";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setEmail(`Password mismatch \n please enter same password`);
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
        //   ,then means on this func
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("🚀 ~ .then ~ user:", user);
          // ...
        });
    } catch (error) {
      setError(error.message);
      console.log("🚀 ~ handleSubmit ~ error.message:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        {/* form submit */}
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter your name..."
            />
          </div>

          {/* username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter your username..."
            />
          </div>

          {/* email */}
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

          {/* Contact number... */}
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => {
                const regex = /^[0-9]*$/; // Only allow numbers
                if (regex.test(e.target.value)) {
                  setContact(e.target.value);
                }
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter your contact number..."
              maxLength="11" // Optional: Limit the number of digits (adjust as needed)
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
              placeholder="Create new password..."
            />
          </div>

          {/* confirm password */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Confirm password..."
            />
          </div>
          {/* forgot password */}
          <div className="mb-6">
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Forgot Password?
            </a>
          </div>

          {/* sumbit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>

          {/* hr */}
          <div className="flex items-center justify-between mt-6">
            <div className="w-full border-t border-gray-300"></div>
            <span className="mx-4 text-gray-600">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* login with Google and fb */}
          <div className="flex justify-around mt-6">
            <button className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md hover:bg-gray-300">
              <FaGoogle className="text-gray-600 text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md hover:bg-gray-300">
              <FaFacebook className="text-blue-600 text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
