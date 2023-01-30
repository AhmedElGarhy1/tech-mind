import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LangContext";

const useLangContext = () => {
  const context = useContext(LanguageContext);

  if (!context) console.log("Use Language Context inside the provider");

  return context;
};

export default useLangContext;
