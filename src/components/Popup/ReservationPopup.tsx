import React, { RefObject, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "../../css/reservationPopup.css";
import ReservationForm from "./ResrvationForm";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import popupData from "../../data/heroPopup";
import { currentLanguage } from "../../lib/utils";
import { StringLang } from "../../types/common";

interface ParamsType {
  show: boolean;
  handleClose: () => void;
  tech_id: string;
  layoutRef: React.MutableRefObject<HTMLDivElement>;
  tech_name: StringLang;
  isDiploma: boolean;
}

const ReservationPopup = ({
  show,
  handleClose,
  tech_id,
  layoutRef,
  tech_name,
  isDiploma,
}: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <>
      <div
        ref={layoutRef}
        style={{ display: "none" }}
        className={`${show ? "opacity-100 fixed-top" : ""} reservation-layout`}>
        <div className="reservation-popup p-4">
          <FontAwesomeIcon
            className="x-icon"
            icon={faX}
            role="button"
            onClick={handleClose}
          />
          <Row>
            <Col xs={12} md={6}>
              <div
                className="rounded-1 px-4 py-3 h-100"
                style={{ backgroundColor: "#f3f5f9" }}>
                <h4 className="text-black">
                  {popupData.header[currentLanguage(isEnglish)]}
                </h4>
                <p className="text-black-50 mb-1">
                  {popupData.subHeader[currentLanguage(isEnglish)]}
                </p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <ReservationForm
                tech_name={tech_name}
                handleClose={handleClose}
                tech_id={tech_id}
                isDiploma={isDiploma}
              />
            </Col>
          </Row>
          <Swiper
            dir="rtl"
            modules={[Pagination]}
            pagination={true}
            className="reservation-slider position-absolute rounded-2"
            style={{
              left: isEnglish ? 48 : "unset",
              right: isEnglish ? "unset" : 48,
            }}>
            {popupData.slids.map((slide) => (
              <SwiperSlide key={slide.AR + slide.EN}>
                {slide[currentLanguage(isEnglish)]}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ReservationPopup;
