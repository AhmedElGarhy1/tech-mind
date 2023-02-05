import { Routes, Route, RouterProvider } from "react-router-dom";
import { LanguageContextProvider } from "./contexts/LangContext";

import "./css/App.css";
import "swiper/css";
import "swiper/css/navigation";

import routes from "./router";

function App() {
  console.log("APP");
  return (
    <LanguageContextProvider>
      <RouterProvider router={routes} />
    </LanguageContextProvider>
  );
}

export default App;
