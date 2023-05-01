import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialStateType {
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: InitialStateType = {
  isLoading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    removeLoading: (state) => {
      state.isLoading = false;
    },
    makeLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { makeLoading, removeLoading } = LoadingSlice.actions;

export const selectLoadingStatus = (state: RootState) =>
  state.loading.isLoading;

const LoadingReducer = LoadingSlice.reducer;

export default LoadingReducer;
