import React, { FC, useEffect, useState } from "react";
import AddInputsSection from "./AddInputsSection";
import AddTextareaSection from "./AddTextareaSection";
import UploadImage from "./UploadImage";
import { StringLang } from "../../../types/common";
import WhatWillYouLearn from "./WhatWillYouLearn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseImages,
  selectCourseInfo,
  selectCourseIsSent,
  updateCourseInfo,
} from "../../../store/slices/Admin/CourseSlice";
import {
  selectDiplomaImages,
  selectDiplomaInfo,
  selectDiplomaIsSent,
  updateDiplomaInfo,
} from "../../../store/slices/Admin/DiplomSlice";
import { GlobalCourseImagesStringType } from "../../../types/course";
import { GlobalDiplomaImagesStringType } from "../../../types/deploma";

interface Param {
  type: "Course" | "Diploma";
  setImage?: (image: File) => void;
}
interface DataType {
  name: StringLang;
  description: StringLang;
}
const Info: FC<Param> = ({ type, setImage }) => {
  let data: DataType;
  let isSent: boolean;
  let images: GlobalCourseImagesStringType | GlobalDiplomaImagesStringType;
  if (type === "Course") {
    data = useAppSelector(selectCourseInfo);
    isSent = useAppSelector(selectCourseIsSent);
    images = useAppSelector(selectCourseImages);
  } else if (type === "Diploma") {
    data = useAppSelector(selectDiplomaInfo);
    isSent = useAppSelector(selectDiplomaIsSent);
    images = useAppSelector(selectDiplomaImages);
  }

  const dispatch = useAppDispatch();
  const [collapse, setCollapse] = useState<boolean>(true);
  const [name, setName] = useState<StringLang>(data.name);
  const [description, setDescription] = useState<StringLang>(data.description);

  const [start, setStart] = useState(false);
  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setStart(true);
  }, [data]);

  // update redux store
  useEffect(() => {
    if (!start) return;
    if (type === "Course") dispatch(updateCourseInfo({ name, description }));
    else dispatch(updateDiplomaInfo({ name, description }));
  }, [isSent]);
  // --------------------
  const updateName = (_name: StringLang) => {
    setName({ ..._name });
  };
  const updateDescription = (_description: StringLang) => {
    setDescription({ ..._description });
  };
  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>{type} Info</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div>
          <AddInputsSection
            header={`${type} Name`}
            value={name}
            update={updateName}
          />
          <AddTextareaSection
            value={description}
            update={updateDescription}
            header="Description"
          />
          {type === "Course" && (
            <UploadImage
              // @ts-ignore
              imgSrc={images.icon}
              setImage={setImage}
              header="Course Icon"
            />
          )}
        </div>
      )}
    </>
  );
};

export default Info;
