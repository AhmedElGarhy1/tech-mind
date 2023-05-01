import React, { FC, useEffect, useState } from "react";
import AddTextareaSection from "../Helper/AddTextareaSection";
import UploadImage from "../Helper/UploadImage";
import AddInputsSection from "../Helper/AddInputsSection";
import AddField from "../Helper/AddField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SwitchElement from "../Helper/SwitchElement";
import { StringLang } from "../../../types/common";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseImages,
  selectCourseIsSent,
  selectCourseObjectives,
  updateCourseObjectives,
} from "../../../store/slices/Admin/CourseSlice";

interface Params {
  setImages: (images: File[]) => void;
}

interface listElement {
  name: StringLang;
  description: StringLang;
  icon: string;
  _id?: string;
}

const images: File[] = [];

const CourseObjectives: FC<Params> = ({ setImages }) => {
  const data = useAppSelector(selectCourseObjectives);
  const isSent = useAppSelector(selectCourseIsSent);
  const courseImages = useAppSelector(selectCourseImages);

  const [collapse, setCollapse] = useState<boolean>(false);
  const [list, setList] = useState<listElement[]>(data.objectives);
  const [isOn, setIsOn] = useState(data.have_objectives);

  useEffect(() => {
    setList(data.objectives);
    setIsOn(data.have_objectives);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateCourseObjectives({ list, isOn }));
  }, [isSent]);
  // ------------------|

  const setImage = (index: number) => (file: File) => {
    images[index] = file;
    setImages([...images]);
  };

  const updateName = (id: string) => {
    return (value: StringLang) => {
      setList((p) =>
        [...p].map((ele) =>
          ele._id === id
            ? {
                ...ele,
                name: value,
              }
            : ele
        )
      );
    };
  };
  const updateDescription = (id: string) => {
    return (value: StringLang) => {
      setList((p) =>
        [...p].map((ele) =>
          ele._id === id
            ? {
                ...ele,
                description: value,
              }
            : ele
        )
      );
    };
  };

  const deleteOne = (e: string) => {
    setList((p) => {
      if (p.length <= 1) return p;
      return [...p].filter((e2) => e2._id !== e);
    });
  };

  const addOne = () => {
    if (
      !list.at(-1).name.AR ||
      !list.at(-1).name.EN ||
      !list.at(-1).description.AR ||
      !list.at(-1).description.EN
    )
      return;
    setList((p) => [
      ...p,
      {
        description: {
          AR: "",
          EN: "",
        },
        name: {
          AR: "",
          EN: "",
        },
        _id: Date.now().toString(),
        icon: "",
      },
    ]);
  };

  const changeStatus = () => {
    setIsOn((p) => !p);
  };

  return (
    <div className="my-2">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Course Objectives</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div>
          {list.map((ele, i) => (
            <div className="position-relative" key={ele._id}>
              <UploadImage
                imgSrc={courseImages.objectives[i]}
                isOn={isOn}
                header="Icon"
                setImage={setImage(i)}
              />
              <AddInputsSection
                isOn={isOn}
                header="Name"
                update={updateName(ele._id)}
                value={list[i].name}
              />
              <AddTextareaSection
                isOn={isOn}
                header="Description"
                value={list[i].description}
                update={updateDescription(ele._id)}
              />
              <FontAwesomeIcon
                className="position-absolute fs-4"
                icon={faTrash}
                onClick={() => deleteOne(ele._id)}
                role="button"
                style={{
                  top: 2,
                  right: 5,
                }}
              />
              <hr />
            </div>
          ))}
          <AddField name="Add Objective" addFunction={addOne} />
          <SwitchElement isOn={isOn} changeStatus={changeStatus} />
        </div>
      )}
    </div>
  );
};

export default CourseObjectives;
