import React from "react";
import { Link } from "react-router-dom";
import { selectIsEnglish } from "../store/slices/LangSlice";
import { useAppSelector } from "../store/hooks";

const NotFound = () => {
  console.log("first");
  const isEnglish = useAppSelector(selectIsEnglish);

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
