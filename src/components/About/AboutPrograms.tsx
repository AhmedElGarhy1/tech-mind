import React from "react";
import { StringLang } from "../../types/common";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { currentLanguage } from "../../lib/utils";

interface ParamsType {
  list: StringLang[];
}
const AboutPrograms = ({ list }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);
  return (
    <div
      data-aos="flip-right"
      className={`float-none m-auto float-lg-${
        isEnglish ? "end" : "start"
      }  pt-4 px-3 about-programs`}
      style={{
        backgroundColor: "#0A657E",
        borderRadius: "12px",
      }}>
      <h2 className="text-white">Education Program</h2>
      <ul className="list-unstyled d-flex flex-column">
        {list.map((item, i) => (
          <li
            className={`rounded-pill bg-white py-1 px-5 px-md-3 fs-5 ${
              i % 2 === 1 ? " align-self-end " : ""
            }`}
            style={{ width: "fit-content", color: "#424242", margin: "17px 0" }}
            key={i}>
            {item[currentLanguage(isEnglish)]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPrograms;
