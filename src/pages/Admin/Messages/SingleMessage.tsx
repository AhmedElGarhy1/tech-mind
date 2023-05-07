import React from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getTwoCharsFromName } from "../../../lib/utils";
import type { MessageType } from "../../../types/message";
import {
  faEnvelope,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteMessage } from "../../../api/get-api";
import type { PostResponse } from "../../../types/response";
import Swal from "sweetalert2";

const SingleMessage = () => {
  const message = useLoaderData() as MessageType;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    deleteMessage(message._id).then((response) => {
      const temp = response as PostResponse;
      if (!temp.ok) return Swal.fire("Sorry", temp.msg, "error");
      Swal.fire("Deleted", temp.msg, "success");
      navigate("/admin/messages");
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
        <h1>Message</h1>
        <FontAwesomeIcon
          className="fs-3"
          icon={faTrash}
          onClick={handleDelete}
          role="button"
        />
      </div>
      <Row className="bg-white input-border py-2 d-flex align-items-center justify-content-between rounded-3 mb-3 w-100 m-0">
        <Col md={7} className="d-flex gap-3 align-items-center fs-5">
          <div
            style={{
              width: 46,
              height: 46,
            }}
            className="d-flex align-items-center justify-content-center rounded-pill bg-border-color fs-6 flex-shrink-0 fw-semibold">
            {getTwoCharsFromName(message.name)}
          </div>
          <span title={message.name}>{message.name}</span>
        </Col>
        <Col
          md={5}
          className="d-flex gap-4 justify-content-center justify-content-md-end rounded-3">
          <div className="mb-2 d-flex align-items-center fw-semibold ">
            <FontAwesomeIcon className="fs-4 me-2 " icon={faEnvelope} />
            <span className="text-black-50">{message.email}</span>
          </div>
          <div className="d-flex align-items-center fw-semibold ">
            <FontAwesomeIcon className="fs-4 me-2 " icon={faPhone} />
            <span className="text-black-50">{message.phone}</span>
          </div>
        </Col>
      </Row>
      <div className="fs-6 d-flex fw-semibold mb-3">
        <div
          style={{
            height: "fit-content",
            width: 130,
          }}
          className="px-2 bg-white input-border py-2 d-flex align-items-center justify-content-between rounded-3 me-3 fs-5 fw-normal">
          Subject
        </div>
        <div className="bg-white flex-grow-1 input-border py-2 d-flex align-items-center justify-content-between rounded-3 px-2 text-black-50">
          {message.subject}
        </div>
      </div>
      <div className="fs-6 d-flex fw-semibold mb-3">
        <div
          style={{
            height: "fit-content",
            width: 130,
          }}
          className="px-2 bg-white input-border py-2 d-flex align-items-center justify-content-between rounded-3 me-3 fs-5 fw-normal">
          Message
        </div>
        <div className="bg-white flex-grow-1 input-border py-2 d-flex align-items-center justify-content-between rounded-3 px-2 text-black-50">
          {message.message}
          {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Reprehenderit autem officiis est amet ex, consequatur praesentium
          ipsam cum eum aspernatur quaerat fuga. Consectetur debitis ipsam dicta
          recusandae vero aspernatur laborum, quam quibusdam earum libero
          possimus provident quae voluptatum optio architecto qui quia
          blanditiis ipsa asperiores ullam maxime aut! Dolorem, id. */}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
