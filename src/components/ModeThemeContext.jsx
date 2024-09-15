import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

function ModeThemeContext({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ModeThemeContext;
