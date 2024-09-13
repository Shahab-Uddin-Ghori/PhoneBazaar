import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../../components/UserContextProvider";

function Messages() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogin == false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user]);

  return <div>Messages</div>;
}

export default Messages;
