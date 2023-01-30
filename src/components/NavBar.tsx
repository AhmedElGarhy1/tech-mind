import { useState, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo-color-m.png";
import linksData from "../data/nav-links.js";
import useLangContext from "../hooks/useLangContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface link {
  id: number;
  name: {
    EN: string;
    AR: string;
  };
  href: string;
}

const BasicExample = (): JSX.Element => {
  const [links, setLinks] = useState<link[]>(linksData);
  const collapsRef = useRef(null);
  const { isEnglish, setIsEnglish } = useLangContext();

  const changeLanguage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setIsEnglish((prev) => !prev);
  };

  return (
    <>
      <Navbar
        dir={isEnglish ? "ltr" : "rtl"}
        className="bg-main fixed-top"
        expand="md">
        <Container>
          <Navbar.Brand as={Link} to="home">
            <img width="75" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle className="navbar-bars" aria-controls="nav-items" />
          <Navbar.Collapse ref={collapsRef} id="nav-items">
            <Nav className={`${isEnglish ? "ms-auto" : "me-auto"}`}>
              {links.length !== 0 &&
                links.map((link) => (
                  <Nav.Link
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    className="fw-semibold lg-md-2"
                    key={link.id}
                    as={Link}
                    to={link.href}>
                    {link.name[isEnglish ? "EN" : "AR"]}
                  </Nav.Link>
                ))}
              <a
                role="button"
                onClick={changeLanguage}
                className="fw-semibold nav-link me-3 curser-po">
                {isEnglish ? "AR" : "EN"}
                <FontAwesomeIcon
                  width="10"
                  className="ms-1"
                  icon={faChevronDown}
                />
              </a>
            </Nav>
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
      <div style={{ height: "75px" }}></div>
    </>
  );
};

export default BasicExample;

// {
//   languages.length !== 0 &&
//     languages.map((l, i) => (
//       <option className="bg-transparent text-black" key={i} value={l}>
//         {l}
//       </option>
//     ));
// }
