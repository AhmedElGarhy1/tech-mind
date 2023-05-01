import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CourseCardType } from "../../../types/course";

interface Props {
  handleDelete: (id: string, img: string) => void;
  courses: CourseCardType[];
}

const AdminCourseRows: FC<Props> = ({ courses, handleDelete }) => {
  return (
    <ul className="list-unstyled mt-4">
      {courses.length < 1 ? (
        <h3 className="text-center">There are no courses</h3>
      ) : (
        courses.map((course) => (
          <div key={course._id}>
            <div className="my-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={course.main_img} alt={course.name.EN} width="150" />
                <div>
                  <h5>{course.name.EN}</h5>
                  <span className="text-black-50">
                    {course.is_dependent ? "Dependent" : "Not Dependent"}
                  </span>
                </div>
              </div>
              <div>
                <Link
                  title="Edit"
                  to={`/admin/courses/${course._id}`}
                  className="me-3">
                  <FontAwesomeIcon
                    className="text-secondary-color fs-6"
                    icon={faPenToSquare}
                  />
                </Link>
                <span
                  onClick={() => handleDelete(course._id, course.main_img)}
                  role="button"
                  title="Delete"
                  className="ms-3">
                  <FontAwesomeIcon
                    className="text-secondary-color fs-6"
                    icon={faTrash}
                  />
                </span>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </ul>
  );
};

export default AdminCourseRows;
