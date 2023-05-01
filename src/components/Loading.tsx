import { useAppSelector } from "../store/hooks";
import { selectLoadingStatus } from "../store/slices/LoadingSlice";

export const MainLoading = () => {
  const pageLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      {pageLoading && (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export default Loading;
