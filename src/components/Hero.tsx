import React from "react";
import heroImage from "../assets/hero.jpg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLangContext from "../hooks/useLangContext";
import { currentLanguage } from "../utils";
interface ParamsType {
  name: {
    AR: string;
    EN: string;
  };
  description: {
    AR: string;
    EN: string;
  };
}

const Hero = ({ name, description }: ParamsType) => {
  const { isEnglish } = useLangContext();
  return (
    <div className="text-white bg-hero-img  py-5">
      <Container
        style={{ zIndex: 100 }}
        className="position-relative h-100 justify-content-between pt-4">
        <div>
          <h1
            data-aos="zoom-in"
            className="fw-bold"
            style={{ fontSize: "40px" }}>
            {name[currentLanguage(isEnglish)]}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-4 mb-5 pb-1 fs-4"
            style={{ maxWidth: "600px" }}>
            {description[currentLanguage(isEnglish)]}
          </p>
        </div>
        <a
          data-aos="fade-right"
          data-aos-delay="1200"
          role={"button"}
          style={{ lineHeight: "40px" }}
          className="main-btn px-5 mb-4 mt-5">
          {isEnglish ? "Start Your Career" : "ابدأ حياتك المهنية"}
        </a>
      </Container>
    </div>
  );
};

export default Hero;
