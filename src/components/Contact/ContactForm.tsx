import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendMessage } from "../../api/get-api";
import { useAppSelector } from "../../store/hooks";
import { selectIsEnglish } from "../../store/slices/LangSlice";
import { validateEmail } from "../../lib/utils";

const ContactForm = () => {
  const isEnglish = useAppSelector(selectIsEnglish);

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
      setResMessage("Please Provide a Valid " + e);
      setLoading(false);
      return;
    }
    if (!name || !phone || !subject || !message) {
      if (!name) setResMessage("Please Provide a Valid name");
      else if (!subject) setResMessage("Please Provide a Valid subject");
      else if (!phone) setResMessage("Please Provide a Valid phone");
      else if (!message) setResMessage("Please Provide a Valid message");
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
      }
    } catch (err) {
      setResMessage("Somthing went went in server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>{isEnglish ? "Send Us Email" : "ارسل لنا ايميل"}</h4>
      <h1>{isEnglish ? "Feel Free to Write" : "لا تتردد في الكتابة"}</h1>
      {resMessage && <p className="error-message">{resMessage}</p>}
      <form className="contact-form my-4">
        <div className="gap-3 mb-3 mb-md-4 flex-wrap flex-md-nowrap">
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
        <div className="gap-3 mb-3 mb-md-4 flex-wrap flex-md-nowrap">
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
            onChange={(e) =>
              !isNaN(+e.target.value) && setPhone(e.target.value)
            }
            placeholder="Enter Phone"
          />
        </div>
        <div>
          <textarea
            className="py-3 px-3"
            rows={7}
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
