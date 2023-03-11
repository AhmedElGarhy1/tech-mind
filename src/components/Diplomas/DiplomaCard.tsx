import useLangContext from "../../hooks/useLangContext";
import { Link } from "react-router-dom";
import { StringLang } from "../../types/common";
import { currentLanguage } from "../../utils";

export interface DiplomaCardType {
  _id: string;
  name: StringLang;
  description: StringLang;
  main_img: string;
}

const DiplomaCard = ({ diploma }: { diploma: DiplomaCardType }) => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <div>
        <img
          src={diploma.main_img}
          data-aos="zoom-in"
          className="diploma-img"
          width="100%"
          height="250"
          alt=""
        />
      </div>
      <div className="px-3 pb-5">
        <h4 data-aos="fade-up" className="fw-bold pb-2 pt-3">
          {diploma.name[currentLanguage(isEnglish)]}
        </h4>
        <p
          data-aos="fade-left"
          data-aos-delay="600"
          style={{ lineHeight: "32px" }}
          className="fs-5">
          {diploma.description[currentLanguage(isEnglish)]}
        </p>
        <Link
          data-aos="zoom-out"
          data-aos-delay="1200"
          style={{
            position: "absolute",
            bottom: "12px",
            padding: "11px 25px",
          }}
          className="main-btn"
          to={`/diplomas/${diploma._id}`}>
          {isEnglish ? "Learn More" : "معرفة المزيد"}
        </Link>
      </div>
    </>
  );
};

export default DiplomaCard;
