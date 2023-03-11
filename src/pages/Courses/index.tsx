import React from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import CourseCard, {
  CourseCardType,
} from "../../components/Courses/CourseCard";
import Hero from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";

const Courses = () => {
  const courses = useLoaderData() as CourseCardType[];
  return (
    <div>
      <Hero
        name={{
          EN: "The Future belongs to you",
          AR: "The Future belongs to you",
        }}
        description={{
          EN: "A Lot of courses with  a high quality lessons and expert instructors",
          AR: "الكثير من الدورات مع دروس عالية الجودة ومدربين خبراء",
        }}
        noBtn={true}
      />
      <BreadCrumb />
      <div
        style={{
          backgroundColor: "var(--section-color)",
          marginBottom: "80px",
        }}
        className="pb-5">
        <Container>
          <h1 className="pt-5 pb-3 fw-bold">Our Courses</h1>
          <Row
            style={{
              rowGap: "30px",
            }}>
            {courses.map((course) => (
              <div
                style={{
                  boxSizing: "border-box",
                  borderLeft: "15px solid transparent",
                  borderRight: "15px solid transparent",
                  backgroundClip: "padding-box",
                }}
                key={course._id}
                className="bg-white p-0 col-12 col-md-6 col-lg-4 col-xxl-3 position-relative">
                <CourseCard course={course} />
              </div>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Courses;
