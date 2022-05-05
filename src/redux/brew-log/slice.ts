import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BrewingTypes as BT } from "brewing-shared";
import {
  createUpdateBrewLog,
  deleteBrewLog,
  getBrewLogsByUser,
} from "../../utils/api-calls";
import { deepCloneObject } from "../../utils/helpers";
import type { RootState } from "../store";

export interface BrewLogState {
  brewLogList: BT.BrewLog[];
  currentBrewLog: BT.BrewLog | null;
}

const initialState: BrewLogState = {
  brewLogList: [],
  currentBrewLog: null,
};

export enum BrewLogActionTypes {
  SetBrewLogList = "brew-log/setBrewLogList",
  SetCurrentBrewLog = "brew-log/setCurrentBrewLog",
}

export const refreshBrewLogList = createAsyncThunk(
  "brew-log/refreshBrewLogList",
  async () => {
    return await getBrewLogsByUser();
  }
);

export const processDeleteBrewLog = createAsyncThunk(
  "brew-log/deleteBrewLog",
  async (brewLogId: string, { getState, dispatch }) => {
    await deleteBrewLog(brewLogId);
    const state = getState() as RootState;
    const newBrewLogs = state.brewLogs.brewLogList.filter(
      (brewLog) => brewLog.id !== brewLogId
    );
    dispatch(setBrewLogList(newBrewLogs));
    dispatch(setCurrentBrewLog(null));
  }
);

export const processCreateUpdateBrewLog = createAsyncThunk(
  "brew-log/createUpdateBrewLog",
  async (brewLog: BT.BrewLog, { getState, dispatch }) => {
    await createUpdateBrewLog(brewLog);
    const state = getState() as RootState;
    const newBrewLogList: BT.BrewLog[] = deepCloneObject(
      state.brewLogs.brewLogList
    );
    const currentBrewLogIndex = newBrewLogList.findIndex(
      ({ id }) => id === brewLog.id
    );
    if (currentBrewLogIndex !== -1) {
      // this is an update - replace old instance of brew log
      newBrewLogList[currentBrewLogIndex] = brewLog;
    } else {
      // this is a create - add it to the list
      newBrewLogList.push(brewLog);
    }
    dispatch(setBrewLogList(newBrewLogList));
    dispatch(setCurrentBrewLog(brewLog));
  }
);

export const brewLogSlice = createSlice({
  name: "brew-log",
  initialState,
  reducers: {
    setBrewLogList: (state, action) => {
      state.brewLogList = action.payload;
    },
    setCurrentBrewLog: (state, action) => {
      state.currentBrewLog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshBrewLogList.fulfilled, (state, action) => {
      state.brewLogList = action.payload;
    });
  },
});

export const { setBrewLogList, setCurrentBrewLog } = brewLogSlice.actions;

export const selectBrewLogList = (state: RootState) =>
  state.brewLogs.brewLogList;
export const selectCurrentBrewLog = (state: RootState) =>
  state.brewLogs.currentBrewLog;

export default brewLogSlice.reducer;
