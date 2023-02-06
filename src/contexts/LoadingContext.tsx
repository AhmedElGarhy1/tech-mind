import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface Values {
  makeLoading: () => void;
  removeLoading: () => void;
  pageLoading: boolean;
}

export const LoadingContext = createContext<null | Values>(null);

export const LoadingContextProvider = (props: Props) => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const makeLoading = () => setPageLoading(true);
  const removeLoading = () => setPageLoading(false);

  return (
    <LoadingContext.Provider
      value={{ pageLoading, makeLoading, removeLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
