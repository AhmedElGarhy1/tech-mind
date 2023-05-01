import React, { FC, useEffect, useState } from "react";
import AddInputsSection from "./AddInputsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddField from "./AddField";
import UploadImage from "./UploadImage";
import { StringLang, StringLangs } from "../../../types/common";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseImages,
  selectCourseIsSent,
  selectCourseWhatWillYouLearn,
  updateCourseWhatWillYouLearn,
} from "../../../store/slices/Admin/CourseSlice";

interface Params {
  type: "Course" | "Diploma";
  setImage: (value: File) => void;
}

interface overviewElement extends StringLang {
  id: number;
}

const WhatWillYouLearn: FC<Params> = ({ type, setImage }) => {
  const isSent = useAppSelector(selectCourseIsSent);
  const data = useAppSelector(selectCourseWhatWillYouLearn);
  const images = useAppSelector(selectCourseImages);

  const [collapse, setCollapse] = useState<boolean>(false);
  const [list, setList] = useState<overviewElement[]>(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateCourseWhatWillYouLearn(list));
  }, [isSent]);
  // ------------------|

  const deleteOne = (e: number) => {
    setList((p) => {
      if (p.length <= 1) return p;
      return [...p].filter((e2) => e2.id !== e);
    });
  };
  const addOne = () => {
    if (list.at(-1).AR === "" || list.at(-1).EN === "") return;

    setList((p) => [
      ...p,
      {
        AR: "",
        EN: "",
        id: Date.now(),
      },
    ]);
  };

  const updateOne = (id: number) => {
    return (value: StringLang) =>
      setList((p) =>
        [...p].map((ele) =>
          ele.id === id
            ? {
                ...value,
                id: ele.id,
              }
            : ele
        )
      );
  };

  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>What Will You Learn</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div>
          {list.map((ele) => (
            <div className="position-relative" key={ele.id}>
              <AddInputsSection
                value={{ AR: ele.AR, EN: ele.EN }}
                update={updateOne(ele.id)}
                header={null}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="position-absolute fs-5"
                role="button"
                style={{
                  top: 15,
                  right: -30,
                }}
                onClick={() => deleteOne(ele.id)}
              />
            </div>
          ))}
          <AddField addFunction={addOne} />
          <UploadImage
            imgSrc={images.other_src}
            header="GIF Image"
            setImage={setImage}
          />
        </div>
      )}
    </>
  );
};

export default WhatWillYouLearn;
