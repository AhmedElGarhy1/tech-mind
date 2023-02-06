import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { getCourse, getDeiploma, getDiplomaCourse } from "../api/get-api";
import Layout from "../components/Layout";
import NotFound from "../Error/NotFound";

import {
  Home,
  Contact,
  Postes,
  SinglePost,
  Articles,
  SingleArticle,
  Deplomas,
  SingleDeploma,
  Courses,
  SingleCourse,
  About,
} from "../pages";

import ReactSuspense from "./LoaderRoute";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="postes">
        <Route index element={<Postes />} />
        <Route path=":id" element={<SinglePost />} />
      </Route>
      <Route path="articles">
        <Route index element={<Articles />} />
        <Route path=":id" element={<SingleArticle />} />
      </Route>
      <Route path="diplomas">
        <Route index element={<Deplomas />} />
        <Route path=":id">
          <Route
            loader={getDeiploma}
            index
            element={<ReactSuspense>{<SingleDeploma />}</ReactSuspense>}
            errorElement={<NotFound />}
          />
          <Route
            loader={getDiplomaCourse}
            path=":id"
            element={<ReactSuspense>{<SingleCourse />}</ReactSuspense>}
            errorElement={<NotFound />}
          />
        </Route>
      </Route>
      <Route path="courses">
        <Route index element={<Courses />} />
        <Route
          path=":id"
          loader={getCourse}
          element={
            <ReactSuspense>
              <SingleCourse />
            </ReactSuspense>
          }
          errorElement={<NotFound />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);