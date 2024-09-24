// Import necessary modules and components from React and other libraries
import { StrictMode } from "react"; // Importing StrictMode for highlighting potential problems in the app
import { createRoot } from "react-dom/client"; // Importing createRoot to render the app in the DOM
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing global CSS styles
import ModeThemeContext from "./components/ModeThemeContext.jsx"; // Importing the context provider for theme management
import UserContextProvider from "./components/UserContextProvider.jsx"; // Importing the context provider for user management
import { AdProvider } from "./components/Adprovider.jsx"; // Importing the context provider for managing ads
import SearchContext from "./user/Pages/AddCreateWork/SearchContext.jsx"; // Importing the context provider for managing search state

// Create a root DOM node to render the React application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrapping the entire application in StrictMode for enhanced error handling */}
    <UserContextProvider>
      {/* Providing user context to manage user data across the app */}
      <AdProvider>
        {/* Providing ad context to manage ads data and related actions */}
        <ModeThemeContext>
          {/* Providing theme context to manage light/dark mode preferences */}
          <SearchContext>
            {/* Providing search context to manage search-related state */}
            <App />
            {/* Rendering the main App component */}
          </SearchContext>
        </ModeThemeContext>
      </AdProvider>
    </UserContextProvider>
  </StrictMode>
);
