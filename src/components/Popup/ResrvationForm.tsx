import React, { useState } from "react";
import useLangContext from "../../hooks/useLangContext";
import { formateEmail } from "../../lib/utils";
import { Form } from "react-bootstrap";
import { makeReservation } from "../../api/get-api";
import { PostResponse } from "../../types/response";

interface ReservationFormTypes {
  tech_id: string;
}

const ReservationForm = ({ tech_id }: ReservationFormTypes) => {
  const { isEnglish } = useLangContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<null | string>(null);

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
      const res: PostResponse = await makeReservation(data);
      if (!res.ok) setError(res.msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="text-black-50 mt-3">
      <div className="mb-3">
        <label htmlFor="name" className="mb-1">
          Full Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control shadow-none "
          id="name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="mb-1">
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control shadow-none "
          id="email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="mb-1">
          Phone Number
        </label>
        <input
          value={phone}
          onChange={handlePhoneChange}
          type="text"
          className="form-control shadow-none"
          id="phone"
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
        className="main-btn fw-semibold mx-auto mx-md-0">
        {isEnglish ? "Submit" : "أرسال"}
      </button>
    </Form>
  );
};

export default ReservationForm;
