import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useLangContext from "../hooks/useLangContext";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: Props) => {
  const { isEnglish } = useLangContext();
  return (
    <div dir={isEnglish ? "ltr" : "rtl"}>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
