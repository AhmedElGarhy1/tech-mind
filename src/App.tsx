import { RouterProvider } from "react-router-dom";
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
import { useEffect, useState } from "react";

import { useAppSelector } from "./store/hooks";
import { selectIsEnglish } from "./store/slices/LangSlice";

const App = () => {
  const isEnglish = useAppSelector(selectIsEnglish);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div data-en={isEnglish} className="app">
      <MainLoading />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
