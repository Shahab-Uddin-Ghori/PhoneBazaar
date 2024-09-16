import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ModeThemeContext";
import SlideShow from "./SlideShow";
import HeroGallery from "./HeroGallery";

function Home() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme == "light" ? "bg-zinc-50" : "bg-gray-800"
      } flex flex-col w-full min-h-[calc(100vh-6rem)]`}
    >
      <SlideShow />
      <HeroGallery />
    </div>
  );
}

export default Home;
