import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Hero from "../../components/Hero";

import {
  DeplomaCourses,
  FAQ,
  Overview,
  RelatedCourses,
  Stats,
  WhatYouWillLearn,
  WhoThisCourseFor,
  WhyTechMind,
} from "../../components/teach";
import BreadCrumb from "../../components/BreadCrumb";

import { CourseType } from "../../types/course";
import { useAppDispatch } from "../../store/hooks";
import { removeLoading } from "../../store/slices/LoadingSlice";
import ReservationPopup from "../../components/Popup/ReservationPopup";
import StudentsFeedback from "../../components/teach/StudentsFeedback";

interface DataType {
  course: CourseType;
  deploma: {
    name: {
      EN: string;
      AR: string;
    };
    _id: string;
  };
}

const SingleCourse = () => {
  const { id } = useParams();

  const data = useLoaderData() as DataType;
  const dispatch = useAppDispatch();
  const layoutRef = useRef<HTMLDivElement>();
  const [show, setShow] = useState<boolean>(false);

  const course = data.course;
  const diploma = data.deploma;

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
    <>
      {course && (
        <>
          <Hero
            name={course.name}
            description={course.description}
            handleShow={handleShow}
          />
          <BreadCrumb name={course.name} deplomaName={diploma?.name} />

          <ReservationPopup
            tech_id={diploma ? diploma._id : course._id}
            layoutRef={layoutRef}
            handleClose={handleClose}
            show={show}
            tech_name={diploma ? diploma.name : course.name}
            isDiploma={!!diploma}
          />
          <Overview course={course} />
          {course.have_objectives && (
            <DeplomaCourses list={course.objectives} isDeploma={false} />
          )}
          <RelatedCourses id={id} is_dependent={!diploma} />
          <WhatYouWillLearn
            list={course.what_you_will_learn}
            src={course.other_src}
          />
          {course.have_target && (
            <WhoThisCourseFor list={course.who_is_this_course_for} />
          )}
          {course.is_dependent && !diploma?._id && <WhyTechMind />}
          <Stats
            duration={course.duration}
            lectures={course.lectures}
            name={course.name}
            real_projects={course.real_projects}
            workshops={course.workshops}
            handleShow={handleShow}
          />
          <FAQ list={course.fqa} />

          {!diploma && <StudentsFeedback />}
        </>
      )}
    </>
  );
};

export default SingleCourse;
