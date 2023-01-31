import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import linksData from "../../data/nav-links.js";
import useLangContext from "../../hooks/useLangContext";
import { ClickMouseEventType, LinkType, NavLinksParamsType } from "./types";
import { currentLanguage } from "../../utils/index.js";

const NavLinks = ({ menuIconRef }: NavLinksParamsType) => {
  const [links, setLinks] = useState<LinkType[]>(linksData);
  const location = useLocation();
  const { isEnglish, setIsEnglish } = useLangContext();

  useEffect(() => {
    setLinks((prev) => [...prev]);
  }, [location]);

  const changeLanguage = (e: ClickMouseEventType) => {
    setIsEnglish((prev) => !prev);
  };

  return (
    <>
      <Nav className={`${isEnglish ? "ms-auto" : "me-auto"}`}>
        {links.length !== 0 &&
          links.map((link) => (
            <Nav.Link
              onClick={() =>
                menuIconRef.current &&
                window.innerWidth < 767 &&
                menuIconRef.current.click()
              }
              className={`fw-semibold lg-md-2 ${
                location.pathname == link.href ? "active" : ""
              }`}
              key={link.id}
              as={Link}
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
    </>
  );
};

export default NavLinks;
