import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero";

import {
  DeplomaCourses,
  FAQ,
  Overview,
  Stats,
  WhatYouWillLearn,
  WhoThisCourseFor,
  WhyTechMind,
} from "../../components/teach";
import BreadCrumb from "../../components/BreadCrumb";
import { DeplomaType } from "../../types/deploma";
import { useEffect, useRef, useState } from "react";
import { removeLoading } from "../../store/slices/LoadingSlice";
import { useAppDispatch } from "../../store/hooks";
import ReservationPopup from "../../components/Popup/ReservationPopup";
import StudentsFeedback from "../../components/teach/StudentsFeedback";

const SingleDeploma = () => {
  const layoutRef = useRef<HTMLDivElement>();
  const data = useLoaderData();
  const diploma = data as DeplomaType;
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(removeLoading());
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      if (layoutRef.current) layoutRef.current.style.display = "none";
    }, 200);
  };
  const handleShow = () => {
    if (layoutRef.current) layoutRef.current.style.display = "block";
    setTimeout(() => {
      setShow(true);
    }, 1);
  };

  return (
    <div>
      {diploma && (
        <>
          <Hero
            name={diploma.name}
            description={diploma.description}
            handleShow={handleShow}
          />
          <BreadCrumb name={diploma.name} />

          <ReservationPopup
            tech_id={diploma._id}
            layoutRef={layoutRef}
            handleClose={handleClose}
            show={show}
            tech_name={diploma.name}
            isDiploma={true}
          />

          <Overview course={diploma} />
          <DeplomaCourses
            isDeploma={true}
            deplomaID={diploma._id}
            list={diploma.courses}
          />
          <WhatYouWillLearn
            src={diploma.other_src}
            have_video={diploma.have_video}
            list={diploma.what_you_will_learn}
          />
          <WhoThisCourseFor list={diploma.who_is_this_course_for} />
          <WhyTechMind />
          <Stats
            duration={diploma.duration}
            real_projects={diploma.real_projects}
            lectures={diploma.lectures}
            name={diploma.name}
            workshops={diploma.workshops}
            handleShow={handleShow}
          />
          <FAQ list={diploma.fqa} />

          <StudentsFeedback />
        </>
      )}
    </div>
  );
};

export default SingleDeploma;
