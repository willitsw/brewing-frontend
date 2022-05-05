import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface MiscState {
  globalIsLoading: boolean;
}

const initialState: MiscState = {
  globalIsLoading: true,
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setGlobalIsLoading: (state, action: { payload: boolean }) => {
      state.globalIsLoading = action.payload;
    },
  },
});

export const { setGlobalIsLoading } = miscSlice.actions;

export const selectGlobalIsLoading = (state: RootState) =>
  state.misc.globalIsLoading;

export default miscSlice.reducer;
