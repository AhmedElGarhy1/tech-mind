import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";
import whyTechMind from "../../data/whyTechMind";

interface Coulmn {
  head: {
    EN: string;
    AR: string;
  };
  body: {
    EN: string;
    AR: string;
  };
}

const WhyLearnFromUs = () => {
  const { isEnglish } = useLangContext();
  const [leftColumnData, setLeftCoulmnData] = useState<Coulmn[]>([]);
  const [rightColumnData, setRightCoulmnData] = useState<Coulmn[]>([]);

  useEffect(() => {
    controleResizing();
    window.addEventListener("resize", controleResizing);
  }, []);

  const controleResizing = () => {
    if (window.innerWidth < 767) {
      setLeftCoulmnData(whyTechMind);
      setRightCoulmnData([]);
    } else {
      const half = Math.ceil(whyTechMind.length / 2);
      const temp1 = whyTechMind.slice(0, half);
      const temp2 = whyTechMind.slice(half);
      setLeftCoulmnData(temp1);
      setRightCoulmnData(temp2);
    }
  };

  return (
    <>
      <Container className="mt-5 mb-3">
        <h3 className="mb-4">
          {isEnglish
            ? "Why learn through Tech Mind Academy?"
            : "لماذا تتعلم من خلال Tech Mind Academy؟"}
        </h3>
        <Row>
          <Col md="6">
            <ColumnComponent list={leftColumnData} startCount={1} />
          </Col>
          <Col md="6">
            <ColumnComponent list={rightColumnData} startCount={7} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

interface ColumnParams {
  list: Coulmn[];
  startCount: number;
}

const ColumnComponent = ({ list, startCount }: ColumnParams) => {
  const { isEnglish } = useLangContext();

  return (
    <ul className="why-tech-mind-ul">
      {list.map((ele, i) => (
        <li key={i} title={`${isEnglish}`} className="my-4">
          <span className="why-tech-mind-li-ball">{i + startCount}</span>
          <h5>{ele.head[currentLanguage(isEnglish)]}</h5>
          <p style={{ color: "#7D7D7D" }}>
            {ele.body[currentLanguage(isEnglish)]}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default WhyLearnFromUs;
