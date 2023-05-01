import React, { useEffect, useState } from "react";
import SwitchElement from "../Helper/SwitchElement";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseIsDependentCourse,
  selectCourseIsSent,
  updateIsDependentCourse,
} from "../../../store/slices/Admin/CourseSlice";

const IsDependentCourse = () => {
  const data = useAppSelector(selectCourseIsDependentCourse);
  const isSent = useAppSelector(selectCourseIsSent);

  const [isOn, setIsOn] = useState<boolean>(data);
  const changeStatus = () => {
    setIsOn((p) => !p);
  };

  useEffect(() => {
    setIsOn(data);
  }, [data]);

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateIsDependentCourse(isOn));
  }, [isSent]);
  // ------------------|

  return (
    <div>
      <h2>This Course Is Dependent?</h2>
      <p>
        Dependent: means this course can found in courses page dependently and
        also will contain the 10 points of `Why choose TechMind` Section
      </p>
      <SwitchElement changeStatus={changeStatus} isOn={isOn} />
    </div>
  );
};

export default IsDependentCourse;
