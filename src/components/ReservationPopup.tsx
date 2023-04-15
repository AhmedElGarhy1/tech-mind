import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "../css/reservationPopup.css";
import useLangContext from "../hooks/useLangContext";
import { formateEmail } from "../lib/utils";
import ReservationForm from "./Popup/ResrvationForm";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ParamsType {
  show: boolean;
  handleClose: () => void;
  tech_id: string;
}

const ReservationPopup = ({ show, handleClose, tech_id }: ParamsType) => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <div
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
                  Let us help you start your career
                </h4>
                <p className="text-black-50 mb-1">
                  Our registration process is quick and easy
                </p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <ReservationForm tech_id={tech_id} />
            </Col>
          </Row>
          <Swiper
            modules={[Pagination]}
            pagination={true}
            className="reservation-slider position-absolute rounded-2">
            <SwiperSlide>
              Providing software content that distinguishes us from everyone, in
              addition to a special service and follow-up to gain the respect of
              the student.
            </SwiperSlide>
            <SwiperSlide>
              We seek to provide all possible avenues for student to achieve
              their goals and improve their skills.
            </SwiperSlide>
            <SwiperSlide>
              Permanent development and improvement in the content provided to
              the student to keep pace with the requirements of the labor
              market.
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ReservationPopup;
