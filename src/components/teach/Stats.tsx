import {
  faClock,
  faFolder,
  faUsers,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";

interface Params {
  name: {
    AR: string;
    EN: string;
  };
  lectures: number;
  duration: number;
  workshops: number;
  real_projects: number;
}

const Stats = ({
  name,
  lectures,
  duration,
  workshops,
  real_projects,
}: Params) => {
  const { isEnglish } = useLangContext();
  return (
    <Container
      className="rounded-2 text-white text-center py-5 mb-5"
      style={{ backgroundColor: "var(--main-color)" }}>
      <h3 className="mb-3">{name[currentLanguage(isEnglish)]}</h3>
      <p className="text-white-50 fw-normal">
        Are you ready to start your path to becoming a Data Scients
      </p>
      <Container className="d-flex text-center justify-content-center mb-4 gap-3 stats-icons px-4 px-sm-0">
        <div>
          <FontAwesomeIcon
            className="px-2 text-white"
            width="13"
            icon={faClock}
          />
          <span>
            {duration} {isEnglish ? "Hours" : "ساعة"}
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            className="px-2 text-white"
            width="13"
            icon={faFolder}
          />
          <span>
            {lectures} {isEnglish ? "Lectures" : "محاضرات"}
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            className="px-2 text-white"
            width="13"
            icon={faUsers}
          />
          <span>
            {workshops} {isEnglish ? "workshops" : "ورش عمل"}
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            className="px-2 text-white"
            width="13"
            icon={faSheetPlastic}
          />

          <span>
            {real_projects} {isEnglish ? "Real Projects" : "مشاريع حقيقية"}
          </span>
        </div>
      </Container>
      <button className="main-btn px-3 mx-auto">Start Your Career</button>
    </Container>
  );
};

export default Stats;
