import React, { useEffect, useState } from "react";
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
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const data = useLoaderData() as DataType;
  const course = data.course;
  const deploma = data.deploma;

  useEffect(() => {
    dispatch(removeLoading());
  }, []);

  return (
    <>
      {course && (
        <>
          <Hero
            name={course.name}
            description={course.description}
            tech_id={course._id}
          />
          <BreadCrumb name={course.name} deplomaName={deploma?.name} />
          <Overview course={course} />
          {course.have_objectives && (
            <DeplomaCourses list={course.objectives} isDeploma={false} />
          )}
          <RelatedCourses id={id} is_dependent={!deploma} />
          <WhatYouWillLearn
            list={course.what_you_will_learn}
            src={course.other_src}
          />
          {course.have_target && (
            <WhoThisCourseFor list={course.who_is_this_course_for} />
          )}
          {course.is_dependent && !deploma?._id && <WhyTechMind />}
          <Stats
            duration={course.duration}
            lectures={course.lectures}
            name={course.name}
            real_projects={course.real_projects}
            workshops={course.workshops}
          />
          <FAQ list={course.fqa} />
        </>
      )}
    </>
  );
};

export default SingleCourse;
