import React, { useEffect, useState } from "react";
import NumericInput from "./AddNumirecInputsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseIsSent,
  selectCourseMetaNumbers,
  updateCourseMetaNumbers,
} from "../../../store/slices/Admin/CourseSlice";

const CourseMetaData = () => {
  const data = useAppSelector(selectCourseMetaNumbers);
  const isSent = useAppSelector(selectCourseIsSent);
  const dispatch = useAppDispatch();

  const [collapse, setCollapse] = useState<boolean>(false);

  const [duration, setDuration] = useState<string>("");
  const [lectures, setLectures] = useState<string>("");
  const [realProjects, setRealProjects] = useState<string>("");
  const [workshops, setWorkshops] = useState<string>("");

  useEffect(() => {
    setDuration(data.duration.toString());
    setLectures(data.lectures.toString());
    setWorkshops(data.workshops.toString());
    setRealProjects(data.real_projects.toString());
  }, [data]);
  // redux

  useEffect(() => {
    //to prevent it from render before the other useEffect
    dispatch(
      updateCourseMetaNumbers({
        duration,
        lectures,
        real_projects: realProjects,
        workshops,
      })
    );
  }, [isSent]);
  // ------------------|

  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Course Meta Data</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div className="w-100">
          <div className="w-100 d-flex gap-3">
            <NumericInput
              header="Duration (In Hours)"
              value={duration}
              update={setDuration}
            />
            <NumericInput
              header="Lectures"
              value={lectures}
              update={setLectures}
            />
          </div>
          <div className="d-flex gap-3">
            <NumericInput
              header="Real Projects"
              value={realProjects}
              update={setRealProjects}
            />
            <NumericInput
              header="Workshops"
              value={workshops}
              update={setWorkshops}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseMetaData;
