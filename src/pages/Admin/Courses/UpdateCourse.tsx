import React, { useEffect } from "react";
import AddCourse from "./AddCourse";
import { getCourse } from "../../../api/get-api";
import { useLoaderData, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CourseType } from "../../../types/course";
import {
  selectCourseFull,
  setCourse,
} from "../../../store/slices/Admin/CourseSlice";
import RelatedCourses from "../../../components/Admin/Courses/RelatedCourses";

const UpdateCourse = () => {
  const data = useLoaderData() as {
    course: CourseType;
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCourse(data.course));
  }, []);

  return (
    <div>
      <AddCourse type="update" />
    </div>
  );
};

export default UpdateCourse;
