import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendMessage } from "../../api/get-api";
import useLangContext from "../../hooks/useLangContext";
import { currentLanguage, validateEmail } from "../../utils";

const ContactForm = () => {
  const { isEnglish } = useLangContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResMessage("");

    const e = validateEmail(email);
    if (e) {
      setResMessage(e);
      setLoading(false);
      return;
    }
    const data = {
      name,
      email,
      phone,
      subject,
      message,
    };

    try {
      const res = await sendMessage(data);
      if (res.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setResMessage("");
        Swal.fire("Good job!", "Your Message had been Sent!", "success");
        setLoading(false);
      }
    } catch (err) {
      setResMessage("All Fields Must be filled");
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>{isEnglish ? "Send Us Email" : "ارسل لنا ايميل"}</h4>
      <h1>{isEnglish ? "Feel Free to Write" : "لا تتردد في الكتابة"}</h1>
      {resMessage && <p className="error-message">{resMessage}</p>}
      <form className="contact-form my-4">
        <div className="gap-3 mb-3">
          <input
            className="py-3 px-3"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          <input
            className="py-3 px-3"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="gap-3 mb-3">
          <input
            className="py-3 px-3"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject"
          />
          <input
            className="py-3 px-3"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
          />
        </div>
        <div>
          <textarea
            className="py-3 px-3"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn btn-dark rounded-pill px-5 py-2">
        {loading
          ? isEnglish
            ? "Loading..."
            : "ارسال..."
          : isEnglish
          ? "Send Message"
          : "أرسل رسالة"}
      </button>
    </div>
  );
};

export default ContactForm;
