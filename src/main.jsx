import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModeContex from "./components/ModeContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeContex>
      <App />
    </ModeContex>
  </StrictMode>
);
