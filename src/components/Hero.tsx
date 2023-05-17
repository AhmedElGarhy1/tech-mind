import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/hero.jpg";
import { Container } from "react-bootstrap";
import ReservationPopup from "./Popup/ReservationPopup";
import { useAppSelector } from "../store/hooks";
import { selectIsEnglish } from "../store/slices/LangSlice";
import { currentLanguage } from "../lib/utils";
import { StringLang } from "../types/common";
interface ParamsType {
  name: {
    AR: string;
    EN: string;
  };
  description: {
    AR: string;
    EN: string;
  };
  noBtn?: boolean;
  tech_id?: string;
  tech_name?: StringLang;
  isDiploma?: boolean;
}

const Hero = ({
  name,
  description,
  noBtn,
  tech_id,
  tech_name,
  isDiploma,
}: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);
  const layoutRef = useRef<HTMLDivElement>();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      if (layoutRef.current) layoutRef.current.style.display = "none";
    }, 200);
  };
  const handleShow = () => {
    if (layoutRef.current) layoutRef.current.style.display = "block";
    setTimeout(() => {
      setShow(true);
    }, 200);
  };

  return (
    <div className="text-white bg-hero-img py-5">
      <Container
        style={{ zIndex: 5 }}
        className="position-relative h-100 justify-content-between pt-4">
        <div>
          <div>
            <h1 data-aos="zoom-in" className="fw-bold mt-4 mt-md-0">
              {name[currentLanguage(isEnglish)]}
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="600"
              className="mt-4 mb-5 pb-1 fs-4"
              style={{ maxWidth: "600px", lineHeight: "40px" }}>
              {description[currentLanguage(isEnglish)]}
            </p>
          </div>
          {!noBtn && (
            <>
              <button
                onClick={handleShow}
                data-aos="fade-right"
                data-aos-delay="1200"
                style={{ lineHeight: "40px" }}
                className="main-btn hero-btn px-5 mx-2">
                {isEnglish ? "Start Your Career" : "ابدأ حياتك المهنية"}
              </button>
              <ReservationPopup
                tech_id={tech_id}
                layoutRef={layoutRef}
                handleClose={handleClose}
                show={show}
                tech_name={tech_name}
                isDiploma={isDiploma}
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
