import React, { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) console.log("Use Loading Context inside the provider");

  return context;
};

export default useLoadingContext;
