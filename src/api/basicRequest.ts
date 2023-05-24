import axios, { AxiosError } from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
