import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeLoading } from "../store/slices/LoadingSlice";
import { selectIsEnglish } from "../store/slices/LangSlice";

const MainLayout = () => {
  const isEnglish = useAppSelector(selectIsEnglish);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(removeLoading());
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, [location]);

  return <Outlet />;
};

export default MainLayout;
