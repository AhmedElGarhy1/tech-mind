import React, { useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import AllMessages from "../../../components/Admin/Messages/AllMessages";
import { MessageType } from "../../../types/message";
import { deleteMessage, getAllMessages } from "../../../api/get-api";
import type { PostResponse } from "../../../types/response";
import Swal from "sweetalert2";

import messageImage from "../../../assets/Online world-cuate.png";
import LoadingButton from "../../../components/teach/LoadingButton";

const Messages = () => {
  const data = (useLoaderData() as any).data as MessageType[];
  const [messages, setMessages] = useState<MessageType[]>(data || []);

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (id: string) => async () => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    deleteMessage(id).then((response) => {
      const temp = response as PostResponse;
      if (!temp.ok) return Swal.fire("Sorry", temp.msg, "error");
      Swal.fire("Deleted", temp.msg, "success");
      setMessages((p) => [...p].filter((ele) => ele._id !== id));
    });
  };

  useLayoutEffect(() => {
    if (page === 1) {
      if (data.length < 20) setHaveLoad(false);
      return setMessages(data || []);
    }

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const temp = await getAllMessages(pageNum);
        setLoading(false);
        const tempMessages = temp.data;
        if (!(tempMessages && tempMessages.length > 0))
          return setHaveLoad(false);

        if (tempMessages.length < 20) setHaveLoad(false);
        setMessages((p) => [...p, ...tempMessages]);
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);

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
      {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
    </div>
  );
};

export default Messages;
