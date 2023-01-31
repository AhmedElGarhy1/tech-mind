import { useState, useRef, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-color-m.png";
import useLangContext from "../../hooks/useLangContext";

import NavLinks from "./NavLinks";

const NavBar = (): JSX.Element => {
  const { isEnglish } = useLangContext();
  const menuIconRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Navbar className="bg-main fixed-top" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="home">
            <img width="75" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle
            ref={menuIconRef}
            className="navbar-bars"
            aria-controls="nav-items"
          />
          <Navbar.Collapse id="nav-items">
            <NavLinks menuIconRef={menuIconRef} />
            <Link
              className={`main-btn fw-semibold navbar-btn ${
                isEnglish ? "me-auto" : "ms-auto"
              }`}
              to="/contact">
              {isEnglish ? "Contact Us" : "تواصل معنا"}
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="navbar-height"></div>
    </>
  );
};

export default NavBar;
