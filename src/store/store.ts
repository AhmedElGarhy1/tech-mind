import { configureStore } from "@reduxjs/toolkit";
import LangReducer from "./slices/LangSlice";
import LoadingReducer from "./slices/LoadingSlice";
import CourseReducer from "./slices/Admin/CourseSlice";

export const store = configureStore({
  reducer: {
    language: LangReducer,
    loading: LoadingReducer,
    course: CourseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
