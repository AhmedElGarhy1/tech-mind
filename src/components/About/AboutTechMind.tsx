import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useLangContext from "../../hooks/useLangContext";
import { StringLang } from "../../types/common";
import { currentLanguage } from "../../utils";

interface ParamsType {
  name: StringLang;
  list: StringLang[];
}

const AboutTechMind = ({ name, list }: ParamsType) => {
  const { isEnglish } = useLangContext();
  console.log(name, list);
  return (
    <div style={{ maxWidth: "800px" }}>
      <h1
        data-aos="zoom-out"
        style={{
          color: "#005F79",
          marginBottom: "20px",
        }}>
        {isEnglish ? (
          <>
            Tech Mind{" "}
            <span className="text-black">
              {name[currentLanguage(isEnglish)]}
            </span>
          </>
        ) : (
          <>
            <span className="text-black">
              {name[currentLanguage(isEnglish)]}
            </span>{" "}
            Tech Mind
          </>
        )}
      </h1>
      <ul className="list-unstyled">
        {list.map((ele, i) => (
          <li
            data-aos={`fade-${i % 2 === 0 ? "right" : "left"}`}
            data-aos-delay="200"
            className="fs-4 d-flex gap-2"
            style={{ marginTop: "20px" }}
            key={i}>
            <div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div>{ele[currentLanguage(isEnglish)]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutTechMind;
