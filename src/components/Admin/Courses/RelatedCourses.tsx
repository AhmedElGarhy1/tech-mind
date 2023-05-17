import {
  faCaretDown,
  faCaretUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGet from "../../../hooks/useGet";
import { CourseType, RelatedCoursesType } from "../../../types/course";
import { useParams } from "react-router-dom";
import { FormSelect } from "react-bootstrap";
import AddField from "../Helper/AddField";
import { addRelatedCourse, deleteRelatedCourse } from "../../../api/get-api";
import Swal from "sweetalert2";

const AdminRelatedCourses = () => {
  const { id } = useParams();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [relatedCourses, setRelatedCourses] = useState<RelatedCoursesType[]>(
    []
  );
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [select, setSelect] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const [isRenderd, setIsRendered] = useState(true);
  const { makeRequest } = useGet();

  useEffect(() => {
    if (!isRenderd) return;
    const makeFetch = async () => {
      setLoading(true);
      const response = await makeRequest("courses/related/" + id);
      const tempRelatedCourses = response as RelatedCoursesType[];
      setRelatedCourses(tempRelatedCourses);
      //   --------
      const response2 = await makeRequest("courses?limit=1000000");
      const tempAllCourses = response2 as CourseType[];

      const theRestOfCourses = tempAllCourses.filter((course) => {
        const isExist = tempRelatedCourses.find((c) => c._id === course._id);
        const isCurrentCourse = course._id === id;
        return !isExist && !isCurrentCourse;
      });
      setAllCourses(theRestOfCourses);
      setSelect(theRestOfCourses[0]?._id);
      setLoading(false);
      setIsRendered(false);
    };
    makeFetch();
  }, [isRenderd]);

  const addCourse = async () => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Adding?",
      html: "Are you sure you want to Add this course as related?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    const courseId = select;
    const response = await addRelatedCourse(id, courseId);
    console.log(response);
    Swal.fire("Added", "Successfully Added", "success");
    setLoading(false);
    setIsRendered(true);
  };

  const deleteCourse = async (courseId: string) => {
    setLoading(true);
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    const response = await deleteRelatedCourse(id, courseId);
    console.log(response);
    Swal.fire("Deleted", "Successfully Deleted", "success");
    setIsRendered(true);
    setLoading(false);
  };

  return (
    <>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Related Courses</h3>
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
              {relatedCourses.length === 0 ? (
                <h2>There are no related course to this course!</h2>
              ) : (
                relatedCourses.map((course) => (
                  <div key={course._id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center ">
                        <img
                          src={course.main_img}
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
                <AddField addFunction={addCourse} name="Add Related" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminRelatedCourses;
