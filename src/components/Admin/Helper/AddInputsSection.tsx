import React, { FC, useEffect } from "react";
import { StringLang } from "../../../types/common";

interface Props {
  header: string | null;
  value: StringLang;
  update: (value: StringLang) => void;
  isOn?: boolean;
}

const AddInputsSection: FC<Props> = ({ header, isOn, update, value }) => {
  return (
    <div className="my-2 flex-grow-1">
      {header && <h5 className="mb-3">{header}</h5>}
      <div className="d-flex gap-3 mb-3">
        <input
          disabled={typeof isOn === "boolean" && !isOn}
          type="text"
          placeholder="English"
          onChange={(e) =>
            update({
              AR: value.AR,
              EN: e.target.value,
            })
          }
          value={value.EN}
        />
        <input
          disabled={typeof isOn === "boolean" && !isOn}
          type="text"
          value={value.AR}
          placeholder="Arabic"
          onChange={(e) =>
            update({
              AR: e.target.value,
              EN: value.EN,
            })
          }
        />
      </div>
    </div>
  );
};

export default AddInputsSection;
