import React, { createContext, useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface Values {
  isEnglish: boolean;
  setIsEnglish: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LanguageContext = createContext<null | Values>(null);

export const LanguageContextProvider = (props: Props) => {
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  return (
    <LanguageContext.Provider value={{ isEnglish, setIsEnglish }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
