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
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <MainLoading />
      <RouterProvider router={routes} />
    </Provider>
  );
};

export default App;
