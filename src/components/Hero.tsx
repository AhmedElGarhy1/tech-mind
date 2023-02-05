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
      <Container style={{ zIndex: 100 }} className="position-relative pt-5">
        <h1 style={{ fontSize: "40px" }}>{name[currentLanguage(isEnglish)]}</h1>
        <p className="mt-3 mb-5 pb-1 fs-5" style={{ maxWidth: "600px" }}>
          {description[currentLanguage(isEnglish)]}
        </p>
        <a role={"button"} className="main-btn px-5 mt-5">
          {isEnglish ? "Start Your Career" : "ابدأ حياتك المهنية"}
        </a>
      </Container>
    </div>
  );
};

export default Hero;
