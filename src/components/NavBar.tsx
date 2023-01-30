import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo-color-m.png";
import linksData from "../data/nav-links.js";
import useLangContext from "../hooks/useLangContext";
import { LanguagesEnum } from "../data/enums";
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

const BasicExample = () => {
  const [links, setLinks] = useState<link[]>(linksData);
  const { currentLanguage, setCurrentLanguage } = useLangContext();

  const changeLanguage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setCurrentLanguage((prev) => {
      if (prev === LanguagesEnum.AR) return LanguagesEnum.EN;
      return LanguagesEnum.AR;
    });
  };

  return (
    <Navbar
      style={{
        backgroundColor: "var(--main-color)",
      }}
      expand="md">
      <Container>
        <Navbar.Brand as={Link} to="home">
          <img width="75" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-items" />
        <Navbar.Collapse id="nav-items">
          <Nav className="ms-auto">
            {links.length !== 0 &&
              links.map((link) => (
                <Nav.Link
                  className="fw-semibold"
                  key={link.id}
                  as={Link}
                  to={link.href}>
                  {link.name[currentLanguage]}
                </Nav.Link>
              ))}
            <a
              role="button"
              onClick={changeLanguage}
              className="fw-semibold nav-link me-3 curser-po">
              {currentLanguage}
              <FontAwesomeIcon
                width="10"
                className="ms-1"
                icon={faChevronDown}
              />
            </a>
          </Nav>
          <Link className="main-btn fw-semibold" to="/contact">
            {currentLanguage === "EN" ? "Contact Us" : "تواصل معنا"}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
