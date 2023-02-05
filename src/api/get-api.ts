import { LoaderFunctionArgs } from "react-router-dom";
import { backendReq } from "./basicRequest";
// import Data from "../data/productsData";
// * -------------------------- diplomas endpoints --------------------------
const getAllDeiplomas = async () => {
  return backendReq("/deploma", "get");
};

const getDeiploma = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const url = `/deplomas/${id}`;
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

const getDiplomaCourse = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.id;
  console.log("HEY");
  const deplomaId = request.url.split("/").slice(-2)[0];
  const url = `/courses/${id}?deploma=${deplomaId}`;
  const response = await backendReq(url, "get");
  return response.data;
};

export { getAllDeiplomas, getDeiploma, getCourse, getDiplomaCourse };
