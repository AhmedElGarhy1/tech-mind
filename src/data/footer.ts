import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const footer = {
  words: "The Future Is Belongs To You",
  social_icons: [
    {
      icon: faTwitter,
      name: "Twitter",
      href: "/",
    },
    {
      icon: faLinkedin,
      name: "Linkedin",
      href: "/",
    },
    {
      icon: faFacebook,
      name: "Facebook",
      href: "/",
    },
    {
      icon: faInstagram,
      name: "Instgram",
      href: "/",
    },
  ],
  services: [
    { name: { AR: "تحليل البيانات", EN: "Data Analysis" }, href: "/" },
    { name: { AR: "علم البيانات", EN: "Data Science" }, href: "/" },
    { name: { AR: "لغة C ++", EN: "C++ Language" }, href: "/" },
    {
      name: { AR: "الذكاء الاصطناعي", EN: "Artificial Intelligence" },
      href: "/",
    },
  ],
  usefu_links: [
    { name: { AR: "نبذة عنا", EN: "About Us" }, href: "/about" },
    { name: { AR: "المنشورات", EN: "Posts" }, href: "/posts" },
    { name: { AR: "الكورسات", EN: "Courses" }, href: "/courses" },
    { name: { AR: "المقالات", EN: "Articles" }, href: "/articles" },
    { name: { AR: "تواصل معنا", EN: "Contact Us" }, href: "/contact" },
  ],
  contact: [
    {
      icon: faPhone,
      name: "010111111111",
    },
    { icon: faEnvelope, name: "tech-mind@gmail.com" },
    { icon: faLocationDot, name: "Zagazig" },
  ],
};

export default footer;
