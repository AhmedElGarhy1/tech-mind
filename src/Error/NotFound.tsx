import React from "react";
import { Link } from "react-router-dom";
import useLangContext from "../hooks/useLangContext";

const NotFound = () => {
  console.log("first");
  const { isEnglish } = useLangContext();
  return (
    <div className="my-5 text-center">
      <h2>{isEnglish ? "Not Found" : "غير موجود"}</h2>
      <p>
        {isEnglish
          ? "Sorry This Path doesn't Exist"
          : "معذرة هذا المسار غير موجود"}
      </p>
      <Link to="/">{isEnglish ? "Home Page" : "الصفحة الرائيسية"}</Link>
    </div>
  );
};

export default NotFound;
