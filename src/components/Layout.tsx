import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useLangContext from "../hooks/useLangContext";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "./Loading";
import useLoadingContext from "../hooks/useLoadingContext";

const Layout = () => {
  const { isEnglish } = useLangContext();
  const { removeLoading } = useLoadingContext();
  const location = useLocation();

  useEffect(removeLoading, [location]);

  return (
    <div dir={isEnglish ? "ltr" : "rtl"}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
