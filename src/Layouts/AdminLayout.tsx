import React from "react";
import { Outlet } from "react-router-dom";
import "../css/admin.css";
import AdminMenu from "../components/Admin/AdminMenu";
import { AdminLogin } from "../pages/Admin";

const AdminLayout = () => {
  const isAdmin = window.sessionStorage.getItem("auth");

  return (
    <>
      {isAdmin ? (
        <div className="d-flex">
          <AdminMenu />
          <div className="bg-admin-section-color px-4 py-2 w-100">
            <Outlet />
          </div>
        </div>
      ) : (
        <AdminLogin />
      )}
    </>
  );
};

export default AdminLayout;
