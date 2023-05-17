import React, { useState } from "react";
import { currentLanguage, formateEmail } from "../../lib/utils";
import { Form } from "react-bootstrap";
import { makeReservation } from "../../api/get-api";
import { PostResponse } from "../../types/response";
import Swal from "sweetalert2";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { StringLang } from "../../types/common";

interface ReservationFormTypes {
  tech_id: string;
  handleClose: () => void;
  tech_name: StringLang;
  isDiploma: boolean;
}

const ReservationForm = ({
  tech_id,
  handleClose,
  tech_name,
  isDiploma,
}: ReservationFormTypes) => {
  const isEnglish = useAppSelector(selectIsEnglish);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    if (isNaN(+num) && !(num === "+" && phone.length === 0)) return;
    setPhone(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!name) return setError("Invalid Name");
    if (!phone) return setError("Invalid Phone");
    if (!formateEmail(email)) return setError("Invalid Email");

    const data = { name, phone, email, tech_id };
    try {
      setIsLoading(true);
      const res: PostResponse = await makeReservation(data);
      setIsLoading(false);
      if (!res.ok) setError(res.msg);
      Swal.fire("Good job!", "We will contact you ASAP", "success").then(
        handleClose
      );

      setError("");
      setName("");
      setPhone("");
      setEmail("");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <Form className="text-black-50 mt-3">
      <div className="mb-2">
        <label htmlFor="name" className="mb-1">
          {isEnglish ? "Full Name" : "الاسم الكامل"}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control shadow-none "
          id="name"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="mb-1">
          {isEnglish ? "Email address" : "عنوان البريد الإلكتروني"}
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control shadow-none "
          id="email"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="phone" className="mb-1">
          {isEnglish ? "Phone Number" : "رقم التليفون"}
        </label>
        <input
          value={phone}
          onChange={handlePhoneChange}
          type="text"
          className="form-control shadow-none"
          id="phone"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="mb-1">
          {isDiploma ? "Diploma" : "Course" + "Name"}
        </label>
        <input
          disabled
          value={tech_name[currentLanguage(isEnglish)]}
          className="form-control shadow-none "
          id="name"
        />
      </div>

      {error && <div className="text-center text-danger fs-6">{error}</div>}

      <button
        style={{
          lineHeight: "40px",
          padding: "4px 93px",
          marginTop: 10,
        }}
        onClick={handleSubmit}
        disabled={isLoading}
        className="main-btn fw-semibold mx-auto mx-md-0">
        {isEnglish
          ? isLoading
            ? "Loading..."
            : "Submit"
          : isLoading
          ? "تحميل..."
          : "أرسال"}
      </button>
    </Form>
  );
};

export default ReservationForm;
