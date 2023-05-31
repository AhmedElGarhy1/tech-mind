import React, { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import image from "../../assets/anonymous-user.png";
import useGet from "../../hooks/useGet";
import { BASE_URL } from "../../api/basicRequest";
import { FeedbackType } from "../../types/feedback";
const tempList: FeedbackType[] = [
  {
    _id: 1,
    image: image,
    author: "Mohamed Ashour",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
  {
    _id: 2,
    image: image,
    author: "Mohamed Ashour",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
  {
    _id: 3,
    image: image,
    author: "Mohamed Ashour",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
  {
    _id: 4,
    image: image,
    author: "Mohamed Ashour",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
];

const StudentsFeedback: FC = () => {
  return <></>;
  const isEnglish = useAppSelector(selectIsEnglish);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const { error, loading, makeRequest } = useGet();

  useEffect(() => {
    const makeFetch = async () => {
      const data = await makeRequest("feedbacks");
      const feedbacks = data as unknown as FeedbackType[];
      setFeedbacks(feedbacks);
    };
    makeFetch();
  }, []);

  return (
    <Container className="pb-5">
      <h1 className="pb-4 text-center">
        {isEnglish ? "Feedback from our Students" : "تعليقات طلابنا"}
      </h1>
      <Swiper
        dir="ltr"
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        spaceBetween={25}>
        {loading ? (
          <h4 className="text-center">
            {isEnglish ? "Loading..." : "تحميل...."}
          </h4>
        ) : (
          feedbacks.map((feedback) => (
            <SwiperSlide
              key={feedback._id}
              dir={isEnglish ? "ltr" : "rtl"}
              style={{ height: "auto" }}>
              <div
                style={{
                  paddingTop: "60px",
                  marginTop: "45px",
                }}
                className="bg-dashboard-color text-white text-center px-4 pb-2">
                <img
                  width="90px"
                  height="90px"
                  style={{
                    left: "50%",
                    translate: "-50%",
                  }}
                  onError={(e) => (e.currentTarget.src = image)}
                  className="border border-white border-3 rounded-pill position-absolute top-0"
                  src={feedback.image}
                  alt={feedback.author}
                />
                <h4>{feedback.author}</h4>
                <p>{feedback.feedback}</p>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Container>
  );
};

export default StudentsFeedback;
