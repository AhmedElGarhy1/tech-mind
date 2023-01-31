import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface Values {
  isEnglish: boolean;
  setIsEnglish: React.Dispatch<React.SetStateAction<boolean>>;
  currentLanguage: "EN" | "AR";
}

export const LanguageContext = createContext<null | Values>(null);

export const LanguageContextProvider = (props: Props) => {
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<"EN" | "AR">("EN");

  useEffect(() => {
    setCurrentLanguage((prev) => {
      if (prev === "AR") return "EN";
      return "AR";
    });
  }, [isEnglish]);
  console.log(isEnglish);
  console.log(currentLanguage);

  return (
    <LanguageContext.Provider
      value={{ isEnglish, setIsEnglish, currentLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
