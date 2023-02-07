import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";
import ListColumn from "./ListColumn";

interface ParamsType {
  list: {
    AR: string[];
    EN: string[];
  };
  src: string;
  isDeploma: boolean;
}

const WhatYouWillLearn = ({ list, src, isDeploma }: ParamsType) => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <Container as="section">
        <Row className="flex-column-reverse flex-lg-row">
          <Col lg="6">
            <h1 className="my-4 mt-lg-0">
              {isEnglish
                ? "What you will learn in this Course?"
                : "ماذا ستتعلم في هذه الدورة؟"}
            </h1>
            <ListColumn list={list} />
          </Col>
          <Col lg="6">
            <img width="100%" src={src} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhatYouWillLearn;
