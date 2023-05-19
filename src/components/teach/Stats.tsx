import {
  faClock,
  faFolder,
  faUsers,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { currentLanguage } from "../../lib/utils";

interface Params {
  name: {
    AR: string;
    EN: string;
  };
  lectures: number;
  duration: number;
  workshops: number;
  real_projects: number;
  handleShow: () => void;
}

const Stats = ({
  name,
  lectures,
  duration,
  workshops,
  real_projects,
  handleShow,
}: Params) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  return (
    <Container
      as="section"
      className="rounded-2 text-white text-center py-5"
      style={{ backgroundColor: "var(--main-color)" }}>
      <h1 data-aos="zoom-in" data-aos-delay="150" className="mb-3">
        {name[currentLanguage(isEnglish)]}
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="400"
        className="text-white-50 fw-normal fs-5">
        {isEnglish
          ? "Are you ready to start your Career !"
          : "هل أنت مستعد لبدء حياتك المهنية!"}
      </p>
      <Container className="stats-icons d-flex text-center justify-content-center mb-4 gap-1 gap-sm-3 px-4 px-sm-0">
        <div data-aos="flip-right" data-aos-delay="700" className="fs-5">
          <FontAwesomeIcon className="px-2 px-md-3" icon={faClock} />
          <span>
            {duration} {isEnglish ? "Hours" : "ساعات"}
          </span>
        </div>
        <div data-aos="flip-right" data-aos-delay="700" className="fs-5">
          <FontAwesomeIcon className="px-2 px-md-3" icon={faFolder} />
          <span>
            {lectures} {isEnglish ? "Lectures" : "محاضرات"}
          </span>
        </div>
        <div data-aos="flip-right" data-aos-delay="700" className="fs-5">
          <FontAwesomeIcon className="px-2 px-md-3" icon={faUsers} />
          <span>
            {workshops} {isEnglish ? "workshops" : "ورش عمل"}
          </span>
        </div>
        <div data-aos="flip-right" data-aos-delay="700" className="fs-5">
          <FontAwesomeIcon className="px-2 px-md-3" icon={faSheetPlastic} />

          <span>
            {real_projects} {isEnglish ? "Real Projects" : "مشاريع حقيقية"}
          </span>
        </div>
      </Container>
      <button
        style={{
          padding: "4px 51px",
          lineHeight: "40px",
        }}
        data-aos-delay="1000"
        data-aos="zoom-out"
        onClick={handleShow}
        className="main-btn mt-5  mx-auto">
        Start Your Career
      </button>
    </Container>
  );
};

export default Stats;
