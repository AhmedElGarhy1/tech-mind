import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import AllMessages from "../../../components/Admin/Messages/AllMessages";
import { MessageType } from "../../../types/message";
import { deleteMessage } from "../../../api/get-api";
import { PostResponse } from "../../../types/response";
import Swal from "sweetalert2";

const Messages = () => {
  const data = (useLoaderData() as any).data as MessageType[];
  const [messages, setMessages] = useState<MessageType[]>(data || []);

  const handleDelete = (id: string) => async () => {
    deleteMessage(id).then((response) => {
      const temp = response as PostResponse;
      if (!temp.ok) return Swal.fire("Sorry", temp.msg, "error");
      Swal.fire("Deleted", temp.msg, "success");
      setMessages((p) => [...p].filter((ele) => ele._id !== id));
    });
  };

  return (
    <div>
      <h1 className="mt-5 mb-4">Messages</h1>
      {/* <AllMessages handleDelete={handleDelete} list={messages} /> */}
    </div>
  );
};

export default Messages;
