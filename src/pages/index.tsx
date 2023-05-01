import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import SinglePost from "./Postes/SinglePost";
import SingleArticle from "./Articles/SingleArticle";
import Diplomas from "./Diplomas";
import Courses from "./Courses";
import Postes from "./Postes";
import Articles from "./Articles";
import { lazy } from "react";

// lazy load
const SingleDeploma = lazy(() => import("./Diplomas/SingleDeploma"));
const SingleCourse = lazy(() => import("./Courses/SingleCourse"));

export {
  Home,
  Contact,
  About,
  Courses,
  Diplomas,
  Postes,
  Articles,
  SingleCourse,
  SingleDeploma,
  SinglePost,
  SingleArticle,
};
