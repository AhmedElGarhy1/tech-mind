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

import useLoadingContext from "../../hooks/useLoadingContext";
import { CourseType } from "../../types/course";

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
  const { removeLoading } = useLoadingContext();
  const { id } = useParams();
  const data = useLoaderData() as DataType;
  const course = data.course;
  const deploma = data.deploma;

  useEffect(removeLoading, []);

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
          <RelatedCourses id={id} />
          <WhatYouWillLearn
            isDeploma={false}
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
