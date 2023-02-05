import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const SingleDeplomaCourse = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>SingleDeplomaCourse</div>;
};

export default SingleDeplomaCourse;
