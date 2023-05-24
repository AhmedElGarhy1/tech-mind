import { useAppSelector } from "../store/hooks";
import { selectLoadingStatus } from "../store/slices/LoadingSlice";
import "../css/loading.css";

export const MainLoading = () => {
  const pageLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      {pageLoading && (
        <div className="loading-page">
          <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>
      )}
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div className="loading-page">
        <div className="loader">
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__ball"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
