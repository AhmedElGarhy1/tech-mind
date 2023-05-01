import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppSelector } from "../store/hooks";
import { selectIsEnglish } from "../store/slices/LangSlice";

const ViewLayout = () => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <div dir={isEnglish ? "ltr" : "rtl"}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ViewLayout;
