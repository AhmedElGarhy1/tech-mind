import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { StringLang, StringLangs } from "../../types/common";
import { currentLanguage } from "../../utils";

interface ParamsType {
  list: {
    q: StringLang;
    a: StringLangs;
  }[];
}

const FAQ = ({ list }: ParamsType) => {
  const { isEnglish } = useLangContext();

  return (
    <Container>
      <Row>
        <Col md="4">
          <h3 className="mb-4">
            {isEnglish ? "Frequently Asked Questions" : "أسئلة مكررة"}
          </h3>
        </Col>
        <Col md="8">
          {list.map((item, i) => (
            <ToggleItem item={item} key={i} isEnglish={isEnglish} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

interface ParamsTypeItem {
  item: {
    q: StringLang;
    a: StringLangs;
  };
  isEnglish: boolean;
}

const ToggleItem = ({ item, isEnglish }: ParamsTypeItem) => {
  const [isOpend, setIsOpend] = useState(false);

  const handleToggle = () => {
    setIsOpend(!isOpend);
  };

  return (
    <div
      style={{
        transition: "var(--main-transition)",
      }}
      className="border-secondary-color border border-2 rounded-4 px-4 pt-3 pb-2 mb-3">
      <div
        role="button"
        onClick={handleToggle}
        className="d-flex justify-content-between">
        <h5>{item.q[currentLanguage(isEnglish)]}</h5>
        <FontAwesomeIcon icon={isOpend ? faChevronUp : faChevronDown} />
      </div>
      {isOpend && (
        <div className="faq-a my-3">
          {item.a[currentLanguage(isEnglish)].map((ele, i) => (
            <p key={i} className="mb-3">
              - {ele}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
