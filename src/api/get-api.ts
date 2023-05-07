import { LoaderFunctionArgs } from "react-router-dom";
import { backendReq } from "./basicRequest";
import { AdminCourseType, CourseType } from "../types/course";
import { AdminDiplomaType } from "../types/deploma";
// import Data from "../data/productsData";
// * -------------------------- diplomas endpoints --------------------------
const getAllDiplomas = async () => {
  const url = `/diplomas`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getDiploma = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/diplomas/${id}`;
  const response = await backendReq(url, "get");
  return response.data;
};

// not loader
const deleteDiploma = async (id: string) => {
  const url = `/diplomas/${id}`;
  const response = await backendReq(url, "delete");
  return response;
};

const addDiploma = async (diploma: AdminDiplomaType) => {
  const url = `/diplomas`;
  const response = await backendReq(url, "post", diploma);
  return response;
};

const updateDiploma = async (diplomaId: string, diploma: AdminDiplomaType) => {
  const url = `/diplomas/${diplomaId}`;
  const response = await backendReq(url, "put", diploma);
  return response;
};

const addDiplomaCourse = async (diplomaId: string, courseId: string) => {
  const url = `/diplomas/course/${diplomaId}`;
  const response = await backendReq(url, "post", { course_id: courseId });
  return response;
};

const deleteDiplomaCourse = async (diplomaId: string, courseId: string) => {
  const url = `/diplomas/course/${diplomaId}`;
  const response = await backendReq(url, "delete", { course_id: courseId });
  return response;
};
//* -------------------------- courses endpoints --------------------------

const getCourseLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/courses/${id}`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getCourseLoaderForAdmin = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/courses/${id}?isAdmin=true`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getAllDependentCourses = async () => {
  const url = `/courses?is_dependent=true`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getAllCourses = async () => {
  const url = `/courses`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getDiplomaCourse = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.id;
  const deplomaId = request.url.split("/").slice(-2)[0];
  const url = `/courses/${id}?deploma=${deplomaId}`;
  const response = await backendReq(url, "get");
  return response.data;
};

// not loader
const deleteCourse = async (id: string) => {
  const url = `/courses/${id}`;
  const response = await backendReq(url, "delete");
  return response;
};

// not loader
const addCourse = async (course: CourseType) => {
  const url = `/courses`;
  const response = await backendReq(url, "post", course);
  return response;
};

// not loader
const updateCourse = async (_id: string, course: CourseType) => {
  const url = `/courses/${_id}`;
  console.log(url);
  const response = await backendReq(url, "put", course);
  return response;
};

// not loader
const getCourse = async (courseId: string) => {
  const url = `/courses/${courseId}`;
  const response = await backendReq(url, "get");
  return response;
};

// not loader
const addRelatedCourse = async (courseId: string, otherCourseId: string) => {
  const url = `/courses/related/${courseId}`;
  const response = await backendReq(url, "post", {
    courseId: otherCourseId,
  });
  return response;
};

// not loader
const deleteRelatedCourse = async (courseId: string, otherCourseId: string) => {
  const url = `/courses/related/${courseId}`;
  const response = await backendReq(url, "delete", {
    courseId: otherCourseId,
  });
  return response;
};

//* -------------------------- contact us endpoint --------------------------
const sendMessage = async (data: any) => {
  const url = `/messages`;
  const response = await backendReq(url, "post", data);
  return response;
};

const getAllMessages = async () => {
  const url = `/messages`;
  const response = await backendReq(url, "get");
  return response;
};
const deleteMessage = async (id: string) => {
  const url = `/messages/${id}`;
  const response = await backendReq(url, "delete");
  return response;
};

// loader
const getMessage = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/messages/${id}`;
  const response = await backendReq(url, "get");
  return response.data;
};
//* -------------------------- reservation endpoint --------------------------
const makeReservation = async (data: any) => {
  const url = `/reservations`;
  const response = await backendReq(url, "post", data);
  return response;
};
const getAllReservations = async () => {
  const url = `/reservations`;
  const response = await backendReq(url, "get");
  return response;
};
const deleteReservation = async (id: string) => {
  const url = `/reservations/${id}`;
  const response = await backendReq(url, "delete");
  return response;
};
// --------------------------- add/update  course/diploma
const sendRecorde = async (
  data: AdminCourseType | AdminDiplomaType,
  type: "Course" | "Diploma",
  actionType: "add" | "update"
) => {
  if (type === "Course") {
    if (actionType === "add") {
      return await addCourse(data as AdminCourseType);
    } else {
      return await updateCourse(data._id, data as AdminCourseType);
    }
  } else {
    if (actionType === "add") {
      return await addDiploma(data as AdminDiplomaType);
    } else {
      return await updateDiploma(data._id, data as AdminDiplomaType);
    }
  }
};

export {
  getAllDiplomas,
  getDiploma,
  getAllCourses,
  getAllDependentCourses,
  getDiplomaCourse,
  getCourseLoader,
  sendMessage,
  makeReservation,
  getAllReservations,
  getAllMessages,
  deleteCourse,
  addCourse,
  getCourse,
  updateCourse,
  getCourseLoaderForAdmin,
  addRelatedCourse,
  deleteRelatedCourse,
  deleteDiploma,
  addDiploma,
  updateDiploma,
  deleteDiplomaCourse,
  addDiplomaCourse,
  sendRecorde,
  deleteMessage,
  deleteReservation,
  getMessage,
};
