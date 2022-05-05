import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createUpdateBrewSettings } from "../../utils/api-calls";
import { BrewingTypes as BT } from "brewing-shared";

const defaultSettings: BT.User = {
  id: "",
  batchSize: 5,
  boilTime: 60,
  brewhouseEfficiency: 70,
  measurementType: "imperial",
  kettleTrubWaterLoss: 0.25,
  fermentorTrubWaterLoss: 0.25,
  boilOffWaterLossRate: 1.5,
  waterLossPerGrain: 0.5,
  displayName: "",
  email: "",
  sparge: false,
  mashThickness: 1.3,
};
export interface BrewSettingsState {
  brewSettings: BT.User;
}

const initialState: BrewSettingsState = {
  brewSettings: defaultSettings,
};

export enum RecipeActionTypes {
  SetBrewSettings = "brew-settings/setUser",
  ClearBrewSettings = "brew-settings/clearUser",
}

export const processCreateUpdateBrewSettings = createAsyncThunk(
  "brewSettings/updateBrewSettings",
  async (brewSettings: BT.User, { dispatch }) => {
    await createUpdateBrewSettings(brewSettings);
    dispatch(setBrewSettings(brewSettings));
  }
);

export const brewSettingsSlice = createSlice({
  name: "brew-settings",
  initialState,
  reducers: {
    setBrewSettings: (state, action: { payload: BT.User }) => {
      state.brewSettings = action.payload;
    },
    clearBrewSettings: (state) => {
      state.brewSettings = defaultSettings;
    },
  },
});

export const { setBrewSettings, clearBrewSettings } = brewSettingsSlice.actions;

export const selectBrewSettings = (state: RootState) =>
  state.brewSettings.brewSettings;

export default brewSettingsSlice.reducer;
