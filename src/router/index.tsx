import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ReactSuspense from "./LoaderRoute";
import {
  getCourseLoader,
  getAllDependentCourses,
  getDiploma,
  getDiplomaCourse,
  getAllDiplomas,
  getAllCourses,
  getCourseLoaderForAdmin,
} from "../api/get-api";
import { AdminLayout, MainLayout, ViewLayout } from "../Layouts";
import NotFound from "../Error/NotFound";

// view pages
import {
  Home,
  Contact,
  Postes,
  SinglePost,
  Articles,
  SingleArticle,
  Diplomas,
  SingleDeploma,
  Courses,
  SingleCourse,
  About,
} from "../pages";

// admin pages
import {
  AdminLogin,
  Dashboard,
  AllDiplomas,
  UpdateDiploma,
  AllCourses,
  AddCourse,
} from "../pages/Admin";
import UpdateCourse from "../pages/Admin/Courses/UpdateCourse";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
      <Route element={<ViewLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="posts">
          <Route index element={<Postes />} />
          <Route path=":id" element={<SinglePost />} />
        </Route>
        <Route path="articles">
          <Route index element={<Articles />} />
          <Route path=":id" element={<SingleArticle />} />
        </Route>
        <Route path="diplomas">
          <Route
            index
            element={<ReactSuspense>{<Diplomas />}</ReactSuspense>}
            loader={getAllDiplomas}
          />
          <Route path=":id">
            <Route
              loader={getDiploma}
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
          <Route
            index
            element={<ReactSuspense>{<Courses />}</ReactSuspense>}
            loader={getAllDependentCourses}
          />
          <Route
            path=":id"
            loader={getCourseLoader}
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
      <Route path="admin">
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses">
            <Route
              index
              loader={getAllCourses}
              element={
                <ReactSuspense>
                  <AllCourses />
                </ReactSuspense>
              }
            />
            <Route path="add" element={<AddCourse type="add" />} />
            <Route
              path=":id"
              loader={getCourseLoaderForAdmin}
              element={
                <ReactSuspense>
                  <UpdateCourse />
                </ReactSuspense>
              }
              errorElement={<NotFound />}
            />
          </Route>
          <Route path="diplomas" element={<AllDiplomas />}>
            <Route path=":id" element={<UpdateDiploma />} />
          </Route>
        </Route>
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </Route>
  )
);
