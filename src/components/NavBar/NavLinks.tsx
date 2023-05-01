import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import linksData from "../../data/navLinks.js";
import { LinkType, NavLinksParamsType } from "./types";
import { useAppSelector } from "../../store/hooks.js";
import {
  changeCurrentLanguage,
  selectIsEnglish,
} from "../../store/slices/LangSlice.js";
import { useDispatch } from "react-redux";
import { currentLanguage } from "../../lib/utils.js";

const NavLinks = ({ menuIconRef }: NavLinksParamsType) => {
  const [links, setLinks] = useState<LinkType[]>(linksData);
  const location = useLocation();
  const isEnglish = useAppSelector(selectIsEnglish);
  const dispatch = useDispatch();

  useEffect(() => {
    setLinks((prev) => [...prev]);
  }, [location]);

  const changeLanguage = () => {
    dispatch(changeCurrentLanguage());
  };

  const closeMobileMenu = () => {
    menuIconRef.current &&
      window.innerWidth < 991 &&
      menuIconRef.current.click();
  };

  return (
    <>
      <Nav className={`${isEnglish ? "ms-auto" : "me-auto"}`}>
        {links.length !== 0 &&
          links.map((link) => (
            <Nav.Link
              onClick={closeMobileMenu}
              className={`fw-semibold pe-lg-3 fs-6${
                location.pathname == link.href ? "active" : ""
              }`}
              key={link.id}
              as={Link}
              disabled={link.id === 5 || link.id === 6}
              to={link.href}>
              {link.name[currentLanguage(isEnglish)]}
            </Nav.Link>
          ))}
        <a
          role="button"
          onClick={changeLanguage}
          className="fw-semibold nav-link me-3 curser-po">
          {isEnglish ? "AR" : "EN"}
          <FontAwesomeIcon width="10" className="ms-1" icon={faChevronDown} />
        </a>
      </Nav>
      <NavLink
        className={`main-btn fw-semibold navbar-btn ${
          isEnglish ? "me-auto" : "ms-auto"
        }`}
        onClick={closeMobileMenu}
        to="/contact">
        {isEnglish ? "Contact Us" : "تواصل معنا"}
      </NavLink>
    </>
  );
};

export default NavLinks;
