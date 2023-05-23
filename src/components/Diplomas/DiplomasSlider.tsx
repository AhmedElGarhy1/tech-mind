import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useGet from "../../hooks/useGet";

import { Autoplay } from "swiper";
import ExploreLink from "../Home/ExploreLink";
import DiplomaCard, { DiplomaCardType } from "./DiplomaCard";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";

const breakpoints = {
  767: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
  1200: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const DiplomasSlider = () => {
  const [diplomas, setDiplomas] = useState<DiplomaCardType[]>([]);
  const { loading, makeRequest } = useGet();
  const isEnglish = useAppSelector(selectIsEnglish);

  useEffect(() => {
    const makeFetch = async () => {
      const data = (await makeRequest(
        "/diplomas?limit=8"
      )) as DiplomaCardType[];
      setDiplomas(data || []);
    };

    makeFetch();
  }, []);

  return (
    <section
      className="diploma-slider"
      style={{
        backgroundColor: "var(--section-color)",
      }}>
      <Container className="pb-5">
        <h1 className="pt-5 pb-4 text-center">
          {isEnglish ? "Our Diplomas" : "الدبلومات الخاصة بنا"}
        </h1>
        {loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : diplomas.length === 0 ? (
          <h1>There Are No Diplomas Yet</h1>
        ) : (
          <Swiper
            dir="ltr"
            // navigation
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            spaceBetween={25}
            breakpoints={breakpoints}>
            {diplomas.map((diploma) => (
              <SwiperSlide
                key={diploma._id}
                dir={isEnglish ? "ltr" : "rtl"}
                className="bg-white"
                style={{ height: "auto" }}>
                <DiplomaCard diploma={diploma} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <ExploreLink
          enText="Explore all diplomas"
          path="/diplomas"
          arText=" استكشف جميع الدبلومات"
        />
      </Container>
    </section>
  );
};

export default DiplomasSlider;
