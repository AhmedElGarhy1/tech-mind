import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero";
import Overview from "../../components/teach/Overview";
import WhatYouWillLearn from "../../components/teach/WhatYouWillLearn";
import WhoThisCourseFor from "../../components/teach/WhoThisCourseFor";
import WhyTechMind from "../../components/teach/WhyTechMind";
import Stats from "../../components/teach/Stats";
import FAQ from "../../components/teach/FAQ";
import { DeplomaCourses } from "../../components/teach/Deploma";
import { DeplomaType } from "../../types/deploma";
import useLoadingContext from "../../hooks/useLoadingContext";
import { useEffect } from "react";

const SingleDeploma = () => {
  console.log("HEY FROM DEPLOMA");
  const { removeLoading } = useLoadingContext();
  useEffect(removeLoading, []);

  const data = useLoaderData();
  const deploma = data as DeplomaType;
  // const navigate = useNavigate();

  return (
    <div>
      {deploma && (
        <>
          <Hero name={deploma.name} description={deploma.description} />
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
