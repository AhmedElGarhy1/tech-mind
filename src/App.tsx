import { RouterProvider } from "react-router-dom";
import { LanguageContextProvider } from "./contexts/LangContext";
import AOS from "aos";

import "./css/App.css";

// swiper css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// aos css
import "aos/dist/aos.css";

import routes from "./router";
import { MainLoading } from "./components/Loading";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <LanguageContextProvider>
      <MainLoading />
      <RouterProvider router={routes} />
    </LanguageContextProvider>
  );
};

export default App;
