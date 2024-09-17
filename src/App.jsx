import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./user/Pages/Explore";
import Home from "./components/Home";
import Brands from "./user/Pages/Brands";
import MyAds from "./user/Pages/AddCreateWork/MyAds";
import Messages from "./user/Pages/Messages";
import ContactUs from "./user/Pages/ContactUs";
import UserLogin from "./authentication/user/UserLogin";
import UserSignup from "./authentication/user/UserSignup";
import { ToastContainer } from "react-toastify";
import Profile from "./user/Pages/Profile";
import CreateNewAd from "./user/Pages/AddCreateWork/CreateNewAd";
import ManageMyAds from "./user/Pages/AddCreateWork/ManageMyAds";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="max-w-full overflow-hidden min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/MyAds" element={<MyAds />} />
            <Route path="/CreateNewAd" element={<CreateNewAd />} />
            <Route path="/ManageMyAds" element={<ManageMyAds />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/UserLogin" element={<UserLogin />} />
            <Route path="/UserSignup" element={<UserSignup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
