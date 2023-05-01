import React, { FC } from "react";
import { StringLang } from "../../../types/common";

interface Props {
  header: string;
  value: StringLang;
  update: (value: StringLang) => void;
  isOn?: boolean;
}

const AddTextareaSection: FC<Props> = ({ value, update, header, isOn }) => {
  return (
    <div className="my-2">
      <h5 className="mb-3">{header}</h5>
      <div className="d-flex gap-3">
        <textarea
          disabled={typeof isOn === "boolean" && !isOn}
          value={value.EN}
          placeholder="Engilsh"
          onChange={(e) =>
            update({
              EN: e.target.value,
              AR: value.AR,
            })
          }
          rows={3}></textarea>
        <textarea
          disabled={typeof isOn === "boolean" && !isOn}
          value={value.AR}
          onChange={(e) =>
            update({
              EN: value.EN,
              AR: e.target.value,
            })
          }
          placeholder="Arabic"
          rows={3}></textarea>
      </div>
    </div>
  );
};

export default AddTextareaSection;
