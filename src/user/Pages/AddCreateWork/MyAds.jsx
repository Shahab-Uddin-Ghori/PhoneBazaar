import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../components/UserContextProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function MyAds() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isLogin == false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user]);

  return <div>My Ads</div>;
}

export default MyAds;
