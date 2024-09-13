import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    email: "",
  });

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🚀 ~ subscribe ~ user:", user);
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const userInfo = await getDoc(docRef);
          console.log("🚀 ~ subscribe ~ userInfo:", userInfo.data());

          setUser({
            isLogin: true,
            ...userInfo.data(),
          });
        } else {
          setUser({
            isLogin: false,
            email: "",
          });
          console.log("User Login nahn he");
        }
      } catch (error) {
        console.log("🚀 ~ subscribe ~ error:", error);
      }
    });

    return subscribe;
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
