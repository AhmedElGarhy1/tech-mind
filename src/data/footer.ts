import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const footer = {
  words: "The Future Is Belongs To You",
  socialIcons: [
    {
      icon: "",
      name: "Twitter",
      href: "/",
    },
    {
      icon: "",
      name: "Linkedin",
      href: "/",
    },
    {
      icon: "",
      name: "Youtube",
      href: "/",
    },
    {
      icon: "",
      name: "Instgram",
      href: "/",
    },
  ],
  services: [
    { name: { AR: "", EN: "Data Analysis" }, href: "/" },
    { name: { AR: "", EN: "Data Science" }, href: "/" },
    { name: { AR: "", EN: "C++ Language" }, href: "/" },
    { name: { AR: "", EN: "Artificial Intelligence" }, href: "/" },
  ],
  usefu_links: [
    { name: { AR: "", EN: "About Us" }, href: "/about" },
    { name: { AR: "", EN: "Postes" }, href: "/postes" },
    { name: { AR: "", EN: "Courses" }, href: "/courses" },
    { name: { AR: "", EN: "Articles" }, href: "/articles" },
    { name: { AR: "", EN: "Contact Us" }, href: "/contact" },
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
