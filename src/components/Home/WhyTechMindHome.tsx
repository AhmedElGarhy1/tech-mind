import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";
import { Autoplay } from "swiper";

const breakpoints = {
  767: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};

interface ParamsType {
  list: {
    AR: string;
    EN: string;
    img: string;
  }[];
}

const WhyTechMindHome = ({ list }: ParamsType) => {
  const { isEnglish } = useLangContext();
  return (
    <section>
      <h1 className="text-center mb-4">
        <span>{isEnglish ? "Why Choose " : "لماذا تختار "}</span>
        <span
          data-aos="zoom-in"
          data-aos-duration="2000"
          style={{
            color: "var(--secondary-color)",
          }}>
          Tech Mind
        </span>
      </h1>
      <div className="home-bg text-white" dir="ltr">
        <Container className="py-5">
          <Swiper
            spaceBetween={50}
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            slidesPerView={1}
            breakpoints={breakpoints}>
            {list.map((item, i, arr) =>
              i % 2 == 0 ? (
                <SwiperSlide
                  key={i}
                  className="d-flex align-items-center flex-column justify-content-center">
                  <div
                    style={{ height: "110px" }}
                    className="d-flex align-items-center gap-3 fw-normal justify-content-start w-100">
                    <img data-aos="flip-right" src={item.img} alt="item" />
                    <div data-aos="fade-right" className="fs-3">
                      {item[currentLanguage(isEnglish)]}
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "30px", height: "110px" }}
                    className="d-flex align-items-center gap-3 fw-normal justify-content-start w-100">
                    <img
                      data-aos="flip-right"
                      src={arr[i + 1].img}
                      alt="item"
                    />
                    <div data-aos="fade-right" className="fs-3">
                      {arr[i + 1][currentLanguage(isEnglish)]}
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                ""
              )
            )}
          </Swiper>
        </Container>
      </div>
    </section>
  );
};

export default WhyTechMindHome;
