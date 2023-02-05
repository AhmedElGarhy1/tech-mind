import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import Loading from "../../components/Loading";
import CourseObjectives from "../../components/teach/Course/CourseObjectives";
import RelatedCourses from "../../components/teach/Course/RelatedCourses";
import FAQ from "../../components/teach/FAQ";
import Overview from "../../components/teach/Overview/index";
import Stats from "../../components/teach/Stats";
import WhatYouWillLearn from "../../components/teach/WhatYouWillLearn";
import WhoThisCourseFor from "../../components/teach/WhoThisCourseFor";
import WhyLearnFromUs from "../../components/teach/WhyTechMind";
import useGet from "../../hooks/useGet";
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
  const { id } = useParams();
  const data = useLoaderData() as DataType;
  const course = data.course;
  const deploma = data.deploma;

  return (
    <>
      {course && (
        <>
          <Hero name={course.name} description={course.description} />
          <Overview deplomaName={deploma?.name} course={course} />
          {course.have_objectives && <CourseObjectives />}
          <RelatedCourses id={id} />
          <WhatYouWillLearn
            isDeploma={false}
            list={course.what_you_will_learn}
            src={course.other_src}
          />
          {course.have_target && (
            <WhoThisCourseFor list={course.who_is_this_course_for} />
          )}
          {course.is_dependent && !deploma?._id && <WhyLearnFromUs />}
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
