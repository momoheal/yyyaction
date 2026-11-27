import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { installBrowserLocalization } from "./i18n";

const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
if (viewport && !viewport.content.includes("viewport-fit=")) {
  viewport.content += ", viewport-fit=cover";
}

installBrowserLocalization();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
