import React from "react";
import useLangContext from "../../../hooks/useLangContext";

import {
  faClock,
  faFolder,
  faUsers,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";

interface ParamsType {
  duration: number;
  lectures: number;
  workshops: number;
  realProjects: number;
}

const OverviewList = (params: ParamsType) => {
  const { isEnglish } = useLangContext();

  return (
    <ul className="overview-list list-unstyled p-0">
      <Row>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon className="px-2 text-white" icon={faClock} />
          </div>
          <span style={{ fontWeight: 500 }} className="fs-5">
            {isEnglish ? "Durations" : "المدة"} : {params.duration}{" "}
            {isEnglish ? "Hours" : "ساعة"}
          </span>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon className="px-2 text-white" icon={faFolder} />
          </div>
          <span style={{ fontWeight: 500 }} className="fs-5">
            {isEnglish ? "Lectures" : "محاضرات"} : {params.lectures}
          </span>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon className="px-2 text-white" icon={faUsers} />
          </div>
          <span style={{ fontWeight: 500 }} className="fs-5">
            {isEnglish ? "workshops" : "ورشة عمل"} : {params.workshops}
          </span>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              icon={faSheetPlastic}
            />
          </div>
          <span style={{ fontWeight: 500 }} className="fs-5">
            {isEnglish ? "Real Projects" : "مشاريع حقيقية"} :{" "}
            {params.realProjects}
          </span>
        </li>
      </Row>
    </ul>
  );
};

export default OverviewList;
