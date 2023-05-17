import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { getTwoCharsFromName } from "../../../lib/utils";
import { ReservationType } from "../../../types/reservation";
interface Props {
  handleDelete: (id: string) => void;
  list: ReservationType[];
}

const AllReservationRows: FC<Props> = ({ list, handleDelete }) => {
  return (
    <>
      {list.map((ele) => (
        <div
          className="bg-white input-border py-2 rounded-3 mb-3 m-0 gy-3 position-relative"
          key={ele._id}>
          <Row
            style={{
              width: "calc(100% - 40px)",
            }}
            className="text-md-start text-center d-flex align-items-center justify-content-between gy-md-0 ps-2">
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
          <span
            style={{
              right: 20,
              top: 18,
            }}
            className="position-absolute"
            onClick={() => handleDelete(ele._id)}>
            <FontAwesomeIcon role="button" icon={faTrash} />
          </span>
        </div>
      ))}
    </>
  );
};

export default AllReservationRows;
