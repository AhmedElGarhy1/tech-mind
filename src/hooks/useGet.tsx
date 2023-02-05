import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseType, RelatedCoursesType } from "../types/course";
import { DeplomaType } from "../types/deploma";

interface ResponseType {
  data: {
    msg?: string;
    data:
      | CourseType
      | DeplomaType
      | CourseType[]
      | DeplomaType[]
      | RelatedCoursesType[];
    ok: boolean;
  };
}

const useGet = () => {
  // const baseUrl = "http://localhost:7000/api/";
  const baseUrl = "https://tech-mind-backend.onrender.com";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const makeRequest = async (url: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: ResponseType = await axios.get(baseUrl + "/api/" + url);
      const data = response.data;
      if (!data.ok) {
        setError(true);
        setLoading(true);
        throw Error(data.msg);
      }
      setLoading(false);
      return data.data;
    } catch (err) {
      setError(true);
      setLoading(false);
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  return { error, loading, makeRequest };
};

export default useGet;
