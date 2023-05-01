import { LoaderFunctionArgs } from "react-router-dom";
import { backendReq } from "./basicRequest";
import { CourseType } from "../types/course";
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
  const response = await backendReq(url, "patch", course);
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
  deleteCourse,
  addCourse,
  getCourse,
  updateCourse,
  getCourseLoaderForAdmin,
  addRelatedCourse,
  deleteRelatedCourse,
};
