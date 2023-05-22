import { useState, useRef, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-color-m.png";

import NavLinks from "./NavLinks";

const NavBar = (): JSX.Element => {
  const menuIconRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Navbar className="bg-main fixed-top w-100" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img width="75" height="50px" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle
            ref={menuIconRef}
            className="navbar-bars"
            aria-controls="nav-items"
          />
          <Navbar.Collapse id="nav-items">
            <NavLinks menuIconRef={menuIconRef} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: 60 }}></div>
    </>
  );
};

export default NavBar;
