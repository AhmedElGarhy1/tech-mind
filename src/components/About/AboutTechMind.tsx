import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { StringLang } from "../../types/common";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { useAppSelector } from "../../store/hooks";
import { currentLanguage } from "../../lib/utils";

interface ParamsType {
  name: StringLang;
  list: StringLang[];
}

const AboutTechMind = ({ name, list }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

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
            </span>
            Tech Mind
          </>
        )}
      </h1>
      <ul className="list-unstyled p-0">
        {list.map((ele, i) => (
          <li
            data-aos={`fade-${i % 2 === 0 ? "right" : "left"}`}
            data-aos-delay="200"
            className="fs-4 d-flex gap-2"
            style={{ marginTop: "20px" }}
            key={i}>
            <div>
              <FontAwesomeIcon
                icon={isEnglish ? faChevronRight : faChevronLeft}
              />
            </div>
            <div>{ele[currentLanguage(isEnglish)]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutTechMind;
