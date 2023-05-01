import { CourseCardType } from "../types/course";

export const formateEmail = (email: string): Boolean =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const filterCourses = (courses: CourseCardType[], query: string) => {
  return courses.filter((course) => {
    const q = new RegExp(query.toLowerCase(), "g");
    const nameEN = course.name.EN.toLowerCase();
    const nameAR = course.name.AR.toLowerCase();
    const descriptionEN = course.description.EN.toLowerCase();
    const descriptionAR = course.description.AR.toLowerCase();
    if (
      nameAR.search(q) !== -1 ||
      nameEN.search(q) !== -1 ||
      descriptionAR.search(q) !== -1 ||
      descriptionEN.search(q) !== -1
    ) {
      return true;
    }
    return false;
  });
};

export const currentLanguage = (isEnglish: boolean): "EN" | "AR" =>
  isEnglish ? "EN" : "AR";

export const validateEmail = (email: string): string => {
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email)) {
    return "Email Address";
  }
  return "";
};

export const sleep = async (ms: number) =>
  new Promise((r, j) => setTimeout(() => r(null), ms));
export const getRandomNum = () => Math.random() * Date.now();
