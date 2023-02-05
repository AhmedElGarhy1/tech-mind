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

// const searchProducts = async (obj) => {
//   return await backendReq("/api/search", "post", obj);
// };

export { getAllDeiplomas, getDeiploma, getCourse };
