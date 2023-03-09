import React from "react";
import { Container, Row } from "react-bootstrap";
import AboutPrograms from "../components/About/AboutPrograms";
import AboutTechMind from "../components/About/AboutTechMind";
import Hero from "../components/Hero";
import { WhyTechMind } from "../components/teach";
import aboutData from "../data/about";

const About = () => {
  return (
    <div>
      <Hero
        name={aboutData.name}
        description={aboutData.description}
        noBtn={true}
      />
      <section
        className="py-5"
        style={{
          backgroundColor: "var(--section-color)",
        }}>
        <Container>
          <AboutTechMind
            name={{ EN: "Mission", AR: "مهمة" }}
            list={aboutData.mission}
          />
          <div className="mt-5"></div>
          <AboutTechMind
            name={{ EN: "Vision", AR: "رؤية" }}
            list={aboutData.vision}
          />
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <div className="col-12 col-lg-6">
              <AboutTechMind
                name={{ EN: "Services", AR: "خدمات" }}
                list={aboutData.services}
              />
            </div>
            <div className="col-12 col-lg-6 p-0">
              <AboutPrograms list={aboutData.programs} />
            </div>
          </Row>
        </Container>
      </section>
      <WhyTechMind />
      <section
        className="py-4"
        style={{
          backgroundColor: "var(--section-color)",
        }}>
        <Container>
          <Row className="gx-4">
            <div className="col-12 col-lg-6 my-3">
              <AboutTechMind
                name={{
                  EN: "Hard Skills Training",
                  AR: "التدريب على المهارات الصعبة فى",
                }}
                list={aboutData.hard_skills}
              />
            </div>
            <div className="col-12 col-lg-6 my-3">
              <AboutTechMind
                name={{
                  EN: "Soft Skill Training",
                  AR: "التدريب على المهارات اللينة فى ",
                }}
                list={aboutData.soft_skills}
              />
            </div>
          </Row>
        </Container>
      </section>
      <section></section>
    </div>
  );
};

export default About;
