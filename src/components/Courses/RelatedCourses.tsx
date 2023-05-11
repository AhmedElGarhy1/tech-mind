import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useGet from "../../hooks/useGet";
import { RelatedCoursesType } from "../../types/course";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { currentLanguage } from "../../lib/utils";

interface ParamsType {
  id: string;
  is_dependent: boolean;
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

const RelatedCourses = ({ id, is_dependent }: ParamsType) => {
  const { loading, error, makeRequest } = useGet();
  const isEnglish = useAppSelector(selectIsEnglish);

  const [courses, setCourses] = useState<RelatedCoursesType[]>();
  const { pathname } = useLocation();
  const path = pathname.split("/").slice(0, -1).join("/");

  useEffect(() => {
    const makeFetch = async () => {
      const url = `courses/related/${id}?is_dependent=${is_dependent || false}`;
      const response = await makeRequest(url);
      const relatedCourses = response as RelatedCoursesType[];
      setCourses(relatedCourses);
    };
    makeFetch();
  }, [pathname]);

  if (!courses || courses.length === 0) return <></>;

  return (
    <div className="bg-main-color">
      <Container as="section" className="py-4">
        <h1 className="text-white mb-3">
          {isEnglish ? "Most Popular Courses" : "الكورسات الأكثر شهرة"}
        </h1>
        {!loading ? (
          <Swiper dir="ltr" spaceBetween={50} breakpoints={breakpoints}>
            {courses.map((course) => (
              <SwiperSlide key={course._id} dir={isEnglish ? "ltr" : "rtl"}>
                <div
                  style={{
                    maxWidth: "390px",
                  }}
                  className="bg-white rounded-2 d-flex gap-3 mx-auto m-0">
                  <div className="course-slider-image">
                    <img className="h-100" src={course.main_img} />
                  </div>
                  <div className="d-flex flex-column justify-content-between overflow-hidden">
                    <h6 style={{ marginTop: "20px", fontSize: "16px" }}>
                      {course.name[currentLanguage(isEnglish)]}
                    </h6>
                    <Link
                      to={`${path}/${course._id}`}
                      className="main-btn mb-0 rounded-0 mb-3">
                      {isEnglish ? "Explore Now" : "استكشف الآن"}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <h1 className="text-white text-center fw-normal">Loading...</h1>
        )}
      </Container>
    </div>
  );
};

export default RelatedCourses;
