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
          <div className="fs-5 ">
            <span className="text-black-50">
              {isEnglish ? "Durations" : "المدة"} :
            </span>
            <span className="fw-normal">
              {params.duration} {isEnglish ? "H" : "س"}
            </span>
          </div>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon className="px-2 text-white" icon={faFolder} />
          </div>
          <div className="fs-5">
            <span className="text-black-50">
              {isEnglish ? "Lectures" : "محاضرات"} :{" "}
            </span>
            <span className="fw-normal">{params.lectures}</span>
          </div>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon className="px-2 text-white" icon={faUsers} />
          </div>
          <div className="fs-5">
            <span className="text-black-50">
              {isEnglish ? "workshops" : "ورشة عمل"} :{" "}
            </span>
            <span className="fw-normal">{params.workshops}</span>
          </div>
        </li>
        <li className="py-3 col-6 col-md-12 d-flex align-items-center">
          <div className="rounded-circle mx-2 bg-yellow">
            <FontAwesomeIcon
              className="px-2 text-white"
              icon={faSheetPlastic}
            />
          </div>
          <div className="fs-5">
            <span className="text-black-50">
              {isEnglish ? "Projects" : "مشاريع"} :{" "}
            </span>
            <span className="fw-normal">{params.realProjects}</span>
          </div>
        </li>
      </Row>
    </ul>
  );
};

export default OverviewList;
