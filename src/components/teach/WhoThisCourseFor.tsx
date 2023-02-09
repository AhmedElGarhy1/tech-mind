import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";
import workerImage from "../../assets/workers.png";
import ListColumn from "./ListColumn";

interface ListType {
  AR: string[];
  EN: string[];
}

interface ParamsType {
  list: ListType;
}

const WhoThisCourseFor = ({ list }: ParamsType) => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <Container as="section">
        <Row>
          <Col data-aos="zoom-in" lg="8">
            <h1 className="mb-4">
              {isEnglish ? "Who is this course for?" : "لمن هذه الدورة؟"}
            </h1>
            <ListColumn list={list} />
          </Col>
          <Col
            data-aos="flip-up"
            data-aos-delay="350"
            className="mobile-disappeare"
            lg="4">
            <img width="100%" src={workerImage} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhoThisCourseFor;
