import React, { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo-color-m.png";
import "../css/admin.css";
import {
  IconDefinition,
  faBook,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LinkType {
  id: number;
  name: string;
  pathname: string;
  icon: IconDefinition;
}

const adminLinks: LinkType[] = [
  {
    id: 1,
    name: "Diplomas",
    pathname: "/admin/diplomas",
    icon: faSheetPlastic,
  },
  {
    id: 2,
    name: "Courses",
    pathname: "/admin/courses",
    icon: faBook,
  },
];

const AdminLayout = () => {
  const location = useLocation();

  const activeStatus = useMemo(
    () => (link: LinkType) =>
      location.pathname === link.pathname ? "active" : "",
    [location]
  );

  return (
    <div className="d-flex">
      <div
        className="admin min-vh-100 h-auto bg-dashboard-color d-flex flex-column flex-shrink-0 text-white"
        style={{ width: 300 }}>
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img src={logo} alt="LOGO" width="130px" />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {adminLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <Link
                to={link.pathname}
                className={`text-white d-flex align-items-center gap-3 mb-2 px-3 py-2 ${activeStatus(
                  link
                )}`}>
                <FontAwesomeIcon className="fs-4" icon={link.icon} />
                <span className="fs-5">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-admin-section-color px-4 py-2 w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
