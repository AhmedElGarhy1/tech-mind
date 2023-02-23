import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useGet from "../../hooks/useGet";

import img from "../../assets/AiDataScienceDeploma.jfif";
import { Link } from "react-router-dom";

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
  const swiperRef = useRef<SwiperRef>();
  const { error, loading, makeRequest } = useGet();
  useEffect(() => {
    const makeFetch = async () => {
      const data = await makeRequest("/diplomas");
      console.log(data);
    };
    console.log(
      swiperRef.current && swiperRef.current.clientHeight + "px !important"
    );
    // makeFetch();
  }, []);
  return (
    <section
      className="diploma-slider"
      style={{
        backgroundColor: "var(--section-color)",
      }}>
      <Container>
        <h1 className="pt-5 pb-4 text-center">Our Diplomas</h1>
        <Swiper ref={swiperRef} spaceBetween={25} breakpoints={breakpoints}>
          {/* {["", "", ""].map((ele) => (
            <SwiperSlide>
              <div>
                <img src={img} width="100%" alt="" />
              </div>
              <div className="px-3 ">
                <h4 className="fw-bold py-2">Data Science and AI Diploma</h4>
                <p style={{ lineHeight: "32px" }} className="fs-5">
                  Learn Data Science Get the skills you need to land your first
                  data science job. Learn Python — no experience required!
                </p>
                <Link className="main-btn" to="/">
                  Learn More
                </Link>
              </div>
            </SwiperSlide>
          ))} */}

          <SwiperSlide
            style={{
              height:
                swiperRef.current &&
                swiperRef.current.clientHeight + "px !important",
            }}>
            <div>
              <img src={img} width="100%" alt="" />
            </div>
            <div className="px-3 ">
              <h4 className="fw-bold py-2">Data Science and AI Diploma</h4>
              <p style={{ lineHeight: "32px" }} className="fs-5">
                Learn Data Science Get the skills you need to land your first
                data science job. Learn Python — no experience required! Learn
                Data Science Get the skills you need to land your first data
                science job. Learn Python — no experience required!
              </p>
              <Link
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
                className="main-btn"
                to="/">
                Learn More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="">
            <div>
              <img src={img} width="100%" alt="" />
            </div>
            <div className="px-3 ">
              <h4 className="fw-bold py-2">Data Science and AI Diploma</h4>
              <p style={{ lineHeight: "32px" }} className="fs-5">
                Learn Data Science Get the skills you need to land your first
                data science job. Learn Python — no experience required! Learn
                Data Science Get the skills you need to land your first data
                science job. Learn Python — no experience required! ce job.
                Learn Python — no experience required! Learn Data Science Get
                the skills you need to land your first data science job. Learn
                Python — no experience required!
              </p>
              <Link
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
                className="main-btn"
                to="/">
                Learn More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="">
            <div>
              <img src={img} width="100%" alt="" />
            </div>
            <div className="px-3 ">
              <h4 className="fw-bold py-2">Data Science and AI Diploma</h4>
              <p style={{ lineHeight: "32px" }} className="fs-5">
                Learn Data Science Get the skills you need to land your first
                datance job. Learn Python — no experience required!
              </p>
              <Link
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
                className="main-btn"
                to="/">
                Learn More
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </section>
  );
};

export default DiplomasSlider;
