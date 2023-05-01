import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface Props {
  addFunction: () => void;
  name?: string;
  dark?: boolean;
}

const AddField: FC<Props> = ({ addFunction, name, dark }) => {
  return (
    <button
      onClick={addFunction}
      style={{
        borderWidth: 1,
        padding: "10px 36px",
      }}
      className={`bg-${
        dark ? "dashboard-color text-white" : "transparent"
      } rounded-1 mt-1 mb-2`}>
      <FontAwesomeIcon className="me-2" icon={faPlus} />
      <span>{name || "Add Field"}</span>
    </button>
  );
};

export default AddField;
