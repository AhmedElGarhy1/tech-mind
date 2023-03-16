import React from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

import Hero from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";
import DiplomaCard, {
  DiplomaCardType,
} from "../../components/Diplomas/DiplomaCard";

const Diplomas = () => {
  const diplomas = useLoaderData() as DiplomaCardType[];
  console.log(diplomas);
  return (
    <div>
      <Hero
        name={{
          EN: "The Future belongs to you",
          AR: "The Future belongs to you",
        }}
        description={{
          EN: "A Lot of Diplomas with a high quality lessons and expert instructors",
          AR: "الكثير من الدبلومات مع دروس عالية الجودة ومدربين خبراء",
        }}
        noBtn={true}
      />
      <BreadCrumb />
      <div
        style={{
          backgroundColor: "var(--section-color)",
          marginBottom: "80px",
        }}
        className="pb-5">
        <Container>
          <h1 className="pt-5 pb-3 fw-bold">Our Diplomas</h1>
          <Row
            style={{
              rowGap: "30px",
            }}>
            {diplomas.map((diploma) => (
              <div
                style={{
                  boxSizing: "border-box",
                  borderLeft: "15px solid transparent",
                  borderRight: "15px solid transparent",
                  backgroundClip: "padding-box",
                }}
                key={diploma._id}
                className="bg-white p-0 col-12 col-md-6 col-xl-4 position-relative">
                <DiplomaCard diploma={diploma} />
              </div>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Diplomas;
