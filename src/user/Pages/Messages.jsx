import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../../components/UserContextProvider";
import { ThemeContext } from "../../components/ModeThemeContext";

function Messages() {
  const { user } = useContext(UserContext);
  const [theme] = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogin == false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user]);

  return (
    <div
      className={`${
        theme == "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } w-full min-h-[calc(100vh-6rem)] mt-24 p-5`}
    >
      <h1 className="text-3xl font-bold">Messages</h1>{" "}
    </div>
  );
}

export default Messages;
