import { Slice, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state

interface InitialStateType {
  isEnglish: boolean;
}

// Define the initial state using that type
const initialState: InitialStateType = {
  isEnglish: JSON.parse(localStorage.getItem("isEnglish")) || false,
};

export const LangSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeCurrentLanguage: (state) => {
      state.isEnglish = !state.isEnglish;
      localStorage.setItem("isEnglish", JSON.stringify(state.isEnglish));
    },
  },
});

export const { changeCurrentLanguage } = LangSlice.actions;

export const selectIsEnglish = (state: RootState) => state.language.isEnglish;

const LangReducer = LangSlice.reducer;

export default LangReducer;
