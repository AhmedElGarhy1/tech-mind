import axios from "axios";

// const baseUrl = "https://tech-mind-backend.onrender.com";

const baseUrl = "http://localhost:7000";
const backendReq = async (url: string, method: string, obj?: object) => {
  const options = {
    method,
    // url,
    url: baseUrl + "/api" + url,
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
