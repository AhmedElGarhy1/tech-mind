import {
  faCaretDown,
  faCaretUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";
import useGet from "../../../hooks/useGet";
import { CourseType, RelatedCoursesType } from "../../../types/course";
import { useParams } from "react-router-dom";
import { FormSelect } from "react-bootstrap";
import AddField from "../Helper/AddField";
import {
  addDiplomaCourse,
  addRelatedCourse,
  deleteDiplomaCourse,
  deleteRelatedCourse,
} from "../../../api/get-api";
import Swal from "sweetalert2";
import { CourseObjectivesType } from "../../../store/slices/Admin/CourseSlice";

interface Params {
  courses: CourseObjectivesType[];
}

const AdminDiplomaCourses: FC<Params> = ({ courses }) => {
  const { id } = useParams();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [diplomaCourses, setDiplomaCourses] = useState<CourseObjectivesType[]>(
    courses || []
  );
  const [allCourses, setAllCourses] = useState<CourseObjectivesType[]>([]);
  const [select, setSelect] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const { makeRequest } = useGet();

  useEffect(() => {
    setSelect(allCourses[0]?._id);
  }, [allCourses, allCourses]);

  useEffect(() => {
    const makeFetch = async () => {
      setLoading(true);
      //   --------
      const response2 = await makeRequest("courses");
      const tempAllCourses = response2 as CourseType[];

      const theRestOfCourses = tempAllCourses.filter((course) => {
        const isExist = courses.find((c) => c._id === course._id);
        const isCurrentCourse = course._id === id;
        return !isExist && !isCurrentCourse;
      });
      setAllCourses(theRestOfCourses);
      setLoading(false);
    };
    makeFetch();
  }, []);

  const addCourse = async () => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Adding?",
      html: "Are you sure you want to Add this course as related?",
      showDenyButton: true,
    });
    if (!confirmation.isConfirmed) return;

    const courseId = select;
    try {
      setLoading(true);
      const response = await addDiplomaCourse(id, courseId);
      Swal.fire("Added", "Successfully Added", "success");
      // update visable courses
      setDiplomaCourses((p) => [
        ...p,
        allCourses.find((course) => course._id === courseId),
      ]);
      setAllCourses((p) => [...p].filter((course) => course._id !== courseId));
    } catch (err) {
      Swal.fire("Sorry", "Somthing went Wrong", "error");
    }
    setLoading(false);
  };

  const deleteCourse = async (courseId: string) => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    try {
      setLoading(true);
      const response = await deleteDiplomaCourse(id, courseId);
      console.log(response);
      Swal.fire("Deleted", "Successfully Deleted", "success");
      setAllCourses((p) => [
        ...p,
        diplomaCourses.find((course) => course._id === courseId),
      ]);
      setDiplomaCourses((p) =>
        [...p].filter((course) => course._id !== courseId)
      );
    } catch (err) {
      Swal.fire("Error", "Somthing Went Wrong", "error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Diploma Courses</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <>
          {loading ? (
            <h2>Loading....</h2>
          ) : (
            <>
              {diplomaCourses.length === 0 ? (
                <h2>There are no related course to this course!</h2>
              ) : (
                diplomaCourses.map((course) => (
                  <div key={course._id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center ">
                        <img
                          src={course.icon}
                          alt={course.name.EN}
                          width={100}
                        />
                        <h5>{course.name.EN}</h5>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fs-5"
                          role="button"
                          onClick={() => deleteCourse(course._id)}
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}

              <FormSelect
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
                style={{ border: "1px solid #d9d9d9" }}
                className="shadow-none">
                {allCourses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name.EN}
                  </option>
                ))}
              </FormSelect>
              <div className="mt-2">
                <AddField addFunction={addCourse} name="Add Course" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminDiplomaCourses;
