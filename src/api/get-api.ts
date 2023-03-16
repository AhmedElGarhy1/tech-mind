import { LoaderFunctionArgs } from "react-router-dom";
import { backendReq } from "./basicRequest";
// import Data from "../data/productsData";
// * -------------------------- diplomas endpoints --------------------------
const getAllDiplomas = async () => {
  const url = `/diplomas`;
  const response = await backendReq(url, "get");
  return response.data;
};

const getDeiploma = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/diplomas/${id}`;
  const response = await backendReq(url, "get");
  return response.data;
};
//* -------------------------- courses endpoints --------------------------

const getCourse = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/courses/${id}`;
  const response = await backendReq(url, "get");
  return response.data;
};
const getAllCourses = async () => {
  const url = `/courses?is_dependent=true`;
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

//* -------------------------- diplomas endpoints --------------------------
const getDiplomas = async () => {
  const url = `/courses`;
  const response = await backendReq(url, "get");
  return response.data;
};

export {
  getAllDiplomas,
  getDeiploma,
  getCourse,
  getDiplomaCourse,
  getAllCourses,
  getDiplomas,
};
