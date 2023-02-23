import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useGet from "../../hooks/useGet";

import { Link } from "react-router-dom";
import { StringLang } from "../../types/common";
import { currentLanguage } from "../../utils";
import useLangContext from "../../hooks/useLangContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Autoplay } from "swiper";
import ExploreLink from "./ExploreLink";

interface CourseType {
  _id: string;
  name: StringLang;
  description: StringLang;
  main_img: string;
  duration: string;
  lectures: string;
}

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
  const swiperRef = useRef<SwiperRef>();
  const [courses, setCourses] = useState<CourseType[]>([]);
  const { error, loading, makeRequest } = useGet();
  const { isEnglish } = useLangContext();

  useEffect(() => {
    const makeFetch = async () => {
      console.log("START");
      const data = (await makeRequest("/courses")) as CourseType[];
      setCourses(data);
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
                ref={swiperRef}
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
                    <CourseCardSlide course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <ExploreLink
                enText="Explore all courses"
                path="/courses"
                arText="استكشف جميع الكورسات"
              />
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

const CourseCardSlide = ({ course }: { course: CourseType }) => {
  const { isEnglish } = useLangContext();

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
      <div className="px-3 pb-4">
        <h4 data-aos="fade-up" className="fw-bold py-2 mb-0">
          {course.name[currentLanguage(isEnglish)]}
        </h4>
        <p
          data-aos="fade-left"
          data-aos-delay="600"
          style={{ lineHeight: "18px" }}
          className="fs-6">
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

export default CourseSlider;
