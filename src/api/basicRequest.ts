import axios, { AxiosError } from "axios";

let temp = "https://tech-mind-backend.onrender.com";
// let temp = "https://tech-mind-backend-production.up.railway.app";
if (import.meta.env.VITE_ENV === "dev") temp = "http://localhost:7000";

export const BASE_URL = temp;

const backendReq = async (
  url: string,
  method: string,
  obj?: object,
  ...rest: any[]
) => {
  const options = {
    method,
    url: BASE_URL + "/api" + url,
    data: obj,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...rest,
  };
  let response;
  try {
    response = await axios(options);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response.data;
    }
    return "Somthing went wrong";
  }
};

export { backendReq };
