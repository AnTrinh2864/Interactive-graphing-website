import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RouteProvider } from "@/components/providers/RouteProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import App from "@/App";

// 👇 Use ONE global stylesheet (decide if you keep globals.css or index.css)
import "@/assets/style/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RouteProvider>
    </BrowserRouter>
  </StrictMode>
);
