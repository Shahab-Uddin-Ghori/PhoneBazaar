import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModeThemeContext from "./components/ModeThemeContext.jsx";
import UserContextProvider from "./components/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ModeThemeContext>
        <App />
      </ModeThemeContext>
    </UserContextProvider>
  </StrictMode>
);
