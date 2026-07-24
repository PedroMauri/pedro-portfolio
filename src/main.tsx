import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/afacad/latin-400.css";
import "@fontsource/afacad/latin-500.css";
import "@fontsource/afacad/latin-600.css";
import "@fontsource/afacad/latin-700.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
