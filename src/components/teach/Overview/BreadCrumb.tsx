import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useLangContext from "../../../hooks/useLangContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentLanguage } from "../../../utils";

interface ParamsType {
  name: {
    EN: string;
    AR: string;
  };
  deplomaName?: {
    EN: string;
    AR: string;
  };
}

const WhereAmI = ({ name, deplomaName }: ParamsType) => {
  const { isEnglish } = useLangContext();
  const { pathname } = useLocation();

  // a global var
  let currentLink: string = "";

  const breadCrumbs = pathname.split("/").slice(1).map(createBreadCrumb);

  // a dummy function that create one breadCrumbe
  function createBreadCrumb(breadCrumb: string, i: number, arr: string[]) {
    currentLink += `/${breadCrumb}`;
    let currentName = breadCrumb;

    switch (breadCrumb) {
      case "courses": {
        currentName = isEnglish ? "Courses" : "كورسات";
        break;
      }
      case "diplomas": {
        currentName = isEnglish ? "Diplomas" : "دبلومات";
        break;
      }
      default: {
        if (i === arr.length - 1)
          currentName = name[currentLanguage(isEnglish)];
        else currentName = deplomaName[currentLanguage(isEnglish)];
      }
    }

    return (
      <Link
        key={i}
        className="text-capitalize text-black fs-5"
        to={currentLink}>
        {currentName}
        {i != arr.length - 1 && (
          <FontAwesomeIcon
            className="px-2"
            icon={isEnglish ? faChevronRight : faChevronLeft}
          />
        )}
      </Link>
    );
  }

  return (
    <div className="pt-4">
      <Link className="text-capitalize text-black fs-5" to="/">
        {isEnglish ? "Home" : "الصفحة الرائيسية"}
        <FontAwesomeIcon
          className="px-2"
          icon={isEnglish ? faChevronRight : faChevronLeft}
        />
      </Link>
      {breadCrumbs}
    </div>
  );
};

export default WhereAmI;
