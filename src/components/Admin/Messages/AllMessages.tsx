import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import type { MessageType } from "../../../types/message";
import MessageCard from "./MessaageCard";
interface Props {
  handleDelete: (id: string) => () => void;
  list: MessageType[];
}

const AllMessages: FC<Props> = ({ list, handleDelete }) => {
  return (
    <div className="d-flex flex-wrap gap-4">
      {list.map((item) => (
        <MessageCard
          key={item._id}
          message={item}
          handleDelete={handleDelete(item._id)}
        />
      ))}
    </div>
  );
};

export default AllMessages;
