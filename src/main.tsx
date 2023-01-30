import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageContextProvider } from "./contexts/LangContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
