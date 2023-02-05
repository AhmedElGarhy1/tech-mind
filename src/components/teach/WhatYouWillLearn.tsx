import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";

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
  const [visible, setVisible] = useState([]);
  const [isOpend, setIsOpend] = useState(false);

  useEffect(() => {
    rendreButtonState();
  }, [isEnglish]);

  const rendreButtonState = () => {
    if (isOpend) {
      setVisible(list[currentLanguage(isEnglish)]);
    } else {
      const temp = list[currentLanguage(isEnglish)].slice(0, 6);
      setVisible(temp);
    }
  };

  const changeButtonState = () => {
    if (!isOpend) {
      setVisible(list[currentLanguage(isEnglish)]);
    } else {
      const temp = list[currentLanguage(isEnglish)].slice(0, 6);
      setVisible(temp);
    }
    setIsOpend((p) => !p);
  };

  return (
    <>
      <Container as="section">
        <Row>
          <Col md="6">
            <h1 className="mb-4">
              {isEnglish
                ? "What you will learn in this Course?"
                : "ماذا ستتعلم في هذه الدورة؟"}
            </h1>
            <ul className="list-unstyled">
              {visible.map((item, i) => (
                <li key={i} className="my-2 d-flex">
                  <div className="mx-2 mt-1">&#9632;</div>
                  <div className="fs-5">{item}</div>
                </li>
              ))}
            </ul>
            <button
              onClick={changeButtonState}
              className="btn btn-dark fw-semibold m-3">
              {isOpend
                ? isEnglish
                  ? "See less"
                  : "عرض القليل"
                : isEnglish
                ? "See more"
                : "عرض المذيد"}
            </button>
          </Col>
          <Col md="6">
            <img width="100%" src={src} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhatYouWillLearn;
