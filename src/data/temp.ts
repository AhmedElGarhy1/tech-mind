import { CourseType } from "../types/course";
import { AdminDiplomaType } from "../types/deploma";

export const tempCourse: CourseType = {
  name: {
    EN: "",
    AR: "",
  },

  description: {
    EN: "",
    AR: "",
  },
  overview: {
    EN: [""],
    AR: [""],
  },
  what_you_will_learn: {
    EN: [""],
    AR: [""],
  },
  who_is_this_course_for: {
    EN: [],
    AR: [],
  },
  _id: "",
  main_img: "",
  other_src: "",
  fqa: [
    {
      q: {
        AR: "",
        EN: "",
      },
      a: {
        AR: [""],
        EN: [""],
      },
    },
  ],
  duration: 0,
  lectures: 0,
  workshops: 0,
  real_projects: 0,
  icon: "",
  have_target: false,
  is_dependent: false,
  have_objectives: false,
  objectives: [],
  related_courses: [],
};

export const tempDiploma: AdminDiplomaType = {
  name: {
    EN: "",
    AR: "",
  },
  description: {
    EN: "",
    AR: "",
  },
  overview: {
    EN: [""],
    AR: [""],
  },
  what_you_will_learn: {
    EN: [""],
    AR: [""],
  },
  who_is_this_course_for: {
    EN: [""],
    AR: [""],
  },
  main_img: "",
  other_src: "",
  fqa: [
    {
      q: {
        EN: "",
        AR: "",
      },
      a: {
        EN: [""],
        AR: [""],
      },
      _id: "",
    },
  ],
  have_video: false,
};
