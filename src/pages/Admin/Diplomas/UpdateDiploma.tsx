import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDiploma } from "../../../store/slices/Admin/DiplomSlice";
import { AdminDiplomaType, DeplomaType } from "../../../types/deploma";
import AddDiploma from "./AddDiploma";

const UpdateDiploma = () => {
  const data = useLoaderData() as DeplomaType;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDiploma(data));
  }, []);

  return (
    <div>
      <AddDiploma type="update" courses={data.courses} />
    </div>
  );
};

export default UpdateDiploma;
