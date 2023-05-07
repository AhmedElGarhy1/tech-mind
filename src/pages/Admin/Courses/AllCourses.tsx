import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { filterRecords } from "../../../lib/utils";
import AdminCourseRows from "../../../components/Admin/Courses/AdminCourseRows";
import { deleteCourse } from "../../../api/get-api";
import { PostResponse } from "../../../types/response";
import { CourseCardType } from "../../../types/course";
import { deleteImage } from "../../../lib/uploadImage";

const AllCourses: FC = () => {
  const data = useLoaderData() as CourseCardType[];
  const [allData, setAllData] = useState<CourseCardType[]>(data || []);
  const [courses, setCourses] = useState<CourseCardType[]>(data || []);
  const [error, setError] = useState<string | null>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value.trim();
    const newCourses = filterRecords(allData, q) as CourseCardType[];
    setCourses(newCourses);
  };

  const handleDelete = async (id: string, img: string) => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    const response: PostResponse = await deleteCourse(id);
    deleteImage(img, "Course");
    if (!response.ok) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    Swal.fire("Deleted", "Successfully Deleted", "success");
    setCourses((prev) => [...prev].filter((e) => e._id !== id));
    setAllData((prev) => [...prev].filter((e) => e._id !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h1>Courses</h1>
        <Link className="btn btn-primary" to="add">
          Add Course
        </Link>
      </div>
      <div className="position-relative mt-2">
        <input
          className="d-block w-100 bg-transparent shadow-none rounded-1 py-2 input-border"
          placeholder="Search..."
          type="text"
          onChange={handleQueryChange}
          style={{
            outline: "none",
            paddingLeft: 33,
          }}
        />
        <FontAwesomeIcon
          className="position-absolute"
          icon={faSearch}
          style={{
            top: 13,
            left: 10,
            fontSize: 18,
          }}
        />
      </div>
      {error && <p className="text-center text-danger mt-2">{error}</p>}
      <AdminCourseRows courses={courses} handleDelete={handleDelete} />
    </div>
  );
};

export default AllCourses;
