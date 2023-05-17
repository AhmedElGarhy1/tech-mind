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
import { useEffect } from "react";
import { removeLoading } from "../../store/slices/LoadingSlice";
import { useAppDispatch } from "../../store/hooks";

const SingleDeploma = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(removeLoading());
  }, []);

  const data = useLoaderData();
  const diploma = data as DeplomaType;
  // const navigate = useNavigate();

  return (
    <div>
      {diploma && (
        <>
          <Hero
            name={diploma.name}
            description={diploma.description}
            tech_id={diploma._id}
            tech_name={diploma.name}
            isDiploma={true}
          />
          <BreadCrumb name={diploma.name} />

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
          />
          <FAQ list={diploma.fqa} />
        </>
      )}
    </div>
  );
};

export default SingleDeploma;
