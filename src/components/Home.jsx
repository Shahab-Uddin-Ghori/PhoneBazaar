import React, { useContext } from "react";
import { ThemeContext } from "./ModeThemeContext";

function Home() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme == "light" ? "bg-zinc-50" : "bg-gray-800  "
      } flex flex-col w-full min-h-screen`}
    ></div>
  );
}

export default Home;
