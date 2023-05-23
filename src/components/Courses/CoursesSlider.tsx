import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import useGet from "../../hooks/useGet";

import { Autoplay } from "swiper";
import ExploreLink from "../Home/ExploreLink";
import CourseCard from "./CourseCard";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { CourseCardType } from "../../types/course";

const breakpoints = {
  575: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
  991: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
};

const CourseSlider = () => {
  const [courses, setCourses] = useState<CourseCardType[]>([]);
  const { error, loading, makeRequest } = useGet();
  const isEnglish = useAppSelector(selectIsEnglish);

  useEffect(() => {
    const makeFetch = async () => {
      const data = (await makeRequest(
        "/courses?is_dependent=true&limit=8"
      )) as CourseCardType[];

      setCourses(data || []);
    };

    makeFetch();
  }, []);

  return (
    <div
      style={{
        marginBottom: "60px",
      }}>
      <section
        className="diploma-slider"
        style={{
          backgroundColor: "var(--section-color)",
        }}>
        <Container className="pb-5">
          <h1 className="pt-5 pb-4 text-center">
            {isEnglish ? "Most Popular Courses" : "الكورسات الاكثر شهرة"}
          </h1>
          {loading ? (
            <h1 className="text-center">Loading...</h1>
          ) : courses.length === 0 ? (
            <h1>There Are No Courses Yet!</h1>
          ) : (
            <>
              <Swiper
                dir="ltr"
                spaceBetween={25}
                modules={[Autoplay]}
                autoplay={{ delay: 7000 }}
                breakpoints={breakpoints}>
                {courses.map((course) => (
                  <SwiperSlide
                    key={course._id}
                    dir={isEnglish ? "ltr" : "rtl"}
                    className="bg-white"
                    style={{ height: "auto" }}>
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
          <ExploreLink
            enText="Explore all courses"
            path="/courses"
            arText="استكشف جميع الكورسات"
          />
        </Container>
      </section>
    </div>
  );
};

export default CourseSlider;
