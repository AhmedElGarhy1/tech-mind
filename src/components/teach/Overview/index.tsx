import { Col, Container, Row } from "react-bootstrap";

// import { DeplomasType } from "../../data/deplomas";
import { DeplomaType } from "../../../types/deploma";
import { CourseType } from "../../../types/course";

import useLangContext from "../../../hooks/useLangContext";
import OverviewList from "./OverviewList";
import { currentLanguage } from "../../../utils";
import WhereAmI from "./WhereAmI";

interface ParamsType {
  course: DeplomaType | CourseType;
}

const DeplomaOverview = ({ course }: ParamsType) => {
  const { isEnglish } = useLangContext();
  return (
    <Container>
      <WhereAmI name={course.name} />
      <Row className="gx-4 mb-5">
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
          <h3 className="mt-4">
            {isEnglish ? "Course Overview" : "نظرة عامة على الدورة"}
          </h3>
          <ul className="list-unstyled p-0">
            {course.overview[currentLanguage(isEnglish)].map((text, i) => (
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
