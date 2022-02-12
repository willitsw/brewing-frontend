import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { BrewSettings } from "../../types/brew-settings";

interface BrewSettingsState {
  brewSettings: BrewSettings | null;
}

const initialState: BrewSettingsState = {
  brewSettings: null,
};

export enum RecipeActionTypes {
  SetBrewSettings = "brew-settings/setUser",
  ClearBrewSettings = "brew-settings/clearUser",
}

export const brewSettingsSlice = createSlice({
  name: "brew-settings",
  initialState,
  reducers: {
    setBrewSettings: (state, action: { payload: BrewSettings }) => {
      state.brewSettings = action.payload;
    },
    clearBrewSettings: (state) => {
      state.brewSettings = null;
    },
  },
});

export const { setBrewSettings, clearBrewSettings } = brewSettingsSlice.actions;

export const selectBrewSettings = (state: RootState) =>
  state.brewSettings.brewSettings;

export default brewSettingsSlice.reducer;
