import React from "react";
import Hero from "../components/Hero";
import homeData from "../data/home";
import BreadCrumb from "../components/BreadCrumb";
import GrowYourSkills from "../components/Home/GrowYourSkills";
import WhyTechMindHome from "../components/Home/WhyTechMindHome";
import DiplomasSlider from "../components/Diplomas/DiplomasSlider";
import CoursesSlider from "../components/Courses/CoursesSlider";
const Home = () => {
  return (
    <div className="home">
      <Hero
        noBtn={true}
        name={homeData.name}
        description={homeData.description}
      />
      <BreadCrumb />

      <GrowYourSkills
        img={homeData.main_img}
        list={homeData.grow_your_skills}
      />

      <WhyTechMindHome list={homeData.why_choose_us} />
      <DiplomasSlider />
      <CoursesSlider />
    </div>
  );
};

export default Home;
