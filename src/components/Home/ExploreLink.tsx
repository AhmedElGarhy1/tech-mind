import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import useLangContext from "../../hooks/useLangContext";

interface ParamsType {
  path: string;
  arText: string;
  enText: string;
}

const ExploreLink = ({ path, arText, enText }: ParamsType) => {
  const { isEnglish } = useLangContext();
  return (
    <Link className="text-black fs-4 text-end d-block mt-4" to={path}>
      {isEnglish ? (
        <>
          {enText}
          <FontAwesomeIcon icon={faArrowRightLong} className="mx-3 bounce" />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faArrowRightLong} className="mx-3 bounce" />
          {arText}
        </>
      )}
    </Link>
  );
};

export default ExploreLink;
