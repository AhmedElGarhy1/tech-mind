import { faClock, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CourseCardType } from "../../types/course";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { currentLanguage } from "../../lib/utils";

const CourseCard = ({ course }: { course: CourseCardType }) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <Link className="text-black" to={`/courses/${course._id}`}>
      <div>
        <img
          src={course.main_img}
          data-aos="zoom-in"
          width="100%"
          height="200"
          className="course-image"
          alt=""
        />
      </div>
      <div style={{ lineHeight: "28px" }} className="px-3 pb-4">
        <h4 data-aos="fade-up" className="fw-bold pt-3 mb-0">
          {course.name[currentLanguage(isEnglish)]}
        </h4>
        <p
          className="py-2"
          data-aos="fade-left"
          data-aos-delay="600"
          style={{ fontSize: "16px" }}>
          {course.description[currentLanguage(isEnglish)]}
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            color: "var(--secondary-color)",
            fontSize: "14px",
          }}
          className="d-flex gap-3 ">
          <div
            data-aos="flip-left"
            data-aos-delay="1000"
            className="d-flex gap-1 align-items-center">
            <FontAwesomeIcon icon={faClock} />
            <span style={{ color: "#8C8C8C" }}>
              {course.lectures} {isEnglish ? "Lessons" : "محاضرة"}
            </span>
          </div>
          <div
            data-aos="flip-left"
            data-aos-delay="1000"
            className="d-flex gap-1 align-items-center">
            <FontAwesomeIcon icon={faFolder} />
            <span style={{ color: "#8C8C8C" }}>
              {course.duration} {isEnglish ? "Hours" : "ساعة"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
