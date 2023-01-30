import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: Props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
