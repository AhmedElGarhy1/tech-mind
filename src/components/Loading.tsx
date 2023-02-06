import useLoadingContext from "../hooks/useLoadingContext";

export const MainLoading = () => {
  const { pageLoading } = useLoadingContext();

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
  const { pageLoading } = useLoadingContext();

  return (
    <>
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export default Loading;
