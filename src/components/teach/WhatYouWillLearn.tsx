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
      <Container className="my-5">
        <Row>
          <Col md="6">
            <h3 className="mb-4">
              {isEnglish
                ? "What you will learn in this Course?"
                : "ماذا ستتعلم في هذه الدورة؟"}
            </h3>
            <ul style={{ listStyle: "square" }}>
              {visible.map((item, i) => (
                <li key={i} className="my-2">
                  {/* &#9632; */}
                  {item}
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
