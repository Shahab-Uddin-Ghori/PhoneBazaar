// Import React and necessary modules
import React from "react";
import "./App.css"; // Import custom CSS styles for the app
import Header from "./components/Header"; // Import the Header component
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import routing components from react-router-dom
import Explore from "./user/Pages/Explore"; // Import the Explore page
import Home from "./components/Home"; // Import the Home page
import Brands from "./user/Pages/Brands"; // Import the Brands page
import MyAds from "./user/Pages/AddCreateWork/MyAds"; // Import My Ads page
import Messages from "./user/Pages/Messages"; // Import Messages page
import ContactUs from "./user/Pages/ContactUs"; // Import Contact Us page
import UserLogin from "./authentication/user/UserLogin"; // Import User Login page
import UserSignup from "./authentication/user/UserSignup"; // Import User Signup page
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import Profile from "./user/Pages/Profile"; // Import User Profile page
import CreateNewAd from "./user/Pages/AddCreateWork/CreateNewAd"; // Import Create New Ad page
import ManageMyAds from "./user/Pages/AddCreateWork/ManageMyAds"; // Import Manage My Ads page
import PageNotFound from "./components/PageNotFound"; // Import Page Not Found component

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Main container for the app */}
        <div className="max-w-full overflow-hidden min-h-screen flex flex-col">
          <Header /> {/* Render the Header component at the top */}
          {/* Define the routing structure of the app */}
          <Routes>
            {/* Define the various routes and their corresponding components */}
            <Route path="/" element={<Home />} /> {/* Home page route */}
            <Route path="/Explore" element={<Explore />} />{" "}
            {/* Explore page route */}
            <Route path="/Brands" element={<Brands />} />{" "}
            {/* Brands page route */}
            <Route path="/MyAds" element={<MyAds />} />{" "}
            {/* My Ads page route */}
            <Route path="/CreateNewAd" element={<CreateNewAd />} />{" "}
            {/* Create New Ad route */}
            <Route path="/ManageMyAds" element={<ManageMyAds />} />{" "}
            {/* Manage My Ads route */}
            <Route path="/Messages" element={<Messages />} />{" "}
            {/* Messages route */}
            <Route path="/ContactUs" element={<ContactUs />} />{" "}
            {/* Contact Us route */}
            <Route path="/UserLogin" element={<UserLogin />} />{" "}
            {/* User Login route */}
            <Route path="/UserSignup" element={<UserSignup />} />{" "}
            {/* User Signup route */}
            <Route path="/Profile" element={<Profile />} />{" "}
            {/* User Profile route */}
            <Route path="/*" element={<PageNotFound />} />{" "}
            {/* Fallback route for 404 Not Found */}
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer /> {/* Render ToastContainer for notifications */}
    </>
  );
}

export default App; // Export the App component as the default export
