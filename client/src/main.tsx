import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getPwaRegistration } from "./pwa";

createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const registration = getPwaRegistration(import.meta.env.BASE_URL);
    navigator.serviceWorker.register(registration.url, { scope: registration.scope }).catch(() => undefined);
  });
}
