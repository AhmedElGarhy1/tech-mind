import React, { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo-color-m.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { AdminLinkType, adminLinks } from "../../data/admin";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const AdminMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const activeStatus = useMemo(
    () => (link: AdminLinkType) =>
      location.pathname === link.pathname ? "active" : "",
    [location]
  );

  const changeStatus = () => {
    setIsOpen((p) => !p);
  };

  return (
    <div
      className="admin position-relative min-vh-100 h-auto bg-dashboard-color d-flex flex-column flex-shrink-0 text-white"
      style={{ width: isOpen ? 300 : 100 }}>
      <div
        className="position-fixed admin-fixed min-vh-100 h-auto"
        style={{ width: isOpen ? 300 : 100 }}>
        <Link to="/admin" className="d-flex  align-items-center my-1 mb-0 ms-2">
          <img
            className="logo"
            src={logo}
            alt="LOGO"
            width={isOpen ? 130 : 80}
          />
        </Link>
        <FontAwesomeIcon
          className="position-absolute fs-2 text-white"
          icon={isOpen ? faChevronCircleLeft : faChevronCircleRight}
          role="button"
          onClick={changeStatus}
          style={{
            bottom: 15,
            right: 20,
          }}
        />
        <hr className="mb-0" />
        <Nav className="flex-column mb-auto">
          {adminLinks.map((link) => (
            <Nav.Item key={link.id}>
              <Link
                to={link.pathname}
                className={`text-white d-flex align-items-center gap-3  px-3 py-3 ${activeStatus(
                  link
                )}`}>
                <FontAwesomeIcon
                  className={`admin-icon ${isOpen ? "fs-4" : "fs-3 mx-auto"} `}
                  icon={link.icon}
                />
                {isOpen && <span className="fs-5">{link.name}</span>}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default AdminMenu;
