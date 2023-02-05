import { Col, Container, Row } from "react-bootstrap";

// import { DeplomasType } from "../../data/deplomas";
import { DeplomaType } from "../../../types/deploma";
import { CourseType } from "../../../types/course";

import useLangContext from "../../../hooks/useLangContext";
import OverviewList from "./OverviewList";
import { currentLanguage } from "../../../utils";
import BreadCrumb from "./BreadCrumb";

interface ParamsType {
  course: DeplomaType | CourseType;
  deplomaName?: {
    EN: string;
    AR: string;
  };
}

const DeplomaOverview = ({ course, deplomaName }: ParamsType) => {
  const { isEnglish } = useLangContext();
  return (
    <Container>
      <BreadCrumb deplomaName={deplomaName} name={course.name} />
      <Row as={"section"} className="gx-4">
        <Col md="4">
          <OverviewList
            duration={course.duration}
            workshops={course.workshops}
            lectures={course.lectures}
            realProjects={course.real_projects}
          />
        </Col>
        <Col md="8">
          <div>
            <img
              className="w-100 rounded"
              style={{ objectFit: "cover", maxHeight: "350px" }}
              src={course.main_img}
            />
          </div>
          <h1 className="mt-4">
            {isEnglish ? "Course Overview" : "نظرة عامة على الدورة"}
          </h1>
          <ul className="list-unstyled p-0">
            {course.overview[currentLanguage(isEnglish)].map((text, i) => (
              <li className="py-2 fs-4 fw-light" key={i}>
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
