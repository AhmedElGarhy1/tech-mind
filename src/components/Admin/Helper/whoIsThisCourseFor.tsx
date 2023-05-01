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
  selectCourseIsSent,
  selectCourseWhoIsThisCourseFor,
  updateCourseWhoIsThisCourseFor,
} from "../../../store/slices/Admin/CourseSlice";

interface Params {
  type: "Course" | "Diploma";
}

interface overviewElement {
  AR: string;
  EN: string;
  id: number;
}

const WhoIsThisCourseFor: FC<Params> = ({ type }) => {
  const isSent = useAppSelector(selectCourseIsSent);
  const data = useAppSelector(selectCourseWhoIsThisCourseFor);
  const [collapse, setCollapse] = useState<boolean>(false);

  const [isOn, setIsOn] = useState<boolean>(data.have_target);
  const [list, setList] = useState<overviewElement[]>(data.who);

  useEffect(() => {
    setList(data.who);
    setIsOn(data.have_target);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateCourseWhoIsThisCourseFor({ list, isOn }));
  }, [isSent]);
  // --------------

  const deleteOne = (e: number) => {
    setList((p) => {
      if (p.length <= 1) return p;
      return [...p].filter((e2) => e2.id !== e);
    });
  };
  const addOne = () => {
    if (list.at(-1)?.AR === "" || list.at(-1)?.EN === "") return;
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
          <SwitchElement changeStatus={changeSwitchStatus} isOn={isOn} />
        </div>
      )}
    </>
  );
};

export default WhoIsThisCourseFor;
