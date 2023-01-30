import React, { createContext, useState } from "react";
import { LanguagesEnum } from "../data/enums";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface Values {
  currentLanguage: LanguagesEnum;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<LanguagesEnum>>;
}

export const LanguageContext = createContext<null | Values>(null);

export const LanguageContextProvider = (props: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguagesEnum>(
    LanguagesEnum.EN
  );
  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
