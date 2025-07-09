import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop.jsx";
import { HelmetProvider } from "react-helmet-async";

inject();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
