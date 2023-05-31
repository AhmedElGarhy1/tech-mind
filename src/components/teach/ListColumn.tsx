import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { currentLanguage } from "../../lib/utils";

interface ListType {
  AR: string[];
  EN: string[];
}

interface ParamsType {
  list: ListType;
}

const ListColumn = ({ list }: ParamsType) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  const [visible, setVisible] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    rendreButtonState();
  }, [isEnglish]);

  const rendreButtonState = () => {
    if (isOpened) {
      setVisible(list[currentLanguage(isEnglish)]);
    } else {
      const temp = list[currentLanguage(isEnglish)].slice(0, 6);
      setVisible(temp);
    }
  };

  const changeButtonState = () => {
    console.log("first");
    if (!isOpened) {
      setVisible(list[currentLanguage(isEnglish)]);
    } else {
      const temp = list[currentLanguage(isEnglish)].slice(0, 6);
      setVisible(temp);
    }
    setIsOpened((p) => !p);
  };

  return (
    <>
      <ul className="list-unstyled p-0 animate">
        {visible.map((item, i) => (
          <li key={i} className="my-2 d-flex">
            <div className="mx-2 mt-1">&#9632;</div>
            <div className="text-black-50 fs-4">{item}</div>
          </li>
        ))}
      </ul>
      {list.AR.length > 6 && (
        <button
          onClick={changeButtonState}
          style={{
            padding: "16px 20px",
          }}
          className="btn btn-dark fw-semibold py-3 mt-4 mx-1 fs-4 fw-bold">
          {isOpened
            ? isEnglish
              ? "See less"
              : "عرض القليل"
            : isEnglish
            ? "See more"
            : "عرض المذيد"}
        </button>
      )}
    </>
  );
};

export default ListColumn;
