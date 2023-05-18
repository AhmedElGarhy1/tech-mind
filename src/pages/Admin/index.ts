import { lazy } from "react";

import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import AddCourse from "./Courses/AddCourse";
import AddDiploma from "./Diplomas/AddDiploma";

const AllCourses = lazy(() => import("./Courses/AllCourses"));
const UpdateCourse = lazy(() => import("./Courses/UpdateCourse"));
const AllDiplomas = lazy(() => import("./Diplomas/AllDiplomas"));
const UpdateDiploma = lazy(() => import("./Diplomas/UpdateDiploma"));
const Reservations = lazy(() => import("./Reservations"));
const AllMessages = lazy(() => import("./Messages/Messages"));
const SingleMessage = lazy(() => import("./Messages/SingleMessage"));

export {
  AdminLogin,
  AllCourses,
  AllDiplomas,
  Dashboard,
  AddCourse,
  UpdateDiploma,
  Reservations,
  AllMessages,
  SingleMessage,
  UpdateCourse,
  AddDiploma,
};
