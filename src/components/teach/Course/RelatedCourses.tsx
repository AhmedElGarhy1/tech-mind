import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useGet from "../../../hooks/useGet";
import useLangContext from "../../../hooks/useLangContext";
import { RelatedCoursesType } from "../../../types/course";
import { currentLanguage } from "../../../utils";

interface ParamsType {
  id: string;
}

const breakpoints = {
  767: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

const RelatedCourses = ({ id }: ParamsType) => {
  const { loading, error, makeRequest } = useGet();
  const [courses, setCourses] = useState<RelatedCoursesType[]>();
  const { isEnglish } = useLangContext();

  useEffect(() => {
    const makeFetch = async () => {
      const response = await makeRequest("courses/related/" + id);
      const relatedCourses = response as RelatedCoursesType[];
      setCourses(relatedCourses);
    };
    makeFetch();
  }, []);

  return (
    <Container className="bg-main-color py-4">
      {courses && courses.length > 0 && (
        <>
          <h3 className="text-white mb-3">
            {isEnglish ? "Most Popular Courses" : "الكورسات الأكثر شهرة"}
          </h3>
          <Swiper dir="ltr" spaceBetween={50} breakpoints={breakpoints}>
            {courses.map((course) => (
              <SwiperSlide
                key={course._id}
                dir={isEnglish ? "ltr" : "rtl"}
                className="p-2 bg-white rounded-2 d-flex gap-3 align-items-center">
                <div className="course-slider-image">
                  <img width="100%" src={course.main_img} />
                </div>
                <div>
                  <h6>{course.name[currentLanguage(isEnglish)]}</h6>
                  <Link to={course._id} className="main-btn">
                    {isEnglish ? "See More" : "روئية المذيد"}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Container>
  );
};

export default RelatedCourses;
