import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";
import workerImage from "../../assets/workers.png";

interface ParamsType {
  list: {
    AR: string[];
    EN: string[];
  };
}

const WhoThisCourseFor = ({ list }: ParamsType) => {
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
          <Col md="8">
            <h3 className="mb-4">
              {isEnglish ? "Who is this course for?" : "لمن هذه الدورة؟"}
            </h3>
            <ul style={{ listStyle: "square" }}>
              {visible.map((item, i) => (
                <li key={i} className="my-2">
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
          <Col className="mobile-disappeare" md="4">
            <img width="100%" src={workerImage} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhoThisCourseFor;
