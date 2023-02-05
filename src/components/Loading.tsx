import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <HashLoader loading={true} size={50} />
    </div>
  );
};

export default Loading;
