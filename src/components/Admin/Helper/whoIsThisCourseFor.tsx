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
import SwitchElement from "./SwitchElement";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseImages,
  selectCourseIsSent,
  selectCourseWhoIsThisCourseFor,
  updateCourseWhoIsThisCourseFor,
} from "../../../store/slices/Admin/CourseSlice";
import { GlobalCourseImagesStringType } from "../../../types/course";
import { GlobalDiplomaImagesStringType } from "../../../types/deploma";
import {
  selectDiplomaImages,
  selectDiplomaIsSent,
  selectDiplomaWhoIsThisDiplomaFor,
  updateDiplomaWhoIsThisDiplomaFor,
} from "../../../store/slices/Admin/DiplomSlice";

interface Params {
  type: "Course" | "Diploma";
}

interface overviewElement {
  AR: string;
  EN: string;
  id: number;
}

interface selectType {
  who: overviewElement[];
  have_target?: boolean;
}

const WhoIsThisCourseFor: FC<Params> = ({ type }) => {
  let data: selectType;
  let isSent: boolean;
  let images: GlobalCourseImagesStringType | GlobalDiplomaImagesStringType;
  if (type === "Course") {
    data = useAppSelector(selectCourseWhoIsThisCourseFor);
    isSent = useAppSelector(selectCourseIsSent);
    images = useAppSelector(selectCourseImages);
  } else if (type === "Diploma") {
    data = useAppSelector(selectDiplomaWhoIsThisDiplomaFor);
    isSent = useAppSelector(selectDiplomaIsSent);
    images = useAppSelector(selectDiplomaImages);
  }

  const [collapse, setCollapse] = useState<boolean>(false);
  const [isOn, setIsOn] = useState<boolean>(type === "Diploma");
  const [list, setList] = useState<overviewElement[]>(data.who || []);

  useEffect(() => {
    setList(data.who);
    if (type === "Course") setIsOn(data?.have_target);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (type === "Course")
      dispatch(updateCourseWhoIsThisCourseFor({ list, isOn }));
    else dispatch(updateDiplomaWhoIsThisDiplomaFor(list));
  }, [isSent]);
  // --------------

  const deleteOne = (e: number) => {
    setList((p) => {
      if (!isOn) return p;
      return [...p].filter((e2) => e2.id !== e);
    });
  };
  const addOne = () => {
    if (list.at(-1)?.AR === "" || list.at(-1)?.EN === "" || !isOn) return;
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

  const changeSwitchStatus = () => {
    setIsOn((p) => !p);
  };

  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Who is This Course for</h3>
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
                isOn={isOn}
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
          {type === "Course" && (
            <SwitchElement changeStatus={changeSwitchStatus} isOn={isOn} />
          )}
        </div>
      )}
    </>
  );
};

export default WhoIsThisCourseFor;
