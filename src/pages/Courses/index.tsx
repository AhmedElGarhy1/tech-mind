import React from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import CourseCard, {
  CourseCardType,
} from "../../components/Courses/CourseCard";
import CourseSlider from "../../components/Courses/CoursesSlider";
import Hero from "../../components/Hero";
// import CourseSlider from "../../components/teach/Course/";

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
      <div
        style={{
          marginBottom: "80px",
        }}>
        <section
          style={{
            backgroundColor: "var(--section-color)",
          }}
          className="pb-5">
          <Container>
            <h1 className="pt-5 pb-3 fw-bold">Our Courses</h1>
            <Row className="position-relative gap-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white p-0 col-12 col-md-6 col-lg-4 col-xl-3">
                  <CourseCard course={course} />
                </div>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Courses;
