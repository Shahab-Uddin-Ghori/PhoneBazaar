import { useContext } from "react";
import UserSignup from "./authentication/user/UserSignup";
import UserLogin from "./authentication/user/UserLogin";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Brands from "./user/Pages/Brands";
import Messages from "./user/Pages/Messages";
import CreateAd from "./user/Pages/CreateAd";
import Profile from "./user/Pages/Profile";
import Home from "./components/Home";
import ModeContex, { themeContext } from "./components/ModeContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useContext(themeContext);

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-zinc-800 text-white"
      } min-h-screen flex flex-col gap-5`}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/Brands" element={<Brands />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/CreateAd" element={<CreateAd />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
