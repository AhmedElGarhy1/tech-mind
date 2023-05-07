import React, { FC, useState } from "react";
import type { MessageType } from "../../../types/message";
import { Card, Dropdown } from "react-bootstrap";
import { getTwoCharsFromName } from "../../../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Params {
  message: MessageType;
  handleDelete: () => void;
}

const MessageCard: FC<Params> = ({ message, handleDelete }) => {
  console.log(message);
  return (
    <Card
      style={{
        width: 300,
      }}
      className="input-border">
      <Card.Header className="bg-white d-flex gap-3 align-items-center justify-content-between fs-5 position-relative">
        <div className="d-flex gap-3 align-items-center fs-5">
          <div
            style={{
              width: 46,
              height: 46,
            }}
            className="d-flex align-items-center justify-content-center rounded-pill bg-border-color fs-6 flex-shrink-0 fw-semibold">
            {getTwoCharsFromName(message.name)}
          </div>
          <Link to={message._id} className="text-black" title={message.name}>
            {message.name.length > 10
              ? message.name.slice(0, 10).toUpperCase() + "..."
              : message.name}
          </Link>
        </div>

        <Dropdown>
          <Dropdown.Toggle className="drop-toggle border-0 bg-transparent text-black px-0">
            <FontAwesomeIcon icon={faEllipsis} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={message._id}>
              Show
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>
        <ul className="list-unstyled mb-0">
          <li className="mb-2 d-flex align-items-center fw-semibold ">
            <FontAwesomeIcon className="fs-4 me-2 " icon={faEnvelope} />
            <span className="text-black-50">{message.email}</span>
          </li>
          <li className=" d-flex align-items-center fw-semibold ">
            <FontAwesomeIcon className="fs-4 me-2 " icon={faPhone} />
            <span className="text-black-50">{message.phone}</span>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default MessageCard;
