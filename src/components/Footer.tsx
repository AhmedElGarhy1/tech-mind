import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useLangContext from "../hooks/useLangContext";

import logo from "../assets/logo-color-m.png";
import footer from "../data/footer";

const Footer = (): JSX.Element => {
  const { currentLanguage } = useLangContext();
  return (
    <footer className="page-footer bg-main font-small blue pt-4">
      {footer && (
        <>
          <Container
            className={`container-fluid text-lg-${
              currentLanguage === "EN" ? "start" : "end"
            }`}>
            <Row>
              <div className="col-sm-6 col-md-6 col-lg-3  mt-md-0 my-3">
                <img
                  src={logo}
                  alt="logo"
                  className="footer-logo mx-auto "
                  style={{ maxWidth: "190px" }}
                />
                <p className="text-white fw-semibold fs-4">{footer.words}</p>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3 mb-md-0 my-3">
                <h4 className="text-white fw-semibold">Services</h4>
                <ul className="list-unstyled">
                  {footer.services.map((link, i) => (
                    <li className="my-3" key={i}>
                      <Link className="text-white" to={link.href}>
                        {link.name[currentLanguage]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3 mb-md-0 my-3">
                <h4 className="text-white fw-semibold">Usefull Links</h4>
                <ul className="list-unstyled">
                  {footer.usefu_links.map((link, i) => (
                    <li className="my-3" key={i}>
                      <Link className="text-white" to={link.href}>
                        {link.name[currentLanguage]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 mb-md-0 my-3">
                <h4 className="text-white fw-semibold">Contact Us</h4>
                <ul className="list-unstyled">
                  {footer.contact.map((link, i) => (
                    <div className="text-white my-3" key={i}>
                      <FontAwesomeIcon
                        color="var(--yellow-color)"
                        fontSize={20}
                        icon={link.icon}
                        className="me-2"
                      />
                      <span className="ms-1">{link.name}</span>
                    </div>
                  ))}
                </ul>
              </div>
            </Row>
          </Container>

          <div className="footer-copyright text-center py-3 text-white">
            © 2023 Copyright: Tech Mind
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
