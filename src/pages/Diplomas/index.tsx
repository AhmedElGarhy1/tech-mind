import React, { useLayoutEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

import Hero from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";
import DiplomaCard, {
  DiplomaCardType,
} from "../../components/Diplomas/DiplomaCard";
import { getAllDiplomas } from "../../api/get-api";
import LoadingButton from "../../components/teach/LoadingButton";

const Diplomas = () => {
  const basicDiplomas = useLoaderData() as DiplomaCardType[];

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [diplomas, setDiplomas] = useState<DiplomaCardType[]>([]);
  useLayoutEffect(() => {
    if (page === 1) {
      if (basicDiplomas.length < 20) setHaveLoad(false);
      return setDiplomas(basicDiplomas || []);
    }

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const tempDiplomas = await getAllDiplomas(pageNum);
        setLoading(false);
        if (!(tempDiplomas && tempDiplomas.length > 0))
          return setHaveLoad(false);
        if (tempDiplomas.length < 20) setHaveLoad(false);

        setDiplomas((p) => [...p, ...tempDiplomas]);
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);
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
          {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
        </Container>
      </div>
    </div>
  );
};

export default Diplomas;
