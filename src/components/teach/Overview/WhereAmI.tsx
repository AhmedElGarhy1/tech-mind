import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useLangContext from "../../../hooks/useLangContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ParamsType {
  name: {
    EN: string;
    AR: string;
  };
}

const WhereAmI = ({ name }: ParamsType) => {
  const { isEnglish } = useLangContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const elements = pathname.split("/").slice(1, -1);
    setParents(["home", ...elements, name.EN]);
  }, []);

  const goToPath = (i: number) => {
    if (i === parents.length - 1) return "";
    let path = "/";

    for (let j = 1; j <= i; j++) {
      if (j <= i) path += parents[j] + "/";
    }
    return path;
  };

  return (
    <div className="py-4" dir="ltr">
      {parents.map((parent, i) => (
        <Link
          to={goToPath(i)}
          className="text-capitalize text-black"
          role={"button"}
          onClick={() => goToPath(i)}
          key={i}>
          {parent}
          {i !== parents.length - 1 && (
            <FontAwesomeIcon className="px-2" icon={faChevronRight} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default WhereAmI;
