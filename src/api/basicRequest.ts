import axios from "axios";

// export const BASE_URL = "http://localhost:7000";
export const BASE_URL = "https://tech-mind-backend.onrender.com";

const backendReq = async (url: string, method: string, obj?: object) => {
  const options = {
    method,
    // url,
    url: BASE_URL + "/api" + url,
    data: obj,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("Somthing went wrong");
  }
};

export { backendReq };
