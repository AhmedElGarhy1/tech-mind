import React from "react";
import { Loading } from "../components/Loading";

interface ParamsType {
  children: JSX.Element[] | JSX.Element;
}

const ReactSuspense = ({ children }: ParamsType) => (
  <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
);

export default ReactSuspense;
