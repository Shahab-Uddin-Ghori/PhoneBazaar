import React, { useContext, useEffect } from "react"; // Importing necessary libraries and hooks
import { ThemeContext } from "./ModeThemeContext"; // Importing ThemeContext for managing theme state
import SlideShow from "./SlideShow"; // Importing SlideShow component
import HeroGallery from "./HeroGallery"; // Importing HeroGallery component

function Home() {
  // Using useContext hook to access the theme state and setter function from ThemeContext
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`${
        // Conditional rendering of background color based on theme
        theme == "light" ? "bg-zinc-50" : "bg-zinc-800"
      } flex flex-col w-full min-h-[calc(100vh-6rem)]`}
    >
      {/* Rendering SlideShow component */}
      <SlideShow />
      {/* Rendering HeroGallery component */}
      <HeroGallery />
    </div>
  );
}

export default Home; // Exporting Home component for use in other parts of the application
