import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useLangContext from "../hooks/useLangContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { isEnglish } = useLangContext();
  return (
    <div dir={isEnglish ? "ltr" : "rtl"}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
