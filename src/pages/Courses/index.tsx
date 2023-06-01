import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import CourseCard from "../../components/Courses/CourseCard";
import Hero from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";
import { CourseCardType } from "../../types/course";
import { currentLanguage } from "../../lib/utils";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { getAllDependentCourses } from "../../api/get-api";
import LoadingButton from "../../components/teach/LoadingButton";

const Courses = () => {
  const basicCourses = useLoaderData() as CourseCardType[];

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseCardType[]>([]);

  useLayoutEffect(() => {
    if (page === 1) {
      if (basicCourses.length < 20) setHaveLoad(false);
      return setCourses(basicCourses || []);
    }

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const tempCourses = await getAllDependentCourses(pageNum);
        setLoading(false);
        if (!(tempCourses && tempCourses.length > 0)) return setHaveLoad(false);

        if (tempCourses.length < 20) setHaveLoad(false);

        setCourses((p) => [...p, ...tempCourses]);
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);

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
          {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
        </Container>
      </div>
    </div>
  );
};

export default Courses;
