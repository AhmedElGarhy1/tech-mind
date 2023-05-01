import React from "react";
import { useState } from "react";
import { FC } from "react";

interface Props {
  header: string;
  value: string;
  update: (a: string) => void;
}
const NumericInput: FC<Props> = ({ value, update, header }) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (isNaN(+v)) return;
    update(v);
  };

  return (
    <div className="flex-grow-1 my-2">
      <h5 className="mb-3">{header}</h5>
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder="Add Number"
        />
      </div>
    </div>
  );
};

export default NumericInput;
