import { createSlice } from "@reduxjs/toolkit";
import { BeerUser } from "../../types/user";
import type { RootState } from "../store";

interface UserState {
  currentUser: BeerUser | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

export enum RecipeActionTypes {
  SetUser = "user/setUser",
  ClearUser = "user/clearUser",
}

export const userSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setUser: (state, action: { payload: BeerUser }) => {
      state.currentUser = action.payload;
      state.isAuthenticated = action.payload != null;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
