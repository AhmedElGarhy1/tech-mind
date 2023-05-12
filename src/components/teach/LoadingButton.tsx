import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";

interface ParamsType {
  loading: boolean;
  setPage: any;
}
const LoadingButton: FC<ParamsType> = ({ loading, setPage }) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <button
      className="text-center bg-transparent mx-auto d-block mt-5 text-primary border-0"
      // @ts-ignore
      onClick={() => setPage((p) => p + 1)}>
      {isEnglish
        ? loading
          ? "Loading...."
          : "Load more."
        : loading
        ? "تحميل..."
        : "حمل المزيد"}
    </button>
  );
};

export default LoadingButton;
