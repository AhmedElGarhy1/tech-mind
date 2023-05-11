import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import AllMessages from "../../../components/Admin/Messages/AllMessages";
import { MessageType } from "../../../types/message";
import { deleteMessage } from "../../../api/get-api";
import type { PostResponse } from "../../../types/response";
import Swal from "sweetalert2";

import messageImage from "../../../assets/Online world-cuate.png";

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
      {messages.length > 0 ? (
        <AllMessages handleDelete={handleDelete} list={messages} />
      ) : (
        <div>
          <img
            style={{
              width: "50%",
              marginTop: -37,
            }}
            className="d-block mx-auto"
            src={messageImage}
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
