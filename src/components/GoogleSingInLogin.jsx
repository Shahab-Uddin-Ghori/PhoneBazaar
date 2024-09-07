import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
} from "../firebase";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Icons for Google and Facebook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GoogleSingInLogin({ toasttext }) {
  return (
    <>
      <button
        onClick={() => {
          // singup with google
          const auth = getAuth();
          signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const user = result.user;
              console.log("🚀 ~ .then ~ user:", user);
              toast.success(`${toasttext}`);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(`Signup failed: ${error.message}`);
            });
        }}
        className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
      >
        <FaGoogle className="text-gray-600 text-xl" />
      </button>
      {/* Toast container */}
      <ToastContainer />
    </>
  );
}

export default GoogleSingInLogin;
