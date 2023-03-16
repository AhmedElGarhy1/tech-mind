import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useLangContext from "../hooks/useLangContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentLanguage } from "../utils";
import { Breadcrumb, Container } from "react-bootstrap";

interface ParamsType {
  name?: {
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
  const [isHome, setIsHome] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState([]);

  // a global var
  let currentLink: string = "";

  useEffect(() => {
    setBreadCrumbs(pathname.split("/").slice(1).map(createBreadCrumb));
  }, [pathname, isEnglish]);

  // a dummy function that create one breadCrumbe
  function createBreadCrumb(breadCrumb: string, i: number, arr: string[]) {
    // edge case // if home page
    if (breadCrumb === "") {
      setIsHome(true);
      return;
    }

    // fix some issues like if it made rerender and the previous buffer(link) wasn't empty
    if (i === 0) currentLink = "";

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
      case "contact": {
        currentName = isEnglish ? "Contact Us" : "تواصل معنا";
        break;
      }
      case "about": {
        currentName = isEnglish ? "About" : "نبذة عنا";
        break;
      }
      default: {
        if (i === arr.length - 1)
          currentName = name[currentLanguage(isEnglish)];
        else currentName = deplomaName[currentLanguage(isEnglish)];
      }
    }
    console.log(currentLink, i);
    return (
      <Link
        key={i}
        className={`text-capitalize text-black fs-5 ${
          i === arr.length - 1 ? "text-black-50" : ""
        }`}
        to={currentLink}>
        {currentName}
        {i != arr.length - 1 && (
          <FontAwesomeIcon
            className={`px-2 ${isEnglish ? "ps-1" : "pe-1"}`}
            icon={isEnglish ? faChevronRight : faChevronLeft}
          />
        )}
      </Link>
    );
  }

  return (
    <Container>
      <div className="py-4">
        <Link
          className={`text-capitalize text-black fs-5 ${
            pathname === "/" ? "text-black-50" : ""
          }`}
          to="/">
          {isEnglish ? "Home" : "الصفحة الرائيسية"}
          {!isHome && (
            <FontAwesomeIcon
              className={`px-2 ${isEnglish ? "ps-1" : "pe-1"}`}
              icon={isEnglish ? faChevronRight : faChevronLeft}
            />
          )}
        </Link>
        {breadCrumbs}
      </div>
    </Container>
  );
};

export default WhereAmI;
