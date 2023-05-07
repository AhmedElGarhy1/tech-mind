import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { tempDiploma } from "../../../data/temp";
import { StringLang } from "../../../types/common";
import { getRandomNum } from "../../../lib/utils";
import {
  AdminDiplomaType,
  GlobalDiplomaImagesStringType,
} from "../../../types/deploma";

const initialState: { diploma: AdminDiplomaType; isSent: boolean } = {
  diploma: tempDiploma,
  isSent: false,
};

interface listElement {
  q: StringLang;
  a: StringLang[];
  _id: string;
}

export const DiplomaSlice = createSlice({
  name: "diploma",
  initialState,
  reducers: {
    resetDiploma: (currentState) => {
      currentState.diploma = tempDiploma;
    },
    setDiploma: (currentState, action: PayloadAction<AdminDiplomaType>) => {
      currentState.diploma = { ...action.payload };
    },
    updateDiplomaInfo: (
      state,
      action: PayloadAction<{ name: StringLang; description: StringLang }>
    ) => {
      const { name, description } = action.payload;
      state.diploma.name = name;
      state.diploma.description = description;
    },

    updateDiplomaOverview: (state, action: PayloadAction<StringLang[]>) => {
      state.diploma.overview.AR = action.payload.map((ele) => ele.AR);
      state.diploma.overview.EN = action.payload.map((ele) => ele.EN);
    },

    updateDiplomaWhatWillYouLearn: (
      state,
      action: PayloadAction<{
        what: StringLang[];
        have_video: boolean;
      }>
    ) => {
      const { have_video, what } = action.payload;
      state.diploma.what_you_will_learn.AR = what.map((ele) => ele.AR);
      state.diploma.what_you_will_learn.EN = what.map((ele) => ele.EN);
      state.diploma.have_video = have_video;
    },
    updateDiplomaWhoIsThisDiplomaFor: (
      state,
      action: PayloadAction<StringLang[]>
    ) => {
      const list = action.payload;
      state.diploma.who_is_this_course_for.AR = list.map((ele) => ele.AR);
      state.diploma.who_is_this_course_for.EN = list.map((ele) => ele.EN);
    },

    updateDiplomaQuestions: (state, action: PayloadAction<listElement[]>) => {
      state.diploma.fqa = action.payload.map((ele) => ({
        q: ele.q,
        a: {
          EN: ele.a.map((ans) => ans.EN),
          AR: ele.a.map((ans) => ans.AR),
        },
      }));
    },
    updateDiplomaImages: (
      state,
      action: PayloadAction<GlobalDiplomaImagesStringType>
    ) => {
      const { main_img, other_src } = action.payload;
      if (main_img) state.diploma.main_img = main_img;
      if (other_src) state.diploma.other_src = other_src;
    },
    updateDiplomaIsSent: (state, action: PayloadAction<boolean>) => {
      state.isSent = action.payload;
    },
  },
});

export const {
  setDiploma,
  updateDiplomaInfo,
  updateDiplomaOverview,
  updateDiplomaWhatWillYouLearn,
  updateDiplomaWhoIsThisDiplomaFor,
  updateDiplomaQuestions,
  updateDiplomaImages,
  updateDiplomaIsSent,
  resetDiploma,
} = DiplomaSlice.actions;

export const selectDiplomaFull = (state: RootState) => state.diploma.diploma;
export const selectDiplomaInfo = (state: RootState) => ({
  name: state.diploma.diploma.name,
  description: state.diploma.diploma.description,
});

export const selectDiplomaOverview = (state: RootState) => [
  ...state.diploma.diploma.overview.AR.map((ele, i) => ({
    AR: ele,
    EN: state.diploma.diploma.overview.EN[i],
    id: getRandomNum(),
  })),
];

export const selectDiplomaWhatWillYouLearn = (state: RootState) => ({
  what: [
    ...state.diploma.diploma.what_you_will_learn.AR.map((ele, i) => ({
      AR: ele,
      EN: state.diploma.diploma.what_you_will_learn.EN[i],
      id: getRandomNum(),
    })),
  ],
  have_video: state.diploma.diploma.have_video,
});

export const selectDiplomaWhoIsThisDiplomaFor = (state: RootState) => ({
  who: [
    ...state.diploma.diploma.who_is_this_course_for.AR.map((ele, i) => ({
      AR: ele,
      EN: state.diploma.diploma.who_is_this_course_for.EN[i],
      id: getRandomNum(),
    })),
  ],
});

export const selectDiplomaDiplomaQuestions = (state: RootState) => [
  ...state.diploma.diploma.fqa.map((ele) => ({
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
export const selectDiplomaIsSent = (state: RootState) => state.diploma.isSent;
export const selectDiplomaImages = (state: RootState) => ({
  main_img: state.diploma.diploma.main_img,
  other_src: state.diploma.diploma.other_src,
});

const DiplomaReducer = DiplomaSlice.reducer;

export default DiplomaReducer;
