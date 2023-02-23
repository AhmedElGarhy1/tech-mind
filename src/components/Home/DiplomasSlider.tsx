import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useGet from "../../hooks/useGet";

import { Link } from "react-router-dom";
import { StringLang } from "../../types/common";
import { currentLanguage } from "../../utils";
import useLangContext from "../../hooks/useLangContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Autoplay } from "swiper";
import ExploreLink from "./ExploreLink";

interface DiplomaType {
  _id: string;
  name: StringLang;
  description: StringLang;
  main_img: string;
}

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
  const [diplomas, setDiplomas] = useState<DiplomaType[]>([]);
  const { error, loading, makeRequest } = useGet();
  const { isEnglish } = useLangContext();

  useEffect(() => {
    const makeFetch = async () => {
      console.log("START");
      const data = (await makeRequest("/diplomas")) as DiplomaType[];
      setDiplomas(data);
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
            modules={[Autoplay]}
            autoplay={{ delay: 7000 }}
            spaceBetween={25}
            breakpoints={breakpoints}>
            {diplomas.map((diploma) => (
              <SwiperSlide
                key={diploma._id}
                dir={isEnglish ? "ltr" : "rtl"}
                className="bg-white"
                style={{ height: "auto" }}>
                <DiplomaCardSlide diploma={diploma} />
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

const DiplomaCardSlide = ({ diploma }: { diploma: DiplomaType }) => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <div>
        <img
          src={diploma.main_img}
          data-aos="zoom-in"
          className="diploma-img"
          width="100%"
          height="250"
          alt=""
        />
      </div>
      <div className="px-3 pb-5">
        <h4 data-aos="fade-up" className="fw-bold py-2">
          {diploma.name[currentLanguage(isEnglish)]}
        </h4>
        <p
          data-aos="fade-left"
          data-aos-delay="600"
          style={{ lineHeight: "32px" }}
          className="fs-5">
          {diploma.description[currentLanguage(isEnglish)]}
        </p>
        <Link
          data-aos="zoom-out"
          data-aos-delay="1200"
          style={{
            position: "absolute",
            bottom: "15px",
          }}
          className="main-btn"
          to={`/diplomas/${diploma._id}`}>
          {isEnglish ? "Learn More" : "معرفة المزيد"}
        </Link>
      </div>
    </>
  );
};

export default DiplomasSlider;
