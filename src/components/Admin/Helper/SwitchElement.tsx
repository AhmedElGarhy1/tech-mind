import React, { FC } from "react";

interface Params {
  isOn: boolean;
  changeStatus: () => void;
}

const SwitchElement: FC<Params> = ({ isOn, changeStatus }) => {
  return (
    <div className="switch-body">
      <div
        onClick={changeStatus}
        className={`inner-ball ${isOn ? "on" : ""}`}></div>
      {isOn ? (
        <span className="text-white fs-5">ON</span>
      ) : (
        <span className="text-white fs-5 ms-auto">OFF</span>
      )}
    </div>
  );
};

export default SwitchElement;
