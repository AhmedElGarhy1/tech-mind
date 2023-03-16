import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import footer from "../../data/footer";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage } from "../../utils";

const ContactDetails = () => {
  const { isEnglish } = useLangContext();

  return (
    <>
      <h4>{isEnglish ? "Need Any Help?" : "هل تحتاج الى مساعدة؟"}</h4>
      <h1>{isEnglish ? "Get Touch With Us" : "تواصل معنا"}</h1>
      <p className="text-black-50">
        {isEnglish
          ? "Feel free to contact us at any time and make sure that we are always at your service in order to help you."
          : "لا تتردد في الاتصال بنا في أي وقت والتأكد من أننا دائمًا في خدمتك من أجل مساعدتك."}
      </p>
      <div>
        <div className="d-flex gap-3 mb-4">
          <div
            style={{
              backgroundColor: "var(--secondary-color)",
            }}
            className="icon p-3">
            <FontAwesomeIcon
              icon={footer.contact[0].icon}
              color="white"
              className="fs-5"
            />
          </div>
          <div>
            <h5>{isEnglish ? "Have any question?" : "هل لديك اي سؤال؟"}</h5>
            <p className="text-black-50 m-0">{footer.contact[0].name}</p>
          </div>
        </div>
        <div className="d-flex gap-3">
          <div
            style={{
              backgroundColor: "var(--secondary-color)",
            }}
            className="icon p-3">
            <FontAwesomeIcon
              icon={footer.contact[1].icon}
              color="white"
              className="fs-5"
            />
          </div>
          <div>
            <h5>{isEnglish ? "Write an Email" : "اكتب رسالة بريد الكتروني"}</h5>
            <p className="text-black-50 m-0">{footer.contact[1].name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
