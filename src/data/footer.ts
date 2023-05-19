import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTwitterSquare,
  faFacebookSquare,
  faLinkedin,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

const footer = {
  words: "The Future Belongs To You",
  social_icons: [
    {
      icon: faTwitterSquare,
      name: "Twitter",
      href: "/",
    },
    {
      icon: faLinkedin,
      name: "Linkedin",
      href: "/",
    },
    {
      icon: faFacebookSquare,
      name: "Facebook",
      href: "/",
    },
    {
      icon: faInstagramSquare,
      name: "Instgram",
      href: "/",
    },
  ],
  services: [
    { AR: "الذكاء الاصطناعى", EN: "Artificial Intelligence." },
    { AR: "البرمجة", EN: "Programming" },
    { AR: "علوم البيانات", EN: "Data Science" },
    { AR: "تحليل البيانات", EN: "Data Analysis" },
  ],
  usefu_links: [
    { name: { AR: "الصفحة الرئيسية", EN: "Home" }, href: "/" },
    { name: { AR: "نبذة عنا", EN: "About Us" }, href: "/about" },
    { name: { AR: "الكورسات", EN: "Courses" }, href: "/courses" },
    { name: { AR: "الدبلومات", EN: "Diplomas" }, href: "/diplomas" },
    { name: { AR: "تواصل معنا", EN: "Contact Us" }, href: "/contact" },
  ],
  contact: [
    {
      icon: faPhone,
      name: "01065588101",
    },
    { icon: faEnvelope, name: "techmind812@gmail.com" },
    { icon: faLocationDot, name: "Zagazig" },
  ],
};

export default footer;
