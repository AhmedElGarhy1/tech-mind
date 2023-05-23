import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { currentLanguage } from "../../lib/utils";

interface ParamsType {
  list: {
    _id?: string;
    name: {
      AR: string;
      EN: string;
    };
    description: {
      AR: string;
      EN: string;
    };
    icon: string;
  }[];
  deplomaID?: string;
  isDeploma: boolean;
}

const DeplomaCourses = ({ list, deplomaID, isDeploma }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <Container className="my-5">
      <h1 className="mb-4">{isEnglish ? "Course Tracks" : "مسارات الدورة"}</h1>
      <Row>
        {list.reverse().map((course, i) => (
          <div
            data-aos="flip-right"
            key={course._id}
            className="col-12 col-md-6 col-lg-4 col-xl-3 my-2">
            {isDeploma && deplomaID ? (
              <Link
                to={`/diplomas/${deplomaID}/${course._id}`}
                key={course._id}>
                <div
                  style={{ borderColor: "var(--secondary-color) !important" }}
                  className="deploma-course-card text-center border border-2 border rounded-2 p-1 pb-2 h-100 mx-auto px-3">
                  <img
                    className="my-3"
                    width="50px"
                    src={course.icon}
                    alt={course.name["EN"]}
                  />
                  <h5>{course.name[currentLanguage(isEnglish)]}</h5>
                  <p>{course.description[currentLanguage(isEnglish)]}</p>
                </div>
              </Link>
            ) : (
              <div
                style={{ borderColor: "var(--secondary-color) !important" }}
                className="deploma-course-card text-center border border-2 border rounded-2 p-1 pb-2 h-100 mx-auto px-3">
                <img
                  className="my-3"
                  src={course.icon}
                  alt={course.name["EN"]}
                />
                <h5>{course.name[currentLanguage(isEnglish)]}</h5>
                <p>{course.description[currentLanguage(isEnglish)]}</p>
              </div>
            )}
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default DeplomaCourses;
