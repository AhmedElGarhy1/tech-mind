import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { filterRecords } from "../../../lib/utils";
import AdminCourseRows from "../../../components/Admin/Courses/AdminCourseRows";
import { deleteCourse, getAllDependentCourses } from "../../../api/get-api";
import { PostResponse } from "../../../types/response";
import { CourseCardType } from "../../../types/course";
import LoadingButton from "../../../components/teach/LoadingButton";

const AllCourses: FC = () => {
  const basicCourses = useLoaderData() as CourseCardType[];

  const [allData, setAllData] = useState<CourseCardType[]>(basicCourses || []);
  const [courses, setCourses] = useState<CourseCardType[]>(basicCourses || []);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

  useLayoutEffect(() => {
    if (page === 1) return setCourses(basicCourses || []);

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const tempCourses = await getAllDependentCourses(pageNum);
        setLoading(false);
        if (!(tempCourses && tempCourses.length > 0)) return setHaveLoad(false);
        setAllData((p) => [...p, ...tempCourses]);
        setCourses((p) => [...p, ...tempCourses]);
        if (inputRef.current) inputRef.current.value = "";
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);

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
          ref={inputRef}
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
      {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
    </div>
  );
};

export default AllCourses;
