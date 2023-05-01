import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { tempCourse } from "../../../data/temp";
import { CourseType } from "../../../types/course";
import { StringLang, StringLangs } from "../../../types/common";
import { GlobalImagesStringType } from "../../../components/Admin/Helper/ButtonAddRecord";
import { getRandomNum } from "../../../lib/utils";

export type AdminCourseType = Omit<CourseType, "related_courses">;

const initialState: { course: AdminCourseType; isSent: boolean } = {
  course: tempCourse,
  isSent: false,
};

interface CourseMetaNumbers {
  duration: string;
  workshops: string;
  lectures: string;
  real_projects: string;
}

interface CourseObjectives {
  list: {
    name: StringLang;
    description: StringLang;
    icon: string;
    _id?: string;
  }[];
  isOn: boolean;
}

interface listElement {
  q: StringLang;
  a: StringLang[];
  _id: string;
}

export const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourse: (currentState) => {
      currentState.course = tempCourse;
    },
    setCourse: (currentState, action: PayloadAction<CourseType>) => {
      currentState.course = { ...action.payload };
    },
    updateCourseInfo: (
      state,
      action: PayloadAction<{ name: StringLang; description: StringLang }>
    ) => {
      const { name, description } = action.payload;
      state.course.name = name;
      state.course.description = description;
    },
    updateCourseMetaNumbers: (
      state,
      action: PayloadAction<CourseMetaNumbers>
    ) => {
      const { duration, lectures, real_projects, workshops } = action.payload;
      state.course.duration = +duration;
      state.course.lectures = +lectures;
      state.course.real_projects = +real_projects;
      state.course.workshops = +workshops;
    },
    updateCourseOverview: (state, action: PayloadAction<StringLang[]>) => {
      state.course.overview.AR = action.payload.map((ele) => ele.AR);
      state.course.overview.EN = action.payload.map((ele) => ele.EN);
    },
    updateCourseObjectives: (
      state,
      action: PayloadAction<CourseObjectives>
    ) => {
      const list = action.payload.list.map(({ name, description, icon }) => ({
        name,
        description,
        icon,
      }));
      state.course.objectives = list;
      state.course.have_objectives = action.payload.isOn;
    },
    updateCourseWhatWillYouLearn: (
      state,
      action: PayloadAction<StringLang[]>
    ) => {
      state.course.what_you_will_learn.AR = action.payload.map((ele) => ele.AR);
      state.course.what_you_will_learn.EN = action.payload.map((ele) => ele.EN);
    },
    updateCourseWhoIsThisCourseFor: (
      state,
      action: PayloadAction<{ list: StringLang[]; isOn: boolean }>
    ) => {
      const { isOn, list } = action.payload;
      state.course.who_is_this_course_for.AR = list.map((ele) => ele.AR);
      state.course.who_is_this_course_for.EN = list.map((ele) => ele.EN);
      state.course.have_target = isOn;
    },
    updateIsDependentCourse: (state, action: PayloadAction<boolean>) => {
      state.course.is_dependent = action.payload;
    },
    updateCourseQuestions: (state, action: PayloadAction<listElement[]>) => {
      state.course.fqa = action.payload.map((ele) => ({
        q: ele.q,
        a: {
          EN: ele.a.map((ans) => ans.EN),
          AR: ele.a.map((ans) => ans.AR),
        },
      }));
    },
    updateCourseImages: (
      state,
      action: PayloadAction<GlobalImagesStringType>
    ) => {
      const { icon, main_img, objectives, other_src } = action.payload;
      if (icon) state.course.icon = icon;
      if (main_img) state.course.main_img = main_img;
      if (other_src) state.course.other_src = other_src;
      if (objectives.length > 0)
        state.course.objectives = state.course.objectives?.map((obj, i) => {
          if (!objectives[i]) return obj;
          obj.icon = objectives[i];
          return obj;
        });
    },
    updateIsSent: (state, action: PayloadAction<boolean>) => {
      state.isSent = action.payload;
    },
  },
});

export const {
  setCourse,
  updateCourseInfo,
  updateCourseMetaNumbers,
  updateCourseOverview,
  updateCourseObjectives,
  updateCourseWhatWillYouLearn,
  updateCourseWhoIsThisCourseFor,
  updateIsDependentCourse,
  updateCourseQuestions,
  updateCourseImages,
  updateIsSent,
  resetCourse,
} = CourseSlice.actions;

export const selectCourseFull = (state: RootState) => state.course.course;
export const selectCourseInfo = (state: RootState) => ({
  name: state.course.course.name,
  description: state.course.course.description,
});
export const selectCourseMetaNumbers = (state: RootState) => {
  const { duration, lectures, workshops, real_projects } = state.course.course;
  return { duration, lectures, workshops, real_projects };
};
export const selectCourseOverview = (state: RootState) => [
  ...state.course.course.overview.AR.map((ele, i) => ({
    AR: ele,
    EN: state.course.course.overview.EN[i],
    id: getRandomNum(),
  })),
];
export const selectCourseObjectives = (state: RootState) => ({
  objectives: [
    ...state.course.course.objectives.map((obj) => ({
      ...obj,
      _id: getRandomNum().toString(),
    })),
  ],
  have_objectives: state.course.course.have_objectives,
});
export const selectCourseWhatWillYouLearn = (state: RootState) => [
  ...state.course.course.what_you_will_learn.AR.map((ele, i) => ({
    AR: ele,
    EN: state.course.course.what_you_will_learn.EN[i],
    id: getRandomNum(),
  })),
];

export const selectCourseWhoIsThisCourseFor = (state: RootState) => ({
  who: [
    ...state.course.course.who_is_this_course_for.AR.map((ele, i) => ({
      AR: ele,
      EN: state.course.course.who_is_this_course_for.EN[i],
      id: getRandomNum(),
    })),
  ],
  have_target: state.course.course.have_target,
});
export const selectCourseIsDependentCourse = (state: RootState) =>
  state.course.course.is_dependent;
export const selectCourseCourseQuestions = (state: RootState) => [
  ...state.course.course.fqa.map((ele) => ({
    q: ele.q,
    a: [
      ...ele.a.AR.map((a, i) => ({
        AR: a,
        EN: ele.a.EN[i],
        _id: getRandomNum().toString(),
      })),
    ],
    _id: getRandomNum().toString(),
  })),
];
export const selectCourseIsSent = (state: RootState) => state.course.isSent;
export const selectCourseImages = (state: RootState) => ({
  icon: state.course.course.icon,
  main_img: state.course.course.main_img,
  other_src: state.course.course.other_src,
  objectives: state.course.course.objectives.map((ele) => ele.icon),
});

const CourseReducer = CourseSlice.reducer;

export default CourseReducer;
