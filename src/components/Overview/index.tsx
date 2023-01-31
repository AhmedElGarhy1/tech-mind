import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatascienceDeplomaImage from "../../assets/AiDataScienceDeploma.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { DeplomasType } from "../../data/deplomas";
import useLangContext from "../../hooks/useLangContext";
import OverviewList from "./OverviewList";
import { convertToPrice } from "../../utils";
import { Link } from "react-router-dom";

interface ParamsType {
  deploma: DeplomasType;
}

const DeplomaOverview = ({ deploma }: ParamsType) => {
  const { currentLanguage, isEnglish } = useLangContext();
  return (
    <Container>
      <div className="py-4">
        {isEnglish ? (
          <>
            Home
            <FontAwesomeIcon className="px-2" icon={faChevronRight} />
            Deploma
            <FontAwesomeIcon className="px-2" icon={faChevronRight} />
            Data Science and AI
          </>
        ) : (
          <>
            الصفحة الرائيسية
            <FontAwesomeIcon className="px-2" icon={faChevronLeft} />
            شهادة دبلوم
            <FontAwesomeIcon className="px-2" icon={faChevronLeft} />
            علوم البيانات و الذكاء الاصتناعى
          </>
        )}
      </div>
      <Row className="gx-4 mb-5">
        <Col md="4">
          <OverviewList
            duration={deploma.duration}
            workshops={deploma.workshops}
            lectures={deploma.lectures}
            realProjects={deploma.real_projects}
          />
          <div
            className="text-center pt-5 pb-4"
            style={{
              backgroundColor: "#F0F0F0",
              borderLeft: "4px solid var(--secondary-color)",
            }}>
            <h4>{isEnglish ? "Course Price" : "سعر الكورس"}</h4>
            <span className="fw-semibold" style={{ color: "#7D7D7D" }}>
              {convertToPrice(deploma.price, isEnglish)}
            </span>
            <Link
              to={deploma.href}
              className="main-btn text-uppercase mx-auto mt-4">
              {isEnglish ? "Buy This Course" : "اشترى هذا الكورس"}
            </Link>
          </div>
        </Col>
        <Col md="8">
          <div>
            <img
              className="w-100 rounded"
              style={{ objectFit: "cover", maxHeight: "350px" }}
              src={DatascienceDeplomaImage}
              alt="dataScience"
            />
          </div>
          <h3 className="mt-4">
            {isEnglish ? "Course Overview" : "نظرة عامة على الدورة"}
          </h3>
          <ul className="list-unstyled p-0">
            {deploma.overview[currentLanguage].map((text, i) => (
              <li className="py-2" key={i}>
                {text}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default DeplomaOverview;
