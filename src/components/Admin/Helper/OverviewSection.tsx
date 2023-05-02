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
  selectCourseOverview,
  updateCourseOverview,
} from "../../../store/slices/Admin/CourseSlice";

interface Params {
  setImage: (image: File) => void;
  type: "Course" | "Diploma";
}

interface overviewElement extends StringLang {
  id: number;
}

const OverviewSection: FC<Params> = ({ type, setImage }) => {
  const data = useAppSelector(selectCourseOverview);
  const isSent = useAppSelector(selectCourseIsSent);
  const images = useAppSelector(selectCourseImages);

  const [temp, setTemp] = useState(false);

  const [collapse, setCollapse] = useState<boolean>(false);
  const [overviewList, setOverviewList] = useState<overviewElement[]>(data);

  useEffect(() => {
    setOverviewList(data);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateCourseOverview(overviewList));
  }, [isSent]);
  // ------------------|

  const deleteOne = (e: number) => {
    setOverviewList((p) => {
      if (p.length <= 1) return p;
      return [...p].filter((e2) => e2.id !== e);
    });
  };
  const addOne = () => {
    if (overviewList.at(-1)?.AR === "" || overviewList?.at(-1)?.EN === "")
      return;
    setOverviewList((p) => [
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
      setOverviewList((p) =>
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
        <h3>Overview</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div>
          {overviewList.map((ele) => (
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
            imgSrc={images.main_img}
            header="Overview Image"
            setImage={setImage}
          />
        </div>
      )}
    </>
  );
};

export default OverviewSection;
