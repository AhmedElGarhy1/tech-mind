import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListColumn from "./ListColumn";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";

interface ParamsType {
  list: {
    AR: string[];
    EN: string[];
  };
  src: string;
  have_video?: boolean;
}

const WhatYouWillLearn = ({ list, src, have_video }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <>
      <Container as="section">
        <Row className="flex-column-reverse flex-lg-row">
          <Col data-aos="zoom-in" lg="6">
            <h1 className="my-4 mt-lg-0">
              {isEnglish
                ? "What you will learn in this Course?"
                : "ماذا ستتعلم في هذه الدورة؟"}
            </h1>
            <ListColumn list={list} />
          </Col>
          <Col data-aos="flip-up" data-aos-delay="350" lg="6">
            {have_video ? (
              <video autoPlay muted width="100%" src={src} loop />
            ) : (
              <img width="100%" src={src} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhatYouWillLearn;
