import React from "react";
import AllReservationRows from "../../components/Admin/Reservations/AllReservationRows";
import { useLoaderData } from "react-router-dom";
import type { ReservationType } from "../../types/reservation";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { getTwoCharsFromName } from "../../lib/utils";

const Reservations = () => {
  const registrations = (useLoaderData() as any).data as ReservationType[];

  return (
    <div>
      <h1 className=" mt-5 mb-5">Registration</h1>
      {registrations.map((ele) => (
        <Row
          key={ele._id}
          className="text-md-start text-center bg-white input-border py-2 d-flex align-items-center justify-content-between rounded-3 mb-3 w-100 m-0 gy-3 gy-md-0">
          <Col
            md={3}
            className="d-flex align-items-center justify-content-md-start justify-content-center gap-3 fs-5">
            <div
              style={{
                width: 46,
                height: 46,
              }}
              className="d-flex align-items-center justify-content-center rounded-pill bg-border-color fs-6 flex-shrink-0 fw-semibold">
              {getTwoCharsFromName(ele.name)}
            </div>
            <span title={ele.name}>{ele.name}</span>
          </Col>
          <Col md={3}>
            <div className="d-flex align-items-center justify-content-md-start justify-content-center fw-semibold ">
              <FontAwesomeIcon className="fs-4 me-2 " icon={faEnvelope} />
              <span className="text-black-50">{ele.email}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex align-items-center justify-content-md-start justify-content-center fw-semibold ">
              <FontAwesomeIcon className="fs-4 me-2 " icon={faPhone} />
              <span className="text-black-50">{ele.phone}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex align-items-center justify-content-md-start justify-content-center fw-semibold ">
              <span className="text-black-50">
                {ele.fromCourse ? (
                  <>
                    {ele.fromCourse?.name.EN}{" "}
                    <span className="fs-bold text-black"> -- Course</span>
                  </>
                ) : ele.fromDiploma ? (
                  <>
                    {ele.fromDiploma?.name.EN}{" "}
                    <span className="fs-bold text-black"> -- Diploma</span>
                  </>
                ) : (
                  <span className="fs-bold text-black">ERROR</span>
                )}
              </span>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Reservations;
