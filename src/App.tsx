import { Routes, Route, RouterProvider, useLocation } from "react-router-dom";
import { LanguageContextProvider } from "./contexts/LangContext";

import "./css/App.css";
import "swiper/css";
import "swiper/css/navigation";

import routes from "./router";
import { MainLoading } from "./components/Loading";

const App = () => {
  return (
    <LanguageContextProvider>
      <MainLoading />
      <RouterProvider router={routes} />
    </LanguageContextProvider>
  );
};

export default App;
