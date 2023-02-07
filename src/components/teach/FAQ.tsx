import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import useLangContext from "../../hooks/useLangContext";
import { StringLang, StringLangs } from "../../types/common";
import { currentLanguage } from "../../utils";

interface ListItemType {
  q: StringLang;
  a: StringLangs;
  _id: string;
  active: boolean;
}

interface ParamsType {
  list: { q: StringLang; a: StringLangs }[];
}

const FAQ = ({ list }: ParamsType) => {
  const tempList = list as ListItemType[];

  const { isEnglish } = useLangContext();
  const [fqaList, setFqaList] = useState<ListItemType[]>(tempList);

  const handleToggle = (id: string) => {
    const itemIndex = fqaList.findIndex((ele) => ele._id === id);

    if (fqaList[itemIndex].active) {
      fqaList[itemIndex].active = false;
      setFqaList([...fqaList]);
      return;
    }

    setFqaList((prev) => {
      const newList = prev.map((ele) => {
        if (ele._id === id) ele.active = true;
        else ele.active = false;
        return ele;
      });
      return newList;
    });
  };

  return (
    <Container as="section" className="mb-5">
      <Row>
        <Col md="4">
          <h1 className="mb-4">
            {isEnglish ? "Frequently Asked Questions" : "أسئلة مكررة"}
          </h1>
        </Col>
        <Col md="8">
          {fqaList.map((item) => (
            <div
              key={item._id}
              style={{
                transition: "var(--main-transition)",
              }}
              className="border-secondary-color border border-2 rounded-4 px-4 pt-3 pb-2 mb-3">
              <div
                role="button"
                onClick={() => handleToggle(item._id)}
                className="d-flex justify-content-between">
                <h5>{item.q[currentLanguage(isEnglish)]}</h5>
                <FontAwesomeIcon
                  icon={item.active ? faChevronUp : faChevronDown}
                />
              </div>
              {item.active && (
                <div className="faq-a my-3 text-black-50">
                  {item.a[currentLanguage(isEnglish)].map((ele, i) => (
                    <p key={i} className="mb-3">
                      - {ele}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

interface ParamsTypeItem {
  item: ListItemType;
  setFqaList: React.Dispatch<React.SetStateAction<ListItemType[]>>;
  isEnglish: boolean;
}

// const ToggleItem = ({ item, isEnglish, setFqaList }: ParamsTypeItem) => {
//   const [isOpened, setIsOpened] = useState(item.active);
//   useEffect(() => {
//     setIsOpened(item.active);
//   }, []);

//   const handleToggle = () => {
//     if (isOpened) {
//       setFqaList((prev) => {
//         const newList = prev.map((ele) => {
//           ele.active = false;
//           return ele;
//         });
//         return newList;
//       });
//       setIsOpened(false);
//     } else {
//       setIsOpened(true);
//     }
//   };

// return (

// );
// return (
//   <div className="border-secondary-color border border-2 rounded-4 px-4 pt-3 pb-2 mb-3">
//     <div
//       role="button"
//       onClick={handleToggle}
//       className="d-flex justify-content-between">
//       <h5>{item.q[currentLanguage(isEnglish)]}</h5>
//       <FontAwesomeIcon icon={isOpend ? faChevronUp : faChevronDown} />
//     </div>

//     <div className={`faq-a my-3 ${isOpend ? "opend" : "closed"}`}>
//       {item.a[currentLanguage(isEnglish)].map((ele, i) => (
//         <p key={i} className="mb-3">
//           - {ele}
//         </p>
//       ))}
//     </div>
//   </div>
// );
// };

export default FAQ;
