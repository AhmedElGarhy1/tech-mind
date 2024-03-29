import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import whyTechMind from "../../data/whyTechMind";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { currentLanguage } from "../../lib/utils";

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
  const isEnglish = useAppSelector(selectIsEnglish);

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
      <Container as="section">
        <h1 className="mb-4">
          {isEnglish
            ? "Why learn through Tech Mind Academy?"
            : "لماذا تتعلم من خلال Tech Mind Academy؟"}
        </h1>
        <Row>
          <Col md="6">
            <ColumnComponent
              animation={isEnglish ? "fade-right" : "fade-left"}
              list={leftColumnData}
              startCount={1}
            />
          </Col>
          <Col md="6">
            <ColumnComponent
              animation={isEnglish ? "fade-left" : "fade-right"}
              list={rightColumnData}
              startCount={7}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

interface ColumnParams {
  list: Coulmn[];
  startCount: number;
  animation: string;
}

const ColumnComponent = ({ list, startCount, animation }: ColumnParams) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <ul className="why-tech-mind-ul">
      {list.map((ele, i) => (
        <li key={i} title={`${isEnglish}`} className="my-4">
          <span className="why-tech-mind-li-ball">{i + startCount}</span>
          <div data-aos={animation} data-aos-delay={i * 120}>
            <h5>{ele.head[currentLanguage(isEnglish)]}</h5>
            <p style={{ color: "#7D7D7D" }}>
              {ele.body[currentLanguage(isEnglish)]}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WhyLearnFromUs;
