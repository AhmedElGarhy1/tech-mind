import React from "react";
import useLangContext from "../../hooks/useLangContext";

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
        <li className="py-3 col-6 col-md-12">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              width="13"
              icon={faClock}
            />
          </div>
          {isEnglish ? "Durations" : "المدة"} : <span>{params.duration}</span>
        </li>
        <li className="py-3 col-6 col-md-12">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              width="13"
              icon={faFolder}
            />
          </div>
          {isEnglish ? "Lectures" : "محاضرات"} : <span>{params.lectures}</span>
        </li>
        <li className="py-3 col-6 col-md-12">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              width="13"
              icon={faUsers}
            />
          </div>
          {isEnglish ? "workshops" : "ورشة عمل"} :{" "}
          <span>{params.workshops}</span>
        </li>
        <li className="py-3 col-6 col-md-12">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              width="13"
              icon={faSheetPlastic}
            />
          </div>
          {isEnglish ? "Real Projects" : "مشاريع حقيقية"} :
          <span>{params.realProjects}</span>
        </li>
      </Row>
    </ul>
  );
};

export default OverviewList;
