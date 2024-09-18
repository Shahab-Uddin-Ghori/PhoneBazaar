import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModeThemeContext from "./components/ModeThemeContext.jsx";
import UserContextProvider from "./components/UserContextProvider.jsx";
import { AdProvider } from "./components/Adprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AdProvider>
        <ModeThemeContext>
          <App />
        </ModeThemeContext>
      </AdProvider>
    </UserContextProvider>
  </StrictMode>
);
