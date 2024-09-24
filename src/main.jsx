import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModeThemeContext from "./components/ModeThemeContext.jsx";
import UserContextProvider from "./components/UserContextProvider.jsx";
import { AdProvider } from "./components/Adprovider.jsx";
import SearchContext from "./user/Pages/AddCreateWork/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AdProvider>
        <ModeThemeContext>
          <SearchContext>
            <App />
          </SearchContext>
        </ModeThemeContext>
      </AdProvider>
    </UserContextProvider>
  </StrictMode>
);
