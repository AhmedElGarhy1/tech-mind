import React from "react";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row } from "react-bootstrap";
import { StringLang } from "../../types/common";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { currentLanguage } from "../../lib/utils";

import leftImg from "../../assets/homeImages/left.png";
import centerImg from "../../assets/homeImages/center.png";
import rightImg from "../../assets/homeImages/right.png";

interface ParamsType {
  list: StringLang[];
}

const GrowYourSkills = ({ list }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <Container>
      <Row>
        <div className="home-img col-12 col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <div data-en={isEnglish}>
            <img className="right" src={rightImg} />
            <img className="left" src={leftImg} />
            <img className="center" src={centerImg} />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <h3
            className="text-black-50"
            data-aos="fade-down"
            style={{
              fontWeight: "500 !important",
            }}>
            {isEnglish ? "GET TO KNOW US" : "تعرف علينا"}
          </h3>
          <h2 data-aos="fade-up" data-aos-delay="400">
            {isEnglish
              ? "Grow your skills, learn with us from anywhere"
              : "طور مهاراتك وتعلم معنا من أي مكان"}
          </h2>
          <GrowYourSkillsList list={list} />
        </div>
      </Row>
    </Container>
  );
};

const GrowYourSkillsList = ({ list }: { list: StringLang[] }) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <ul
      style={{ columnGap: "50px" }}
      className="list-unstyled d-flex flex-wrap p-0">
      {list &&
        list.map((item, i) => (
          <li
            data-aos={`fade-${isEnglish ? "right" : "left"}`}
            className="d-flex align-items-center gap-2 my-2 my-lg-3 w-100 w-xl-50"
            key={i}>
            <div className="rounded-circle bg-yellow text-white ">
              <FontAwesomeIcon className="fs-3" icon={faCheck} />
            </div>
            <h4>{item[currentLanguage(isEnglish)]}</h4>
          </li>
        ))}
    </ul>
  );
};

export default GrowYourSkills;
