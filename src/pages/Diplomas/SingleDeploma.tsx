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
  const deploma = data as DeplomaType;
  // const navigate = useNavigate();

  return (
    <div>
      {deploma && (
        <>
          <Hero
            name={deploma.name}
            description={deploma.description}
            tech_id={deploma._id}
          />
          <BreadCrumb name={deploma.name} />

          <Overview course={deploma} />
          <DeplomaCourses
            isDeploma={true}
            deplomaID={deploma._id}
            list={deploma.courses}
          />
          <WhatYouWillLearn
            isDeploma={true}
            src={deploma.other_src}
            list={deploma.what_you_will_learn}
          />
          <WhoThisCourseFor list={deploma.who_is_this_course_for} />
          <WhyTechMind />
          <Stats
            duration={deploma.duration}
            real_projects={deploma.real_projects}
            lectures={deploma.lectures}
            name={deploma.name}
            workshops={deploma.workshops}
          />
          <FAQ list={deploma.fqa} />
        </>
      )}
    </div>
  );
};

export default SingleDeploma;
